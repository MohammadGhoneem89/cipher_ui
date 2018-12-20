import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import KYCProfileForm from './KYCProfileForm.jsx';
import * as constants from "../../../../core/constants/Communication";
import * as requestCreator from "../../../../core/common/request";
import * as actions from "../../../../core/actions/generalAction";
import * as utils from "../../../../core/common/utils";
import _ from "lodash";
import axios from 'axios'
import * as toaster from '../../../../core/common/toaster.js';
const firstOptions = [
  { key: 0, value: 'default', text: '--Select an Option--' },
  { key: 1, value: 'option1', text: 'option1 - when I am selected another shall appear' },
  { key: 2, value: 'option2', text: 'option2' },
  { key: 3, value: 'option3', text: 'option3' },
];

const secondOptions = [
  { key: 0, value: 'default', text: '--Select an Option--' },
  { key: 1, value: 'option1', text: 'option1' },
  { key: 2, value: 'option2', text: 'option2' },
];

class KYCProfileContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      initialValues: {
        "KycProfile": {
          "_id": "5c07a6641d16d10a7c36110d",
          "profileName": "CreateAccount",
          "sector": "Banking",
          "country": "Bahrain",
          "isActive": false,
          "survey": [],
          "attributes": [
            {
              "type": "group",
              "id": "5c07a6641d16d10a7c36110d",
              "section": "section1",
              "alias": "__EmiratesID.CustomerContact",
              "isRequired": true
            }
          ]
        }
      },
      typeData: {
        KYC_PROFILE_SECTORS: [
          {
            "label": "Telco",
            "value": "Telco"
          },
          {
            "label": "Banking",
            "value": "Banking"
          },
          {
            "label": "General",
            "value": "General"
          }],
        KYC_QUESTION_TYPE: [
          {
            "label": "MCQs",
            "value": "MCQs"
          },
          {
            "label": "Text",
            "value": "text"
          }
        ],
        KYC_PROFILE_COUNTRY: [
          {
            "label": "UAE",
            "value": "UAE"
          },
          {
            "label": "Bahrain",
            "value": "Bahrain"
          }],
        KYC_PROFILE_TYPE: [
          {
            "label": "Corporate",
            "value": "Corporate"
          },
          {
            "label": "Retail",
            "value": "Retail"
          }
        ],
        KYC_PROFILE_ASSOCIATION_TYPE: [
          {
            "label": "Group",
            "value": "Group"
          },
          {
            "label": "Attribute",
            "value": "Attribute"
          }
        ]
      },
      attributesType: undefined,
      attributes: undefined,
      survey: undefined,
      surveyQuestionType: undefined,
      surveyChoices: undefined
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.postBlockChain = this.postBlockChain.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.profileID && nextProps.attributeGroupList && nextProps.attributeList) {
      let attributeList = nextProps.attributeList.searchResult.map(item => {
        return {
          label: item.attributeName,
          value: item._id
        };
      });
      this.setState({
        blockchainData: undefined,
        isLoading: false,
        typeData: {
          ...this.state.typeData,
          attributeList,
          attributeGroupList: nextProps.attributeGroupList.typeData
        }
      })
    }
    else if (nextProps.profileID && nextProps.KYCProfile && nextProps.blockchainData && nextProps.attributeGroupList && nextProps.attributeList) {
      let attributeList = nextProps.attributeList.searchResult.map(item => {
        return {
          label: item.attributeName,
          value: item._id
        };
      });
      this.setState({
        isLoading: false,
        survey: nextProps.KYCProfile.survey,
        attributes: nextProps.KYCProfile.attributes,
        blockchainData: nextProps.blockchainData,
        typeData: {
          ...this.state.typeData,
          attributeList,
          attributeGroupList: nextProps.attributeGroupList.typeData
        }
      })
    }
  }

  componentDidMount() {
    // this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES']));
    this.props.actions.generalProcess(constants.attributeGroupList, {
      "action": "GroupList",
      "searchCriteria": {},
      "page": {
        "pageSize": 1000,
        "currentPageNo": 1
      }
    });
    this.props.actions.generalProcess(constants.AttributeList, {
      "action": "attributeList", "searchCriteria": {}, "sortData": { "type": 1 }, "page": { "pageSize": 1000, "currentPageNo": 1 }
    });

    if (this.props.profileID) {
      this.props.actions.generalProcess(constants.KYCGetProfile, {
        "action": "profile",
        "id": this.props.profileID
      });
    }
  }

  postBlockChain(e) {
    if (this.state.blockchainData) {
      let data = {
        profile: this.state.blockchainData
      }
      axios.post(constants.CreateKycForm, data)
        .then(res => {
          if (res.data.messageStatus == "OK") {
            toaster.showToast("Posted on blockchain Successfully")
          } else {
            console.log(JSON.stringify(res.data))
            alert("Oh Snap!");
          }
        }).catch((ex) => {
          console.log(ex)
          alert("Oh Snap!");
        });
    } else {
      alert("Blockchain data not found!!");
    }
  }
  formSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = Array.from(formData.entries()).reduce((memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }), {});
    data.isActive = !!data.isActive;
    data.attributes = this.state.attributes;
    data.survey = this.state.survey;

    let attributeList = [];
    let groupList = [];
    for (let rowCount = 0; rowCount < this.state.attributes.length; rowCount++) {
      let attributeValue = this.state.attributes[rowCount];

      if (attributeValue.type == 'Group')
        groupList.push(attributeValue.alias.split('-')[1]);
      else
        attributeList.push(attributeValue.alias.split('-')[1])

    }
    data.attributeList = attributeList;
    data.groupList = groupList;


    // choices
    // function deepJSON(dataSource) {
    //   let dataKeys = Object.keys(dataSource);
    //   dataKeys.map((keyElement) => {
    //     let keys = keyElement.split(".");
    //     if (keys.length > 1) {
    //       keyElement.split('.').reduce((o, i, j) => {
    //         if (j === keys.length - 1) {
    //           const value = dataSource[keyElement];
    //           delete dataSource[keyElement];
    //           return o[i] = value;
    //         }
    //         else {
    //           if (o[i]) {
    //             return o[i];
    //           }
    //           else {
    //             return o[i] = {};
    //           }
    //         }
    //       }, dataSource);
    //     }
    //   });
    //   return dataSource;
    // }

    if (this.props.profileID) {
      let request = {
        action: "updateProfile",
        id: this.props.profileID,
        data
      };
      this.props.actions.generalProcess(constants.KYCUpdateProfile, request);
    }
    else {
      let request = {
        action: "addProfile",
        data
      };
      this.props.actions.generalProcess(constants.KYCAddProfile, request);
    }
  }


  render() {
    if (!this.state.isLoading) {
      return <div>
        <KYCProfileForm parent={this} initialValues={this.props.KYCProfile}
          onSubmit={this.formSubmit}
          postBlockChain={this.postBlockChain}
        />
      </div>;
    }
    else {
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    KYCProfile: state.app.profile.data ? state.app.profile.data.searchResult : undefined,
    blockchainData: state.app.profile.data ? state.app.profile.data.blockchainData : undefined,
    attributeGroupList: state.app.attributeGroupList.data,
    attributeList: state.app.attributeList.data,
    profileID: ownProps.params.profileID
  };

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

KYCProfileContainer.displayName = "eKYC_KYCProfileSetup";

export default connect(mapStateToProps, mapDispatchToProps)(KYCProfileContainer)