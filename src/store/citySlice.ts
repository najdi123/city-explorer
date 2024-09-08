import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CityState {
    name: string;
    country: string;
    population?: number;
    coordinates: { lat: number; lng: number } | null;
}

const initialState: CityState = {
    name: '',
    country: '',
    population: undefined,
    coordinates: null,
};

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setCity(state, action: PayloadAction<CityState>) {
            return action.payload;
        },
    },
});

export const { setCity } = citySlice.actions;
export default citySlice.reducer;
