/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as actions from '../../../../core/actions/generalAction';
import _ from 'lodash';
import Row from '../../common/Row.jsx';
import Input from '../../common/Input.jsx';
import Textarea from '../../common/Textarea.jsx';
import Label from '../../common/Lable.jsx';
import Portlet from '../../common/Portlet.jsx';
import Combobox from '../../common/Select.jsx';
import Radio from '../../common/Radio.jsx';
import Table from '../../common/Datatable.jsx';
import * as requestCreator from '../../../../core/common/request.js';
import * as coreConstants from '../../../../core/constants/Communication.js'
import * as utils from '../../../../core/common/utils.js';
import CheckBox from '../../common/CheckBox.jsx';
import CheckList from '../../common/CheckList.jsx';
import * as constants from '../../../../core/constants/Communication';
import DateTimeField from "react-bootstrap-datetimepicker";
import RichTextEditor from 'react-rte';
import * as gen from '../../common/generalActionHandler';
import Document from '../../common/IPFS/Document.jsx';
import * as toaster from '../../../../core/common/toaster.js';


class ProductCatalogue extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      addProduct: {},
      productImage: {

      },
      documents: [],
      typeData: {}
    };
    this.validate = false;
    this.generalHandler = gen.generalHandler.bind(this);
    this.insertJson = this.insertJson.bind(this);
    this.stringToOtherTypes = this.stringToOtherTypes.bind(this);
  }

  componentWillMount() {


  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, "props recieved");

    if (nextProps.typeData && !nextProps.params.id) {
      this.setState({
        addProduct: {},
        productImage: {},
        documents: [],
        typeData: nextProps.typeData,
        isLoading: false
      });
    }

    if (nextProps.getItemCatalogue.length>0 && nextProps.typeData && nextProps.params.id) {

      // Insert Attachments into documents
      let documents = []
      
      for (let i=0;i<nextProps.getItemCatalogue[0].attachments.length;i++){
        documents.push({
          fileDetail: {
            name: nextProps.getItemCatalogue[0].attachments[i].name,
            UUID: ''
          }, 
          documentName: nextProps.getItemCatalogue[0].attachments[i].name,
          fileType: '',
          documentHash : nextProps.getItemCatalogue[0].attachments[i].hash,
          retreivalPath: nextProps.getItemCatalogue[0].attachments[i].path,
          hash: nextProps.getItemCatalogue[0].attachments[i].hash,
          name: nextProps.getItemCatalogue[0].attachments[i].name,
          path: nextProps.getItemCatalogue[0].attachments[i].path,
          type: nextProps.getItemCatalogue[0].attachments[i].type,
          actions: undefined
        })
      }

      this.setState({
        documents: [...documents],
        addProduct: nextProps.getItemCatalogue[0],
        typeData: nextProps.typeData,
        isLoading: false,
      });
    }

  }

  componentDidMount() {
    console.log(this.props, "this.props")
    console.log(this.props.params.id, "ITEM ID FROM params")

    if (this.props.params.id) {
      this.getItemDetail(this.props.params.id);
    }

    this.props.actions.generalProcess(coreConstants.getTypeData,
      requestCreator.createTypeDataRequest([
        'color', 'classification', 'material'
      ]));
    window.scrollTo(0, 0);
  }

  getItemDetail = (id) => {
    this.props.actions.generalProcess(constants.getItemCatalogue,
      {
        "body": {
          "page": {
            "currentPageNo": 1,
            "pageSize": 10
          },
          "searchCriteria": {
            "itemCode": id
          }
        }
      });
  }

  updateState = (data) => {
    this.setState(data);
  }

  getParentState = () => {
    return this.state
  }

  insertJson() {

    if (this.state && this.state.addProduct != undefined) {

      if (this.state.addProduct.itemCode == undefined || this.state.addProduct.itemCode.trim() == '') {
        alert("Item Code is required!")
        return;
      }
      if (this.state.addProduct.name.length > 20){
        alert("Item name must be less than 20 characters!")
        return;
      }
      if (this.state.addProduct.name == undefined || this.state.addProduct.name.trim() == '') {
        alert("item name is required!")
        return;
      }
      if (this.state.addProduct.description == undefined || this.state.addProduct.description.trim() == '') {
        alert("item description is required!")
        return;
      }
      if (this.state.addProduct.classification == undefined) {
        alert("item classification is required!")
        return;
      }
      if (this.state.addProduct.material == undefined) {
        alert("item material is required!")
        return;
      }
      if (this.state.addProduct.price == undefined) {
        alert("item price is required!")
        return;
      }
      if (this.state.addProduct.leadTime == undefined) {
        alert("item leadTime is required!")
        return;
      }
      if (this.state.addProduct.printTime == undefined) {
        alert("item printTime is required!")
        return;
      }
      if (this.state.addProduct.partNumber == undefined) {
        alert("item partNumber is required!")
        return;
      }
      if (this.state.addProduct.modelVolume == undefined) {
        alert("item modelVolume is required!")
        return;
      }
      if (this.state.addProduct.supportVolume == undefined) {
        alert("item supportVolume is required!")
        return;
      }

      this.validate = true;
    } else {
      alert("All fields are required!")
    }

    if (this.validate) {
      console.log(this.validate, " validate")
      // load until redirection 
      this.setState({
        isLoading: true
      })
      window.scrollTo(0, 0);

      this.stringToOtherTypes('addProduct', ['leadTime', 'price', 'printTime'], ['itemStatus']);
      let addProduct = { ...this.state.addProduct };
      console.log(addProduct, "addProduct")
      addProduct.image = Object.keys(this.state.productImage).length > 0 ? this.state.productImage : addProduct.image;
      console.log(addProduct, "addProduct")
      if (this.state.documents && this.state.documents.length > 0) {
        addProduct.attachments = this.state.documents
      }

      if (this.props.params.id) {
        this.props.actions.generalAjxProcess(constants.updateItemCatalogue, {
          body: addProduct
        }).then(result => {
          result.message.status == 'ERROR' ? alert(result.message.errorDescription) : this.redirectToList()
        });
      }
      else {
        this.props.actions.generalAjxProcess(constants.addItemCatalogue, {
          body: addProduct
        }).then(result => {
          result.message.status == 'ERROR' ? alert(result.message.errorDescription) : this.redirectToList()
        });
      }
    }
  }

  redirectToList = () => {
    browserHistory.push('/strata/itemCatalogueList')
    toaster.showToast("Record updated successfully!");
  }

  stringToOtherTypes(formName, numbArray, boolArray) {
    let Obj = {};
    for (let key of numbArray) {
      Obj = this.state[formName]
      if (Obj && Obj[key] != undefined) {
        Obj[key] = Number(Obj[key])
      }
    }
    for (let key of boolArray) {
      Obj = this.state[formName]
      if (Obj && Obj[key] != undefined) {
        Obj[key] ? true : false
      }
    }
    this.setState({
      [formName]: { ...Obj }
    })

  }

  onWorkOnDataChange = (formname, fieldname, type, e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let prevState = _.get(this.state, `${formname}.${fieldname}`, [])
    if (checked && prevState.indexOf(value) === -1) {
      prevState.push(value)
    } else {
      prevState.splice(prevState.indexOf(value), 1)
    }
    let formdata = _.get(this.state, formname, {});
    _.set(formdata, fieldname, prevState);
    this.setState({
      [formname]: formdata
    })
  }

  render() {
    
    console.log(this.state.documents, "DOCUMENTS");
    let _this = this;

    const addDefaultSrc = e => e.target.src = "/assets/Resources/images/default.png";

    const getImage = () => {
      const defaultImg = "/assets/Resources/images/default.png";

      if (_.get(this.state.addProduct, "image", {}) !== "{}") {
        let img = _.get(this.state.addProduct, "image.hash", defaultImg);
        if (img === defaultImg) {
          return defaultImg;
        } else {
          return constants.ipfsGet + img;
        }
      }
    }
    if (!this.state.isLoading)

      return (
        <Portlet title={utils.getLabelByID("Product Catalogue")}>
          <div className="col-md-12" style={{ textAlign: "center", paddingBottom: "25px" }}>
            <img id="productImage"
              src={getImage()}
              onError={addDefaultSrc}
              className="img-responsive img-thumbnail" alt="Product Image" width="150px"
              height="150px"
              ref={input => this.productImage = input}
            />
            <br />
            <span className="label label-primary" style={{ cursor: "pointer" }} onClick={() => { this.ProductImgUploader.click(); }}>
              {utils.getLabelByID("Upload Image")}
            </span>

            <input name="ProductImgUploader" id='ProductImgUploader' type='file' ref={input => this.ProductImgUploader = input} onChange={(e) => {
              let reader = new FileReader();
              let files = e.target.files;
              let _this = this;
              if (files && files[0]) {
                reader.onload = function (fileReader) {
                  _this.productImage.setAttribute('src', fileReader.target.result);

                  let data = new FormData();
                  data.append('file', files[0]);

                  window.fetch(coreConstants.ipfs, {
                    method: 'POST',
                    body: data
                  }).then(checkStatus)
                    .then(parseJSON)
                    .then((item) => {
                      _this.setState({
                        productImage: {
                          name: item.name,
                          type: item.type,
                          hash: item.hash,
                          path: item.path
                        }
                      });


                      console.log('request succeeded with JSON response', item)
                    }).catch(function (error) {
                      console.log('request failed', error)
                    })
                };

                reader.readAsDataURL(files[0]);

                function checkStatus(response) {
                  if (response.status >= 200 && response.status < 300) {
                    return response
                  } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error
                  }
                }

                function parseJSON(response) {
                  return response.json()
                }
              }
            }} />
          </div>
          <Row>
            <Label text="Item Code:" columns='1' />
            <Input fieldname='itemCode' formname='addProduct' columns='5' state={this.state}
              actionHandler={this.generalHandler} className="form-control"
              disabled={this.props.params.id ? "disabled" : ""}
            />
            <Label text="Name:" columns='1' />
            <Input fieldname='name' formname='addProduct'
              columns='5'
              state={this.state}
              actionHandler={this.generalHandler}
              className="form-control"
              disabled={false} />
          </Row>
          <br />
          <Row>
            <Label text="Lead Time:" columns='1' />
            <Input fieldname='leadTime' formname='addProduct' columns='5'
              state={this.state}
              actionHandler={this.generalHandler}
              className="form-control" type='number'
              disabled={false}
            />
            <Label text="Print Time:" columns='1' />
            <Input fieldname='printTime' formname='addProduct' columns='5' state={this.state}
              actionHandler={this.generalHandler} className="form-control" type='number'
              disabled={false} />
          </Row>
          <br />
          <Row>
            <Label text="Part Num:" columns='1' />
            <Input fieldname='partNumber' formname='addProduct'
              columns='5' state={this.state}
              actionHandler={this.generalHandler} className="form-control"
              disabled={false} />
            <Label text="Classification:" columns='1' />
            <Combobox fieldname='classification' formname='addProduct' columns='5' style={{}}
              state={this.state}
              typeName="classification"
              dataSource={this.state.typeData}
              multiple={false}
              actionHandler={this.generalHandler} className="form-control"
              disabled={false}

            />
          </Row>
          <br />
          <Row>
            <Label text="Material:" columns='1' />
            <Combobox fieldname='material' formname='addProduct' columns='5' style={{}}
              state={this.state} typeName="material"
              dataSource={this.state.typeData}
              multiple={false}
              actionHandler={this.generalHandler} className="form-control"
              disabled={false}
            />
            <Label text="Color:" columns='1' />

            <CheckList fieldname='color' formname='addProduct' columns='5' style={{}}

              state={this.state}
              typeName="color"
              dataSource={this.state.typeData}
              checked={Object.keys(this.state.addProduct).length > 0 ? this.state.addProduct.color : this.state}
              actionHandler={this.onWorkOnDataChange}
              disabled={false}

            /> </Row>
          <br />
          <Row>
            <Label text="Model Vol:" columns='1' />
            <Input fieldname='modelVolume' formname='addProduct' columns='5' state={this.state}
              actionHandler={this.generalHandler} className="form-control"
              disabled={false}
            />
            <Label text="Support Vol:" columns='1' />
            <Input fieldname='supportVolume' formname='addProduct' columns='5'
              state={this.state}
              actionHandler={this.generalHandler} className="form-control"
              disabled={false}
            />
          </Row>
          <br />
          <Row>
            <Label text="Price:" columns='1' />
            <Input fieldname='price' formname='addProduct'
              columns='5'
              state={this.state}
              actionHandler={this.generalHandler}
              className="form-control" type='number'
              disabled={false}
            />
          </Row>
          <br />
          <Row>
            <Label text="Description :" columns='1' />
            <Textarea fieldname='description' formname='addProduct' rows="5"
              state={this.state}
              columns='7' style={{ color: 'blue' }}
              actionHandler={this.generalHandler}
              disabled={false}

            />
            <Label text="Is Active" columns='1' />
            <CheckBox fieldname='itemStatus' formname='addProduct'
              value={this.state.addProduct ? this.state.addProduct.itemStatus : false}
              columns='3' style={{}} actionHandler={this.generalHandler}
              disabled={false}
            />
          </Row>
          <br />
          <Row>
            <Document initState={this.state} updateState={this.updateState} getParentState={this.getParentState}
              allowedFileType=".jpg, .jpeg, .png, .bmp, .tiff, .svg, .gif, .pdf, .docx, .doc, .xlsb, .cmb, .stl, .xml , .csv , .xls , .xlsx"
              acceptedFiles="Files to be uploaded with any image extension or *.pdf, *.docx, *.doc, *.xlsb, *.cmb, *.stl, *.xml , *.csv , *.xls , *.xlsx"
              fileUploadURL={constants.ipfs}
            />
          </Row>
          <br />
          <button type="submit" className="btn green" style={{ float: "right" }}
            onClick={this.insertJson}>{utils.getLabelByID("Save")}</button>
          {"  "}
          <br />
          <br />
        </Portlet>

      );
    else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

function mapStateToProps(state, ownProps) {

  return {
    id: _.get(ownProps.params, 'id', ''),
    getItemCatalogue: _.get(state.app, 'getItemCatalogue.searchResult', []),
    updateItemCatalogue: _.get(state.app, 'updateItemCatalogue.searchResult', []),
    typeData: state.app.typeData.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}


ProductCatalogue.displayName = "Product Catalogue";
export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalogue);
