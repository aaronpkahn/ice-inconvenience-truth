import { useEffect, useRef } from "react";
import * as d3 from 'd3';

function Line( { xScale, yScale, data, fill = "#35478C" }) {

    const anchor = useRef(null);

    useEffect( () => {

        const line = d3.line()
            .curve( d3.curveMonotoneX )
            .x( i => xScale( i.x ) )
            .y( i => yScale( i.y ) );
                
        const g = d3.select(anchor.current);

        const update = g.selectAll('.test').data( [data] );
        update.enter()
            .append( 'path' )
            .attr("class","test")
            .merge( update )
            .transition()
            .duration(600)
            .attr("fill", "none")
            .attr("stroke", fill )
            .attr("stroke-width", 2)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("stroke-opacity", 1)
            .attr("d", line);

        update.exit().remove();

    }, [ xScale, yScale, data ] );

    return (
        <g ref={anchor}></g>
    )
}

export default Line;