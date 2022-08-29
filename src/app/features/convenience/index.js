import { useSelector } from 'react-redux';
import { useState } from 'react';
import ConvenienceGraph from './ConvenienceGraph';
import { Slide, SlideInner } from '../../components/slide';

import './style.css';

function ConvenienceSlide( { } ) {

    const [slide, setSlide] = useState(1);

    const iceRange      = useSelector( (state) => state.inputs.average_ice_range );
    const milesDriven   = useSelector((state) => state.inputs.milesDriven);

    const updateSlide = () => {
        if ( slide === 1 ) {
            setSlide(2);
        } else {
            setSlide(1);
        }
    }

    return (
        <Slide>
            <h1>Your Inconvenience Factor</h1>
            <SlideInner>
                <div>
                    { slide === 1 && ( 
                        <div>
                            <h4>In a typical gas vehicle, you're refilling approximately</h4>
                            <h1>2,000 hours</h1>
                            <h4>spent yearly refilling your vehicle</h4>
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
                    <button onClick={updateSlide}>Progress</button>
                </div>
                <ConvenienceGraph iceRange={iceRange} milesDriven={milesDriven} slide={slide} />
            </SlideInner>
        </Slide>
    )
}

export default ConvenienceSlide;