function Slider( { header, options = [ 10, 20, 30, 40, 50, ], onChange, defaultValue } ) {

  return(
    <div>
      { header && (
        <label className="control-label">
          <strong>{header}</strong>
        </label>
      )}
      <select onChange={onChange} value={defaultValue}>
        { options.map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>
    </div>
  )
}

export default Slider;