import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';

const styles = (theme: Theme) => createStyles ({

  root: {
    width: '40vw',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: '100%',
    paddingLeft: '25px'
  },
  textField: {
    marginLeft: '10px',
    marginRight: '10px'
  },
});

interface State {
  selectedIndex?: number;
  departmentsData?: any[any];
  departmentsExpand?: any[any];
  brigadesData?: any[any];
  kbstructsData?: any[any];

  open?: boolean;
  editeId?: number;
  editedName?: string;
  editedKoStruct?: string;
  isNew?: boolean;
  errorMess?: string;  
}
interface Props extends WithStyles<typeof styles> {
  
}

class DepartmentCatalog extends React.Component<Props,State,any> {

  state = {
    selectedIndex: 1,
    departmentsData: [],
    departmentsExpand: [],
    brigadesData: [],
    kbstructsData: [],

    open: false,
    editeId: 0,
    editedName:'',
    editedKoStruct:'',
    isNew: false,
    errorMess: ''   
  };

  componentDidMount() {  // - выполняется при каждом отображении при переходе по табам
    axios.get(process.env.PUBLIC_URL+'/kbstruct', {})
    .then(res => {
      this.setState({kbstructsData : res.data});
    })
    .catch(err => console.log(err));

    // - разовое заполнение справочных данных -
    this.selectInfArray();
  }

  selectInfArray = () => {
    axios.get(process.env.PUBLIC_URL+'/department', {})
    .then(res => {
      this.setState({departmentsData: res.data});

      this.setState({ departmentsExpand: [] });  // - по умолчанию скрываем структуру  
      var editeDepartmentsExpand = [];
      for (var i=0; i < res.data.length; i++)
          editeDepartmentsExpand[i] = { id : res.data[i].id, open : false};  
      this.setState({ departmentsExpand: editeDepartmentsExpand }); 
    })
    .catch(err => console.log(err));

    axios.get(process.env.PUBLIC_URL+'/brigade', {})
    .then(res => {
      this.setState({brigadesData : res.data});
    })
    .catch(err => console.log(err));
  }

  handleListItemClick = (event, index, id) => {
    this.setState({ selectedIndex: index });
    
    // - обновляем раскрытие
    var departmentsExpand_ = this.state.departmentsExpand;
    for (var i=0; i < departmentsExpand_.length; i++)
    if( departmentsExpand_[i].id === id )
    {
      let open = departmentsExpand_[i].open;
      if ( open )  open = false;
      else  open = true;
      departmentsExpand_[i].open = open;
    }
    this.setState({ departmentsExpand: departmentsExpand_ });
  };

  getShowType = ( id ) => {
    for (var i=0; i < this.state.departmentsExpand.length; i++)
    if( this.state.departmentsExpand[i].id === id )
    {
      return this.state.departmentsExpand[i].open;
    }
  };

  isContain = ( dep_id, drigade ) => {
    let contain = false;
    if(null!=drigade)
      if(null!=drigade.department)
        if(null!=drigade.department.id)
          if(dep_id==drigade.department.id)
            contain = true; 
   
    return contain;
  };

  // - редактирование записи
  editeDocument = data => () => {        
    this.setState({ editeId: data.id });    
    this.setState({ editedName: data.name });
    if(null!=data.kbStruct)
      this.setState({ editedKoStruct: data.kbStruct.id });
    else
      this.setState({ editedKoStruct: '' });
    this.setState({ isNew: false });
  
    this.setState({ open: true });
  }  
  
  // - добавление записи
  addDepartment = data => () => {        
    this.setState({ editedName: '' });
    this.setState({ editedKoStruct: '' });
    this.setState({ isNew: true });
  
    this.setState({ open: true });
  }  
  
  closeDocument = () => {    
    this.setState({ open: false });
    this.setState({ errorMess: '' })
  }

  deleteDocument = () => {  
    let result;       
    result = axios({
      method: 'post',
      url: process.env.PUBLIC_URL+'/vedomost/delete',
      params: {
          name: this.state.editedName,
          id: this.state.editeId
      }
    });       
    
    result 
    .then(res => {
      if(res.data!=='')
        this.setState({ errorMess: res.data })
      else  {
        this.setState({ open: false });        
    
        setTimeout(() => {
          this.selectInfArray();  
        }, 300);   
      }
    }).catch(error => {
       this.setState({ errorMess: error });
       console.log(error);
    });
  };

