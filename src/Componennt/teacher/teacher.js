/* eslint-disable */
import "./teacher.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import db from "../../Firebase/FireBase";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Badge from "@material-ui/core/Badge";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Jayant Kanel</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


export default function Student() {
  const classes = useStyles();
  const [sche, setSche] = useState(false);
  const history = useHistory();
  const [ClassList, setClassList] = useState([]);
  const [Data, setData] = useState();
  const [show, setShow] = useState(false);
  const [iid, setIid] = useState(localStorage.getItem("teacher_id"));
  const location = useLocation();

  const onCreate = async () => {
    let temp = [];
    for (let i = 0; i < Data.length; i++) {
      for (let j = 0; j < ClassList.length; j++) {
        if (Data[i].id === ClassList[j]) {
          temp.push(Data[i]);
        }
      }
    }
    setData(temp);
    setShow(true);
  };
  const aisi = async (li) => {
    setClassList(li);
  };
  const showpath = async (valuei) => {
    history.push(valuei);
  };
  const logout = () => {
    history.push("/");
  };
  useEffect(() => {
    db.collection("Teacher").onSnapshot((snapshot) => {
      snapshot.docs.map((ele) => {
        if (ele.id === iid) {
          aisi(ele.data().Class);
        }
      });
    });
    db.collection("Classes").onSnapshot((snapshot) => {
      setData(
        snapshot.docs.map((ele) => {
          const single_message = {
            id: ele.id,
            data: ele.data(),
          };

          return single_message;
        })
      );
    });
  }, []);
  useEffect(() => {
    if (Data) {
    }
  }, [Data]);
  return (
    <>
      <div className={classes.root}>
        <React.Fragment>
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
              <Badge color="red" align="center" className="bg">
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
          <main>
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Helloo {localStorage.getItem("teacher_name")}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  Welcome to my Classroom
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justifyContent="center">
                    {show === false ? (
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={onCreate}
                        >
                          Show Classes Created by me
                        </Button>
                      </Grid>
                    ) : (
                      <></>
                    )}
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          showpath(`/createclass/${iid}`);
                        }}
                      >
                        Create Class
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
              {/* End hero unit */}
              {show === true ? (
                <Grid container spacing={4}>
                  {Data.map((item) => {
                    let ID = item.id;
                    return (
                      <Grid item key={item} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                          <CardMedia
                            className={classes.cardMedia}
                            image="https://source.unsplash.com/random"
                            title="Image title"
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {item.data.Name}
                            </Typography>
                            <Typography>{item.data.Description}</Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => {
                                showpath(`${location.pathname}/${ID}`);
                              }}
                            >
                              View
                            </Button>
                            {/* </a> */}
                            <Button size="small" color="primary">
                              Edit
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <div></div>
              )}
              {sche === true ? (
                <div>
                  {ClassList.map((e) => {
                    return (
                      <ul>
                        <li>{e.name ? e.name : null}</li>
                        <li>{e.date ? e.date : null}</li>
                        <li>{e.stime ? e.stime : null}</li>
                        <li>{e.etime ? e.etime : null}</li>
                      </ul>
                    );
                  })}
                </div>
              ) : (
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    setSche(true);
                  }}
                >
                  Show Schedule
                </Button>
              )}
            </Container>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              Something here to give the footer a purpose!
            </Typography>
            <Copyright />
          </footer>
          {/* End footer */}
        </React.Fragment>
      </div>
    </>
  );
}
