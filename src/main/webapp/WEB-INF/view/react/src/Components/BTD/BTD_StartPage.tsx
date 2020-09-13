import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import RegistrationBook from './RegistrationBook';
import AccountingBook from './AccountingBook';
import InfoCatalogs from './InfoCatalogs';
import Reports from './Reports';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = (theme: Theme) => createStyles ({
  content: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar
});

interface State {
  value?: number;     
}
interface Props extends WithStyles<typeof styles> {
  
}

class BTD_StartPage extends React.Component<Props,State,any> {

  state = {
    value: 0,
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.content}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <LinkTab label="Книги регистрации" href="page1" />
            <LinkTab label="Книги учёта" href="page2" />
            <LinkTab label="Ведение справочников" href="page3" />
            <LinkTab label="Отчёты" href="page4" />
          </Tabs>
        </AppBar>
        {value === 0 && <RegistrationBook />}
        {value === 1 && <TabContainer><AccountingBook /></TabContainer>}
        {value === 2 && <TabContainer><InfoCatalogs /></TabContainer>}
        {value === 3 && <TabContainer><Reports /></TabContainer>}
      </div>
    )
  }
}

export default withStyles(styles)(BTD_StartPage);