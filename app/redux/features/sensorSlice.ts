import { createSlice } from "@reduxjs/toolkit";


interface TemperatureSensor {
    Temperature: number;
    time: string;
}

interface GlucoseSensor {
    Glucose: number;
    time: string;
}

interface GsrSensor {
    Gsr: number;
    time: string;
}

interface SensorState {
    temperature: TemperatureSensor;
    glucose: GlucoseSensor;
    gsr: GsrSensor;
}

const initialState: SensorState = {
    temperature: { Temperature: 0,time: '' },
    glucose: { Glucose: 0 , time: '' },
    gsr: { Gsr: 0 ,time: '' },
};

function addTimeToData<T extends { time: string }>(data: T): T {
    let time = new Date().toLocaleTimeString();
    data.time = time;
    return data;
}

export const sensorSlice = createSlice({
    name: 'sensor',
    initialState,
    reducers: {
        addTempurature: (state, action) => {
            const data =  addTimeToData(action.payload);
            state.temperature.Temperature = Math.round(data.TEM);
            state.temperature.time = data.time;
        },

        addGlucose: (state, action) => {
           const data= addTimeToData(action.payload);
           state.glucose.Glucose = Math.round(data.GLU);
           state.glucose.time = data.time;
        },

        addGsr: (state, action) => {
            const data = addTimeToData(action.payload);
            state.gsr.Gsr = Math.round(data.GSR);
            state.gsr.time = data.time
        }
    },
});


export const { addTempurature, addGlucose, addGsr } = sensorSlice.actions;

export default sensorSlice.reducer;