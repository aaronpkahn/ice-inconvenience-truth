import { useEffect, useRef } from "react";
import * as d3 from 'd3';

function LineChart( { xScale, yScale, evData, iceData }) {

    const anchor = useRef(null);

    useEffect( () => {

        const line = d3.line()
            .curve( d3.curveMonotoneX )
            .x( i => xScale( i.date ) )
            .y( i => yScale( i.minRange ) );
                
        const g = d3.select(anchor.current);

        const evUpdate = g.selectAll('.test').data( [evData] );
        evUpdate.enter()
            .append( 'path' )
            .attr("class","test")
            .merge( evUpdate )
            .transition()
            .duration(600)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("stroke-opacity", 1)
            .attr("d", line);

        const iceUpdate = g.selectAll('.test2').data( [iceData] );
        iceUpdate.enter()
            .append( 'path' )
            .attr("class","test2")
            .merge( iceUpdate )
            .transition()
            .duration(600)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("stroke-opacity", 1)
            .attr("d", line);
        
        evUpdate.exit().remove();
        iceUpdate.exit().remove();

    }, [ xScale, yScale, evData, iceData ] );

    return (
        <g ref={anchor}></g>
    )
}

export default LineChart;