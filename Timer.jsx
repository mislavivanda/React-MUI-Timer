import {React,useState,useEffect} from 'react'
import {Box,Typography,IconButton} from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {makeStyles} from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {incrementTimer} from '../redux/slicers/timer';//import REDUX THUNK FUNCTION
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
    const time=useSelector(state=>state.timer);
    const dispatch = useDispatch();
  
    useEffect(()=>{
        if(!paused)
        {
            dispatch(incrementTimer());
        }
    },[time.ticks]);
    useEffect(()=>{
        if(!paused)
        {
           dispatch(incrementTimer());
        }
    },[paused]);
    const handlePauseChange=(event)=>{  
        setPaused(!paused)
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