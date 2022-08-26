import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function YAxis( { yScale, margins }) {

    const anchor = useRef(null);
    
    useEffect( () => {
        
        const axis = d3.axisLeft( yScale );

        d3.select(anchor.current)
            .transition()
            .call(axis);

    }, [ yScale ] );

    return (
        <g ref={anchor} transform={`translate( ${margins.left}, 0 )`}></g>
    )
}

export default YAxis;