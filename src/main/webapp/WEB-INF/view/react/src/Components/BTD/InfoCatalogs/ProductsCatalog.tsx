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
import { connect } from 'react-redux';
import {ApplicationState} from '../../../reducers';

const styles = (theme: Theme) => createStyles ({

  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: '70vh',
  }
});

interface State {
  selectedIndex?: number;
  productsData?: any[any];
  
  open?: boolean;
  editeId?: number;
  editedName?: string;
  isNew?: boolean;
  errorMess?: string;   
}
interface Props extends WithStyles<typeof styles> {
  token?: string;
}

class ProductsCatalog extends React.Component<Props,State,any> {

  state = {
    selectedIndex: 1,
    productsData: [],
    
    open: false,
    editeId: 0,
    editedName:'',
    isNew: true,
    errorMess: ''   
  };

  componentDidMount() {  // - выполняется при каждом отображении при переходе по табам
    // - разовое заполнение справочных данных -
    this.selectInfArray();

  }

  selectInfArray = () => {
    let result;       
    result = axios({
      method: 'get',
      url: process.env.PUBLIC_URL+'/product',
      headers: {
        Authorization: this.props.token
      }
    });        
    result 
    .then(res => {
      this.setState({productsData: res.data});
    })
    .catch(err => console.log(err));    

    result = axios({
      method: 'get',
      url: process.env.PUBLIC_URL+'/productStream',
      headers: {
        Authorization: this.props.token
      }
    });        
    result 
    .then(res => {
      //this.setState({productsData: res.data});
    })
    .catch(err => console.log(err));    
  }

  handleListItemClick = (event, index, id) => {
    this.setState({ selectedIndex: index });
  };

  // - редактирование записи
  editeDocument = data => () => {        
    this.setState({ editeId: data.id });    
    this.setState({ editedName: data.name });
    this.setState({ isNew: false });
  
    this.setState({ open: true });
  }  
  
  // - добавление записи
  addDocument = data => () => {        
    this.setState({ editedName: '' });
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
      url: process.env.PUBLIC_URL+'/product/delete',
      headers: {
        Authorization: this.props.token
      },
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
        url: process.env.PUBLIC_URL+'/product/update',
        headers: {
          Authorization: this.props.token
        },
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
    else {

      result = axios({
        method: 'post',
        url: process.env.PUBLIC_URL+'/product/add',
        headers: {
          Authorization: this.props.token
        },
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
    const { productsData } = this.state;

    return (
      <div >
      <table>
        <tbody>
        <tr>
          <td>
          <List component="nav" className={classes.root} >

            {productsData.map(row => {
              return (
                <ListItem
                  button
                  selected={this.state.selectedIndex === 2}
                  onClick={event => this.handleListItemClick(event, 2, row.id)}
                >
                  <ListItemText primary= {row.name} />
                  <button onClick={this.editeDocument(row)}>Ред.</button>
                </ListItem>
              );
            })}
          </List>
          </td>
          <td>
            <div>
              <Button  variant="contained"  size="small" onClick={this.addDocument(undefined)}>
                 Добавить изделие
              </Button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>


      <Dialog
          open={this.state.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <table>
              <tbody>
              <tr>
                  <td>
                    <div>
                      <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '11pt', paddingLeft: '15px'}}>Номер изделия:</h3>
                        <TextField
                          value={this.state.editedName}                      
                          variant="outlined"
                          onChange={(e) => this.setState({ editedName: e.target.value })}
                        />                      
                    </div>
                  </td>
              </tr>
              <tr>
                  <td>
                    <div>
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
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>           
          </DialogContent>

          <DialogActions>
            { this.state.isNew
                ? <div></div>
                : <Button onClick={this.deleteDocument} >
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

const mapStateToProps = (store: ApplicationState) => {
  return {
    errorText: store.user.errorText,
    token: store.user.token
  }
}

export default withStyles(styles)(
  connect(mapStateToProps,undefined)(ProductsCatalog));
