import { useEffect, useRef } from "react";
import * as d3 from 'd3';

function GraphDots( { xScale, yScale, data, opacity = 1 } ) {

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
            .attr( "opacity", opacity )
            .attr("cx", d => xScale( d.x ))
            .attr("cy", d => yScale( d.y ));

        update.exit().remove();

        const dots = svg.selectAll('.popup').data( data );

        dots.enter()
            .merge( dots )
            .transition(300)
            .duration(300)
            .attr( "opacity", opacity );

        dots.exit();
     
    }, [ xScale, yScale, data ] );
    
    return( 
        <g ref={anchor}>
            { data.map( (d) => (
                <g key={`${d.x + d.y}`}>
                    <circle className="dot" cx={xScale(d.x)} cy={yScale(d.y)} r={6}></circle>
                    <text className="popup" textAnchor="start" x={xScale(d.x) - 20} y={yScale(d.y) - 20}> ${d.minRange} </text>
                </g>
            ))}
        </g>
    )
}

export default GraphDots;