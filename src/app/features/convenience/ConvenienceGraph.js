import { useEffect } from 'react';
import { LineGraph, Line, GraphDots } from '../../components/d3-line-chart';


const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
};

const HEIGHT = 500;
const WIDTH = 700;

function ConvenienceGraph( { iceData, evData, iceCosts, slide } ) {

    const yAxisFn = ( axis ) => {
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
            ybuffer={20} 
            yAxisFn={yAxisFn}
            xAxisFn={xAxisFn}
        >
            {metaData => (
                <>
                    { slide > 1 && (
                        <Line data={evData} fill={"#35478C"} {...metaData} animate={true} animateTime={600}/> 
                    )}
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