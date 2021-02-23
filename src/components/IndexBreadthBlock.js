import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
    inner_block_ma: {
        textAlign: 'left',
        borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        height: 167
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


const CustomBarLabel = ({ payload, x, y, value }) => {
    return <text x={x} y={y}
        fill="rgba(255, 255, 255, 0.87)"
        textAnchor="middle"
        dx={135} dy={13}
    >
        {/*<Typography>*/}
        {value + '%'}
        {/*</Typography>*/}
    </text>;
};

function IndexBreadthBlock(props) {
    const classes = useStyles();
    const ma_bar_data = props.data ? ['ma5', 'ma10', 'ma20', 'ma60',].map((type) => {
        return { "type": type, "val": props.data[type] };
    }) : [];
    let index_value = props.info['close'];
    let index_change = props.info['change'];
    let index_change_p = props.info['pct_change'];

    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid container item xs={12} md={5}>
                <Grid container item xs={12} justify="center" wrap="nowrap"
                    alignItems="center" className={classes.inner_block_info}>
                    <Typography variant="h4" gutterBottom className={classes.title}>
                        大盤
                    </Typography>
                </Grid>
                <Grid container item xs={12} justify="center" wrap="nowrap"
                    alignItems="center" className={classes.inner_block_info}>
                    <Typography variant="h5" gutterBottom style={(index_change < 0) ?
                        { color: 'rgba(0, 255, 0, 0.587)' } :
                        { color: 'rgba(255, 30, 30, 0.587)' }}>
                        {index_value !== undefined ? index_value : -1}
                    </Typography>
                </Grid>
                <Grid container item xs={12} justify="center" wrap="nowrap"
                    alignItems="center" className={classes.inner_block_info}>
                    <Typography variant="h5" gutterBottom style={(index_change < 0) ?
                        { color: 'rgba(0, 255, 0, 0.587)' } :
                        { color: 'rgba(255, 30, 30, 0.587)' }}>
                        {index_change !== undefined ? index_change : -1}
                    </Typography>
                </Grid>
                <Grid container item xs={12} justify="center" wrap="nowrap"
                    alignItems="center" className={classes.inner_block_info}>
                    <Typography variant="h5" gutterBottom style={(index_change < 0) ?
                        { color: 'rgba(0, 255, 0, 0.587)' } :
                        { color: 'rgba(255, 30, 30, 0.587)' }}>
                        {index_change_p !== undefined ? index_change_p.toFixed(2) + '%' : -1}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container alignItems="center" item xs={12} md={7}>
                <Grid item xs={12} className={classes.inner_block_ma}>
                    <ResponsiveContainer>
                        <BarChart
                            barCategoryGap={10}
                            // maxBarSize={20}
                            width={250}
                            height={147}
                            data={props.data ? ma_bar_data : []}
                            layout="vertical"
                            margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
                        >
                            <XAxis type="number"
                                stroke={"rgba(255, 255, 255, 0.87)"}
                                hide={true}
                                domain={[0, 100]}
                            />
                            <YAxis type="category"
                                dataKey={'type'}
                                stroke={"rgba(255, 255, 255, 0.87)"}
                                tickFormatter={(value, name, props) => (value ? value.toUpperCase() : value)}
                            />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.87)', color: 'black' }}
                                labelStyle={{ color: 'black' }}
                                itemStyle={{ color: 'black' }}
                                labelFormatter={(name) => name ? name.toUpperCase() : name}
                                formatter={(value, name, props) => ([value + "%"])}
                            />
                            <Bar dataKey="val"
                                background={{ fill: 'rgba(255, 255, 255, 0.587)' }}
                                style={{ marginTop: 100 }}
                                label={CustomBarLabel}
                            >

                                {
                                    props.data ? ['ma5', 'ma10', 'ma20', 'ma60',].map((type) => {
                                        return <Cell key={type} fill={
                                            (props.data[type] > 50) ?
                                                `rgba(255,
                                                ${255 - (props.data[type] - 50) / 50 * 255},
                                                ${255 - (props.data[type] - 50) / 50 * 255}, 0.5)`
                                                :
                                                `rgba(${(props.data[type]) / 50 * 255},
                                                255,
                                                ${(props.data[type]) / 50 * 255}, 0.5)`
                                        }
                                        />;
                                    }) : 0
                                }
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default IndexBreadthBlock;

