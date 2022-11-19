import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function XAxis( { xScale, margins, height, xAxisFn  } ) {

    const anchor = useRef(null);
    
    useEffect( () => {
        
        const axis = d3.axisBottom( xScale );

        if ( 'function' === typeof xAxisFn ) {
            xAxisFn(axis);
        }

        d3.select(anchor.current)
            .transition(0)
            .call(axis);

    }, [ xScale ] );

    return (
        <g ref={anchor} transform={`translate( 0, ${height - margins.bottom})`}></g>
    )
}

export default XAxis;