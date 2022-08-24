import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function XAxis( { xScale, margins, height  } ) {

    const anchor = useRef(null);
    
    useEffect( () => {
        
        const axis = d3.axisBottom( xScale );

        d3.select(anchor.current)
            .transition()
            .call(axis);

    }, [ xScale ] );

    return (
        <g ref={anchor} transform={`translate( 0, ${height - margins.bottom})`}></g>
    )
}

export default XAxis;