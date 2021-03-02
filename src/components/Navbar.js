import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';
// import DatePicker from 'react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';

const drawerWidth = 200;
const breakPoint = 'md';
const showDrawerBreakPoint = 'xs';
const minimumDate = {
    "year": 2021,
    "month": 1,
    "day": 1,
};
let today = new Date();
let minute = today.getMinutes();
let hour = today.getHours() * 100;
let time = hour + minute

today = {
    "year": today.getFullYear(),
    "month": today.getMonth() + 1,
    "day": time >= 1730 ? today.getDate() - 1 : today.getDate() - 1,
};

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up(showDrawerBreakPoint)]: {
            width: drawerWidth,
            flexShrink: 0,
            display: 'none',
        },
    },
    drawerPaper: {
        backgroundColor: '#060a12',
        width: drawerWidth,
        color: 'rgba(255, 255, 255, 0.87)'
    },

    menuButton: {
        [theme.breakpoints.up(breakPoint)]: {
            display: 'none',
        },
    },
    appBar: {
        backgroundColor: '#060a12',
        alignItems: 'center',
    },
    homeButton: {
        [theme.breakpoints.up(breakPoint)]: {
            marginRight: theme.spacing(4),
            // marginLeft: theme.spacing(24),
        },
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(0),
        // marginLeft: 'auto',
    },
    homeIcon: {
        marginRight: theme.spacing(2),
    },
    homeText: {
        fontWeight: 700,
    },
    datePicker: {
        [theme.breakpoints.up(showDrawerBreakPoint)]: {
            display: 'none',
        },
        [theme.breakpoints.up(breakPoint)]: {
            display: 'block',
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
    },
    maButton: {
        [theme.breakpoints.up(showDrawerBreakPoint)]: {
            display: 'none',
        },
        [theme.breakpoints.up(breakPoint)]: {
            display: 'block',
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(0),
    },
    maIcon: {
        marginRight: theme.spacing(2),
    },
    maText: {
        fontWeight: 500,
    },
    drawerMAButton: {
        [theme.breakpoints.up(breakPoint)]: {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
        marginRight: theme.spacing(0),
        marginLeft: theme.spacing(0),
    },
    drawerMAIcon: {
        marginRight: theme.spacing(2),
    },
    drawerMAText: {
        textAlign: 'left',
        fontWeight: 500,
    },

    content: {
        color: 'white',
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    icon: {
        color: 'white',
    },
}));


function ResponsiveDrawer(props) {
    const classes = useStyles();
    const maTypes = ['ma5', 'ma10', 'ma20', 'ma60'];
    const { window } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    function handleClick(event, maType) {
        props.maOnChange(maType);
    }

    const handleDateChange = (date) => {
        props.dateOnChange(date);
    };

    const handleHomeClick = () => {
        props.dateOnChange(today);
    };

    const renderCustomInput = ({ ref }) => (
        <input
            readOnly
            ref={ref} // necessary
            placeholder="custom input"
            // value={selectedDate ? `✅: ${selectedDate.year}/${selectedDate.month}/${selectedDate.day}` : ''}
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

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <List>
                {
                    maTypes.map((maType) => {
                        return <ListItem button key={maType}>
                            <Button
                                value={maType}
                                style={{
                                    color: maType === props.maType ?
                                        'rgba(50, 200, 200, 0.87)' :
                                        'rgba(255, 255, 255, 0.6)'
                                }}
                                color="inherit"
                                edge="start"
                                className={classes.drawerMAButton}
                                onClick={(e) => handleClick(e, maType)}
                            >
                                <Typography variant="subtitle1" noWrap className={classes.drawerMAText}>
                                    {maType}
                                </Typography>
                            </Button></ListItem>
                    })
                }
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <Button
                        color="inherit"
                        edge="start"
                        className={classes.homeButton}
                        onClick={handleHomeClick}
                    >
                        <TimelineIcon className={classes.homeIcon} />
                        <Typography variant="h6" noWrap className={classes.homeText}>
                            台股市場寬度圖
                        </Typography>
                    </Button>
                    <div className={classes.datePicker}>
                        <DatePicker
                            minimumDate={minimumDate}
                            maximumDate={today}
                            value={props.dateObject}
                            onChange={handleDateChange}
                            renderInput={renderCustomInput}
                            inputPlaceholder={props.dateString}
                            // disabledDays={DISABLEDDAYS}
                            shouldHighlightWeekends
                        />
                    </div>
                    {
                        maTypes.map((maType) => {
                            return <Button
                                value={maType}
                                key={maType}
                                style={{
                                    color: maType === props.maType ?
                                        'rgba(50, 200, 200, 0.87)' :
                                        'rgba(255, 255, 255, 0.6)'
                                }}
                                color="inherit"
                                edge="start"
                                className={classes.maButton}
                                onClick={(e) => handleClick(e, maType)}
                            >
                                <Typography variant="subtitle1" noWrap className={classes.maText}>
                                    {maType}
                                </Typography>
                            </Button>
                        })
                    }
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden xsUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;












