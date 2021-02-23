import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BreadthWidget from './BreadthWidget'

// import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(3),
            },
            // padding: theme.spacing(3),
            textAlign: 'center',
            color: 'white',
            // backgroundColor: 'rgba(255, 255, 255, 0.03)'
        },
        ma_block: {
            minHeight: 287,
            padding: 0
        },
        title_block: {
            color: 'white',
            // backgroundColor: 'rgba(255, 255, 255, 0.03)'
        },
        title: {
            fontWeight: 700,
        },
    })
);


function BreadthBlock(props) {
    const classes = useStyles();
    // const [checked, setChecked] = React.useState(false);
    // React.useEffect(() => {
    //     console.log('switch');
    //     setChecked((prev) => !prev);
    // }, [props.data]);
    return (
        //<Fade in={checked}>
        <Grid container spacing={2} className={classes.root}>
            <Grid container item xs={12} justify="center" wrap="nowrap"
                  alignItems="center" className={classes.title_block}>
                <Typography variant="h4" className={classes.title}>
                    {props.title}
                </Typography>
            </Grid>
            <Grid container direction={'row'} item xs={12} className={classes.ma_block}>
                {
                    props.data.map((entry, index) => {
                        return <BreadthWidget key={index} entry={entry}/>
                    })
                }
            </Grid>
        </Grid>
        //</Fade>
    )
}

export default BreadthBlock;

