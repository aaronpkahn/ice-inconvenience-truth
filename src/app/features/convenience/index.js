import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ConvenienceGraph from './ConvenienceGraph';
import { Slide, SlideInner } from '../../components/slide';
import { goToSlide } from '../../hooks/slideSlice';
import * as graphService  from '../../services/graphDataService';
import * as telemetryService from '../../services/telemetryService';

import './style.css';
import Button from '../../components/button';
import { DataEntry, DataGroup, DataLabel, DataRow } from '../../components/dataset';

function ConvenienceSlide( { } ) {

    const [slide, setSlide] = useState(1);
    const dispatch = useDispatch();

    let { evDates, iceDates, distDates } = useSelector( (state) => state.car );

    evDates = evDates.slice(0,56);
    iceDates = iceDates.slice(0,56);
    distDates = distDates.slice(0,56);

    const evChargeTime = telemetryService.calculateRechargeTime( evDates, 20 );
    const iceRefillTime = telemetryService.calculateRefillTime( iceDates, 10 );

    const dataMap = (i) => { return { y: i.refillTime, x: new Date(i.date), ...i } };

    const evData = evChargeTime.map( dataMap );
    const iceData = iceRefillTime.map( dataMap );
    const distData = distDates.map((i) => {
        return {
            y: i.dist,
            x: new Date(i.date)
        }
    });

    const iceCosts  = graphService.getMaxPoints(iceData, false);

    const graphData = {
        iceData,
        evData,
        iceCosts,
        distData,
        slide
    };

    const refillHours = (iceCosts.length-2) * 200;

    const updateSlide = () => {
        if ( slide === 1 ) {
            setSlide(2);
        } else {
            dispatch( goToSlide( 'gas_price' ) );
        }
    }

    return (
        <Slide>
            <h1>Your Inconvenience Factor</h1>
            <SlideInner>
                <div>
                    { slide === 1 && ( 
                        <div>
                            <h2>In a typical gas vehicle, you're spending approximately:</h2>
                            <DataRow>
                                <DataGroup>
                                    <DataEntry>{refillHours}</DataEntry>
                                    <DataLabel>hours a year refilling your vehicle</DataLabel>
                                </DataGroup>
                                <DataGroup>
                                    <DataEntry>$500</DataEntry>
                                    <DataLabel>monthly spend on gas</DataLabel>
                                </DataGroup>
                            </DataRow>
                        </div>
                    )}
                    { slide > 1 && (
                        <div>
                            <h2>With an EV, you're recharging at home and only needing to charge on road trips.</h2>
                            <DataRow>
                                <DataGroup>
                                    <DataEntry>5 hours</DataEntry>
                                    <DataLabel>spent recharing your EV</DataLabel>
                                </DataGroup>
                                <DataGroup>
                                    <DataEntry>$250</DataEntry>
                                    <DataLabel>monthly electricity costs</DataLabel>
                                </DataGroup>
                            </DataRow>
                        </div>
                    )}
                    <Button onClick={updateSlide}>Next</Button>
                </div>
                <ConvenienceGraph {...graphData} />
            </SlideInner>
        </Slide>
    )
}

export default ConvenienceSlide;