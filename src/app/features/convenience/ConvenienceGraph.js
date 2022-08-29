import * as d3 from 'd3';
import * as graphService from '../convenience-graph/service';
import { LineGraph, Line, GraphDots } from '../../components/d3-line-chart';
import { getDataExtremes, getMaxPoints } from './service';

const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
};

const HEIGHT = 500;
const WIDTH = 700;

function ConvenienceGraph( { milesDriven, iceRange } ) {

    let { evDates, iceDates } = graphService.calcState( milesDriven, iceRange );

    const dataMap = (i) => { return { y: i.minRange, x: i.date } };

    evDates = evDates.slice(0,90).map( dataMap );
    iceDates = iceDates.slice(0,90).map( dataMap );

    let iceData   = getDataExtremes(iceDates);
    let evData    = getDataExtremes(evDates);
    let iceCosts  = getMaxPoints(iceDates, false);

    const yAxisFn = ( axis ) => {
        axis.ticks( 3 ).tickValues();
    }

    const xAxisFn = ( axis ) => {
        // axis.ticks( );
    }

    return (
        <LineGraph 
            margins={MARGINS} 
            width={WIDTH} 
            height={HEIGHT} 
            data={ [ evData, iceData ] } 
            ybuffer={20} 
            yAxisFn={yAxisFn}
            xAxisFn={xAxisFn}
        >
            {metaData => (
                <>
                    <Line data={evData} fill={"#35478C"} {...metaData}/> 
                    <Line data={iceData} fill={"red"} {...metaData} />
                    <GraphDots data={iceCosts} {...metaData} />
                </>
            )}
        </LineGraph>
    )
}

export default ConvenienceGraph;