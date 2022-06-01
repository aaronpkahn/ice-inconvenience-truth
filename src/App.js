import React, { Component } from 'react';
//import CalendarHeatmap from 'react-calendar-heatmap';
import Slider from './slider'
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

//import 'react-calendar-heatmap/dist/styles.css';
// import logo from './logo.svg';
import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const chartOptions = {
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
};

const chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const chartData = {
  labels: chartLabels,
  datasets: [
    {
      label: 'Dataset 1',
      data: chartLabels.map(() => Math.floor(Math.random()*1000)),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: chartLabels.map(() => Math.floor(Math.random()*1000)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const CHARTY = chartData;

const START_DATE = '2017-12-31';
const END_DATE = '2018-12-30';
const DAYS = 364;
const DEFAULT_ICE_RANGE = 410;
const DEFAULT_EV_RANGE = 300;
const DEFAULT_MILES_PER_DAY_WEEKDAY = 30;
const DEFAULT_MIN_ICE_RANGE = 35;

const lineData = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 400, pv: 2400, amt: 2400}];

class App extends Component {
  constructor(props){
    super(props);
    this.state = this.calcState(DEFAULT_MILES_PER_DAY_WEEKDAY);
    this.changeMilesPerWeekday = this.changeMilesPerWeekday.bind(this);
  }

  calcMinDistances(distDays, scaleDenominator, range, refuelThreshold) {
    var date = new Date(START_DATE);
    date.setDate(date.getDate() + 1);
    var values = []
    var dayCount = distDays.length;

    var currentRange = range;
    for(var i=0; i < dayCount; i++){
      var scale = 10;
      currentRange -= distDays[i];
      // We set this to the min range to show the vehicle doesn't go below the min range
      currentRange = Math.max(0, currentRange)
      scale = Math.max(0,Math.floor(10*currentRange/scaleDenominator))
      values.push({ date: new Date(date.getTime()), dist: distDays[i], minRange: currentRange, scale: scale })

      if(currentRange < refuelThreshold) {
        currentRange = range;
      }
      date.setDate(date.getDate() + 1);
    }
    return values;
  }

  calcDistPerDay(distPerDayWeekday){
    var length = DAYS;
    var days = new Array(length);
    days.fill(distPerDayWeekday, 0, length);
    
    for(var week=0; week<52; week++){
      if(week%7==4){
        days[week*7-2] = 400
      }
      if(week%4==2){
        days[week*7-1] = 200
      }
    }
    return days
  }

  calcState(milesPerDayWeekday){
    var distDays = this.calcDistPerDay(milesPerDayWeekday);

    var evDists = this.calcMinDistances(distDays, DEFAULT_ICE_RANGE, DEFAULT_EV_RANGE, DEFAULT_EV_RANGE);
    var iceDists = this.calcMinDistances(distDays, DEFAULT_ICE_RANGE, DEFAULT_ICE_RANGE, DEFAULT_MIN_ICE_RANGE);
    
    var len = evDists.length;
    var reducer = (a,c) => a + c.minRange/len

    var evAvg = Math.floor(evDists.reduce(reducer, 0));
    var iceAvg = Math.floor(iceDists.reduce(reducer, 0));
  
    return {
      milesPerDayWeekday: milesPerDayWeekday,
      evAvgMinRange: evAvg,
      evDates: evDists,
      iceAvgMinRange: iceAvg,
      iceDates: iceDists
    }
  }

  changeMilesPerWeekday(e){
    this.setState(this.calcState(parseInt(e.target.value)));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>ICE Inconvenience Truth</h2>
        </div>
        <p className="App-intro">
          A tool to compare the convienence of owning an EV vs ICE.
        </p>
        <div>
          <Slider header="Miles Per Weekday" onChange={this.changeMilesPerWeekday} />
        </div>
        <div>
          <Line options={chartOptions} data={chartData} />
          {/* <LineChart width={600} height={300} data={lineData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart> */}
        </div>
        <div className="App-calendar-parent">
          <div className="App-calendar">
            <p className="App-intro">EV Avg min range: {this.state.evAvgMinRange} </p>
            {/* <CalendarHeatmap
              startDate={new Date(START_DATE)}
              endDate={new Date(END_DATE)}
              horizontal={false}
              showWeekdayLabels={true}
              weekdayLabels={['m','t','w','t','f','s','s']}
              values={this.state.evDates}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-scale-${value.scale}`;
              }}
              titleForValue={(value) => {
                return `Min range: ${value.minRange}\nTraveled: ${value.dist}`;
              }}
            /> */}
          </div>
          <div className="App-calendar">
            <p className="App-intro">ICE Avg min range: {this.state.iceAvgMinRange}</p>
            {/* <CalendarHeatmap
              startDate={new Date(START_DATE)}
              endDate={new Date(END_DATE)}
              horizontal={false}
              showWeekdayLabels={true}
              weekdayLabels={['m','t','w','t','f','s','s']}
              values={this.state.iceDates}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-scale-${value.scale}`;
              }}
              titleForValue={(value) => {
                return `Min range: ${value.minRange}\nTraveled: ${value.dist}`;
              }}
            /> */}
          </div>
        </div>
        <div>
          HERE:
          <pre>
            {JSON.stringify(CHARTY, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
