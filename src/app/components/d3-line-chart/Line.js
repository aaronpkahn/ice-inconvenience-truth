import { useEffect, useRef } from "react";
import * as d3 from 'd3';

function Line( { xScale, yScale, data, fill = "#35478C", animate = true, opacity = 1 }) {

    const anchor = useRef(null);

    useEffect( () => {

        const line = d3.line()
            .curve( d3.curveMonotoneX )
            .x( i => xScale( i.x ) )
            .y( i => yScale( i.y ) );
                
        const g = d3.select(anchor.current);

        const update = g.selectAll('.line').data( [data] );

        const _line = update.enter()
            .append( 'path' )
            .attr("d", line )
            .attr( "class", "line" )
            .merge( update );

        const length = _line.node().getTotalLength();
 
        if ( animate ) {
            update.attr( "stroke-dasharray", `${length} ${length}` )
                .attr( "stroke-dashoffset", length )
        }
        update.transition()
            .ease( d3.easeLinear )
            .duration(600)
            .attr("fill", "none")
            .attr("stroke-dashoffset", 0)
            .attr("stroke", fill )
            .attr("stroke-width", 2)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("stroke-opacity", opacity)
            
        update.exit().remove();

    }, [ xScale, yScale, data ] );

    return (
        <g ref={anchor}></g>
    )
}

export default Line;