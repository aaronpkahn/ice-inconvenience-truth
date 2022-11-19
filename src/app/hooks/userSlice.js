import { createSlice } from '@reduxjs/toolkit';
import { DAYS } from '../globals';
import { CAR_DATA } from '../globals';

export const userSlice = createSlice({
    name: 'inputs',
    initialState: {
        dataLengthInDays: DAYS,
        dataEntered: false,
    },
    reducers: {
        updateDataEntered: ( state, action ) => {
            state.dataEntered = action.payload;
        }
    }
})

export const { updateDataEntered } = userSlice.actions;

export default userSlice.reducer;