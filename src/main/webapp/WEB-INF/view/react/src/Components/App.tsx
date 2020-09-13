import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Home from './BTD/Home';
import InfoCatalog from './BTD/InfoCatalogs';
import BTD_StartPage from './BTD/BTD_StartPage';
import LoginComponent from './LoginComponent';
import { Route, Switch } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';

import {ApplicationState} from '../reducers';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 240;

const styles = theme => createStyles({
  root: {
    display: 'flex'    
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    width: theme.spacing.unit * 7,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    weigth: '100vh',
    overflow: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
});

interface State {
  openLogin?: boolean;
  open?: boolean;
}
interface Props extends WithStyles<typeof styles> {
  setYearAction?: any;
  user?: string;
  fetching?: boolean;
  dog?: string;
  onRequestDog?: any;
  onLogin?: any;
  error?: string;
  token?: string;
}
class App extends React.Component<Props,State,any> {

  state = {
    openLogin: false,
    open: false,
  };

  componentDidMount() {
  }

  openLogin = () => {
    this.setState({ openLogin: true });
  }

  // Метод передаётся во вложенные компоненты 
  handleChange = (value) => {  
    this.setState(value);
  }
    
  // - tools window
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, fetching, dog, onRequestDog, onLogin, token, error } = this.props;
    let show;
    show = 
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap  className={classes.grow}>
              Информационные системы 
            </Typography>
            {token==undefined ? (
              <Button color="inherit" onClick={this.openLogin}>Вход</Button>
              ) : (
              <Button color="inherit" >Выход</Button>
            )}            
          </Toolbar>
        </AppBar>

        <header>
          <nav>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >

            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
              </IconButton>
            </div>          

            <Divider />
              <List>
                <ListItem button component={Link} to="/btd">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="БТД" />
                </ListItem>
                <ListItem button component={Link} to="/nnn" disabled= {token==undefined}>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="-справочники-" />
                </ListItem>
                <ListItem button disabled= {true}>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary="-2-" />
                </ListItem>              
              </List>
            <Divider />

              <List>
                <ListItem button disabled= {true}>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="-3-" />
                </ListItem>
              </List>
          </Drawer>
          </nav>
        </header>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography >
            <Switch>
              <Route path="/(btd|nnn)" render={({ location }) => (
          
                <Switch>
                  <Route path="/btd" component={Home} />
                  <Route path="/nnn" component={InfoCatalog} />
                  {/* ... */}
                </Switch>
          
              )} />
              <Route path="/" component={Home} />
            </Switch>        
          </Typography>
        </main>
      
      </div>;
    
    return (
      <div>
        {show} 

        <LoginComponent open={this.state.openLogin}
                  handleParentChange={this.handleChange} />
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onLogin: () => dispatch({ type: "AUTH_CALL_REQUEST", payload : { login: 'user', password: 'user' } })
  }
}
const mapStateToProps = (store: ApplicationState) => {
  return {
    token: store.user.token
  }
}

export default withRouter(
   connect(mapStateToProps,mapDispatchToProps)(withStyles(styles, { withTheme: true })(App))
);