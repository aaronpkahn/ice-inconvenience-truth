import { useState } from 'react';
import './style.css';

function Slider( { header, options = [ 10, 20, 30, 40, 50, ], onChange, defaultValue } ) {

  const [ changed, setChanged ] = useState(null);

  const onChangeToggle = ( event ) => {
    setChanged(true);
    onChange( event );
  }

  return(
    <div>
      { header && (
        <label className="control-label">
          <strong>{header}</strong>
        </label>
      )}
      <select className={`slider ${ changed ? 'changed': ''}`} onChange={onChangeToggle} value={defaultValue}>
        { options.map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>
    </div>
  )
}

export default Slider;