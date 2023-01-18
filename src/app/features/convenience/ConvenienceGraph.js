import { useEffect } from 'react';
import { LineGraph, Line, GraphDots } from '../../components/d3-line-chart';


const MARGINS = {
    top: 20,
    right: 50,
    bottom: 20,
    left: 50,
};

const HEIGHT = 500;
const WIDTH = 700;

function ConvenienceGraph( { milesDriven, iceData, evData, iceCosts, distData, slide } ) {

    const yAxisFn = ( axis ) => {
        axis.ticks(6).tickValues();
    }

    const yAxis2Fn = ( axis ) => {
        axis.ticks(6).tickValues();
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
            data2={ [ distData ] }
            ybuffer={20} 
            yAxisFn={yAxisFn}
            yAxis2Fn={yAxis2Fn}
            xAxisFn={xAxisFn}
        >
            {metaData => (
                <>
                    { slide > 1 && (
                        <Line data={evData} fill={"#35478C"} {...metaData} animate={true} animateTime={600}/> 
                    )}
                    <Line 
                        data={distData} 
                        fill={"black"}  
                        animate={false} 
                        animateTime={600} 
                        opacity={ slide > 1 ? .3 : 1 } 
                        {...metaData}
                    />
                    <Line 
                        data={iceData} 
                        fill={"red"}  
                        animate={false} 
                        animateTime={600} 
                        opacity={ slide > 1 ? .3 : 1 } 
                        {...metaData}
                    />
                    <GraphDots data={iceCosts} {...metaData}  opacity={ slide > 1 ? .3 : 1 }/>
                </>
            )}
        </LineGraph>
    )
}

export default ConvenienceGraph;