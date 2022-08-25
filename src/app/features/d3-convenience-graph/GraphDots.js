import { useEffect, useRef } from "react";
import * as d3 from 'd3';

function GraphDots( { xScale, yScale, iceCosts } ) {

    const anchor = useRef(null);

    useEffect(() => {

        const svg = d3.select(anchor.current);        
        const dotUpdate = svg.selectAll('.dot').data( iceCosts );

        dotUpdate.enter()
            .append("circle")
            .attr("class", "dot")
            .merge(dotUpdate)
            .transition()
            .duration(600)
            .attr("r", 6)
            .attr("cx", d => xScale( d.date ))
            .attr("cy", d => yScale( d.minRange ));

        const hoverUpdate = svg.selectAll('.test3').data( iceCosts );
        hoverUpdate.enter()
            .merge(hoverUpdate)
            .append("text")
            .attr( "class", "test3" )
            .text(d => d.minRange)
            .attr("x", d => xScale( d.date))
            .attr("y", d => yScale( d.minRange ));
        
        dotUpdate.exit().remove();
        hoverUpdate.exit().remove();
     
    }, [ xScale, yScale, iceCosts ] );
    
    return( 
        <g ref={anchor}></g>
    )
}

export default GraphDots;