import ConvenienceSlide from './app/features/convenience';
import GasPrice from './app/features/gas-price';
import InputForm from './app/features/input-form';
import { useSelector } from 'react-redux';

import './App.css';

function App() {

  const currentSlide = useSelector( (state) => state.slides.currentSlide);
  
  return (
    <div className="app">
      <header className="header">
        <h1>ICE Inconvenience Truth</h1>
      </header>
      
      <section className="main">
        <InputForm />
      </section>

      { 'convenience' === currentSlide && (
        <section className="main">
          <ConvenienceSlide />
        </section>
      )}

      { 'gas_price' === currentSlide && (
        <section className="main">
          <GasPrice />
        </section>
      )}
      
    </div>
  )
}

export default App;
