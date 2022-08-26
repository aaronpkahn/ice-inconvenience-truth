import { useEffect, useRef } from "react";
import * as d3 from 'd3';

function GraphDots( { xScale, yScale, data } ) {

    const anchor = useRef(null);

    useEffect(() => {

        const svg = d3.select(anchor.current);        
        const update = svg.selectAll('.dot').data( data );

        update.enter()
            .append("circle")
            .attr("class", "dot")
            .merge(update)
            .transition()
            .duration(600)
            .attr("r", 6)
            .attr("cx", d => xScale( d.x ))
            .attr("cy", d => yScale( d.y ));

        update.exit().remove();
     
    }, [ xScale, yScale, data ] );
    
    return( 
        <g ref={anchor}></g>
    )
}

export default GraphDots;