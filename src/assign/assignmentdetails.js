/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import db from "../Firebase/FireBase";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
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

export default function AssignmentDetails() {
  const classes = useStyles();
  const [te, setTe] = useState();
  const [pend, setPend] = useState(false);
  const [comp, setComp] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [shoow, setShoow] = useState(false);
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

  useEffect(() => {
    let id = FindId();
    let t = db // eslint-disable-next-line
      .collection("Assignment")
      .doc(id)
      .onSnapshot((snapshot) => {
        // setShoow(true)
        setTe(() => {
          return snapshot.data();
        });
      });
  }, []); // eslint-disable-next-line
  return (
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="red"
              className={classes.submit}
              onClick={() => {
                setShoow(true);
              }}
            >
              Show Details of the Class please wait 2 second:)t
            </Button>
          </Typography>
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
        </Toolbar>
      </AppBar>

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
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader
                    title={"Student Completed"}
                    // subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    // action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardActions></CardActions>
                  <>
                    {comp === true ? (
                      <>
                        {te.StudentCompleted.map((e) => {
                          return (
                            <Typography
                              component="li"
                              variant="subtitle1"
                              align="center"
                              key={JSON.stringify(e)}
                            >
                              {JSON.stringify(e)}
                            </Typography>
                          );
                        })}
                      </>
                    ) : (
                      <Button
                        fullWidth
                        color="primary"
                        onClick={() => {
                          setComp(true);
                        }}
                      >
                        Show ID of the Students in the Class
                      </Button>
                    )}
                  </>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader
                    title={"Test Link"}
                    // subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    // action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  {te.Test}
                </Card>
              </Grid>
              {/* Student Grid  */}
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader
                    title={"Student Pending"}
                    // subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    // action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />

                  <CardActions></CardActions>
                  <>
                    {pend === true ? (
                      <>
                        {te.StudentPending.map((e) => {
                          return (
                            <Typography
                              component="li"
                              variant="subtitle1"
                              align="center"
                              key={JSON.stringify(e)}
                            >
                              {JSON.stringify(e)}
                            </Typography>
                          );
                        })}
                      </>
                    ) : (
                      <Button
                        fullWidth
                        color="primary"
                        onClick={() => {
                          setPend(true);
                        }}
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
