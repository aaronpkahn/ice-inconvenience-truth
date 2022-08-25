import ConvenienceChart from './app/features/d3-convenience-graph';
import GasPrice from './app/features/gas-price';
import InputForm from './app/features/input-form';

import './App.css';

function App() {

  return (
    <div className="app">
      <header className="header">
        <h1>ICE Inconvenience Truth</h1>
      </header>
      
      <section className="main">
        <InputForm />
      </section>

      <section className="main">
        <ConvenienceChart />
      </section>

      <section className="main">
        <GasPrice />
      </section>
      
    </div>
  )
}

export default App;
