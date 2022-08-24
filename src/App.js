import { useSelector } from 'react-redux';
import ConvenienceGraph from './app/features/convenience-graph';
import D3Chart from './app/features/d3-convenience-graph';
import GasPriceChart from './app/features/gas-price-chart';
import InputForm from './app/features/input-form';

import './App.css';

function App() {

  const milesDriven = useSelector((state) => state.inputs.milesDriven);

  return (
    <div className="App">
      <div className="App-header">
        <h1>ICE Inconvenience Truth</h1>
        {/* <p className="App-intro">A tool to compare the convienence of owning an EV vs ICE.</p> */}
      </div>
      <section className="main">
        <InputForm />
      </section>
      <section className="main">
        {/* <ConvenienceGraph milesDriven={milesDriven}/> */}
        <D3Chart data={milesDriven}/>
      </section>
      <section className="main">
        <GasPriceChart />
      </section>
    </div>
  )
}

export default App;
