import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ProductsCatalog from './InfoCatalogs/ProductsCatalog';
import DepartmentCatalog from './InfoCatalogs/DepartmentCatalog';
import FileUpload from './InfoCatalogs/FileUpload';

const styles = (theme: Theme) => createStyles ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: '1px solid rgb(163, 174, 236)',
  },
  tabsIndicator: {
    backgroundColor: 'rgb(163, 174, 236)',
  },
  tabRoot: {
    minWidth: 72,
    marginRight: theme.spacing.length * 4,
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.length * 3,
  },
});

interface State {
  value?: number;     
}
interface Props extends WithStyles<typeof styles> {
  
}

class InfoCatalog extends React.Component<Props,State,any> {
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
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Изделия"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Группа рассылки"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Отделы"
          />
        </Tabs>        
        <Typography className={classes.typography}>
          {value === 0 && <ProductsCatalog />}
          {value === 1 && <FileUpload />}
          {value === 2 && <DepartmentCatalog />}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(InfoCatalog);
