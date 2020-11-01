import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Boards from "../Components/Boards/Boards";
import Login from "../Components/Login/Login";
import SignUpForm from "Components/SignUp/SignUpForm";
import {BrowserRouter as Router,
        Switch,
        Route,
        Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
    },
}));

function App() {
    const classes = useStyles();
  return (
      <Router>
      <div>
          <div className={classes.root}>
              <AppBar position="static">
                  <Toolbar>
                      <Typography variant="h6" className={classes.title}>
                          My Boards
                      </Typography>
                      <Button color="inherit">Logout</Button>
                  </Toolbar>
              </AppBar>
          </div>
              <div>
                  <Switch>
                      <Route path="/login">
                          <Login />
                      </Route>
                      <Route path="/signup">
                          <SignUpForm />
                      </Route>
                      <Route path="/boards">
                          <Boards />
                      </Route>
                  </Switch>
              </div>
      </div>
      </Router>
  );
}

export default App;
