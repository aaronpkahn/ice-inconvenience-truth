import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
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
        <div className="App-calendar">
          <p className="App-intro">EV</p>
          <CalendarHeatmap
            startDate={new Date('2017-12-31')}
            endDate={new Date('2018-12-30')}
            showWeekdayLabels={true}
            weekdayLabels={['m','t','w','t','f','s','s']}
            values={this.evDates('2017-12-31', 365)}
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
            startDate={new Date('2017-12-31')}
            endDate={new Date('2018-12-30')}
            showWeekdayLabels={true}
            weekdayLabels={['m','t','w','t','f','s','s']}
            values={this.iceDates('2017-12-31', 365)}
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

  iceDates(start, quantity) {
    var date = new Date(start);
    var values = []
    for(var i=0; i < quantity; i++){
      values.push({ date: new Date(date.getTime()), count: (i%10)+1 })
      date.setDate(date.getDate() + 1);
    }
    return values;
  }

  evDates(start, quantity) {
    var date = new Date(start);
    var values = []
    for(var i=0; i < quantity; i++){
      var minEnergy = 2;
      if(date.getDate() > 7 && date.getDate() < 14 
        && (date.getDay() == 5 && date.getMonth()%3==0 || (date.getDay() == 6 && date.getMonth()%2==0))
      ){
        minEnergy = 10; 
      }
      values.push({ date: new Date(date.getTime()), count: minEnergy })
      date.setDate(date.getDate() + 1);
    }
    return values;
  }
}

export default App;
