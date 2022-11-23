import * as d3 from 'd3';

/**
 * Calculate xScale and yScale with d3
 * @param {*} param0 
 * @returns { xScale, yScale }
 */
export const calculateScales = ( { margins, width, height, data, data2, ybuffer = 0 } ) => {

    const combinedData = data.reduce( (prev, current ) => { return [ ...prev, ...current ]}, []);
    const combinedData2 = data2.reduce( (prev, current ) => { return [ ...prev, ...current ]}, []);

    const xRange = [ margins.left, width - margins.right ];
    const yRange = [ height - margins.bottom, margins.top ];
    
    const X = d3.map( combinedData, ( { x } ) => x );
    const Y = d3.map( combinedData, ( { y } ) => y );
    const Y2 = d3.map( combinedData2, ( { y } ) => y );
    const I = d3.range( X.length );
    
    const xDomain = d3.extent( X );
    const yDomain = [ -ybuffer, d3.max( Y ) + ybuffer ];
    const y2Domain = [ -ybuffer, d3.max( Y2 ) + ybuffer ];
    
    const xScale = d3.scaleTime( xDomain, xRange );
    const yScale = d3.scaleLinear( yDomain, yRange );
    const y2Scale = d3.scaleLinear( y2Domain, yRange );
    
    return {
        xScale,
        yScale,
        y2Scale
    }
}