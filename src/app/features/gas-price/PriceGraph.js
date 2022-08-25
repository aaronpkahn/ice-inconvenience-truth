import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import chartTrendLine from 'chartjs-plugin-trendline';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    chartTrendLine,
);

const _data = require('./data.json');

function PriceGraph() {

    //  sort data by date
    const data = _data.sort( (a,b) => new Date(a[0]) > new Date(b[0]) ? 1 : -1 );
    const chartLabels = data.map( (value) => value[0] );

    const chartData = {
        labels: chartLabels,
        datasets: [
          {
            label: '$/gal',
            data: data.map( value => value[1] ),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            lineTension: 0.4,        
            radius: 0,
            trendlineLinear: {
                style: "rgba(255,105,180, .8)",
                lineStyle: "dotted",
                width: 2,
                projection: true
            }
          },
          
        ],
    };
    
    const chartOptions = {
        scales: {
            y: {
                ticks: {
                    callback: ( value ) => {
                        return `$${Number(value).toFixed(2)}`
                    }
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: { display: false },
        },
        elements: { line: { tension: 0 } },
    };

    return (
        <Line options={chartOptions} data={chartData} />
    )
}

export default PriceGraph;