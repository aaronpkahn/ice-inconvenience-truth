import { createSlice } from '@reduxjs/toolkit';

const sections = [
    ['intro', {}],
    ['convenience', {}]
];

export const slideSlice = createSlice({
    name: 'slides',
    initialState: {
        currentSlide: 'intro',
        subSlide: null,
    },
    reducers: {
        goToSlide: ( state, action ) => {
            state.currentSlide = action.payload;
        },
        nextSlide: ( state, action ) => {

        },
    }
})

export const { goToSlide, nextSlide, } = slideSlice.actions;

export default slideSlice.reducer;