import * as d3 from 'd3';
import { svg } from 'd3';
import { nest, key, entries } from 'd3-collection';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as graphService from '../convenience-graph/service';

const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
};

const HEIGHT = 500;
const WIDTH = 700;

function D3Chart( { data } ) {

    const d3Container = useRef(null);

    const iceRange = useSelector( (state) => state.inputs.average_ice_range );

    const { evDates, iceDates } = graphService.calcState( data, iceRange );

    const combinedData = [ ...evDates, ...iceDates];

    const sumDates = d3.group( combinedData, d => d.date );

    const sumData = Array.from( sumDates, ([key, [ice, ev]]) => {
        if ( typeof ev.minRange === undefined ) {
            console.error( 'undefined', key );
        }
        return {
            date: key,
            iceRange: ice.minRange,
            evRange: ev.minRange
        }
    });

    const defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);

    const xRange = [ MARGINS.left, WIDTH - MARGINS.right ];
    const yRange = [ HEIGHT - MARGINS.bottom, MARGINS.top ];

    const X = d3.map( combinedData, ( { date } ) => date );
    const Y = d3.map( combinedData, ( { minRange } ) => minRange );
    const I = d3.range( X.length );

    const xDomain = d3.extent( X );
    const yDomain = [ 0, d3.max( Y ) ];

    const xScale = d3.scaleTime( xDomain, xRange );
    const yScale = d3.scaleLinear( yDomain, yRange );

    const xAxis = d3.axisBottom( xScale );
    const yAxis = d3.axisLeft( yScale );

    const D = d3.map( sumData, defined );

    useEffect( () => {

        const svg = d3.select( d3Container.current );

        const line = d3.line()
            .defined( i => D[i] )
            .curve( d3.curveLinear )
            .x( i => xScale( X[i]) )
            .y( i => yScale( Y[i] ) );

        const evLine = d3.line()
            .curve( d3.curveLinear )
            .x( i => xScale( i.date ) )
            .y( i => yScale( i.evRange ) );

        svg.append( "g" )
            .attr( "transform", `translate( 0, ${HEIGHT - MARGINS.bottom})` )
            .call( xAxis );

        svg.append( "g" )
            .attr( "transform", `translate( ${MARGINS.left}, 0 )`)
            .call ( yAxis )
            // .call(g => g.select(".domain").remove());

        // svg.selectAll(".line")
        //     .data(sum)
        //     .enter()
        //     .append("path")
        //     .attr("fill", "none")
        //     .attr("stroke", "blue")
        //     .attr("stroke-width", 1.5)
        //     .attr("stroke-linecap", "round")
        //     .attr("stroke-linejoin", "round")
        //     .attr("stroke-opacity", 1)
        //     // .attr("d", (d) => line( d.values ))
        //     .attr("d", (d) => {
        //         return d3.line()
        //             .x( (node) => xScale(node.date) )
        //             .y( (node) => yScale(node.value) )
        //             (d.values)
        //     });

        svg.append( 'path' )
            .data( [sumData] )
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("stroke-opacity", 1)
            .attr("d", evLine);

        // svg.append( 'path' )
        //     .attr("fill", "none")
        //     .attr("stroke", "red")
        //     .attr("stroke-width", 1.5)
        //     .attr("stroke-linecap", "round")
        //     .attr("stroke-linejoin", "round")
        //     .attr("stroke-opacity", 1)
        //     .attr("d", line2(I2));

    }, [ data, d3Container.current ] );

    return (
        <>
            <svg 
                className="d3-graph"
                viewBox={[0,0,WIDTH, HEIGHT]}
                width={WIDTH}
                height={HEIGHT}
                ref={d3Container}
            />
        </>
    )

}

export default D3Chart;