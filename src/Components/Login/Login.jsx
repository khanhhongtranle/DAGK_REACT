import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {get_users, login} from "../../Utils/dbUtils";

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
       login({username: username, password: password})
           .then(res => {
              if (res['success'] === 1){
                  alert('login successful');
              }
              else{
                  alert('login failed');
              }
           });
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs/>
                <Grid item xs>
                    <Card className={classes.root}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Login
                        </Typography>
                        <CardContent>
                            <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
                            <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)}/>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" onClick={loginHandler}>
                                Login
                            </Button>
                            <Button variant="contained">
                                Sign up
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs/>
            </Grid>
        </div>
    );
}

export default Login;
