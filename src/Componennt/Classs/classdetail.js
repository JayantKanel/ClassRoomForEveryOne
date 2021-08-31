/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import db from "../../Firebase/FireBase";
import clsx from 'clsx';
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function DetailsClass() {
  const classes = useStyles();
  const [te, setTe] = useState();
  const [date,setDate]=useState("2017-05-25");
  const [stime,setStime]=useState("00:00");
  const  [etime,steEtime]=useState("00:00");
  const [count,setCount]=useState(0);
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [assign,setAssign]=useState(false);
  const [sche,setSche]=useState([{}])
  const dekh=[];
  const location = useLocation();
  const history = useHistory();
  const [teacher, setTeacher] = useState(localStorage.getItem("teacher_id"));
  const [shoow, setShoow] = useState(false);
  const [showSchedule,setShowSchedule]=useState(false);
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
  const [classid,setClassid]=useState(FindId());
  const logout = () => {
    history.push("/");
  };
  const getScheduleFromStudent = async (l) => {
    const querySnapshot = await db.collection("Student").doc(l).get();

    return querySnapshot.data().Schedule;
  };
  const getSchedule = async (l) => {
    const querySnapshot = await db.collection("Schedule").doc(l).get();

    return querySnapshot.data();
  };
  
  const getScheduleFromTeacher = async (l) => {
    const querySnapshot = await db.collection("Teacher").doc(l).get();

    return querySnapshot.data().Schedule;
  };

  const onDeleteSchedule =async(deleteid)=>{
    const init2 = async()=>{
      let listSche=te.Schedule;
      let temp=[];
      for(let i=0;i<listSche.length;i++){
        if(listSche[i]!==deleteid){
          temp.push(listSche[i]);
        }
      }
  
      await db.collection("Classes").doc(classid).update({
          Schedule: temp,
        });
  }
  await init2();
  const init1 = async (id)=>{
    let listSche= await getScheduleFromStudent(id);
    let temp=[];
      for(let i=0;i<listSche.length;i++){
        if(listSche[i]!==deleteid){
          temp.push(listSche[i]);
        }
      }

    await db.collection("Student").doc(id).update({
       Schedule: temp,
      });
}
   let stud=te.Student;
   stud.map((e)=>{
     init1(e);
   })
   const init3 = async()=>{
    let listSche=await getScheduleFromTeacher(teacher);
    let temp=[];
      for(let i=0;i<listSche.length;i++){
        if(listSche[i]!==deleteid){
          temp.push(listSche[i]);
        }
      }

    await db.collection("Teacher").doc(teacher).update({
        Schedule: listSche,
      });

}
await init3();
setCount(count+1);
alert("event deleted");
  }
  const CreateSchdeule = async()=>{
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 25));
    let uniqid = randLetter + Date.now();
    await db.collection("Schedule").doc(uniqid).set({
      Classid: FindId(),
      Date: date,
      Start: stime,
      End: etime,
    });
    
    const init2 = async()=>{
      let listSche=te.Schedule;
      listSche.push(uniqid);
  
      await db.collection("Classes").doc(classid).update({
          Schedule: listSche,
        });
  }
  await init2();
  const init1 = async (id)=>{
    let CurrSche= await getScheduleFromStudent(id);
    CurrSche.push(uniqid);

    await db.collection("Student").doc(id).update({
       Schedule: CurrSche,
      });
}
   let stud=te.Student;
   stud.map((e)=>{
     init1(e);
   })
   const init3 = async()=>{
    let listSche=await getScheduleFromTeacher(teacher);
    listSche.push(uniqid);

    await db.collection("Teacher").doc(teacher).update({
        Schedule: listSche,
      });

}
await init3();
alert("Schedule Created");
  }
  const onCreate = async () => {
    db.collection("login_Student").onSnapshot((snapshot) => {
      setList(
        snapshot.docs.map((ele) => {
          const single_message = {
            id: ele.id,
            data: ele.data(),
          };
          setShow(true);
          return single_message;
        })
      );
    });
  };
  const see= async()=>{
    setSche(dekh)
  }
 const onShowSchedule = async()=>{
   te.Schedule.map((e1)=>{
    const init = async()=>{ 
         let op=await getSchedule(e1);
         const re={
           id:e1,
           date:op.Date,
           st:op.Start,
           en:op.End,
         }
        dekh.push(re);
        if(dekh.length===te.Schedule.length){
          see();
          setShowSchedule(true);
        }
    }
   init();
   })
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
    
  }, [sche,count]);
  return (
    <React.Fragment>
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {/* <Badge color="red" align="center" className="bg"> */}
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="red"
            
            className={classes.submit}
            onClick={()=>{setShoow(true)}}
            
          >
            Show Details of the class
          </Button>
            {/* </Badge> */}
          </Typography>
            {/* <Badge  color="red" align="center" className="bg">
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="red"
            
            className={classes.submit}
            onClick={()=>{logout()}}
          >
            Log Out
          </Button>
          
            </Badge> */}
            
        </Toolbar>
      </AppBar>
       <div>
          
        </div>
      {shoow === true ? (
        <div>
          <Container
            maxWidth="sm"
            component="main"
            className={classes.heroContent}
          >
                    
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {te.Name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              component="p"
            >
              {te.Description}
            </Typography>
          </Container>
          {/* End hero unit */}
          <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
              {/* Test Grid */}
              <Grid item xs={100} md={40}>
                Schedule
                <Card>
                  <CardHeader
                    // title={tier.title}
                    // subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    // action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <form className={classes.container} noValidate>
  <TextField
    id="date"
    label="Schedule"
    type="date"
    defaultValue="2017-05-24"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
    onChange={(e)=>setDate(e.target.value)}
  />
   <TextField
    id="time"
    label="Start time"
    type="time"
    defaultValue="00:00"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
    onChange={(e)=>setStime(e.target.value)}
  />
    <TextField
    id="time"
    label="End Time"
    type="time"
    defaultValue="00:00"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
    onChange={(e)=>steEtime(e.target.value)}
  />

</form>
<Button fullWidth color="primary" onClick={()=>{CreateSchdeule()}}>
                      Create
                    </Button>
                  <CardContent>
                    <div className={classes.cardPricing}>
                      
                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary"
                      >
                        {/* ${tier.price} */}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>
                    <div className={classes.cardPricing}>
                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary"
                      >
                        {/* ${tier.price} */}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>
                    <ul>
                      {/* {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))} */}
                    </ul>
                  </CardContent>
                  <CardActions>
                    {
                      showSchedule===false?
                      <Button fullWidth color="primary" onClick={()=>{onShowSchedule()}}>
                      Show
                    </Button>
                    :
                    sche?.map((e)=>{
                      return(
                        <ul>
                         
                          <li>{e.date} {e.st} {e.en} <Button fullWidth color="primary" onClick={()=>{onDeleteSchedule(e.id)}}>
                      Delete
                    </Button> </li>
                          
                        </ul>
                      );

                    })
                       }
                  </CardActions>
                </Card>
              </Grid>
              {/* Assignment Grid  */}
              <Grid item xs={12} md={4}>
                Assignment Details
                <Card>
                  <CardHeader
                    // title={tier.title}
                    // subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    // action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary"
                      >
                        {/* ${tier.price} */}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>
                    <div className={classes.cardPricing}>
                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary"
                      >
                        {/* ${tier.price} */}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>
                    <ul>
                      {/* {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))} */}
                    </ul>
                  </CardContent>
                  
                  <>
                    {assign === true ? (
                      <ul>
                        {te.Assignment.map((e) => {
                          return (
                            <Typography component="li" variant="subtitle1" align="center" key={JSON.stringify(e)}>
                           
                    <Button fullWidth color="primary" onClick={()=>{
                      
                      history.push(`/class/assignment/${e}`)}}>
                      {e}
                    </Button>
                            </Typography>
                            
                          );
                        })}
                  </ul>
                    ) : (
                      <Button
                      fullWidth color="primary"
                       onClick={()=>{setAssign(true)}}
                     >
                       Show Assignment
                     </Button>
                    )}
                  </>
                  
                    <Button fullWidth color="primary" onClick={()=>{
                      let ID=FindId();
                      history.push(`/class/createassignment/${ID}`)}}>
                      Create Assignment
                    </Button>

                  
                </Card>
              </Grid>
              {/* Student Grid  */}
              <Grid item xs={12} md={4}>
                Student Details
                <Card>
                  <CardHeader
                    title={"Student Details"}
                    // subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    // action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  
                  <CardActions>
                 
                 
                
                   
                  </CardActions>
                  <>
                    {show === true ? (
                      <>
                        {te.Student.map((e) => {
                          return (
                            <Typography component="li" variant="subtitle1" align="center" key={JSON.stringify(e)}>
                            {JSON.stringify(e)}
                            </Typography>
                            
                          );
                        })}
                  </>
                    ) : (
                      <Button
                      fullWidth color="primary"
                       onClick={onCreate}
                     >
                       Show ID of the Students in the Class
                     </Button>
                    )}
                  </>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : (
       <></>
      )}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
