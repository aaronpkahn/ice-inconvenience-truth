import * as d3 from 'd3';
import { easeExpInOut, svg } from 'd3';
import { nest, key, entries } from 'd3-collection';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as graphService from '../convenience-graph/service';
import { getDataExtremes, getMaxPoints } from './service';

import XAxis from './XAxis';
import YAxis from './YAxis';
import LineChart from './LineChart';
import GraphDots from './GraphDots';

import './style.css';

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
    
    useEffect(() => {

        const svg = d3.select( d3Container.current );
    
        svg.selectAll(".dot")
            .data( iceCosts )
            .enter()
            .append("circle")
            .attr("r", 6)
            .attr("cx", d => xScale( d.date ))
            .attr("cy", d => yScale( d.minRange ))
            // .style("fill", "purple");

    }, [ data, d3Container.current ] );

    const metaData = {
        xScale: xScale,
        yScale: yScale,
        margins: MARGINS,
        height: HEIGHT,
        width: WIDTH,
    }
    
    const chartData = {
        evData: evData,
        iceData: iceData,
        iceCosts: iceCosts,
    }

    return (
        <>
            <svg 
                className="d3-graph"
                viewBox={[0,0,WIDTH, HEIGHT]}
                width={WIDTH}
                height={HEIGHT}
                ref={d3Container}
            >
                <g>
                    <XAxis {...metaData} />
                    <YAxis {...metaData} />
                </g>
                <g>
                    <LineChart {...metaData} {...chartData} />
                    <GraphDots {...metaData} {...chartData} />
                </g>
            </svg>
        </>
    )

}

export default D3Chart;