  saveDocument = () => { 
    let result;
    if(!this.state.isNew) {
      
      result = axios({
        method: 'post',
        url: process.env.PUBLIC_URL+'/department/update',
        params: {
            name: this.state.editedName,
            id: this.state.editeId,
            kbstructId: this.state.editedKoStruct
        }
      });       
      
      result 
      .then(res => {
        if(res.data!=='')
          this.setState({ errorMess: res.data })
        else  {
          this.setState({ open: false });        
      
          setTimeout(() => {
            this.selectInfArray();  
          }, 300);   
        }
      }).catch(error => {
         this.setState({ errorMess: error });
         console.log(error);
      });
    }
    else {

      result = axios({
        method: 'post',
        url: process.env.PUBLIC_URL+'/vedomost/add',
        params: {
            name: this.state.editedName,
            id: this.state.editeId
        }
      });       
      
      result 
      .then(res => {
        if(res.data!=='')
          this.setState({ errorMess: res.data })
        else  {
          this.setState({ open: false });        
      
          setTimeout(() => {
            this.selectInfArray();  
          }, 300);   
        }
      }).catch(error => {
         this.setState({ errorMess: error });
         console.log(error);
      });
    } 
  };

  render() {
    const { classes } = this.props;
    const { departmentsData } = this.state;
    return (
      <div >
        <tr>
          <td>
            <button style={{ width: '45px', height: 45, fontSize: '20pt'}} 
                    onClick={this.addDepartment(undefined)} >
              +
            </button>
          </td>
          <td>
          <List component="nav" className={classes.root} >

            {departmentsData.map(row => {
              var kbstruct = '';
              if(null!=row.kbStruct)
                kbstruct += "("+ row.kbStruct.name +")";  
              return (
                <div>
                  <ListItem
                    button
                    selected={true}
                    style={{ height:'20px' }}
                  >         
                    <Switch value="checkedF" color="default" onClick={event => this.handleListItemClick(event, 2, row.id)} />           
                    <ListItemText primary= {row.name} />
                    <ListItemText primary= {kbstruct} />
                    <button onClick={this.editeDocument(row)}>Ред.</button>
                  </ListItem>
                  
                  { this.getShowType(row.id)
                    ? <tr>
                        <td>
                          <button style={{ width: '30px', height: '30px', fontSize: '15pt'}} >
                            +
                          </button>
                        </td>
                        <td style={{ paddingLeft: '45px'}}>           
                          <List style={{ width: '20vw'}} >
                          {this.state.brigadesData.map(row_ => {                
                            if(this.isContain(row.id,row_))
                            return (
                              <ListItem 
                                style={{ height:'20px' }}
                              >
                                <ListItemText primary= {row_.name} />
                                <button onClick={this.editeDocument(row)}>Ред.</button>
                              </ListItem>
                            );
                          })}
                          </List>
                        </td>
                      </tr>
                    : <p></p>
                  }                      
                </div>                      
              );
            })}
          </List>
          </td>
        </tr>

      <Dialog
          open={this.state.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
              <tr>
                  <td>
                      <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '11pt', paddingLeft: '15px'}}>Название:</h3>
                        <TextField
                          value={this.state.editedName}                      
                          className={classes.textField}
                          variant="outlined"
                          onChange={(e) => this.setState({ editedName: e.target.value })}
                        />                      
                  </td>
                  <td >
                    <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '11pt', paddingLeft: '15px'}}>КО:</h3>
                    <FormControl style={{ paddingLeft: '15px' }}>
                      <Select
                        value={this.state.editedKoStruct}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { 
                            this.setState({ editedKoStruct: e.currentTarget.value });
                          } 
                        }
                        input={
                          <OutlinedInput 
                            labelWidth={200}
                          />
                        }
                      >
                      {this.state.kbstructsData.map(data => {
                        if( data.id!='0' )
                        return (
                          <MenuItem value={data.id} >{data.name}</MenuItem> 
                        );
                      })}    
                    </Select>
                    </FormControl>          
                  </td>
                </tr>
              <tr>
                      { this.state.errorMess!==''
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
                </tr>
          </DialogContent>

          <DialogActions>
            { this.state.isNew
                ? <div></div>
                : <Button  aria-label="Delete" onClick={this.deleteDocument} >
                    <DeleteIcon />
                  </Button>
            } 
            <Button variant="contained" onClick={this.closeDocument} color="primary">
              Отмена
            </Button>
            <Button variant="contained" onClick={this.saveDocument} color="primary" autoFocus>
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(DepartmentCatalog);