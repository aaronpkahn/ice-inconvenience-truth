import * as graphService from '../convenience-graph/service';
import { getDataExtremes, getMaxPoints } from './service';

import Line from './Line';
import LineGraph2 from './LineGraph2';
import GraphDots from './GraphDots';

const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
};

const HEIGHT = 500;
const WIDTH = 700;

function LineGraph( { milesDriven, iceRange } ) {

    let { evDates, iceDates } = graphService.calcState( milesDriven, iceRange );

    const dataMap = (i) => { return { y: i.minRange, x: i.date } };

    evDates = evDates.slice(0,90).map( dataMap );
    iceDates = iceDates.slice(0,90).map( dataMap );

    let iceData   = getDataExtremes(iceDates);
    let evData    = getDataExtremes(evDates);
    let iceCosts  = getMaxPoints(iceDates, false);

    return (
        <LineGraph2 margins={MARGINS} width={WIDTH} height={HEIGHT} data={ [ evData, iceData ] }>
            {metaData => (
                <>
                    <Line data={evData} fill={"#35478C"} {...metaData}/> 
                    <Line data={iceData} fill={"red"} {...metaData} />
                    <GraphDots data={iceCosts} {...metaData} />
                </>
            )}
        </LineGraph2>
    )
}

export default LineGraph;