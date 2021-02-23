import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IndexBreadthBlock from './IndexBreadthBlock'
import IndexPlotBlock from './IndexPlotBlock'
import BreadthBlock from './BreadthBlock'
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';

import Typography from '@material-ui/core/Typography';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';

const BASE_URL = "https://yirueilu.pythonanywhere.com/"
const TECH_KEYS = ['電子零組件業', '電機機械', '電器電纜', '電腦及週邊設備業', '半導體業', '其他電子業', '通信網路業', '光電業', '電子通路業', '資訊服務業',];
const TRAD_KEYS = ['水泥工業', '食品工業', '塑膠工業', '建材營造業', '汽車工業', '其他業', '紡織纖維', '貿易百貨業', '生技醫療業', '化學工業', '玻璃陶瓷', '造紙工業', '鋼鐵工業', '橡膠工業', '航運業', '油電燃氣業', '觀光事業', '金融保險業'];
const ALL_KEYS = ['大盤',];
const breakPoint = 'md';
const showDrawerBreakPoint = 'xs';
const minimumDate = {
    "year": 2021,
    "month": 1,
    "day": 1,
};
let today = new Date();
today = {
    "year": today.getFullYear(),
    "month": today.getMonth() + 1,
    "day": today.getDate() - 1,
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 40,
        [theme.breakpoints.up('md')]: {
            marginTop: 0,
            padding: 80,
        },
        [theme.breakpoints.up('xl')]: {
            marginTop: 0,
            paddingLeft: '15vw',
            paddingRight: '15vw',
        },
        minHeight: '100vh'
    },
    error_block: {
        marginTop: 30,
    },
    error: {
        color: 'rgba(187,187,187,0.4878)',
        fontWeight: 600,
        textAlign: 'center'
    },

    datePicker: {
        textAlign: 'center',
        [theme.breakpoints.up(showDrawerBreakPoint)]: {
            display: 'block',
        },
        [theme.breakpoints.up(breakPoint)]: {
            display: 'none',
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
    },
}));


function BreadthPage(props) {
    const classes = useStyles();
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [data_all, setAllData] = React.useState([]);
    const [data_tech, setTechData] = React.useState([]);
    const [data_trad, setTradData] = React.useState([]);
    const [checked, setChecked] = React.useState(true);
    const [index_info, setIndexInfo] = React.useState({});
    const [index_month, setIndexMonth] = React.useState([]);


    const handleDateChange = (date) => {
        props.dateOnChange(date);
    };
    const renderCustomInput = ({ ref }) => (
        <input
            readOnly
            ref={ref} // necessary
            placeholder="custom input"
            // value={selectedDate ? `✅: ${selectedDate.year}/${selectedDate.month}/${selectedDate.day}` : ''}
            // value={`${selectedDate.year}/${String(selectedDate.month).padStart(2, '0')}/${String(selectedDate.day).padStart(2, '0')}`}
            value={`${props.dateObject.year}/${String(props.dateObject.month).padStart(2, '0')}/${String(props.dateObject.day).padStart(2, '0')}`}
            style={{
                marginLeft: 'auto',
                width: 150,
                textAlign: 'center',
                padding: 4,
                fontWeight: 500,
                fontSize: '1.1rem',
                border: '0px solid #9c88ff',
                // borderRadius: '100px',
                // boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
                color: 'rgba(50, 200, 200, 0.87)',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                outline: 'none',
            }}
            className="my-custom-input-class" // a styling class
        />
    );
    React.useEffect(() => {
        setChecked((prev) => !prev);
        // setChecked((prev) => !prev);
        fetch(BASE_URL + props.dateString)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((result) => {
                // console.log(result)
                if (hasOwnProperty.call(result, 'ERROR')) {
                    console.log(hasOwnProperty.call(result, 'ERROR'));
                    return
                }
                let arr_tech = TECH_KEYS.map(key => {
                    return {
                        "category": key,
                        // "breadth": Math.round(result[key]['summary'][props.selectedMA] * 100) / 100
                        "breadth": parseFloat(result[key]['summary'][props.maType].toFixed(2))
                    };
                });
                let arr_trad = TRAD_KEYS.map(key => {
                    return {
                        "category": key,
                        // "breadth": Math.round(result[key]['summary'][props.selectedMA] * 100) / 100
                        "breadth": parseFloat(result[key]['summary'][props.maType].toFixed(2))
                    };
                });
                let arr_all = ALL_KEYS.map(key => {
                    return {
                        "category": key,
                        "ma5": parseFloat(result[key]['summary']['ma5'].toFixed(2)),
                        "ma10": parseFloat(result[key]['summary']['ma10'].toFixed(2)),
                        "ma20": parseFloat(result[key]['summary']['ma20'].toFixed(2)),
                        "ma60": parseFloat(result[key]['summary']['ma60'].toFixed(2))
                    };
                });
                setIsLoaded(true);
                setTechData(arr_tech);
                setTradData(arr_trad);
                setAllData(arr_all);
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            ).then(() => setChecked((prev) => !prev));

        fetch(BASE_URL + "index-info-" + props.dateString)
            .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((result) => {
                setIndexInfo(result);
                setIsLoaded(true);
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
        fetch(BASE_URL + "index-month")
            .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((result) => {
                setIndexMonth(result);
                setIsLoaded(true);
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [props.maType, props.dateObject, props.dateString]);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Grid container spacing={3} className={classes.root} justify="center" alignItems="center">
                <Grid container item xs={12} className={classes.datePicker} justify="center" alignItems="center">
                    <DatePicker
                        minimumDate={minimumDate}
                        maximumDate={today}
                        value={props.dateObject}
                        onChange={handleDateChange}
                        renderInput={renderCustomInput}
                        inputPlaceholder={props.dateString}
                        // TODO: Set disable days by calling API
                        // disabledDays={DISABLEDDAYS}
                        shouldHighlightWeekends
                    />
                </Grid>
                {index_info['close'] !== undefined ?
                    <React.Fragment>
                        <Grid container item xs={12} lg={5}>
                            <IndexBreadthBlock data={data_all[0]} info={index_info} />
                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <IndexPlotBlock data={index_month} />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
                        </Grid>

                        <Fade in={checked}>
                            <Grid item xs={12}>
                                <BreadthBlock data={data_tech} title={"科技產業"} />
                            </Grid>
                        </Fade>

                        <Grid item xs={12}>
                            <Divider style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
                        </Grid>

                        <Fade in={checked}>
                            <Grid item xs={12}>
                                <BreadthBlock data={data_trad} title={"傳統產業"} />
                            </Grid>
                        </Fade>
                    </React.Fragment> :
                    <React.Fragment>
                        <Fade in={checked}>
                            <Grid item xs={12}>
                                <Grid container item xs={12} justify="center"
                                    alignItems="center" className={classes.error_block}>
                                    <Typography variant="h4" gutterBottom className={classes.error}>
                                        查無 {index_info["ERROR"]} 之資料，請嘗試其他日期
                                    </Typography>
                                    <Typography variant="h4" gutterBottom className={classes.error}>
                                        Oops! Data not found, {index_info["ERROR"]} is not a valid date. Please try another date.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Fade>
                    </React.Fragment>}
            </Grid>
        );
    }
}

export default BreadthPage;

