import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';


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

interface DocContent {
  id?: string;
  product?: string;
  brigade?: string;
}

interface State {
  open?: boolean;
  editeId?: string;
  editeRegNum?: string;
  editedDocumentType?: string;
  editedDocumentGroup?: string;
  editedData?: string;
  editedProduct?: string;
  editeCustomNum?: string;
  editedNote?: string;
  editedCustomer?: string;
  editedCountPage?: string;
  editedVedomost?: string;
  editedBrigade?: string;
  editedNote2?: string;
  editedNum2?: string;
  errorMess?: string;  
  inputData?: DocContent;
  selectedWays?: any[any]; 
  enableNum?: boolean;
}
interface Props {
  open?: boolean;
  inputData?: any;
  handleParentChange?: any;
  documentTypesData?: any[any];
  productsData?: any[any];
  brigadesData?: any[any];
  vedomostList?: any[any];
  waysList?: any[any];
  selectInfArray?: any;
}

class Document extends React.Component<Props,State,any> {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      editeId:'',
      editeRegNum:'',
      editedDocumentType:'',
      editedDocumentGroup:'',
      editeCustomNum:'',
      editedData:'',
      editedProduct:'',
      editedNote: '',
      editedCustomer: '',
      editedCountPage: '',
      editedVedomost: '',
      editedBrigade: '',
      editedNote2: '',    
      selectedWays: undefined,
      editedNum2: '',
      inputData: undefined, 
      errorMess: '', 
      enableNum: false     
    };    
  }

  UNSAFE_componentWillReceiveProps(nextProps:Props) {
    // - заполнение
    if(nextProps.inputData!==undefined && nextProps.open) {    
      this.setState({open: nextProps.open});
      this.setState({inputData: nextProps.inputData});
  
      if(nextProps.inputData.id!==undefined) {  // - редактирвание
        if(null!=nextProps.inputData.documentType)
          this.setState({ editedDocumentType: nextProps.inputData.documentType.id });
        this.setState({ editedDocumentGroup: nextProps.inputData.documentGroup });
        if(null!=nextProps.inputData.date)
          this.setState({ editedData: nextProps.inputData.date }); 
        else
          this.setState({ editedData: '' });   
        this.setState({ editeId: nextProps.inputData.id });
        this.setState({ editeRegNum: nextProps.inputData.documentNo });
        this.setState({ editeCustomNum: nextProps.inputData.customNum });

        if(null!=nextProps.inputData.product)
          this.setState({ editedProduct: nextProps.inputData.product.id });
        else   
          this.setState({ editedProduct: '' });
        this.setState({ editedNote: nextProps.inputData.note });
        if(null!=nextProps.inputData.customer)
          this.setState({ editedCustomer: nextProps.inputData.customer.name });

        this.setState({ editedCountPage: nextProps.inputData.countPage });   
        if(null!=nextProps.inputData.vedomost)
          this.setState({ editedVedomost: nextProps.inputData.vedomost.id });   
        else 
          this.setState({ editedVedomost: '' });   
        this.setState({ editedNote2: nextProps.inputData.note2 });       
        if(null!=nextProps.inputData.brigade)
          this.setState({ editedBrigade: nextProps.inputData.brigade.id });   
        else   
          this.setState({ editedBrigade: '' });   
      
        if(null!=nextProps.inputData.waysList) {
          var waysResive:any[] = [];
          for (var i=0; i < nextProps.inputData.waysList.length; i++)   //  - переделать
            waysResive.push( nextProps.inputData.waysList[i].name ); //  - переделать
        
          this.setState({ selectedWays: waysResive });            
        } else
          this.setState({ selectedWays: undefined });            
      
        this.setState({ editedNum2: nextProps.inputData.num2 });       
      }
      else {  // - новый входных параметров гораздо меньше
        if(null!=nextProps.inputData.documentType)
          this.setState({ editedDocumentType: nextProps.inputData.documentType.id });
        else
          this.setState({ editedDocumentType: '' });
        this.setState({ editedDocumentGroup: '' });
        this.setState({ editeId: '' });
        this.setState({ editeRegNum: '' });
        this.setState({ editeCustomNum: '' });
        this.setState({ editedData: '' });
        if(null!=nextProps.inputData.product)
          this.setState({ editedProduct: nextProps.inputData.product.id });
        else
          this.setState({ editedProduct: '' });
        this.setState({ editedNote: '' });
        this.setState({ editedCustomer: '' });   
        this.setState({ editedCountPage: '' });   
        this.setState({ editedVedomost: '' });   
        if(null!=nextProps.inputData.brigade)
          this.setState({ editedBrigade: nextProps.inputData.brigade.id });   
        else   
          this.setState({ editedBrigade: '' });   
        this.setState({ editedNote2: '' });      
        this.setState({ selectedWays: undefined });            
        this.setState({ editedNum2: '' });    
        
        this.updateDocumentNo(null,null,null);  
      }
      this.setState({ enableNum: false });
    }
  }  


  closeDocument = () => {    
    this.setState({ open: false });
    this.props.handleParentChange({ open: false });  // - изменения придут автоматически
    this.setState({ errorMess: '' });
  }

  deleteDocument = () => {         
    axios.get(process.env.PUBLIC_URL+'/registrationBook/delete',  {
                                params: {
                                  id: this.state.editeId,
                                }
                              }
    )
    .then(res => {
      if(res.data!=='')
        this.setState({ errorMess: res.data })
      else  {
        this.setState({ open: false });
        this.props.handleParentChange({ open: false });  // - изменения придут автоматически
        
        setTimeout(() => {
          this.props.selectInfArray();
        }, 300);        
      }
    })
    .catch(err => {
      this.setState({ errorMess: err })
    }); 
  };

  saveDocument = () => {     
    var err = "";   
    // - внимание - типы передаваемых данных должны соответствовать типам в dto классе, иначе 400 ошибка формата (нельзя вместо числа присваивать - '') 
    //if(this.state.editedData==='') 
    //  err += "Необходимо указать дату \n";
    if(this.state.editeRegNum==='') 
      err += "Необходимо указать номер \n";
    if(this.state.editedDocumentType==='') 
      err += "Необходимо указать тип документа \n";
    //if(this.state.editedProduct==='') 
    //  err += "Необходимо указать изделие \n";
    //if(this.state.editedOrgstruct===0) 
    //  err += "Необходимо указать КБ \n";
    if(this.state.editedCustomer==='') 
      err += "Необходимо указать сотрудника \n";
    
    if(err=='') {    
      let result;   
        var waysSend = '';    //  - переделать
        for (var i=0; i < this.state.selectedWays.length; i++) {  //  - переделать
          waysSend += this.state.selectedWays[i]+';'; //  - переделать
        }  //  - переделать
      if(this.state.inputData && this.state.inputData.id) {
        result = axios({
          method: 'get',
          url: process.env.PUBLIC_URL+'/registrationBook/update',
          params: {          
            id: this.state.editeId,
            date: this.state.editedData,
            product: this.state.editedProduct,  
            documentType: this.state.editedDocumentType,
            customNum: this.state.editeCustomNum,
            documentGroup: this.state.editedDocumentGroup,
            note: this.state.editedNote,
            customer: this.state.editedCustomer,
            brigade: this.state.editedBrigade,
           
            countPage: this.state.editedCountPage,
            vedomost: this.state.editedVedomost,
            note2: this.state.editedNote2,
            ways: waysSend,
            num2: this.state.editedNum2
          },
          headers: {
            'Content-Type': 'application/json',
            'charset': 'UTF-8',
            'Accept': 'application/json'
          }
        });       

        result 
        .then(res => {        
          if(res.data!='')
            this.setState({ errorMess: res.data })
          else  {
            this.setState({ open: false });
            this.props.handleParentChange({ open: false });  // - изменения придут автоматически        
            this.setState({ errorMess: '' });
      
            setTimeout(() => {
              this.props.selectInfArray();  
            }, 300);   
          }
        }).catch(error => {
           this.setState({ errorMess: error });
        });

      }
      else {

        result = axios({
          method: 'post',
          url: process.env.PUBLIC_URL+'/registrationBook/add',
          params: {          
            //id: this.state.editeId,
            documentNo: this.state.editeRegNum,
            date: this.state.editedData,
            product: this.state.editedProduct,  
            documentType: this.state.editedDocumentType,
            customNum: this.state.editeCustomNum,
            documentGroup: this.state.editedDocumentGroup,
            note: this.state.editedNote,
            customer: this.state.editedCustomer,
            brigade: this.state.editedBrigade,

            countPage: this.state.editedCountPage,
            vedomost: this.state.editedVedomost,
            note2: this.state.editedNote2,
            ways: waysSend,
            num2: this.state.editedNum2
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
          }
        });       
      
        result 
        .then(res => {
          if(res.data!=='')
            this.setState({ errorMess: res.data })
          else  {
            this.setState({ open: false });
            this.props.handleParentChange({ open: false });  // - изменения придут автоматически        
            this.setState({ errorMess: '' });
      
            setTimeout(() => {
              this.props.selectInfArray();  
            }, 300);   
          }
        }).catch(error => {
            this.setState({ errorMess: error });
        });      
      } 
    }
    else 
      this.setState({ errorMess: err });      

  };


  canEditeDocumentType = () => { // - возможность редактирования типа документа   
    if(this.state.inputData !== undefined) {
      if(this.state.inputData.id === undefined) 
        return false;
    }
    return true;
  }

  doShowProduct = (id,unite_id) => {    
    var ed_id, 
        ed_unite_id;
    if(this.state.inputData !== undefined) {
      if(this.state.inputData.id === undefined || null==this.state.inputData.product)   // - если новый элемент, либо бригада не была указана
        return true;
      else {
        // - получаем unite чтобы не хранить две реременные
        if(this.props.productsData!==undefined)
        for (var i = 0; i < this.props.productsData.length; i++) 
          if(this.props.productsData[i].id===this.state.editedProduct) {
            ed_id = this.props.productsData[i].id;
            ed_unite_id = this.props.productsData[i].unite_id;
          } 
        
        // при редактировании выбор ограничен группой
        if(ed_id!==undefined && ed_unite_id!==undefined) {
          if(ed_unite_id!==null) 
            if(ed_unite_id===unite_id || ed_unite_id===id)
              return true;
          if(ed_unite_id===null) 
            if(ed_id===id || ed_id===unite_id)
              return true;
        }
      }
    }
    return false;
  }

  doShowBrigade = (id,unite_id) => {    
    var ed_id, 
        ed_unite_id;
    if(this.state.inputData !== undefined) {
      if(this.state.inputData.id === undefined || null==this.state.inputData.brigade)   // - если новый элемент, либо бригада не была указана
        return true;
      else {
        // - получаем unite чтобы не хранить две реременные
        if(this.props.brigadesData!==undefined)
        for (var i = 0; i < this.props.brigadesData.length; i++) 
          if(this.props.brigadesData[i].id===this.state.editedBrigade) {
            ed_id = this.props.brigadesData[i].id;
            ed_unite_id = this.props.brigadesData[i].unite_id;
          } 
        
        // при редактировании выбор ограничен группой
        if(ed_id!==undefined && ed_unite_id!==undefined) {
          if(ed_unite_id!==null) 
            if(ed_unite_id===unite_id || ed_unite_id===id)
              return true;
          if(ed_unite_id===null) 
            if(ed_id===id || ed_id===unite_id)
              return true;
        }
      }
    }
    return false;
  }  

  getBrigadeUniteId = ( id ) => {     
    var ed_id, 
        ed_unite_id;
    if(id!==undefined)
    for (var i = 0; i < this.props.brigadesData.length; i++) 
      if(this.props.brigadesData[i].id===id) {
        ed_id = this.props.brigadesData[i].id;
        ed_unite_id = this.props.brigadesData[i].unite_id;
      }       
      if(ed_unite_id==null) return ed_id;
    return ed_unite_id;
  }
  getProductUniteId = ( id ) => {     
    var ed_id, 
        ed_unite_id;
    if(id!==undefined)
    for (var i = 0; i < this.props.productsData.length; i++) 
      if(this.props.productsData[i].id===id) {
        ed_id = this.props.productsData[i].id;
        ed_unite_id = this.props.productsData[i].unite_id;
      }       
      if(ed_unite_id==null) return ed_id;
    return ed_unite_id;
  }

  updateDocumentNo = (editedBrigade, editedProduct, editedDocumentType) => {
    var doUpdate = false;
    if(null!=editedBrigade) {
      this.setState({ editedBrigade: editedBrigade });
      if(this.getBrigadeUniteId(this.state.editedBrigade)!==
          this.getBrigadeUniteId(editedBrigade)) 
        doUpdate = true;
    }    
    if(null!=editedProduct) {
      this.setState({ editedProduct: editedProduct });
      if(this.getProductUniteId(this.state.editedProduct)!==
          this.getProductUniteId(editedProduct)) 
        doUpdate = true;
    }
    if(null!=editedDocumentType)
    if(this.state.editedDocumentType!==editedDocumentType) {
      this.setState({ editedDocumentType: editedDocumentType });
      doUpdate = true;
    }

    // - номер получаем только для новых и если указан тип документа
    setTimeout(() => { 
      var edBr_id, edBr_unite_id,
          edPr_id, edPr_unite_id;
      if( doUpdate &&/*this.state.inputData.id === undefined &&*/ this.state.editedDocumentType!='') { // - редактируем хранимые
        this.setState({editeRegNum : ''});

        // - получаем unite чтобы не хранить две переменные
        if(this.props.brigadesData!==undefined)
        for (var i = 0; i < this.props.brigadesData.length; i++) 
          if(this.props.brigadesData[i].id===this.state.editedBrigade) {
            edBr_id = this.props.brigadesData[i].id;
            edBr_unite_id = this.props.brigadesData[i].unite_id;
          }
        // - получаем unite чтобы не хранить две переменные
        if(this.props.productsData!==undefined)
        for (var i = 0; i < this.props.productsData.length; i++) 
          if(this.props.productsData[i].id===this.state.editedProduct) {
            edPr_id = this.props.productsData[i].id;
            edPr_unite_id = this.props.productsData[i].unite_id;
          }

        axios.get(process.env.PUBLIC_URL+'/documentsLastNum',  {
                                    params: {
                                      documentTypeFilter: editedDocumentType,
                                      brigadeFilter: edBr_id,
                                      brigadeUniteFilter: edBr_unite_id,
                                      productFilter: edPr_id,
                                      productUniteFilter: edPr_unite_id
                                    }
                                  }
        )
        .then(res => {
          this.setState({editeRegNum : (res.data+1)});
        })
        .catch(err => console.log(err));
      }
    }, 300); 
  }

  render() {

    return (
      <div>
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
                      <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '11pt'}}>№:</h3>
                      { this.state.enableNum 
                         ? <TextField
                             value={this.state.editeRegNum}                        
                             type="number"                             
                             //variant="outlined"
                             onChange={(e) => this.setState({ editeRegNum: e.target.value })}
                           />                      
                         : <TextField
                             disabled
                             value={this.state.editeRegNum}                        
                             type="number"
                             onDoubleClick={(e) => this.setState({ enableNum: true })}
                             //variant="outlined"
                           />                     
                      }
                      &nbsp;&nbsp;&nbsp;
                      <h3 style={{ display: 'inline-block', color:'#4c5b65', height:'20px', fontSize: '11pt'}}>№ нестандарт:</h3>
                      { this.state.enableNum 
                         ? <TextField
                             value={this.state.editeCustomNum}                        
                             //variant="outlined"
                             onChange={(e) => this.setState({ editeCustomNum: e.target.value })}
                           />                      
                         : <TextField
                             disabled
                             value={this.state.editeCustomNum}                        
                             onDoubleClick={(e) => this.setState({ enableNum: true })}
                             //variant="outlined"
                           />                     
                      }
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <InputLabel style={{ color:'#4c5b65', fontSize: '13pt'}}>Дата:</InputLabel>                      
                      <TextField
                        id="date"
                        label=""
                        type="date"
                        defaultValue= {this.state.editedData}
                        onChange={(e) => this.setState({ editedData: e.target.value })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      /> 
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputLabel style={{ color:'#4c5b65', fontSize: '13pt'}}>Тип документа:</InputLabel>                      
                    <FormControl style={{ paddingLeft: '15px' }}>
                    { this.canEditeDocumentType()
                      ? <Select
                          value={this.state.editedDocumentType}
                          disabled
                          onChange={(e) => this.updateDocumentNo(null,null,e.target.value) }
                          input={
                            <OutlinedInput   
                              labelWidth={200}         
                            />
                          }
                        >
                        {this.props.documentTypesData.map(data => {
                          if( data.id!='0' )
                          return (
                            <MenuItem value={data.id} >{data.name}</MenuItem> 
                          );
                        })}    
                        </Select>
                      : <Select
                          value={this.state.editedDocumentType}
                          onChange={(e) => this.updateDocumentNo(null,null,e.target.value) }
                          input={
                            <OutlinedInput  
                              labelWidth={200}          
                            />
                          }
                        >
                        {this.props.documentTypesData.map(data => {
                          if( data.id!='0' )
                          return (
                            <MenuItem value={data.id} >{data.name}</MenuItem> 
                          );
                        })}    
                        </Select>
                    }
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      label="Краткое содержание:"
                      rows="2"
                      defaultValue={this.state.editedNote}
                      onChange={(e) => this.setState({ editedNote: e.target.value })}
                      style={{ width: 350 }}
                      margin="normal"
                      variant="outlined"
                    />                 
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputLabel>Изделие:</InputLabel>
                    <FormControl>
                      <Select
                        value={this.state.editedProduct}
                        onChange={(e) => this.updateDocumentNo(null,e.target.value,null) }
                        input={
                          <OutlinedInput  
                            labelWidth={200}          
                         />
                        }
                      >
                      {this.props.productsData.map(data => {
                        if( data.id!='0' )
                          if(this.doShowProduct(data.id,data.unite_id))
                          return (
                            <MenuItem value={data.id} >{data.name}</MenuItem> 
                          );
                      })}    
                      </Select>
                    </FormControl>          
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputLabel>Бригада:</InputLabel>
                    <FormControl>
                      <Select
                        value={this.state.editedBrigade}
                        onChange={(e) => this.updateDocumentNo(e.target.value,null,null) }
                        input={
                          <OutlinedInput    
                            labelWidth={200}        
                          />
                        }
                      >
                      {this.props.brigadesData.map(data => {
                        if( data.id!=='0' )
                          if(this.doShowBrigade(data.id,data.unite_id))
                          return (
                            <MenuItem value={data.id} >{data.name}</MenuItem> 
                          );
                      })}    
                    </Select>
                    </FormControl>          
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputLabel>Сотрудник:</InputLabel>
                    <FormControl>                      
                      <TextField
                        defaultValue={this.state.editedCustomer}
                        onChange={(e) => this.setState({ editedCustomer: e.target.value })}
                      />
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormControl>
                      <InputLabel>Направлен</InputLabel>
                      <Select
                        multiple
                        value={this.state.selectedWays}
                        onChange={(e) => this.setState({ selectedWays: e.target.value })}
                        input={<Input id="select-multiple-chip" />}
                        renderValue = {selected =>  (
                          <div style={{ display:'flex', flexWrap:'wrap', overflow: 'scroll', height: 90 }}>
                            {(selected as string[]).map(value => (
                              <Chip key={value} label={value} />
                            ))}
                          </div>
                        )}
                        MenuProps={MenuProps}
                      >
                        {this.props.waysList.map(data => (
                          <MenuItem key={data.id} value={data.name} >
                            {data.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      label="Примечание:"
                      rows="2"
                      defaultValue={this.state.editedNote2}
                      onChange={(e) => this.setState({ editedNote2: e.target.value } as State)}
                      margin="normal"
                      variant="outlined"
                    />                 
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputLabel style={{ color:'#4c5b65', fontSize: '13pt'}}>№ Вед:</InputLabel>
                    <FormControl style={{ paddingLeft: '15px' }}>
                      <Select
                        value={this.state.editedVedomost}
                        onChange={(e) => this.setState({ editedVedomost: e.target.value } as State)}
                        input={
                          <OutlinedInput   
                            labelWidth={200}         
                          />
                        }
                      >
                      {this.props.vedomostList.map(data => {
                        return (
                          <MenuItem value={data.id} >{data.name}</MenuItem> 
                        );
                      })}    
                      </Select>
                    </FormControl>          
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputLabel style={{ color:'#4c5b65', fontSize: '13pt'}}>Колич.</InputLabel>
                    <FormControl style={{ paddingLeft: '15px' }}>                      
                      <TextField   
                        value={this.state.editedCountPage}                     
                        type="number"          
                        onChange={(e) => this.setState({ editedCountPage: e.target.value })}                          
                      />
                    </FormControl>
                    &nbsp; &nbsp;
                    <InputLabel style={{ color:'#4c5b65', fontSize: '13pt'}}>№ ПИ:</InputLabel>
                    <FormControl style={{ paddingLeft: '15px' }}>                      
                      <TextField
                        type="number"          
                        value={this.state.editedNum2}                     
                        onChange={(e) => this.setState({ editedNum2: e.target.value })}                          
                      />
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputLabel style={{ color:'#4c5b65', fontSize: '13pt'}}>Группа:</InputLabel>
                    <FormControl style={{ paddingLeft: '15px' }}>                      
                      <TextField
                        type="number"          
                        value={this.state.editedDocumentGroup}                     
                        onChange={(e) => this.setState({ editedDocumentGroup: e.target.value })}                          
                      />
                    </FormControl>
                  </td>
                </tr>                
                
                <tr>
                  <td>
                      { this.state.errorMess!=''
                         ? <TextField
                             error
                             id="outlined-error"
                             label="Error"
                             value={this.state.errorMess}
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
                  { this.state.editeId == ''
                    ? <div></div>
                    : <Button   onClick={this.deleteDocument} style={{ margin: '10px' }}>
                        <DeleteIcon />
                      </Button>
                  } 
                </td>
                <td>
                    <Button variant="contained" onClick={this.closeDocument} style={{ margin: '10px' }} color="primary">   
                      Отмена
                    </Button>
                    <Button variant="contained" onClick={this.saveDocument} style={{ margin: '10px' }} color="primary" autoFocus>
                      Сохранить
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

export default withStyles(styles)(Document);