import { useDispatch, useSelector } from 'react-redux'
import { updateMilesDriven, updateCarDriven, updateDataEntered } from '../../hooks/userSlice';
import { CAR_DATA } from '../../globals';

import Card from '../../components/card';
import Slider from '../../components/slider/slider';
import Button from '../../components/button';

import './style.css';

function InputForm() {

    const carDriven = useSelector( (state) => state.inputs.car_driven );

    const dispatch = useDispatch();
    
    const updateMilesPerWeekday = ( event ) => {
        dispatch(updateMilesDriven( event.target.value ));
    }
    
    const updateCarType = ( value ) => {
        dispatch( updateCarDriven( value ));
    }

    const updateDataEnteredCallback = () => {
        dispatch( updateDataEntered( true ) );
    }

    return (
        <Card>
            <h3>I drive a</h3>
            <fieldset>
                { CAR_DATA.map( (type) => {
                    const active = ( type.id === carDriven ) ? 'active': '';
                    return (
                        <button key={type.id} className={`car-select ${active}`} onClick={() => updateCarType(type.id)}>
                            {type.label}
                        </button>
                    )
                })}   
            </fieldset>
            <fieldset>
                <Slider options={[10,20,30,40,50]} onChange={updateMilesPerWeekday} />
                <span>miles to work every day</span>
            </fieldset>
            <Button onClick={updateDataEnteredCallback}>Test</Button>
        </Card>
    )
}

export default InputForm;