import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function YAxis( { yScale, margins, yAxisFn }) {

    const anchor = useRef(null);
    
    useEffect( () => {
        
        const axis = d3.axisLeft( yScale );

        if ( 'function' === typeof yAxisFn ) {
            yAxisFn(axis);
        }

        d3.select(anchor.current)
            .transition(0)
            .call(axis);

    }, [ yScale ] );

    return (
        <g ref={anchor} transform={`translate( ${margins.left}, 0 )`}></g>
    )
}

export default YAxis;