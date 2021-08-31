import './studentsignup.css'
import React, { useState, useEffect } from "react";
import { useForm} from "react-hook-form";
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
      <Link color="inherit">
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
  const [load,setLoad]=useState(false);
  const classes = useStyles();
  const history = useHistory();
  const [name,setName]=useState("");
  const [pass,setPass]=useState("");
  const [iid,setId]=useState("");
  const [messages, setMessages] = useState([]);
  const [find,setFind]=useState(true);
  const { handleSubmit} = useForm({
    // defaultValues: { ...initialValues },
    mode: "onChange",
  });
  const onSubmit = async () => {
       if(iid==="" || pass==="" || name===""){
        alert("Please fill all details!!");
         return;
       }
       setLoad(true);
      const init = async ()=>{
          for(let i=0;i<messages.length;i++){
              if(messages[i].id===iid){
                  setFind(false);
              }
          }
          if(find===false){
              //alert dena hai
              alert("Please use another UserID");
              setFind(true)
              setLoad(false);
              return;
          }
          await db.collection("login_Student").doc(iid).set({
              Name: name,
              UserId: iid,
              Password: pass,
          })
          await db.collection("Student").doc(iid).set({
              UserId: iid,
              Name: name,
              Class: [],
              PrevA:[],
              PendingA:[],
              Schedule:[],
          })
       
          alert("account successfully created");
          history.push('/studentlogin');
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
                setFind(false);
            }
        }
    },[messages,iid])
    const onLogin= ()=>{
        history.push('/studentlogin');
    }
    if(!load){
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Student Sign up
        </Typography>
        <form className={classes.form} noValidate  onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
          
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={(e)=>{setName(e.target.value)}}
              />
            </Grid>
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
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={onLogin} variant="body2">
                Already have an account? Sign in
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
    }
    return(
      <div className="spinner-border text-primary spinner-position pos1">
    </div>
    )
}
