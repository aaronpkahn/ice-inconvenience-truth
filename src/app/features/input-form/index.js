import { useDispatch, useSelector } from 'react-redux'
// import { updateMilesDriven, updateCarDriven } from '../../hooks/userSlice';
// import { carDataReducer, UPDATE_CAR_TYPE, UPDATE_MILES_DRIVEN } from '../../hooks/carData';
import store from '../../store';

import { goToSlide } from '../../hooks/slideSlice';
import { CAR_DATA } from '../../globals';

import Card from '../../components/card';
import Slider from '../../components/slider/slider';
import Button from '../../components/button';
import CarDetails from './CarDetails';
import { Checkbox } from '../../components/form';

import './style.css';

function InputForm() {

    const carDriven = useSelector( state => state.car.carDriven );

    const dispatch = useDispatch();

    const updateMilesPerWeekday = ( event ) => {
        store.dispatch( { type: `UPDATE_MILES_DRIVEN`, payload: event.target.value } );
    }

    const updateMilesPerYear = ( event ) => {
        store.dispatch( { type: `UPDATE_MILES_PER_YEAR`, payload: event.target.value } );
    }

    const updateCarType = ( value ) => {
        store.dispatch( { type: `UPDATE_CAR_TYPE`, payload: value } );
    }

    const updateHybrid = ( value ) => {
        store.dispatch( { type: `UPDATE_HYBRID`, payload: value } );
    }

    const updateDataEnteredCallback = () => {
        dispatch( goToSlide( 'convenience' ) );
    }

    return (
        <Card id="entryForm">
            <section className="input-group">
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
                    <Slider options={[10,20,30,40,50]} onChange={updateMilesPerWeekday} defaultValue={20} />
                    <span>miles per weekday</span>
                    <Slider options={[6000,8000,10000,12000,14000]} onChange={updateMilesPerYear} defaultValue={10000} />
                    <span>miles per year</span>
                </fieldset>

                <fieldset>
                    <Checkbox onChange={updateHybrid}>
                        My car is a hybrid
                    </Checkbox>
                </fieldset>
            </section>
            <section className="input-group">
                <Button onClick={updateDataEnteredCallback}>Run Inconvenience Report</Button> 
            </section>
            <section className="input-group">
                <CarDetails />
            </section>
        </Card>
    )
}

export default InputForm;