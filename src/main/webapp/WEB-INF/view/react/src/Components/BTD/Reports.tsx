import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = (theme: Theme) => createStyles ({

  root: {
    width: '100%'
  },  
  liststyle: {
    maxWidth: '200px',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: '30vh'
  },
  heading: {
    minWidth: '120px'
  },
  formControl: {
    margin: theme.spacing.length,
    minWidth: '120px',
    height:'30px'
  },
});

interface State {
  productsData?: any[any];
  documentTypesData?: any[any];
  departmentsData?: any[any];
  kbsData?: any[any];

  checkedDocTypes?: any[any];
  selectedAllDocTypes?: boolean;
  checkedKBs?: any[any];
  selectedAllKBs?: boolean;
  checkedDepartments?: any[any];
  selectedAllDepartments?: boolean;
  checkedProducts?: any[any];
  selectedAllProducts?: any[any];

  selectedMonth?: string;
  currentDate?: string;

  editedDataFrom?: string;
  editedDataTo?: string;
  errorMess?: string;     
}
interface Props extends WithStyles<typeof styles> {
  
}

class Reports extends React.Component<Props,State,any> {
 
  constructor(props) {
    super(props);
    
    var today = new Date();
    var date = today.getFullYear() + '-';
      if((today.getMonth() + 1)<10) date+= '0';  
          date+= (today.getMonth() + 1)+ '-';
      if(today.getDate()<10) date+= '0';  
          date+= today.getDate();

    this.state = {

      productsData: [ ],
      documentTypesData: [ ],
      departmentsData: [ ],
      kbsData: [ ],

      checkedDocTypes: [],
      selectedAllDocTypes: false,
      checkedKBs: [],
      selectedAllKBs: false,
      checkedDepartments: [],
      selectedAllDepartments: false,
      checkedProducts: [],
      selectedAllProducts: false,

      selectedMonth: 'Январь',
      currentDate: date,

      editedDataFrom: '2015-01-01',
      editedDataTo: date,
      errorMess: ''   
    };   
  }

