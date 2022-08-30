import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ConvenienceGraph from './ConvenienceGraph';
import { Slide, SlideInner } from '../../components/slide';
import { goToSlide } from '../../hooks/slideSlice';

import './style.css';
import Button from '../../components/button';

function ConvenienceSlide( { } ) {

    const [slide, setSlide] = useState(1);

    const dispatch = useDispatch();

    const iceRange      = useSelector( (state) => state.inputs.average_ice_range );
    const milesDriven   = useSelector((state) => state.inputs.milesDriven);

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
                            <h4>In a typical gas vehicle, you're spending approximately</h4>
                            <h1>2,000 hours a year</h1>
                            <h4>refilling your vehicle</h4>
                            <h1>$500</h1>
                            <h4>your monthly spend on gas</h4>
                        </div>
                    )}
                    { slide > 1 && (
                        <div>
                            <h4>With an EV, you're recharging at home and only needing to charge on road trips.</h4>
                            <h1>5 hours</h1>
                            <h4>spent recharing your EV</h4>
                            <h1>$240</h1>
                            <h4>your monthly spend on electricity</h4>
                        </div>
                    )}
                    <Button onClick={updateSlide}>Next</Button>
                </div>
                <ConvenienceGraph iceRange={iceRange} milesDriven={milesDriven} slide={slide} />
            </SlideInner>
        </Slide>
    )
}

export default ConvenienceSlide;