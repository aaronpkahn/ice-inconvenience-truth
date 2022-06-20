import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import Slider from './slider'
import 'react-calendar-heatmap/dist/styles.css';
// import logo from './logo.svg';
import './App.css';

const START_DATE = '2017-12-31';
const END_DATE = '2018-12-30';
const DAYS = 364;
const DEFAULT_ICE_RANGE = 410;
const DEFAULT_EV_RANGE = 280;
const DEFAULT_MILES_PER_DAY_WEEKDAY = 30;
const DEFAULT_MIN_RANGE = 35;

class App extends Component {

  constructor(props){
    super(props);
    this.state = this.calcState(DEFAULT_MILES_PER_DAY_WEEKDAY);
  }

  calcMinDistances(distDays, scaleDenominator, range, refuelThreshold) {
    let date = new Date(START_DATE);
    date.setDate(date.getDate() + 1);
    let values = []

    let currentRange = range;

    for( let dist of distDays ) {
      let scale = 10;
      currentRange -= dist;
      scale = Math.max(0,Math.floor(10*currentRange/scaleDenominator));

      values.push({ 
        scale, 
        dist, 
        minRange: currentRange, 
        date: new Date(date.getTime()) 
      });

      if (currentRange < refuelThreshold) {
        currentRange = range;
      }

      date.setDate(date.getDate() + 1);
    }

    // for(var i=0; i < length; i++){
    //   var scale = 10;
    //   currentRange -= distDays[i];
    //   scale = Math.max(0,Math.floor(10*currentRange/scaleDenominator))
    //   values.push({ date: new Date(date.getTime()), dist: distDays[i], minRange: currentRange, scale: scale })

    //   if(currentRange < refuelThreshold) {
    //     currentRange = range;
    //   }
    //   date.setDate(date.getDate() + 1);
    // }

    return values;
  }

  calcDistPerDay(distPerDayWeekday){
    let length = DAYS;
    let days = new Array(length);
    days.fill(distPerDayWeekday, 0, length);
    
    for(var week=0; week<52; week++){
      if( week % 7 == 4 ){
        days[week*7-2] = 400
      }
      if( week % 4 == 2 ){
        days[week*7-1] = 200
      }
    }
    return days
  }

  calcState(milesPerDayWeekday){

    let distDays = this.calcDistPerDay(milesPerDayWeekday);
    let evDists = this.calcMinDistances(distDays, DEFAULT_EV_RANGE, DEFAULT_EV_RANGE, DEFAULT_MIN_RANGE);
    let iceDists = this.calcMinDistances(distDays, DEFAULT_ICE_RANGE, DEFAULT_ICE_RANGE, DEFAULT_MIN_RANGE);
    
    let len = evDists.length;
    const reducer = (a,c) => a + c.minRange/len

    let iceAvgMinRange = Math.floor(iceDists.reduce(reducer, 0));
    let evAvgMinRange = Math.floor(evDists.reduce(reducer, 0));
  
    return {
      milesPerDayWeekday,
      iceAvgMinRange,
      evAvgMinRange,
      evDates: evDists,
      iceDates: iceDists
    }
  }

  changeMilesPerWeekday = (e) => {
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
        <div className="App-calendar">
          <p className="App-intro">EV Avg min range: {this.state.evAvgMinRange} </p>
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
              return `color-scale-${value.scale}`;
            }}
            titleForValue={(value) => {
              return `Min dist:${value.minRange} Dist traveled:${value.dist}`;
            }}
        />
        </div>
        <div className="App-calendar">
          <p className="App-intro">ICE Avg min range: {this.state.iceAvgMinRange}</p>
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
              return `color-scale-${value.scale}`;
            }}
            titleForValue={(value) => {
              return `Min dist:${value.minRange} Dist traveled:${value.dist}`;
            }}
        />
        </div>
      </div>
    );
  }
}

export default App;
