import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import _ from 'lodash';

import UserSetupForm from './UserSetupForm2.jsx'
import Portlet from '../../common/Portlet.jsx';

import config from '../../../config';

import * as gen from '../../../applications/starta/common/generalActionHandler';

class UserSetupContainer2 extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            typeData: {},
            userDetail: {},
            errors: {},
            groupIndex: 0
        };
    }

    addDefaultSrc = e => e.target.src = "/assets/Resources/images/default.png";

    imgDiv() {
        return (
            <div className="col-md-12" style={{ textAlign: "center" }}>
                <img
                    id="UserProfilePic"
                    src={this.state.userDetail.profilePic ? constants.baseUrl + this.state.userDetail.profilePic : "/assets/Resources/images/default.png"}
                    onError={this.addDefaultSrc}
                    className="img-responsive img-thumbnail" alt="Profile Image" width='190px'
                    height='190px'
                    ref={input => this.profilePic = input}
                />
                <br />
                <span
                    className="label label-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        console.log('Upload Image Clicked.')
                        this.profilePicUploader.click();
                    }}
                >
                    {"Upload Image"}
                </span>

                <input
                    name="profilePicUploader"
                    id='profilePicUploader'
                    type='file'
                    style={{ display: 'none' }}
                    ref={input => this.profilePicUploader = input}
                    onChange={(e) => {
                        console.log('Profile pic on change')
                        let reader = new FileReader();
                        let files = e.target.files;
                        let _this = this;

                        if (files && files[0]) {

                            reader.onload = function (fileReader) {
                                _this.profilePic.setAttribute('src', fileReader.target.result);

                                _this.props.actions.generalAjxProcess(constants.uploadImg, requestCreator.createImgUploadRequest({
                                    byteData: fileReader.target.result,
                                    context: {
                                        name: files[0].name,
                                        size: files[0].size,
                                        type: files[0].type
                                    }
                                })).then(result => {
                                    _this.setState({
                                        userDetail: {
                                            ..._this.state.userDetail,
                                            profilePic: result.entityLogo.sizeSmall
                                        }
                                    })
                                });
                            };
                            reader.readAsDataURL(files[0]);
                        }
                    }} />
            </div>
        )
    }

    componentDidMount() {

        this.props.actions.generalProcess(constants.getBlkUserList); // Hyperledger/quorum etc blckchain users (peer admins)
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES', 'CALLER_TYPES', 'First_Screens'])); // Org types (entities)

        this.props.actions.generalProcess(constants.getUserDetail, {    // user detail + groups list
            "action": "userDetails",
            "id": this.props.params.userID
        });

        this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({     // Get Orgs (entities)
            "currentPageNo": 1,
            "pageSize": 1
        }));

        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        let perTypeData = this.getPermissionTypeData(nextProps.permission)
        if (nextProps.userDetail && nextProps.userDetail.groups && nextProps.entityNames && nextProps.orgTypes && nextProps.callerTypes && nextProps.firstScreens && nextProps.hyperledgerData && nextProps.quorrumData) {

            let userType = sessionStorage.orgType;
            let authenticationType = [];

            if (userType !== 'Entity' && userType !== 'Acquirer') {
                authenticationType = [
                    { value: "System", label: "System" },
                    { value: "Local", label: "Local" }
                ];
            }
            else {
                authenticationType = [
                    { value: "System", label: "System" },
                ];
            }
            let firstScreen = ''
            nextProps.firstScreens.forEach(obj => {
                if (obj.url === nextProps.userDetail.firstScreen) {
                    firstScreen = obj.value
                }
            });

            let groups = [...nextProps.userDetail.groups]
            
            console.log(this.props.params.userID, ' : User ID')

            let hypUser = nextProps.userDetail.hypUser
            if (nextProps.userDetail.network) {
                hypUser = nextProps.userDetail.network + '-' + hypUser
            }

            if (this.props.params.userID && nextProps.userDetail.userID) {
                this.setState({
                    id: this.props.params.userID,
                    isLoading: false,
                    userDetail: {
                        ...nextProps.userDetail,
                        firstScreen,
                        groups,
                        hypUser
                    },
                    typeData: {
                        ...this.state.typeData,
                        orgTypes: nextProps.orgTypes,
                        callerTypes: nextProps.callerTypes,
                        firstScreens: nextProps.firstScreens,
                        entityNames: nextProps.entityNames,
                        hyperledgerData: nextProps.hyperledgerData,
                        quorrumData: nextProps.quorrumData,
                        authenticationType
                    },
                    permissionTypeData: perTypeData,
                    actions: [...nextProps.userDetailActions]

                })
            } else {
                this.setState({
                    id: undefined,
                    isLoading: false,
                    userDetail: {
                        firstScreen,
                        groups,
                        hypUser
                    },
                    typeData: {
                        ...this.state.typeData,
                        orgTypes: nextProps.orgTypes,
                        callerTypes: nextProps.callerTypes,
                        firstScreens: nextProps.firstScreens,
                        entityNames: nextProps.entityNames,
                        hyperledgerData: nextProps.hyperledgerData,
                        quorrumData: nextProps.quorrumData,
                        authenticationType
                    },
                    permissionTypeData: perTypeData,
                    actions: [...nextProps.userDetailActions]

                })
            }
        }
    }
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validateIPaddress = (ipaddress) => {
        if (String(ipaddress).trim() == '*.*.*.*') {
            return true
        } else {
            var re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            return re.test(ipaddress)
        }

    }
    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.userDetail)
        console.log('Form Submits')

        // Validation Input
        let errors = {}
        if (!this.state.userDetail.userType) {
            errors.userType = 'Field is Required'
        }
        if (this.state.userDetail.userType === 'Human' && !this.state.userDetail.authType) {
            errors.authType = 'Field is Required'
        }
        if (!this.state.userDetail.orgType) {
            errors.orgType = 'Field is Required'
        }
        if (!this.state.userDetail.orgCode) {
            errors.orgCode = 'Field is Required'
        }
        if (!this.state.userDetail.userID) {
            errors.userID = 'Field is Required'
        }
        if (!this.state.userDetail.password && !this.props.params.userID) {
            errors.password = 'Field is Required'
        }
        if (this.state.userDetail.userType === 'Human' && !this.state.userDetail.firstName) {
            errors.firstName = 'Field is Required'
        }
        if (!this.state.userDetail.email) {
            errors.email = 'Field is Required'
        }
        if (!this.validateEmail(this.state.userDetail.email)) {
            errors.email = 'Email address not valid'
        }
        if (!this.state.userDetail.allowedIPRange) {
            errors.allowedIPRange = 'Field is Required'
        }
        if (!this.validateIPaddress(this.state.userDetail.allowedIPRange)) {
            errors.allowedIPRange = 'Invalid IP Address'
        }
        if (this.state.userDetail.userType === 'Human' && !this.state.userDetail.firstScreen) {
            errors.firstScreen = 'Field is Required'
        }

        if (Object.keys(errors).length > 0) {
            console.log(errors, ' errors found')
            window.scrollTo(0, 0);
            this.setState({
                errors
            })
            return
        }


        let firstScreen = ''
        this.state.userDetail.firstScreen
        this.state.typeData.firstScreens.forEach(obj => {
            if (obj.value === this.state.userDetail.firstScreen) {
                firstScreen = obj.url
            }
        })

        let hypUserArray = this.state.userDetail.hypUser && ~this.state.userDetail.hypUser.indexOf('-') ? this.state.userDetail.hypUser.split('-') : ['', this.state.userDetail.hypUser];
        let hypUser = hypUserArray.pop();
        console.log('hypUserArray', hypUserArray.join('-'));
        let network = hypUserArray && hypUserArray.length ? hypUserArray.join('-') : hypUserArray[0];

        if (this.props.params.userID) {
            this.setState({
                isLoading: true
            })
            window.scrollTo(0, 0);
            const checkedGroups =  this.state.userDetail.groups.filter((group,index)=>{
                if (this.state.userDetail.userType === 'Human' && group.type != 'API') {
                    return true
                } else if (this.state.userDetail.userType === 'API' && group.type === 'API') {
                    return true
                }
                return false
            }).filter((group,index) => {
                return index===this.state.groupIndex
            })
            debugger
            this.props.actions.generalAjxProcess(constants.userUpdate,
                requestCreator.createUserInsertRequest({
                    ...this.state.userDetail,
                    id: this.props.params.userID,
                    groups: checkedGroups,
                    passwordHashType: "sha512",
                    firstScreen,
                    network,
                    hypUser,
                    allowedIPRange: [String(this.state.userDetail.allowedIPRange)]
                }))
                .catch(err => {
                    this.setState({
                        errors: {
                            ...err
                        },
                        isLoading: false
                    })
                    console.log(err, ' :err')
                    window.scrollTo(0, 0);
                })

        } else {
            this.setState({
                isLoading: true
            })
            window.scrollTo(0, 0);
            const checkedGroups =  this.state.userDetail.groups.filter((group,index)=>{
                if (this.state.userDetail.userType === 'Human' && group.type != 'API') {
                    return true
                } else if (this.state.userDetail.userType === 'API' && group.type === 'API') {
                    return true
                }
                return false
            }).filter((group,index) => {
                return index===this.state.groupIndex
            })
            debugger
            this.props.actions.generalAjxProcess(constants.userInsert,
                requestCreator.createUserInsertRequest({
                    ...this.state.userDetail,
                    id: this.props.params.userID,
                    groups: checkedGroups,
                    passwordHashType: "sha512",
                    firstScreen,
                    network,
                    hypUser,
                    allowedIPRange: this.state.userDetail.allowedIPRange
                }))
                .catch(err => {
                    this.setState({
                        errors: {
                            ...err
                        },
                        isLoading: false
                    })
                    console.log(err, ' :err')
                    window.scrollTo(0, 0);
                })

        }
    }

    resetPassword = () => {

        if (this.props.params.userID) {
            let request = { "userID": this.props.params.userID };
            this.props.actions.generalProcess(constants.passwordReset, request);
        }

    }

    performAction = (actionObj) => {
        if (actionObj.value === "4055") {
            return this.resetPassword();
        }
    }


    // Helper
    getPermissionTypeData = (permission) => {

        let arr = [];
        for (let obj of permission) {
            if (obj.label == "Dashboard") {
                for (let a of obj.children) {
                    let json = {};
                    json.label = a.label;
                    json.value = a.pageURI;
                    arr.push(json);
                }
            }
        }
        return arr;
    };

    userTypeHandler(formname, fieldname, type, e) {
        let value = e.target.value;
        let formdata = _.get(this.state, formname, {});
        _.set(formdata, e.target.name, value);

        this.setState({
            [formname]: formdata,
            groupIndex: 0
        });
    };

    customHandler(formname, fieldname, type, e) {
        let value = e.target.value;
        let formdata = _.get(this.state, formname, {});
        _.set(formdata, e.target.name, value);
        _.set(formdata, 'orgCode', '');
        this.setState({

            typeData: {
                ...this.state.typeData,
                entityNamesFiltered: this.state.typeData.entityNames
                    .filter(item => {
                        if (item.orgType === value) {
                            return true
                        } else {
                            return false
                        }
                    })
            },
            [formname]: formdata
        }
        );
    };

    onChange(e) {

        let groups = [...this.state.userDetail.groups]
        
        // clear all groups if a new is going to be selected to make it a combo box instead of checkbox
        groups.map(item => {
            item.isAssigned = false
            return item
        })
        // checkbox ended

        let groupIndex = -1;

        
        groups.filter((item, index) => {
            if (this.state.userDetail.userType === 'Human' && item.type != 'API') {
                return true
            } else if (this.state.userDetail.userType === 'API' && item.type === 'API') {
                return true
            }
            return false
        }).forEach((item,index)=>{
            if (parseInt(e.target.name)===index){
                groupIndex = index
            }
        })
        console.log(groupIndex, ' groupIndex >>>>>>>>>>>>>>>>>>>>>>')


        this.setState({
            userDetail: {
                ...this.state.userDetail,
                groups: [...groups]
            },
            groupIndex
        })
    }

    // changePassword(e){
    //     e.preventDefault()
    //     console.log('changePassword')
    //     browserHistory.push('/changePassword')
    //     window.scrollTo(0, 0);
    // }

    render() {
        if (!this.state.isLoading) {
            let allowedGroup = []
            let groupList = []
            if (sessionStorage.orgType == 'Entity' || sessionStorage.orgType == 'Acquirer') {

                if (sessionStorage.orgType == 'Entity')
                    allowedGroup = config.entityGroupList;
                else
                    allowedGroup = config.acquirerGroupList;

                for (let groupCount = 0; groupCount < this.state.userDetail.groups.length; groupCount++) {
                    let isValid = false;
                    for (let count = 0; count < allowedGroup.length; count++) {
                        if (this.state.userDetail.groups[groupCount].name == allowedGroup[count]) {
                            isValid = true;
                            break;
                        }
                    }
                    if (isValid) {
                        groupList.push(this.state.userDetail.groups[groupCount])

                    }
                }
                this.setState({
                    userDetail: {
                        ...this.state.userDetail,
                        groups: groupList
                    }
                })
            }
        }


        return (
            this.state.isLoading ? <div className="loader">Loading...</div> : (

                <Portlet title={"User"} style={{ minHeight: '845px' }}>
                    < UserSetupForm
                        // changePassword={this.props.params.userID ? this.changePassword.bind(this) : undefined}
                        onError={this.addDefaultSrc}
                        typeData={this.state.typeData}
                        containerState={this.state}
                        generalHandler={gen.generalHandler.bind(this)}
                        customHandler={this.customHandler.bind(this)}
                        userTypeHandler={this.userTypeHandler.bind(this)}
                        onChangeHandler={this.onChange.bind(this)}
                        onSubmit={this.onSubmit.bind(this)}
                        imgDiv={this.imgDiv.bind(this)}
                        performAction={this.performAction}
                    />
                </Portlet>

            )
        )
    }
}

function mapStateToProps(state, ownProps) {

    return {
        // User Data
        userDetail: _.get(state.app, 'userDetails.data.searchResult', undefined),
        userDetailActions: _.get(state.app, 'userDetails.data.actions', undefined),
        // Type Data
        entityNames: _.get(state.app, 'entityList.data.typeData.entityNames', undefined),
        orgTypes: _.get(state.app, 'typeData.data.ORG_TYPES', undefined),
        callerTypes: _.get(state.app, 'typeData.data.CALLER_TYPES', undefined),
        firstScreens: _.get(state.app, 'typeData.data.First_Screens', undefined),
        permission: _.get(state.app, 'permissionData.data.menuPermissions', undefined),
        hyperledgerData: _.get(state.app, 'NetworkUserTypeData.data.hyperledger', undefined),
        quorrumData: _.get(state.app, 'NetworkUserTypeData.data.quorrum', undefined)

    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

UserSetupContainer2.displayName = "USetup_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(UserSetupContainer2)