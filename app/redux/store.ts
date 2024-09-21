import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import graphReducer from './features/graphSlice';
import sensorReducer from './features/sensorSlice';

export const store = configureStore({
  reducer: {
   auth: authReducer,
   graph: graphReducer,
   sensor: sensorReducer
  }
})


// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
