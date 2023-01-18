import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CAR_DATA } from '../../globals';

function CarDetails() {
    
    const [ currentHover, setCurrentHover ] = useState(null);

    const { 
        milesDriven,
        milesDrivenPerYear,
        car_driven: carDriven,
    } = useSelector( (state) => state.inputs );

    const data = CAR_DATA.find( i => carDriven === i.id );

    return (
        <div className="car-details">
            { data && (
                <>
                    <div>
                        <span>Your report will be based on an estimated </span>
                        <span className="info" onClick={() => setCurrentHover("mpg")}>
                            {`${data.mpg} miles per gallon (MPG)`}
                        </span> 
                        <span> and a range of </span>
                        <span className="info" onClick={() => setCurrentHover("range")}>
                            {`${data.average_range} miles `}
                        </span>
                        <span> driving </span>
                        <span className="info">
                            {`${milesDriven} miles per weekday`}
                            {`${milesDrivenPerYear} miles per year`}
                        </span>
                    </div>
                </>
            )}
            <div className="hover-details">
                { "range" === currentHover && (
                    <div>Range is calculated by an average report from 2022 here</div>
                )}
                { "mpg" === currentHover && (
                    <div>The average MPG of different vehicle classes is published in a yearly report by the AAA of America</div>
                )}
            </div>
        </div>
    )
}

export default CarDetails;