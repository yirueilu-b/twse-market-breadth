// import logo from './logo.svg';
// {/*<img src={logo} className="App-logo" alt="logo"/>*/}
import './App.css';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Navbar from './components/Navbar'
import BreadthPage from './components/BreadthPage'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#282c34',
        flexGrow: 1,
        padding: 30,
        minWidth: '100vw',
        minHeight: '100vh'
    },
}));


function App() {
    let today = new Date();
    let minute = today.getMinutes();
    let hour = today.getHours() * 100;
    let time = hour + minute

    today = {
        "year": 2021,
        "month": 2,
        "day": 22,
//        "year": today.getFullYear(),
//        "month": today.getMonth() + 1,
//        "day": time >= 1730 ? today.getDate() - 1 : today.getDate() - 1,
    };
    let inputDateString = String(today['year']) +
        String(today['month']).padStart(2, '0') +
        String(today['day']).padStart(2, '0');
    const classes = useStyles();
    const [dateObject, setDateObject] = React.useState(today);
    const [maType, setMAType] = React.useState("ma20");
    const [dateString, setDateString] = React.useState(inputDateString);

    function handleDateChange(newDate) {
        let inputDateString = String(newDate['year']) +
            String(newDate['month']).padStart(2, '0') +
            String(newDate['day']).padStart(2, '0');
        setDateObject(newDate);
        setDateString(inputDateString)
    }
    function handleMAChange(newMA) {
        setMAType(newMA);
    }

    React.useEffect(() => {

    }, []);
    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar dateOnChange={handleDateChange} dateObject={dateObject} dateString={dateString} maOnChange={handleMAChange} maType={maType} />
            <Container className={classes.root}>
                <BreadthPage dateOnChange={handleDateChange} dateObject={dateObject} dateString={dateString} maOnChange={handleMAChange} maType={maType} />
            </Container>
        </React.Fragment>
    );
}

export default App;
