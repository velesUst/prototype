import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import {ApplicationState} from '../../../reducers';

const styles = (theme: Theme) => createStyles ({

});

interface State {
  file?: any;
}
interface Props extends WithStyles<typeof styles> {
  token?: string;
}

class FileUpload extends React.Component<Props,State,any> {
  constructor (props) {
    super(props);
    this.state = {
      file: null
    };
  }

  submitFile = (event) => {
    let result;
    const bodyFormData = new FormData();
      bodyFormData.append('file', this.state.file[0]);

    result = axios({
      method: 'POST',
      url: process.env.PUBLIC_URL+`/upload`,      
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: this.props.token
      },
      data: bodyFormData
    });       
  
    result 
    .then(res => {
      console.log("file uploaded"+res.data);
    }).catch(error => {
      console.log("Error in upload "+error);
    });

  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
  }

  // - выгрузка файла
  dowloadFile = (event) => {     
    let result;
    result = axios({
      method: 'get',
      url: process.env.PUBLIC_URL+`/download`,      
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: this.props.token
      },
      params: {
        type: 'external'
      },
      responseType: 'arraybuffer' 
    });       
    
      result 
      .then(res => {
        // - открытие файла
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.xls');
        document.body.appendChild(link);
        link.click();
      }).catch(error => {
        console.log("file upload - "+error);
      });
    }

  render () {
    return (
      <div>
        <div>
          <input type='file' onChange={this.handleFileUpload} />
          <button onClick={this.submitFile}>Send</button>
        </div>
        <p><button onClick={this.dowloadFile}>Download</button></p>
      </div>
    );
  }
}

const mapStateToProps = (store: ApplicationState) => {
  return {
    errorText: store.user.errorText,
    token: store.user.token
  }
}

export default withStyles(styles)(
  connect(mapStateToProps,undefined)(FileUpload));
