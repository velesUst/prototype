import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import TablePaginationActions from './TablePaginationActions';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Document from './Document';
import InputLabel from '@material-ui/core/InputLabel';

const styles = (theme: Theme) => createStyles ({  
  layer: {
    overflow: 'scroll', /* Добавляем полосы прокрутки */
    width: '100%', /* Ширина блока */
    height: '80%' /* Высота блока */
   }, 
  formControl: {
    margin: theme.spacing.length,
    minWidth: 120,
    height:30
  },
  gridList: {
    overflowX: 'scroll',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.    
    width: "100%"
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  chip: {
    //margin: theme.spacing.unit / 2,
  }, 
  selectEmpty: {
    marginTop: theme.spacing.length * 2,
  },  
  textField: {
    marginLeft: '10px',
    marginRight: '10px'
  }
});

interface State {
  showInfArray?: any[any];
  showInfArrayLength?: number;
  page?: number;
  rowsPerPage?: number;     
  selectedRow?: string;
  sortDirection?: string;
  productsData?: any[any];
  depurtmentsData?: any[any];
  documentTypesData?: any[any];
  vedomostList?: any[any];
  brigadesData?: any[any];
  waysList?: any[any];
  selectedDate?: string;
  selectedProduct?: number;
  selectedProductUnite?: number;
  selectedBrigade?: number;
  selectedBrigadeUnite?: number;
  selectedDocumentType?: string;
  sendData?: any; 
  open?: boolean;
}
interface Props extends WithStyles<typeof styles> {
  
}

class AccountingBook extends React.Component<Props,State,any> {

  constructor(props) {
    super(props);

    var today = new Date();
    var date = today.getFullYear() + '-';
      if((today.getMonth() + 1)<10) date+= '0';  
          date+= (today.getMonth() + 1)+ '-';
      if(today.getDate()<10) date+= '0';  
          date+= today.getDate();

    this.state = {
      showInfArray: [],
      showInfArrayLength: 0,
      page: 0,
      rowsPerPage: 20,     
      selectedRow: 'NUM',
      sortDirection: 'asc', 

      productsData: [ ],
      depurtmentsData: [ ],
      documentTypesData: [ ],
      vedomostList: [],
      brigadesData: [],
      waysList: [ ],
      selectedDate:date,

      sendData: undefined, 
      open: false
    };    
  }

  componentDidMount() {  // - выполняется при каждом отображении при переходе по табам
      // - разовое заполнение справочных данных -
      axios.get(process.env.PUBLIC_URL+'/product', {})
      .then(res => {
        var addFE = [{id:'0', name:'Все'}];
        addFE = addFE.concat(res.data);    
        this.setState({productsData: addFE});
      })
      .catch(err => console.log(err));

      axios.get(process.env.PUBLIC_URL+'/documentType', {})
      .then(res => {
        var addFE = [{id:'0', name:'Все'}];
        addFE = addFE.concat(res.data);    
        this.setState({documentTypesData : addFE});
      })
      .catch(err => console.log(err));  
      
      axios.get(process.env.PUBLIC_URL+'/vedomost', {})
      .then(res => {
        this.setState({vedomostList : res.data});
      })
      .catch(err => console.log(err));  

      axios.get(process.env.PUBLIC_URL+'/brigade', {})
      .then(res => {
        this.setState({brigadesData : res.data});
      })
      .catch(err => console.log(err));  
      
      axios.get(process.env.PUBLIC_URL+'/ways', {})
      .then(res => {
        this.setState({waysList : res.data});
      })
      .catch(err => console.log(err));  

  }


  // Метод передаётся во вложенные компоненты 
  handleChange = (value) => {  
    this.setState(value);
  }


  // - редактирование записи
  editeDocument = data => () => { 
    this.setState({ sendData: data });       

    this.setState({ open: true });
  }  

  // - добавление записи
  addDocument = data => () => {       
    this.setState({ sendData: undefined });

    this.setState({ open: true });
  }  


  // - функция поиска  данных  
  selectInfArray = () => {
        axios.get(process.env.PUBLIC_URL+'/documentsShow',  {
                                  params: {
                                    brigadeFilter: this.state.selectedBrigade,
                                    productFilter: this.state.selectedProduct,
                                    documentTypeFilter: this.state.selectedDocumentType,
                                    offset: (this.state.page * this.state.rowsPerPage),  
                                    maxResults: this.state.rowsPerPage,
                                    sortValue: this.state.selectedRow,
                                    sortDirection: this.state.sortDirection,
                                    dateFilter: this.state.selectedDate
                                  }
                                }
      )
      .then(res => {
        if(res.data!=='')
          this.setState({showInfArray : res.data});
        else   
          this.setState({showInfArray : []});
      })
      .catch(err => {
        console.log(err) 
        this.setState({showInfArray : []});
      });      

      axios.get(process.env.PUBLIC_URL+'/documentsCount',  {
                                  params: {
                                    brigadeFilter: this.state.selectedBrigade,
                                    productFilter: this.state.selectedProduct,
                                    documentTypeFilter: this.state.selectedDocumentType,
                                    dateFilter: this.state.selectedDate
                                  }
                                }
      )
      .then(res => {
        this.setState({showInfArrayLength : res.data});
      })
      .catch(err => console.log(err));  
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
    
    setTimeout(() => {
      this.selectInfArray();  
    }, 300);    
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    
    setTimeout(() => {
      this.selectInfArray();  
    }, 300);    
  };
  

  selectDate = event => {
    this.setState({ selectedDate: event.target.value });

    // - перерисовываем выборку
    this.setState({ page: 0 });

    setTimeout(() => {
      this.selectInfArray();  
    }, 300);    
  };
  createSortHandler = data => () =>  {
    if(data!==this.state.selectedRow) { // меняем колонку сортировки
      this.setState({ sortDirection: 'asc' });
      this.setState({ selectedRow: data });
    } 
    else { // меняем направление      
      if(this.state.sortDirection==='asc')
        this.setState({ sortDirection: 'desc' });
      else  
        this.setState({ sortDirection: 'asc' });
    }

    // - перерисовываем выборку
    this.setState({ page: 0 });

    setTimeout(() => {
      this.selectInfArray();  
    }, 300);    
  };

  // - проверка выбран-ли элемент
  isSelected = ( doc_id ) => {
    let isSelected = false;
    if(null!=this.state.sendData)
      if(this.state.sendData.id==doc_id)
        isSelected = true; 
   
    return isSelected;
  };

  render() {
    const { classes } = this.props;
    const { showInfArray, rowsPerPage, page } = this.state;
    const emptyRows =  rowsPerPage - Math.min(rowsPerPage, showInfArray.length);

    return (
      <div style={{ height: '85vh' }}>

        <table>
          <tbody>
          <tr>
            <td>
              <div>
                <InputLabel style={{ color:'#4c5b65', fontSize: '13pt'}}>Дата:</InputLabel>                      
                <TextField
                  id="date"
                  label=""
                  type="date"
                  defaultValue= {this.state.selectedDate}
                  onChange={this.selectDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> 
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        
        <TablePagination
          colSpan={3}
          count={this.state.showInfArrayLength}
          rowsPerPageOptions={[10, 20, 40, 60, 100]}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        /> 
        <div className={classes.layer}> 
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                >
                  <Tooltip
                    title="Сортировка"
                    placement="bottom-end"
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={this.state.selectedRow==='DATE'? true : false} 
                      direction={this.state.sortDirection=='desc'? 'desc': 'asc'}
                      onClick={this.createSortHandler('DATE')}                  
                    >
                      Дата
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Номер документа</TableCell>
                <TableCell>Направлен</TableCell>
                <TableCell>Кол-во</TableCell>
                <TableCell>Краткое содержание</TableCell>
                <TableCell>№ вед.</TableCell>
                <TableCell>Примечание</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              {showInfArray.map(row => {
                const isSelected = this.isSelected(row.id);                
                let documentNo = row.documentNo;
                  if(row.documentType!==null && row.brigade!==null && row.product!==null && 
                    row.documentType!==undefined && row.brigade!==undefined && row.product!==undefined ) {
                    if(row.documentType.id==1) 
                      documentNo = row.brigade.name + "-" + row.product.name + "-" +row.documentNo;
                    if(row.documentType.id==2) 
                      documentNo = row.brigade.name + "-" + row.product.name + "-" + row.documentGroup + "-" +row.documentNo;
                  }
                  
                return (
                  <TableRow
                    hover
                    aria-checked={isSelected}  
                    selected={isSelected}
                    key={row.id}
                    onClick={this.editeDocument(row)}
                  >
                    <TableCell component="th" scope="row">
                      { row.date }
                    </TableCell>
                    <TableCell>{ documentNo }
                    </TableCell>                    
                    <TableCell></TableCell>                    
                    <TableCell>{ row.countPage!==undefined && row.countPage!==null
                                 ? row.countPage
                                 : '' }</TableCell>                    
                    <TableCell>{row.note}</TableCell>                    
                    <TableCell>{ row.vedomost!==undefined && row.vedomost!==null 
                                 ? row.vedomost.name
                                 : '' }</TableCell>                    
                    <TableCell>{row.note2}</TableCell>                    
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>     
        </div>


        <Document open={this.state.open}
                  inputData={this.state.sendData}
                  documentTypesData={this.state.documentTypesData}
                  productsData={this.state.productsData}
                  vedomostList={this.state.vedomostList}
                  brigadesData={this.state.brigadesData}
                  waysList={this.state.waysList}
                  handleParentChange={this.handleChange}
                  selectInfArray={this.selectInfArray} />
    
      </div>
    );
  }
}

export default withStyles(styles)(AccountingBook);