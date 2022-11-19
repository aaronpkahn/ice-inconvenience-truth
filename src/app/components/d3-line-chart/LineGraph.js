import { XAxis, YAxis, d3Service } from '.';

function LineGraph( props ) {

    const { 
        children, 
        margins, 
        width, 
        height, 
        data, 
        ybuffer = 0,
        yAxisFn,
        xAxisFn,
    } = props;

    const { xScale, yScale } = d3Service.calculateScales( props );

    const metaData = {
        xScale: xScale,
        yScale: yScale,
        margins: margins,
        height: height,
        width: width,
        yAxisFn: yAxisFn,
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
            </g>
            <g>
                {children( metaData )}
            </g>
        </svg>
    )
}

export default LineGraph;