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
import { Line } from 'react-chartjs-2';
import * as graphService from './service';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function ConvenienceGraph( { milesDriven }) {

    const iceRange = useSelector( (state) => state.inputs.average_ice_range );

    const { evDates, iceDates } = graphService.calcState( milesDriven, iceRange );

    const chartLabels = evDates.map( value => value.date.toDateString() ).slice(0, 30);

    const chartData = {
        labels: chartLabels,
        datasets: [
          {
            label: 'ICE Miles',
            data: iceDates.map( value => value.minRange ).slice(0, 30),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            lineTension: 0.4,        
            radius: 6      
          },
          {
            label: 'EV Miles',
            data: evDates.map( value => value.minRange ).slice(0, 30),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            lineTension: 0.4,        
            radius: 6  
          },
        ],
    };
    
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
        elements: { line: { tension: 0 } },
    };

    return (
        <Line options={chartOptions} data={chartData} />
    )
}

export default ConvenienceGraph;