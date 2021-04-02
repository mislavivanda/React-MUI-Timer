import { createSlice } from '@reduxjs/toolkit';
const timerSlicer=createSlice({
    name:'timer',
    initialState:{
            ticks:0,
            minutes:0,
            seconds:0,
            dispatch:true
    },
    reducers:{
        incrementTime:(state)=>{
            state.ticks+=1;
            if((state.ticks)/60 < 0)
            {
                state.minutes=0;
            }
            else state.minutes=parseInt((state.ticks)/60)
            state.seconds=(state.ticks)%60;
            state.dispatch=true;//ENABLE DISPATCHING(INCREMENTING OF COUNTER) AFTER COUNTER INCREMENT
            //SET TO TRUE ONLY HERE
        },
        disableDispatch:(state)=>{
            state.dispatch=false;
        }
    }
})
export const {disableDispatch}=timerSlicer.actions;
export default timerSlicer.reducer
export const incrementTimer = ()=> (dispatch) => {//REDUX ASYNC THUNK-> WE CALL THIS IN COMPONENT
    setTimeout(() => {
      dispatch(incrementTime())//DISPATCHING AFTER 1s
    }, 1000)
}