  handleToggleAllDocTypes = value => () => {
    if(!this.state.selectedAllDocTypes) {
      const newChecked = [];
      for (let docType of this.state.documentTypesData)  {
        newChecked.push(docType.id);
      }
      this.setState({ checkedDocTypes: newChecked });        
      this.setState({ selectedAllDocTypes: true });        
    } 
    else {
      this.setState({ checkedDocTypes: [] });      
      this.setState({ selectedAllDocTypes: false });        
    }
  }
  handleToggleDocTypes = value => () => {
    const { checkedDocTypes } = this.state;
    const currentIndex = checkedDocTypes.indexOf(value);
    const newChecked = [...checkedDocTypes];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedDocTypes: newChecked,
    });
  };

  handleToggleAllProducts = value => () => {
    if(!this.state.selectedAllProducts) {
      const newChecked = [];
      for (let product of this.state.productsData)  {
        newChecked.push(product.id);
      }
      this.setState({ checkedProducts: newChecked });        
      this.setState({ selectedAllProducts: true });        
    } 
    else {
      this.setState({ checkedProducts: [] });      
      this.setState({ selectedAllProducts: false });        
    }
  }  
  handleToggleProducts = value => () => {
    const { checkedProducts } = this.state;
    const currentIndex = checkedProducts.indexOf(value);
    const newChecked = [...checkedProducts];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedProducts: newChecked,
    });
  };

  handleToggleAllKBs = value => () => {
     
    if(!this.state.selectedAllKBs) {
      const newChecked = [];
      for (let kb of this.state.kbsData)  {
        newChecked.push(kb.id);
      }
      this.setState({ checkedKBs: newChecked });        
      this.setState({ selectedAllKBs: true });

      // - и отделы ---
      const newCheckedDep = [];
      for (let department of this.state.departmentsData) 
      if(department.kbStruct!==undefined && department.kbStruct!==null) 
        newCheckedDep.push(department.id);
      this.setState({ checkedDepartments: newCheckedDep });                 
    } 
    else {
      this.setState({ checkedKBs: [] });      
      this.setState({ selectedAllKBs: false });
      this.setState({ checkedDepartments: [] });   
    }
  }  
  
  handleToggleAllDepartments = value => () => {
    if(!this.state.selectedAllDepartments) {
      const newChecked = [];
      for (let department of this.state.departmentsData)  {
        newChecked.push(department.id);
      }
      this.setState({ checkedDepartments: newChecked });        
      this.setState({ selectedAllDepartments: true });        
    } 
    else {
      this.setState({ checkedDepartments: [] });      
      this.setState({ selectedAllDepartments: false });        
    }
  }  

  handleToggleKBs = value => () => {
    const { checkedKBs, checkedDepartments } = this.state;
    const currentIndex = checkedKBs.indexOf(value);
    const newChecked = [...checkedKBs];
    const newCheckedDep = [...checkedDepartments];

    if (currentIndex === -1) {
      newChecked.push(value);
      // - выделяем соответствующие отделы
      for (let department of this.state.departmentsData) 
        if(department.kbStruct!==undefined && department.kbStruct!==null) 
          if(department.kbStruct.id === value) 
            newCheckedDep.push(department.id);            
    } else {
      newChecked.splice(currentIndex, 1);
      // - отменяем выделенные соответствующие отделы
      for (let department of this.state.departmentsData) 
        if(department.kbStruct!==undefined && department.kbStruct!==null) 
          if(department.kbStruct.id === value) 
            newCheckedDep.splice(newCheckedDep.indexOf(department.id),1);          
    }

    this.setState({
      checkedKBs: newChecked,
      checkedDepartments: newCheckedDep 
    });
  };

  handleToggleDepartments = value => () => {
    const { checkedDepartments } = this.state;
    const currentIndex = checkedDepartments.indexOf(value);
    const newChecked = [...checkedDepartments];
     
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedDepartments: newChecked,
    });
  };

  componentDidMount() {  // - выполняется при каждом отображении при переходе по табам
    // - разовое заполнение справочных данных -
    axios.get(process.env.PUBLIC_URL+'/product', {})
    .then(res => {
      this.setState({productsData: res.data});
    })
    .catch(err => console.log(err));

    axios.get(process.env.PUBLIC_URL+'/documentType', {})
    .then(res => {
      this.setState({documentTypesData : res.data});
    })
    .catch(err => console.log(err));  

    axios.get(process.env.PUBLIC_URL+'/department', {})
    .then(res => {
      this.setState({departmentsData : res.data});
    })
    .catch(err => console.log(err));

    axios.get(process.env.PUBLIC_URL+'/kbstruct', {})
    .then(res => {
      this.setState({kbsData : res.data});
    })
    .catch(err => console.log(err));  
  }

  productReport = () => {
    //productReport?dateFilter=2012-07-10&dateFilter=2018-11-16&productFilter=220&actualDep=24&actualTypeDoc=2
    let url = process.env.PUBLIC_URL+'/productReport?dateFilter='+ this.state.editedDataFrom +'&dateFilter=' + this.state.editedDataTo;
    for (let product of this.state.checkedProducts) {
      url += '&productFilter=' + product;      
    }
    for (let department of this.state.checkedDepartments) {
      url += '&actualDep=' + department;      
    }
    for (let docType of this.state.checkedDocTypes) {
      url += '&actualTypeDoc=' + docType;      
    }

    window.open(url, '', '');
  }

  monthReport = () => {
    //monthReport?dateFilter=2012-07-10&dateFilter=2018-11-20&param_2=&param_3=&param_4=&behindType=week&actualMonth=%D0%AF%D0%BD%D0%B2%D0%B0%D1%80%D1%8C
    window.open(process.env.PUBLIC_URL+'/monthReport?dateFilter='+ this.state.editedDataFrom +'&dateFilter=' + this.state.editedDataTo + '&param_2=&param_3=&param_4=&behindType=month&actualMonth=' + this.state.selectedMonth, '', '');
  }
  
  chartReport = () => {
    //chartReport?dateFilter=2013-08-14&dateFilter=2018-11-20&actualMonth=Январь
    window.open(process.env.PUBLIC_URL+'/chartReport?dateFilter='+ this.state.editedDataFrom +'&dateFilter=' + this.state.editedDataTo + '&actualMonth=' + this.state.selectedMonth, '', '');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography >Отчёт по изделию</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <div>
                <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '10pt', paddingLeft: '15px'}}>Дата c:</h3>
                  <TextField
                    id="date"
                    label=""
                    type="date"
                    defaultValue = {this.state.editedDataFrom}                   
                    onChange={(e) => this.setState({ editedDataFrom: e.target.value })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> 
                  <h3> по:</h3>
                  <TextField
                    id="date"
                    label=""
                    type="date"
                    defaultValue= {this.state.editedDataTo}
                    onChange={(e) => this.setState({ editedDataTo: e.target.value })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> 
               </div>

            <table>
              <tbody>
                <tr>       
                  <td>
                    <h3 style={{color:'#4c5b65', fontSize:'10pt'}}>Типы документов:</h3>
                    <FormControlLabel
                      style={{marginLeft: '17px'}}
                      control={
                        <Checkbox
                          onClick={this.handleToggleAllDocTypes(undefined)}
                          color="primary"
                          />
                      }
                      label=" - все"
                    />
                    <List className={classes.liststyle}>
                      {this.state.documentTypesData.map(value => (
                        <ListItem key={value.id} role={undefined} dense button onClick={this.handleToggleDocTypes(value.id)}>
                          <Checkbox
                            checked={this.state.checkedDocTypes.indexOf(value.id) !== -1}
                            style={{ width: 0, height: 0 }}
                            color="primary"
                          />
                        <ListItemText primary={value.name} style={{ fontSize: 12 }} />
                        </ListItem>
                      ))}
                    </List>
                  </td>           
                  <td>
                    <h3 style={{ color:'#4c5b65', fontSize: '10pt'}}>Изделия:</h3>
                    <FormControlLabel
                      style={{marginLeft: '17px'}}
                      control={
                        <Checkbox
                          onClick={this.handleToggleAllProducts(undefined)}
                          style={{ width: 0, height: 0}}
                          color="primary"
                          />
                      }
                      label=" - все"
                    />
                    <List className={classes.liststyle}>
                      {this.state.productsData.map(value => (
                        <ListItem key={value.id} role={undefined} dense button onClick={this.handleToggleProducts(value.id)}>
                          <Checkbox
                            checked={this.state.checkedProducts.indexOf(value.id) !== -1}
                            style={{ width: 0, height: 0 }}
                            color="primary"
                          />
                        <ListItemText primary={value.name} style={{ fontSize: 12 }} />
                        </ListItem>
                      ))}
                    </List>
                  </td>
                  <td>
                    <h3 style={{color:'#4c5b65', fontSize:'10pt'}}>КБ:</h3>
                    <FormControlLabel
                      style={{marginLeft: '17px'}}
                      control={
                        <Checkbox
                          onClick={this.handleToggleAllKBs(undefined)}
                          style={{ width: 0, height: 0}}
                          color="primary"
                          />
                      }
                      label=" - все"
                    />
                    <List className={classes.liststyle}>
                      {this.state.kbsData.map(value => (
                        <ListItem key={value.id} role={undefined} dense button onClick={this.handleToggleKBs(value.id)}>
                          <Checkbox
                            checked={this.state.checkedKBs.indexOf(value.id) !== -1}
                            style={{ width: 0, height: 0 }}
                            color="primary"
                          />
                        <ListItemText primary={value.name} style={{ fontSize: 12 }} />
                        </ListItem>
                      ))}
                    </List>
                  </td>
                  <td>
                    <h3 style={{color:'#4c5b65', fontSize:'10pt'}}>Отдел:</h3>
                    <FormControlLabel
                      style={{marginLeft: '17px'}}
                      control={
                        <Checkbox
                          onClick={this.handleToggleAllDepartments(undefined)}
                          style={{ width: 0, height: 0}}
                          color="primary"
                          />
                      }
                      label=" - все"
                    />
                    <List className={classes.liststyle}>
                      {this.state.departmentsData.map(value => (
                        <ListItem key={value.id} role={undefined} dense button onClick={this.handleToggleDepartments(value.id)}>
                          <Checkbox
                            checked={this.state.checkedDepartments.indexOf(value.id) !== -1}
                            style={{ width: 0, height: 0 }}
                            color="primary"
                          />
                        <ListItemText primary={value.name} style={{ fontSize: 12 }} />
                        </ListItem>
                      ))}
                    </List>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      { this.state.errorMess!=''
                         ? <TextField
                             error
                             id="outlined-error"
                             label="Error"
                             defaultValue={this.state.errorMess}
                             margin="normal"
                             variant="outlined"
                           />
                         : <div></div>
                      }
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
              <tr>
                <td>
                  <div>
                    <Button onClick={this.productReport}>
                      Печать
                    </Button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>

            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Отчёт по дате</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            <table>
              <tbody>
              <tr>
                  <td>
                    <div>
                      <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '10pt', paddingLeft: '15px'}}>Дата c:</h3>
                      <TextField
                        id="date"
                        label=""
                        type="date"
                        defaultValue= {this.state.editedDataFrom}
                        onChange={(e) => this.setState({ editedDataFrom: e.target.value })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      /> 
                      <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '10pt', paddingLeft: '15px'}}> по:</h3>
                      <TextField
                        id="date"
                        label=""
                        type="date"
                        defaultValue= {this.state.editedDataTo}
                        onChange={(e) => this.setState({ editedDataTo: e.target.value })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      /> 
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '10pt', paddingLeft: '15px'}}>Месяц:</h3>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={this.state.selectedMonth}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { 
                            this.setState({ selectedMonth: e.currentTarget.value });
                          }}
                        >
                        {['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'].map(data => {
                          return (
                           <MenuItem value={data} >{data}</MenuItem> 
                          );
                        })}    
                        </Select>
                      </FormControl>          
                    </div>          
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      { this.state.errorMess!=''
                         ? <TextField
                             error
                             id="outlined-error"
                             label="Error"
                             defaultValue={this.state.errorMess}
                             margin="normal"
                             variant="outlined"
                           />
                         : <div></div>
                      }
                    </div>
                  </td>
                </tr>                
                </tbody>
            </table>
            <Button  onClick={this.monthReport}>
              Печать
            </Button>               
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>График по дате</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            <table>
              <tbody>
              <tr>
                  <td>
                    <div>
                      <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '10pt', paddingLeft: '15px'}}>Дата c:</h3>
                      <TextField
                        id="date"
                        label=""
                        type="date"
                        defaultValue= {this.state.editedDataFrom}
                        onChange={(e) => this.setState({ editedDataFrom: e.target.value })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      /> 
                      <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '10pt', paddingLeft: '15px'}}> по:</h3>
                      <TextField
                        id="date"
                        label=""
                        type="date"
                        defaultValue= {this.state.editedDataTo}
                        onChange={(e) => this.setState({ editedDataTo: e.target.value })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      /> 
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '10pt', paddingLeft: '15px'}}>Месяц:</h3>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={this.state.selectedMonth}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { 
                            this.setState({ selectedMonth: e.currentTarget.value });
                          }}
                        >
                        {['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'].map(data => {
                          return (
                           <MenuItem value={data} >{data}</MenuItem> 
                          );
                        })}    
                        </Select>
                      </FormControl>          
                    </div>          
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      { this.state.errorMess!=''
                         ? <TextField
                             error
                             id="outlined-error"
                             label="Error"
                             defaultValue={this.state.errorMess}
                             margin="normal"
                             variant="outlined"
                           />
                         : <div></div>
                      }
                    </div>
                  </td>
                </tr>                
                </tbody>
            </table>
            <Button onClick={this.chartReport}>
              Печать
            </Button>
            </Typography>
          </ExpansionPanelDetails>          
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Reports);