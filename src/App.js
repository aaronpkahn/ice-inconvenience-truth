import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
// import Slider from './slider'
import 'react-calendar-heatmap/dist/styles.css';
// import logo from './logo.svg';
import './App.css';

const START_DATE = '2017-12-31';
const END_DATE = '2018-12-30';
const DAYS = 365;
const START_ICE_RANGE = 410;
const START_MILES_PER_DAY_WEEKDAY = 30;
const DEFAULT_MIN_RANGE = 35;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      evRange: 310,
      iceRange: START_ICE_RANGE,
      longTripDistance: 400,
      longTripQty: 8,
      milesPerDayWeekday: START_MILES_PER_DAY_WEEKDAY,
      milesPerDayWeekend: 40,
      evDates: this.calcEVDates(),
      iceDates: this.calcICEDates(START_ICE_RANGE, START_MILES_PER_DAY_WEEKDAY, DEFAULT_MIN_RANGE)
    };

    this.changeMilesPerWeekday = this.changeMilesPerWeekday.bind(this);
  }

  calcEVDates() {
    var date = new Date(START_DATE);
    var values = []
    for(var i=0; i < DAYS; i++){
      var minEnergy = 9;
      if(date.getDate() > 7 && date.getDate() < 14 
        && (date.getDay() == 5 && date.getMonth()%3==0 || (date.getDay() == 6 && date.getMonth()%2==0))
      ){
        minEnergy = 1; 
      }
      values.push({ date: new Date(date.getTime()), count: minEnergy })
      date.setDate(date.getDate() + 1);
    }
    return values;
  }

  calcICEDates(iceRange, milesPerDayWeekday, minThreshold) {
    var date = new Date(START_DATE);
    var values = []

    var currentRange = iceRange;
    for(var i=0; i < DAYS; i++){
      var count = 10;
      currentRange -= milesPerDayWeekday;
      count = Math.floor(10*currentRange/iceRange)
      if(currentRange < minThreshold) {
        count = Math.max(0,count)
        currentRange = iceRange;
      }
      values.push({ date: new Date(date.getTime()), count: count })
      date.setDate(date.getDate() + 1);
    }
    return values;
  }

  changeMilesPerWeekday(e){
    this.setState({milesPerDayWeekday: e.target.value});
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
          <select onChange={this.changeMilesPerWeekday}>
            <option value="20">20</option>
            <option value="30" selected>30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="App-calendar">
          <p className="App-intro">EV</p>
          <CalendarHeatmap
            startDate={new Date(START_DATE)}
            endDate={new Date(END_DATE)}
            showWeekdayLabels={true}
            weekdayLabels={['m','t','w','t','f','s','s']}
            values={this.state.evDates}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${value.count}`;
            }}
        />
        </div>
        <div className="App-calendar">
          <p className="App-intro">ICE</p>
          <CalendarHeatmap
            startDate={new Date(START_DATE)}
            endDate={new Date(END_DATE)}
            showWeekdayLabels={true}
            weekdayLabels={['m','t','w','t','f','s','s']}
            values={this.state.iceDates}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${value.count}`;
            }}
        />
        </div>
      </div>
    );
  }
}

export default App;
