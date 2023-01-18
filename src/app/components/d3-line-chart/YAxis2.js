import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function YAxis2( { y2Scale, width, margins, yAxis2Fn}) {

    const anchor = useRef(null);
    
    useEffect( () => {
        
        const axis = d3.axisRight( y2Scale );

        if ( 'function' === typeof yAxis2Fn ) {
            yAxis2Fn(axis);
        }

        d3.select(anchor.current)
            .transition(0)
            .call(axis);

    }, [ y2Scale ] );

    return (
        <g ref={anchor} transform={`translate( ${width-margins.right}, 0 )`}></g>
    )
}

export default YAxis2;