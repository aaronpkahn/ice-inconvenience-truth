import { DataEntry, DataGroup, DataRow, DataLabel } from '../../components/dataset';
import { Slide, SlideInner } from '../../components/slide';
import PriceGraph from './PriceGraph';

function GasPrice() {

    return (
        <Slide>
            <h2>Your Costs Over Time</h2>
            <SlideInner>
                <div>
                    <h2>Gas prices are rising. </h2>
                    <h2>At the rate of current trends, what costs $5/gal today will cost more than $7.50/gal in 2 years.</h2>
                    <DataRow>
                        <DataGroup>
                            <DataEntry>+12.5%</DataEntry>
                            <DataLabel>yearly increase in gasoline costs</DataLabel>
                        </DataGroup>
                        <DataGroup>
                            <DataEntry>$7.25</DataEntry>
                            <DataLabel>estimated price of gas in your zip code by 2025</DataLabel>
                        </DataGroup>
                    </DataRow>
                </div>
                <PriceGraph />
            </SlideInner>
        </Slide>
    )
}

export default GasPrice;