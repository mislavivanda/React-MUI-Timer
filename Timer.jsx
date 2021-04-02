import {React,useState,useEffect} from 'react'
import {Box,Typography,IconButton} from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {makeStyles} from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {incrementTimer,disableDispatch} from '../redux/slicers/timer';//import REDUX THUNK FUNCTION
const useStyles=makeStyles((theme)=>({
    timeBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        borderStyle:'solid',
        borderColor:theme.palette.primary.main,
        borderWidth:2
    },
    iconBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    }

}))
export default function Timer() {
    const classes=useStyles();
    const [paused,setPaused]=useState(true);
    //WE INTRODUCE THIS STATE VARIABLE TO FIX THE BUG IN WHICH MULTIPLE CLICKS ON PLAY ICON IN <1s MAKE MULTIPLE DISPATCHES THUS INCREMENTS OF TIMER INSTEAD OF JUST ONE
    const dispatchEnable=useSelector(state=>state.timer.dispatch);
    const time=useSelector(state=>state.timer);
    const dispatch = useDispatch();
  
    useEffect(()=>{
        if(!paused)
        {
            dispatch(incrementTimer());//ALWAYS INCREMENT TIMER WHEN PAUSE=false
        }
    },[time.ticks]);
    useEffect(()=>{
        if(!paused)
        {
            if(dispatchEnable)//IF TRUE-> TIMER CAN BE INCREMENTED,ELSE TIMER CANT BE INCREMENTED-> 1 SECOND HASNT GONE YET
            {
                dispatch(incrementTimer());//INCREMENT TIMER
            }
        }
    },[paused]);
    const handlePauseChange=(event)=>{  
        if(!paused)//IF PAUSED=FALSE BEFORE CLICK-> WE WANT TO STOP TIMER WITH CLICK-> dispatch=false-> DONT INCREMENT COUNTER-> DISABLE DISPATCHING
        {
            dispatch(disableDispatch());//SET IT TO FALSE ONLY HERE
        }
        setPaused(!paused);//ALWAYS DO THIS AFTER CLICK
    }   
    return (
        <Box>
            <Box className={classes.timeBox}>
                <Box style={{width:'40%',display:'flex',flexDirection:'row', justifyContent:'center'}}><Typography color='primary' variant='h3'>{time.minutes}</Typography></Box>
                <Box style={{width:'10%',display:'flex',flexDirection:'row', justifyContent:'center'}}><Typography color='primary' variant='h3'>:</Typography></Box>
                <Box style={{width:'40%',display:'flex',flexDirection:'row', justifyContent:'center'}}><Typography color='primary' variant='h3'>{time.seconds}</Typography></Box>
            </Box>
          <Box className={classes.iconBox}> { (paused) ?
        <IconButton title='Start' onClick={handlePauseChange} disableRipple style={{height:'100%'}} color='secondary'><PlayArrowIcon style={{width:50,height:'auto'}}/></IconButton>
        : 
        <IconButton title='Stop' onClick={handlePauseChange} disableRipple style={{height:'100%'}} color='secondary'><PauseIcon style={{width:50,height:'auto'}}/></IconButton>
        } </Box> 
      </Box>
    )
}