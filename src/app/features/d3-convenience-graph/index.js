import { useSelector } from 'react-redux';

import LineGraph from './LineGraph';
import { Slide, SlideInner } from '../../components/slide';

import './style.css';

function ConvenienceChart( { } ) {

    const iceRange      = useSelector( (state) => state.inputs.average_ice_range );
    const milesDriven   = useSelector((state) => state.inputs.milesDriven);

    return (
        <Slide>
            <h1>Your Inconvenience Factor</h1>
            <SlideInner>
                <div>
                    <h1>2,000 hours</h1>
                    <h4>spent yearly refilling your vehicle</h4>
                    <h1>$500</h1>
                    <h4>your monthly spend on gas</h4>
                </div>
                <LineGraph iceRange={iceRange} milesDriven={milesDriven} />
            </SlideInner>
        </Slide>
    )
}

export default ConvenienceChart;