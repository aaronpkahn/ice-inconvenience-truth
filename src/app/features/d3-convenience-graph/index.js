import * as d3 from 'd3';
import { easeExpInOut, svg } from 'd3';
import { nest, key, entries } from 'd3-collection';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as graphService from '../convenience-graph/service';

import './style.css';

const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
};

const HEIGHT = 500;
const WIDTH = 700;

function getMaxPoints( arr ) {
    const r = [];

    for ( let i = 0; i < arr.length; i++) {
        if ( i === 0 || i === arr.length - 1 ) {
            continue;
        }

        if (arr[i].minRange < arr[i-1].minRange &&
            arr[i].minRange < arr[i+1].minRange
        ) {
            r.push(arr[i]);
        }
    }

    return r;
}

function getDataExtremes(arr) {
    
    const r = [];

    for (let i = 0; i < arr.length; i++) {

        if ( i === 0 || i === arr.length - 1 ) {
            r.push(arr[i]);
            continue;
        }

        if ( arr[i-1].minRange === arr[i].minRange ) {
            r.push(arr[i]);
            continue;
        }

        //  get the lowest point on the graph
        if (    arr[i].minRange < arr[i-1].minRange && 
                arr[i].minRange < arr[i+1].minRange 
        ) {
            r.push(arr[i]);
            continue;
        }

        //  get highest point
        if (arr[i].minRange > arr[i-1].minRange &&
            arr[i].minRange > arr[i+1].minRange
        ) {
            r.push(arr[i]);
        }

    }

    return r;
}

function D3Chart( { data } ) {

    const d3Container = useRef(null);

    const iceRange = useSelector( (state) => state.inputs.average_ice_range );

    let { evDates, iceDates } = graphService.calcState( data, iceRange );

    evDates = evDates.slice(0,30);
    iceDates = iceDates.slice(0,30);

    const iceData = getDataExtremes(iceDates);
    const evData = getDataExtremes(evDates);

    const iceCosts = getMaxPoints(iceDates, false);

    //  we will combine the data together to get the ranges across the entire set
    const combinedData = [ ...evDates.slice(0,90), ...iceDates.slice(0,90)];

    const xRange = [ MARGINS.left, WIDTH - MARGINS.right ];
    const yRange = [ HEIGHT - MARGINS.bottom, MARGINS.top ];
    
    const X = d3.map( combinedData, ( { date } ) => date );
    const Y = d3.map( combinedData, ( { minRange } ) => minRange );
    const I = d3.range( X.length );
    
    const xDomain = d3.extent( X );
    const yDomain = [ -20, d3.max( Y ) + 20 ];
    
    const xScale = d3.scaleTime( xDomain, xRange );
    const yScale = d3.scaleLinear( yDomain, yRange );
    
    const xAxis = d3.axisBottom( xScale );
    const yAxis = d3.axisLeft( yScale );
    
    const defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map( iceDates, defined );
    
    useEffect( () => {

        const svg = d3.select( d3Container.current );

        const line = d3.line()
            .curve( d3.curveMonotoneX )
            .x( i => xScale( i.date ) )
            .y( i => yScale( i.minRange ) );

        svg.append( "g" )
            .attr( "transform", `translate( 0, ${HEIGHT - MARGINS.bottom})` )
            .call( xAxis );

        svg.append( "g" )
            .attr( "transform", `translate( ${MARGINS.left}, 0 )`)
            .call ( yAxis )
            // .call(g => g.select(".domain").remove());

        svg.append( 'path' )
            .data( [evData] )
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("stroke-opacity", 1)
            .attr("d", line);

        svg.append( 'path' )
            .data( [iceData] )
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("stroke-opacity", 1)
            .attr("d", line);

        svg.selectAll(".dot")
            .data( iceCosts )
            .enter()
            .append("circle")
            .attr("r", 6)
            .attr("cx", d => xScale( d.date ))
            .attr("cy", d => yScale( d.minRange ))
            // .style("fill", "purple");

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