import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: 'white',
        },
    })
);


function BreadthWidget(props) {
    const classes = useStyles();
    // const [checked, setChecked] = React.useState(false);

    // React.useEffect(() => {
    //     console.log('switch');
    //     setChecked((prev) => !prev);
    //     setChecked((prev) => !prev);
    // }, [props.entry]);

    return (
        // <Fade in={checked}>
            <Grid container justify="center" wrap="wrap"
                  alignItems="center"
                  style={{
                      backgroundColor:
                          (props.entry.breadth > 50) ?
                              `rgba(255,
                          ${255 - (props.entry.breadth - 50) / 50 * 255},
                          ${255 - (props.entry.breadth - 50) / 50 * 255}, 0.3)`
                              :
                              `rgba(${(props.entry.breadth) / 50 * 255},
                          255,
                          ${(props.entry.breadth) / 50 * 255}, 0.3)`
                  }}
                  item
                  xs={6} md={4} lg={3}
                  className={classes.root}
                  direction={'row'}
            >
                <Grid item xs={12}>
                    <Typography variant='subtitle2'>
                        {props.entry.category}
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{minHeight: 25.487}}>
                    <Typography variant='h6'>
                        {props.entry.breadth}%
                    </Typography>
                </Grid>
            </Grid>
        // </Fade>
    )
}


export default BreadthWidget;