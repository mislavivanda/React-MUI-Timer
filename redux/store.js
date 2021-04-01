import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './slicers/timer';
export default configureStore({
  reducer: {
    timer:timerReducer
  }
})