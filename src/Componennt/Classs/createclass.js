/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import db from "../../Firebase/FireBase";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">
        Jayant Kanel
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateClass() {
  const [mshow,setMshow]=useState(false);
 
  const classes = useStyles();
  const history = useHistory();
  const [studentAssign, setstudentAssign] = useState('');
  const [show1,setShow1]=useState(false);
  const [teacher, setTeacher] = useState(localStorage.getItem("teacher_id"));
  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [avail,setAvail]=useState([]);
  const { handleSubmit} = useForm({
    mode: "onChange",
  });
 
  const getClassfromStudent = async (userid)=>{
    const querySnapshot = await db
    .collection('Student')
    .doc(userid)
    .get();

  return querySnapshot.data().Class;
  }
  const getClassfromTeacher = async (userid)=>{
    const querySnapshot = await db
    .collection('Teacher')
    .doc(userid)
    .get();
  return querySnapshot.data().Class;
  }
  const onShowList = async()=>{
    db.collection("login_Student").onSnapshot((snapshot) => {
        setAvail(
          snapshot.docs.map((ele) => {
            const single_message = {
              id: ele.id,
              data: ele.data(),
            };
            setShow1(true);
            return single_message;
          })
        );
      });
 }
  const onCreate = async () => {
    if(description==="" || name===""){
      alert("Please fill all details!!");
       return;
    }
    setMshow(true);
      var studentarr=studentAssign.split(',');
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let uniqid = randLetter + Date.now();
    await db.collection("Classes").doc(uniqid).set({
      Name: name,
      Assignment: [],
      Student: studentarr,
      Test: [],
      Schedule: [],
      TeacherId: teacher,
      Description: description,
    });
    const init1 = async()=>{
        let CurrClass1= await getClassfromTeacher(teacher);
        CurrClass1.push(uniqid);
    
        await db.collection("Teacher").doc(teacher).update({
            Class: CurrClass1,
          });
    }
    await init1();
    for(let i=0;i<studentarr.length;i++){
        const init = async ()=>{
            let CurrClass= await getClassfromStudent(studentarr[i]);
            CurrClass.push(uniqid);
            await db.collection("Student").doc(studentarr[i]).update({
              
              Class: CurrClass,
            });
        }
           await init();
    }
    history.push('/teacherdashboard');
  };
  if(!mshow){
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Enter Details to Create Class
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onCreate)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            Name of Class 
            <TextField
                variant="outlined"
                required
                fullWidth
                id="Unique UserID"
                // label="Unique UserID"
                name="Unique UserID"
                autoComplete="Unique UserID"
                onChange={(e) => setName(e.target.value)}
              />
            <label for="story" label="Breif Description about class">
              List of Students to assign
              <textarea
                id="story"
                name="story"
                rows="3"
                cols="53"
                onChange={(e) => setstudentAssign(e.target.value)}
              ></textarea>
            </label>
            
           
            <label for="story" label="Breif Description about class">
              Breif Description about class
              <textarea
                id="story"
                name="story"
                rows="5"
                cols="53"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            label="Description"
            className={classes.submit}
          >
            Create Class
          </Button>
        </form>
      </div>
      <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <Orders /> */}
                <Button variant="contained" color="primary" onClick={onShowList}>
                    Show  List of Available Students
                  </Button>
                  <div>
        {show1 === true ? (
          <div>
            {avail.map((e) => {
              return <div>{JSON.stringify(e.id)}</div>;
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
              </Paper>
            </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
 }
  return(
    <div className="spinner-border text-primary spinner-position pos1">
  </div>
  );
}
