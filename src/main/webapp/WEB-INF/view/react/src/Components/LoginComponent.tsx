import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import {ApplicationState} from '../reducers';


const styles = theme => ({
  root: {
    width: '100%',
  }
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250,
    },
  },
};


interface State {
  open?: boolean;
  login?: string;
  password?: string;
}
interface Props {
  open?: boolean;
  handleParentChange?: any;
  onLogin?: any;
  errorText?: string;
  token?: string;
}

class LoginComponent extends React.Component<Props,State,any> {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      login: '',
      password: ''
    };    
  }

  UNSAFE_componentWillReceiveProps(nextProps:Props) {
    
    if(nextProps.open)     
      this.setState({open: nextProps.open});
  }  

  closeLogin = () => {    
    this.setState({ open: false });
    this.props.handleParentChange({ openLogin: false });  // - изменения придут автоматически
  }
  
  login() {
    // get password and email from the props
    const login = this.state.login;
    const password = this.state.password;
    // submit login action with email and password
    this.props.onLogin(login, password);
  }


  render() {
    const { onLogin, errorText, token } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open && token==undefined}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <table>
              <tbody>
                <tr>
                  <td>
                    <TextField
                      label="Login"
                      id="outlined-password-input"
                      variant="outlined"
                      onChange={(e) => this.setState({ login: e.target.value })}
                    />
                  </td>
                </tr>
                <tr><p></p></tr>
                <tr>
                  <td>
                    <TextField
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      variant="outlined"
                      onChange={(e) => this.setState({ password: e.target.value })}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                      { errorText!=''
                         ? <TextField
                             error
                             id="outlined-error"
                             label="Error"
                             value={errorText}
                             margin="normal"
                             variant="outlined"
                           />
                         : <div></div>
                      }
                  </td>
                </tr>

              </tbody>
            </table>            

          </DialogContent>
          <DialogActions>
            <table>
              <tbody>
              <tr>
                <td>
                    <Button variant="contained" onClick={this.closeLogin} style={{ margin: '10px' }} color="primary">   
                      Отмена
                    </Button>
                    <Button variant="contained" onClick={this.login.bind(this)} style={{ margin: '10px' }} color="primary" autoFocus>
                      Вход
                    </Button>
                </td>
              </tr>
              </tbody>
            </table>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
  
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onLogin: (login, password) => dispatch({ type: "AUTH_CALL_REQUEST", payload : { login: login, password: password } })
  }
}
const mapStateToProps = (store: ApplicationState) => {
  return {
    errorText: store.user.errorText,
    token: store.user.token
  }
}


export default withStyles(styles)(
  connect(mapStateToProps,mapDispatchToProps)(LoginComponent));
