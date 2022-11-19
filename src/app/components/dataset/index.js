import './style.css';

export const DataRow = ( { children } ) => { 

    return (
        <div className="data-row">
            { children }
        </div>
    )
}

export const DataGroup = ( { children } ) => {
    return (
        <div className="data-group">
            { children }
        </div>
    )
}

export const DataLabel = ( { children } ) => {

    return (
        <div className="data-label">
            { children }
        </div>
    )
}

export const DataEntry = ( { children } ) => {
    return (
        <div className="data-entry">
            { children }
        </div>
    )
}