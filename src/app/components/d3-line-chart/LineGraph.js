import { XAxis, YAxis, YAxis2, d3Service } from '.';

function LineGraph( props ) {

    const { 
        children, 
        margins, 
        width, 
        height, 
        data,
        data2,
        ybuffer = 0,
        yAxisFn,
        yAxis2Fn,
        xAxisFn,
    } = props;

    const { xScale, yScale, y2Scale } = d3Service.calculateScales( props );

    const metaData = {
        xScale: xScale,
        yScale: yScale,
        y2Scale: y2Scale,
        margins: margins,
        height: height,
        width: width,
        yAxisFn: yAxisFn,
        yAxis2Fn: yAxis2Fn,
        xAxisFn: xAxisFn 
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
                <YAxis2 {...metaData} /> 
            </g>
            <g>
                {children( metaData )}
            </g>
        </svg>
    )
}

export default LineGraph;