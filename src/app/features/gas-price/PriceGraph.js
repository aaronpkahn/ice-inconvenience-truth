
import { LineGraph, Line } from '../../components/d3-line-chart';

const _data = require('./data.json');

const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
};

const HEIGHT = 500;
const WIDTH = 700;

function PriceGraph() {

    const data = _data.sort( ( [ date ], [ date2 ]  ) => { return new Date(date) > new Date(date2) ? 1 : -1 } )
        .map( ( [date, price ] ) => { return { x: new Date(date), y: price } } );

    return (
        <LineGraph margins={MARGINS} width={WIDTH} height={HEIGHT} data={ [ data ] } ybuffer={0}>
        {metaData => (
            <>
                <Line data={data} fill={"#35478C"} animationTime={600} animate={true} {...metaData}/> 
            </>
        )}
        </LineGraph>
    )
}

export default PriceGraph;