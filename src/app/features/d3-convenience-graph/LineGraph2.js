import * as d3 from 'd3';
import XAxis from './XAxis';
import YAxis from './YAxis';

function LineGraph2( { children, margins, width, height, data, ybuffer = 0 } ) {

    const combinedData = data.reduce( (prev, current ) => { return [ ...prev, ...current ]}, []);

    const xRange = [ margins.left, width - margins.right ];
    const yRange = [ height - margins.bottom, margins.top ];
    
    const X = d3.map( combinedData, ( { x } ) => x );
    const Y = d3.map( combinedData, ( { y } ) => y );
    const I = d3.range( X.length );
    
    const xDomain = d3.extent( X );
    const yDomain = [ -ybuffer, d3.max( Y ) + ybuffer ];
    
    const xScale = d3.scaleTime( xDomain, xRange );
    const yScale = d3.scaleLinear( yDomain, yRange );
    
    const defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);

    const metaData = {
        xScale: xScale,
        yScale: yScale,
        margins: margins,
        height: height,
        width: width,
    }
    
    return (
        <svg 
            className="d3-graph"
            viewBox={[0,0,width, height]}
            width={width}
            height={height}
        >
            <g>
                <XAxis {...metaData} />
                <YAxis {...metaData} />
            </g>
            <g>
                {children( metaData )}
            </g>
        </svg>
    )
}

export default LineGraph2;