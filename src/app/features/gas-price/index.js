import Card from '../../components/card';
import { Slide, SlideInner } from '../../components/slide';
import PriceGraph from './PriceGraph';

function GasPrice() {

    return (
        <Slide>
            <h2>Gas Prices Over Time</h2>
            <SlideInner>
                <div>
                    <h4>Gas prices are rising</h4>
                    <h2>12.5% a year</h2>
                </div>
                <PriceGraph />
            </SlideInner>
        </Slide>
    )
}

export default GasPrice;