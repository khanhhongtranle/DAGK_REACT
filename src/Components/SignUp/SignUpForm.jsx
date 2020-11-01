import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {get_users} from "../../Utils/dbUtils";

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

function SignUpForm() {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const submitSignUpHandler = e => {
        //check username
        const users = get_users();
        console.log(users);

        //check password

        //check email ?

        //save to db
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs/>
                <Grid item xs>
                    <Card className={classes.root}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Sign up
                        </Typography>
                        <form onSubmit={submitSignUpHandler}>
                            <CardContent>
                                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
                                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
                                <input type="password" placeholder="Password Again" value={rePassword} onChange={e => setRePassword(e.target.value)} required/>
                                <input type="text" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required/>
                                <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                                <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required/>
                            </CardContent>
                            <CardActions>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs/>
            </Grid>
        </div>
    );
}

export default SignUpForm;
