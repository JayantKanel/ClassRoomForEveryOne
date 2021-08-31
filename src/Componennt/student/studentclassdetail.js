/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import db from "../../Firebase/FireBase";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Jayant Kanel</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function StdentClassDetail() {
  const classes = useStyles();
  const [te, setTe] = useState();
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [sche, setSche] = useState([{}]);
  const [shoow, setShoow] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
  const logout = () => {
    history.push("/");
  };
  const getSchedule = async (l) => {
    const querySnapshot = await db.collection("Schedule").doc(l).get();

    return querySnapshot.data();
  };
  let dekh = [];
  const see = async () => {
    setSche(dekh);
  };
  const onShowSchedule = async () => {
    te.Schedule.map((e1) => {
      const init = async () => {
        let op = await getSchedule(e1);
        const re = {
          id: e1,
          date: op.Date,
          st: op.Start,
          en: op.End,
        };
        dekh.push(re);
        if (dekh.length === te.Schedule.length) {
          see();

          setShowSchedule(true);
        }
      };
      init();
    });
  };
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
  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <Badge color="red">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="red"
              className={classes.submit}
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </Button>
          </Badge>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {shoow === false ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShoow(true);
              }}
            >
              Show Details of the Class please wait 2 second:)
            </Button>
          ) : (
            <></>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              {shoow === true ? (
                <Paper className={fixedHeightPaper}>
                  {te.Name}
                  <br />
                  {te.Description}
                </Paper>
              ) : (
                <></>
              )}
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Typography
                  component="h2"
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Schedule Section
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    onShowSchedule();
                  }}
                >
                  Show Schedule
                </Button>
                {setShowSchedule === false ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      onShowSchedule();
                    }}
                  >
                    Show Schedule
                  </Button>
                ) : (
                  sche.map((e) => {
                    return (
                      <div>
                        {e.date} {e.st} {e.en}
                      </div>
                    );
                  })
                )}
              </Paper>
            </Grid>
            {shoow === true ? (
              <div>
                <Paper className={fixedHeightPaper}>
                  <Typography
                    component="h3"
                    variant="h4"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                  >
                    Assignment Section
                  </Typography>
                  {te.Assignment.map((e) => {
                    let temp = e;
                    return (
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            history.push(`/student/assigndetail/${temp}`);
                          }}
                        >
                          {temp}
                        </Button>
                      </div>
                    );
                  })}
                </Paper>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    {/* <Orders /> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onCreate}
                    >
                      Show ID of the Students in the Class
                    </Button>
                    <div>
                      {show === true ? (
                        <div>
                          {te.Student.map((e) => {
                            return <div>{JSON.stringify(e)}</div>;
                          })}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Paper>
                </Grid>
              </div>
            ) : (
              <></>
            )}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
