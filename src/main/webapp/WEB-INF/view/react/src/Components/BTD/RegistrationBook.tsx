import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TablePaginationActions from './TablePaginationActions';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Document from './Document';

const styles = (theme: Theme) => createStyles ({

  layer: {
    overflow: 'scroll', /* Добавляем полосы прокрутки */
    width: '100%', /* Ширина блока */
    height: '75%' /* Высота блока */
   }, 
  formControl: {
    margin: theme.spacing.length,
    minWidth: 120,
    height:30
  },
  gridList: {
    overflowX: 'scroll',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.    
    width: "100%",
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
  button: {
    margin: theme.spacing.length,
  },
  textField: {
    marginLeft: '10px',
    marginRight: '10px'
  },
});

interface State {
  showInfArray?: any[any];
  showInfArrayLength?: number;
  page?: number;
  rowsPerPage?: number;     
  selectedRow?: string;
  sortDirection?: string;
  productsData?: any[any];
  documentTypesData?: any[any];
  vedomostList?: any[any];
  brigadesData?: any[any];
  waysList?: any[any];
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


class RegistrationBook extends React.Component<Props,State,any> {

  constructor(props) {
    super(props);
    this.state = {
      showInfArray: [],
      showInfArrayLength: 0,
      page: 0,
      rowsPerPage: 20,     
      selectedRow: 'NUM',
      sortDirection: 'desc', 

      productsData: [ ],
      documentTypesData: [ ],
      vedomostList: [ ],
      brigadesData: [ ],
      waysList: [ ],
      selectedProduct:0,
      selectedProductUnite:0,
      selectedBrigade:0,
      selectedBrigadeUnite:0,
      selectedDocumentType:'',

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
        var addFE = [{id:'0', name:'Все'}];
        addFE = addFE.concat(res.data);    
        this.setState({brigadesData : addFE});
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
    this.setState({ sendData: { documentType:{ id : this.state.selectedDocumentType},
                                brigade:{ id : this.state.selectedBrigade},
                                product:{ id : this.state.selectedProduct}  }});  // тут лучше передавать null усли нет значения, а не создавать элемент

    this.setState({ open: true });
  }  


  // - функция поиска  данных  
  selectInfArray = () => {
        axios.get(process.env.PUBLIC_URL+'/documentsShow',  {
                                  params: {
                                    brigadeFilter: this.state.selectedBrigade,
                                    brigadeUniteFilter: this.state.selectedBrigadeUnite,
                                    productFilter: this.state.selectedProduct,
                                    productUniteFilter: this.state.selectedProductUnite,
                                    documentTypeFilter: this.state.selectedDocumentType,
                                    offset: (this.state.page * this.state.rowsPerPage),  
                                    maxResults: this.state.rowsPerPage,
                                    sortValue: this.state.selectedRow,
                                    sortDirection: this.state.sortDirection                               
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
                                    brigadeUniteFilter: this.state.selectedBrigadeUnite,
                                    productFilter: this.state.selectedProduct,
                                    productUniteFilter: this.state.selectedProductUnite,
                                    documentTypeFilter: this.state.selectedDocumentType
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
  

  // - выбор элементов -------------------------- 
  selectProduct = data => () => {
    this.setState({ selectedProduct: data.id });
    this.setState({ selectedProductUnite: data.unite_id });

    // - перерисовываем выборку
    this.setState({ page: 0 });
    
    setTimeout(() => {
      this.selectInfArray();  
    }, 300);    
  }
  selectBrigade = data => () => {
    this.setState({ selectedBrigade: data.id });
    this.setState({ selectedBrigadeUnite: data.unite_id });

    // - перерисовываем выборку
    this.setState({ page: 0 });

    setTimeout(() => {
      this.selectInfArray();  
    }, 300);    
  }
  
  // - выбор цвета в зависимости от выделения ---
  getBrigadeColor = val => {
    var retCol = '#e0e0e0';
    if( val === this.state.selectedBrigade )
      retCol = 'rgb(163, 174, 236)';   
    return retCol;
  };
  getProductColor = val => {
    var retCol = '#e0e0e0';
    if( val === this.state.selectedProduct )
      retCol = 'rgb(163, 174, 236)';   
    return retCol;
  };

  selectDocumentType = event => {
    this.setState({ selectedDocumentType: event.target.value });

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
      <div style={{ height: '86vh' }}>

        <table>
          <tbody>
          <tr>
            <td>
              <div>
                <h3 style={{ display: 'inline-block', color:'#4c5b65', fontSize: '11pt', paddingLeft: '15px'}}>Тип документа:</h3>
                <FormControl className={classes.formControl}>
                  <Select
                    value={this.state.selectedDocumentType}
                    onChange={this.selectDocumentType}            
                    input={
                    <OutlinedInput      
                      labelWidth={200}      
                    />
                    }
                  >
                  {this.state.documentTypesData.map(data => {
                    return (
                     <MenuItem value={data.id} >{data.name}</MenuItem> 
                    );
                  })}    
                  </Select>
                </FormControl>          
              </div>
            </td>
            <td>
              <div>
                <Button onClick={this.addDocument(undefined)} variant="contained"  size="small">
                   Добавить документ
                </Button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>

        <TablePagination
          colSpan={3}
          count={this.state.showInfArrayLength}
          rowsPerPageOptions={[10, 20, 40, 60, 100, 120, 150]}
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
                      active={this.state.selectedRow=='DATE'? true : false} 
                      direction={this.state.sortDirection=='desc'? 'desc': 'asc'}
                      onClick={this.createSortHandler('DATE')}                   
                    >
                      Дата
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>№ ПИ</TableCell>
                <TableCell>Бригада</TableCell>
                <TableCell>Изделие</TableCell>
                <TableCell>Группа</TableCell>
                <TableCell>
                  <Tooltip
                    title="Сортировка"
                    placement="bottom-start"
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={this.state.selectedRow=='NUM'? true : false} 
                      direction={this.state.sortDirection=='desc'? 'desc': 'asc'}
                      onClick={this.createSortHandler('NUM')}                   
                    >
                      №
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Тип</TableCell>
                <TableCell>Краткое содержание</TableCell>
                <TableCell>Сотрудник</TableCell>
            </TableRow>
            </TableHead>
           
            <TableBody>
              {showInfArray.map(row => {   
                const isSelected = this.isSelected(row.id);             
                return (
                  <TableRow 
                    key={row.id}
                    hover
                    aria-checked={isSelected}  
                    selected={isSelected}
                    onClick={this.editeDocument(row)}
                  >
                    <TableCell>{ row.date!==undefined && row.date!==null
                                 ? row.date.split("-").reverse().join("-")
                                 : ''}
                    </TableCell>
                    <TableCell>{row.num2}</TableCell>                    
                    <TableCell>{ row.brigade!==undefined && row.brigade!==null
                                 ? row.brigade.name
                                 : '' }</TableCell>                    
                    <TableCell>{ row.product!==undefined && row.product!==null
                                 ? row.product.name
                                 : '' }</TableCell>         
                    <TableCell>{row.documentGroup}</TableCell>            
                    <TableCell>{row.documentNo}</TableCell>                    
                    <TableCell>{ row.documentType!==undefined && row.documentType!==null
                                 ? row.documentType.name
                                 : '' }</TableCell>                    
                    <TableCell>{row.note}</TableCell>                    
                    <TableCell>{row.customer.name}</TableCell>
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
                  brigadesData={this.state.brigadesData}
                  vedomostList={this.state.vedomostList}
                  waysList={this.state.waysList}
                  handleParentChange={this.handleChange}
                  selectInfArray={this.selectInfArray} />

                  

        <div>
          <Paper style={{ overflowX: 'scroll', whiteSpace: 'nowrap', padding: '1px' }}>
            {this.state.productsData.map(data => {
              return (
                <Chip
                  key={data.id}
                  label={data.name}
                  style={{ fontSize: '11pt', backgroundColor: this.getProductColor(data.id) }}
                  onClick={this.selectProduct(data)}
                  className={classes.chip}
                />
              );
            })}
          </Paper>
          <Paper style={{ overflowX: 'scroll', whiteSpace: 'nowrap', padding: '1px' }}>
            {this.state.brigadesData.map(data => {
              return (
                <Chip
                  key={data.id}
                  label={data.name}
                  style={{ fontSize: '11pt', backgroundColor: this.getBrigadeColor(data.id) }}
                  onClick={this.selectBrigade(data)}
                  className={classes.chip}
                />
              );
            })}
          </Paper>
        </div>
    
      </div>
    );
  }
}

export default withStyles(styles)(RegistrationBook);