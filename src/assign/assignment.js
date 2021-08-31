/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useForm} from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import db from "../Firebase/FireBase";
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

export default function Assignme() {
  const [mshow,setMshow]=useState(false);
  const [te, setTe] = useState();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [studentAssign, setstudentAssign] = useState('');
  const [test, setTest] = useState("");
  const [show, setShow] = useState(false);
  const [teacher, setTeacher] = useState(localStorage.getItem("teacher_id"));
  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const {  handleSubmit} = useForm({
    mode: "onChange",
  });
  const FindId = () => {
    let id = "";
    const url = location.pathname;
    let i = url.length - 1;
    while (url[i] !== "/") {
      id += url[i];
      i--;
    }
    id = id.split("").reverse().join("");
    return id;
  };
  const getAssignFromStudent = async (userid)=>{
    const querySnapshot = await db
    .collection('Student')
    .doc(userid)
    .get();

  return querySnapshot.data().PendingA;
  }
 
  const getAssignfromClass = async (userid)=>{
    const querySnapshot = await db
    .collection('Classes')
    .doc(userid)
    .get();
  return querySnapshot.data().Assignment;
  }
 
 useEffect(() => {
  let id = FindId();
  let t = db
    .collection("Classes")
    .doc(id)
    .onSnapshot((snapshot) => {
      // setShoow(true)
      setTe(() => {
        return snapshot.data();
      });
    });
}, []);
  const onCreate = async () => {
    if(description==="" || name===""){
      alert("Please fill all details!!");
       return;
    }
    setMshow(true);
      var studentarr=studentAssign.split(',');
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 25));
    let uniqid = randLetter + Date.now();
    //Asignment added
    await db.collection("Assignment").doc(uniqid).set({
      Teacher: teacher,
      Class : FindId(),
      Name: name,
      StudentCompleted: [],
      StudentPending: studentarr,
      Test: test,
      Description: description,
    });
    //Assignment added in class
    const init2 = async()=>{
      let temp2=FindId();
      let temp= await getAssignfromClass(temp2);
      temp.push(uniqid);
  
      await db.collection("Classes").doc(temp2).update({
          Assignment: temp,
        });
  }
  await init2();
    const init1 = async (id)=>{
        let CurrAssign= await getAssignFromStudent(id);
        CurrAssign.push(uniqid);
    
        await db.collection("Student").doc(id).update({
           PendingA: CurrAssign,
          });
    }
    for(let i=0;i<studentarr.length;i++){
     await init1(studentarr[i]);
    }
    history.push(`/teacherdashboard/${FindId()}`);
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
          Enter Details to Create Assignment
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onCreate)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            Name of Assignment
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
              List of Comma seperated Students(Please Enter Available Students only )
              <textarea
                id="story"
                name="story"
                rows="3"
                cols="53"
                onChange={(e) => setstudentAssign(e.target.value)}
              ></textarea>
            </label>
            <label for="story" label="Breif Description about class">
              Link
              <textarea
                id="story"
                name="story"
                rows="3"
                cols="53"
                onChange={(e) => setTest(e.target.value)}
              ></textarea>
            </label>
            <label for="story" label="Breif Description about class">
              Breif Description about Assignment
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
            Create Assignment
          </Button>
        </form>
      </div>
      <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <Orders /> */}
                <Button variant="contained" color="primary" onClick={()=>{setShow(true)}}>
                    Show  List of Available Students
                  </Button>
                  <>
                    {show === true ? (
                      <ul>
                        {te.Student.map((e) => {
                          return (
                            <Typography component="li" variant="subtitle1" align="center" key={JSON.stringify(e)}>
                            {JSON.stringify(e)}
                            </Typography>
                            
                          );
                        })}
                  </ul>
                    ) : (
                      <></>
                    )}
                  </>
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
