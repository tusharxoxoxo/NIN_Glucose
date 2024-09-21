import { createSlice} from '@reduxjs/toolkit';

interface SensorData {
    BIA: number;
    PHA: number;
    time?: string;
}

interface GraphState {
    data: SensorData[];
}

const initialState: GraphState = {
    data: [],
};

function addTimeToData(data: SensorData[]): SensorData[] {
    let time = new Date().toLocaleTimeString();
    for (let i = 0; i < data.length; i++) {
      data[i]['time'] = time;
    }
    return data;
  }

export const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {
        addBio: (state, action) => {
        const dataWithTime = addTimeToData(action.payload);
         state.data = dataWithTime;
        },
    },
});

export const { addBio } = graphSlice.actions;
export default graphSlice.reducer;