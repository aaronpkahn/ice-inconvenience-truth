import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ConvenienceGraph from './ConvenienceGraph';
import { Slide, SlideInner } from '../../components/slide';
import { goToSlide } from '../../hooks/slideSlice';
import * as graphService  from './service';

import './style.css';
import Button from '../../components/button';
import { DataEntry, DataGroup, DataLabel, DataRow } from '../../components/dataset';

function ConvenienceSlide( { } ) {

    const [slide, setSlide] = useState(1);

    const dispatch = useDispatch();

    const { average_ice_range: iceRange, milesDriven: milesDriven } = useSelector( (state) => state.inputs );

    let { evDates, iceDates } = graphService.calcState( milesDriven, iceRange );

    const dataMap = (i) => { return { y: i.minRange, x: i.date, ...i } };

    evDates = evDates.slice(0,60).map( dataMap );
    iceDates = iceDates.slice(0,60).map( dataMap );

    const iceData   = graphService.getDataExtremes(iceDates);
    const evData    = graphService.getDataExtremes(evDates);
    const iceCosts  = graphService.getMaxPoints(iceDates, false);

    const graphData = {
        iceData,
        evData,
        iceCosts,
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