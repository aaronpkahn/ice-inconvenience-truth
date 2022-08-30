import { useEffect } from 'react';
import { LineGraph, Line, GraphDots } from '../../components/d3-line-chart';
import * as graphService  from './service';

const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
};

const HEIGHT = 500;
const WIDTH = 700;

function ConvenienceGraph( { milesDriven, iceRange, slide } ) {

    let { evDates, iceDates } = graphService.calcState( milesDriven, iceRange );

    const dataMap = (i) => { return { y: i.minRange, x: i.date, ...i } };

    evDates = evDates.slice(0,60).map( dataMap );
    iceDates = iceDates.slice(0,60).map( dataMap );

    let iceData, evData, iceCosts;

    iceData   = graphService.getDataExtremes(iceDates);
    evData    = graphService.getDataExtremes(evDates);
    iceCosts  = graphService.getMaxPoints(iceDates, false);

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
                    { slide > 1 && (
                        <Line data={evData} fill={"#35478C"} {...metaData} animate={true} animateTime={600}/> 
                    )}
                    <Line data={iceData} fill={"red"} {...metaData} animate={false} animateTime={600} opacity={ slide > 1 ? .3 : 1 } />
                    <GraphDots data={iceCosts} {...metaData}  opacity={ slide > 1 ? .3 : 1 }/>
                </>
            )}
        </LineGraph>
    )
}

export default ConvenienceGraph;