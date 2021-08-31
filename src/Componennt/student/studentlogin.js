import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import db from "../../Firebase/FireBase";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" >
        Jayant Kanel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [pass,setPass]=useState("");
  const [iid,setId]=useState("");
  const [messages, setMessages] = useState([]);
  // const [find,setFind]=useState(false);
  const { handleSubmit } = useForm({
    mode: "onChange",
  });
  const onSubmit = async () => {
    if(iid==="" || pass===""){
      alert("Please fill all details!!");
       return;

     }
      const init = async ()=>{
        let temp=false;
          for(let i=0;i<messages.length;i++){

              if(messages[i].id===iid && messages[i].data.Password===pass){
                localStorage.setItem("student_name",messages[i].data.Name);
                  // setFind(true);
                  temp=true;
              }
          }
          if(temp===false){
              //alert dena hai
              alert("Wrong Credentials!!");
              // setFind(true)
              return;
          }
          
          localStorage.setItem('studentid',iid);
          history.push('/Studentdashboard');
      }
      init();
    };
    useEffect(()=>{
          db.collection("login_Student").onSnapshot((snapshot)=>{ 
             setMessages( snapshot.docs.map((ele)=>{
              const single_message = {
                  id: ele.id,
                  data: ele.data(),
                };
                return single_message;
          }))});
          
      
    },[])
    useEffect(()=>{
        for(let i=0;i<messages.length;i++){
            if(messages[i].id===iid){
                // setFind(false);
            }
        }
    },[messages,iid])
  return (
    <Container component="main" maxWidth="xs">
      <input
  type="select"
  value
  required
  style={{
    opacity: 0,
    bottom: 0,
    left: 0}}
  aria-hidden={true}
  tabIndex={-1}/>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Student Sign in
        </Typography>
        <form className={classes.form} noValidate  onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
          
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Unique UserID"
                label="Unique UserID"
                name="Unique UserID"
                autoComplete="Unique UserID"
                onChange={(e)=>{setId(e.target.value)}}
              />
            </Grid>
            
            <Grid item xs={12}>
            

              <TextField
              required
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>{setPass(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button variant="body2" onClick={()=>{history.push('/studentsignup')}}>
                Don't have an account? Sign up
              </Button>
              <Button variant="body2" onClick={()=>{history.push('/teachersignup')}}>
                Not a Student ? Click here
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
  //   }
  //   return(
  //   <div className="spinner-border" role="status">
  //   <span className="sr-only">Loading...</span>
  // </div>
  // )
}