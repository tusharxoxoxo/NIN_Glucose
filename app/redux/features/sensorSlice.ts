import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define sensor data structures
interface TemperatureSensor {
    data: number;
    time: string;
}

interface GlucoseSensor {
    data: number;
    time: string;
}

interface GsrSensor {
    data: number;
    time: string;
}

// Define the state structure
interface SensorState {
    temperature: TemperatureSensor;
    glucose: GlucoseSensor;
    gsr: GsrSensor;
}

// Initial state with default values
const initialState: SensorState = {
    temperature: { data: 0, time: '' },
    glucose: { data: 0, time: '' },
    gsr: { data: 0, time: '' },
};

// Generic helper function to add time formatting
function addTimeToData<T extends { time: string }>(data: T[]): T[] {
    return data.map((d) => {
        const timestamp = Number(d.time) * 1000; // Convert bigint to number and to milliseconds
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return {
            ...d,
            time: `${hours}:${minutes}:${seconds}` // Format the time as HH:MM:SS
        };
    });
}

// Define the Redux slice
export const sensorSlice = createSlice({
    name: 'sensor',
    initialState,
    reducers: {
        // Reducer for temperature sensor data
        addTemperature: (state, action: PayloadAction<{ data: number; time: string }[]>) => {
            const data = addTimeToData(action.payload)[0]; // Assuming you want the first entry
            state.temperature.data = Math.round(data.data);
            state.temperature.time = data.time;
        },

        // Reducer for glucose sensor data
        addGlucose: (state, action: PayloadAction<{ data: number; time: string }[]>) => {
            const data = addTimeToData(action.payload)[0]; // Assuming you want the first entry
            state.glucose.data = Math.round(data.data);
            state.glucose.time = data.time;
        },

        // Reducer for GSR sensor data
        addGsr: (state, action: PayloadAction<{ data: number; time: string }[]>) => {
            const data = addTimeToData(action.payload)[0]; // Assuming you want the first entry
            state.gsr.data = Math.round(data.data);
            state.gsr.time = data.time;
        }
    }
});

// Export the actions
export const { addTemperature, addGlucose, addGsr } = sensorSlice.actions;

// Export the reducer
export default sensorSlice.reducer;
