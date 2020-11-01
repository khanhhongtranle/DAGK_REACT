import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {checkLogin, login} from "../../Utils/dbUtils";
import {Link} from "react-router-dom";
import {Cookies} from "react-cookie";

const cookie = new Cookies();

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: '20px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
        color: 'black'
    },
    pos: {
        marginBottom: 12,
    },
});

function Login() {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function loginHandler() {
        if (username === '' || password === ''){
            return;
        }
       login({username: username, password: window.btoa(password)})
           .then(res => {
               console.log(res);

              if (res.hasOwnProperty('error')){
                  window.location.href = '/login';
                  return ;
              }

              if (res['success'] === 1){
                  alert('login successful');

                  cookie.set('react-token',res['token']);

                  window.location.href = '/boards';

              }
              else if ( res['success'] === 0 ){
                  alert('login failed');
              }
           });
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs/>
                <Grid item xs>
                    <form>
                        <Card className={classes.root}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Login
                            </Typography>
                            <CardContent>
                                <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
                                <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)}/>
                            </CardContent>
                            <CardActions>
                                <Button type="button" variant="contained" color="primary" onClick={loginHandler}>
                                    Login
                                </Button>
                                <Button variant="contained">
                                    <Link style={{textDecoration: "none", color: "black"}} to="/signup">Sign up</Link>
                                </Button>
                            </CardActions>
                        </Card>
                    </form>
                </Grid>
                <Grid item xs/>
            </Grid>
        </div>
    );
}

export default Login;
