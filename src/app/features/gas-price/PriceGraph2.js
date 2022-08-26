
import LineGraph2 from '../d3-convenience-graph/LineGraph2';
import Line from '../d3-convenience-graph/Line';

const _data = require('./data.json');

const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
};

const HEIGHT = 500;
const WIDTH = 700;

function PriceGraph2() {

    const data = _data.map( ( [date, price ] ) => { return { x: new Date(date), y: price } } );

    return (
        <LineGraph2 margins={MARGINS} width={WIDTH} height={HEIGHT} data={ [ data ] } ybuffer={0}>
        {metaData => (
            <>
                <Line data={data} fill={"#35478C"} {...metaData}/> 
            </>
        )}
        </LineGraph2>
    )
}

export default PriceGraph2;