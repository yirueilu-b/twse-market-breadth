import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        color: 'white',
        // backgroundColor: 'rgba(255, 255, 255, 0.03)'
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3),
        },
    },
    inner_block_ma: {
        textAlign: 'left',
        borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        // backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    inner_block_info: {
        // textAlign: 'center',
        // justify: "center",
        // borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        // backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    ma_text: {
        // marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(1),
        // [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.spacing(4)
        // },
    },
    title: {
        fontWeight: 700,
    },
})
);

export default function Example(props) {
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.root}>
            <ResponsiveContainer width="100%" height={287}>
                <AreaChart width={500}
                    height={300}
                    data={props.data}
                    margin={{
                        top: 5, right: 0, left: 0, bottom: 5,
                    }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(102, 207, 255, 0.87)" stopOpacity={0.87} />
                            <stop offset="94.87%" stopColor="rgba(102, 207, 255, 0.87)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date"
                        angle={0}
                        stroke={"rgba(255, 255, 255, 0.87)"}
                    />
                    <YAxis
                        hide={true}
                        domain={['dataMin - 200', 'dataMax + 200']}
                        stroke={"rgba(255, 255, 255, 0.87)"}
                    />
                    {/*<CartesianGrid strokeDasharray="20 20"/>*/}
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.87)', color: 'black' }}
                        labelStyle={{ color: 'black' }}
                        itemStyle={{ color: 'black' }}
                        labelFormatter={(name) => name ? name.toUpperCase() : name}
                        formatter={(value, name, props) => ([value])}
                    />
                    <Area type="monotone"
                        dataKey="收盤指數"
                        stroke="rgba(102, 207, 255, 0.87)"
                        fillOpacity={1}
                        fill="url(#colorValue)" />
                </AreaChart>
            </ResponsiveContainer>
        </Grid>

    );
}
