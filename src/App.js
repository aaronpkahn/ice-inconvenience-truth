import ConvenienceSlide from './app/features/convenience';
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
        <ConvenienceSlide />
      </section>

      <section className="main">
        <GasPrice />
      </section>
      
    </div>
  )
}

export default App;
