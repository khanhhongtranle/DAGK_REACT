import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    card: {
        margin: '10px',
        minWidth: 275,
    }
}));


export function getBoards() {
    return fetch(`http://52.77.203.212/api-react/index.php?action=get_boards`,)
        .then((response) => response.json());
}

export default function Boards() {
    const classes = useStyles();

    const [listBoards, setListBoards] = useState([]);

    useEffect( () => {
        let mounted = true;
        getBoards()
            .then(boards => {
            if (mounted){
                setListBoards(boards);
            }
        })
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {listBoards.map(board =>
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" component="h2" color="primary">
                                    {board['board_name']}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Date created: {board['date_created']}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="outlined" color="primary">
                                    More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
