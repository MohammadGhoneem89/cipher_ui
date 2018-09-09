import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../../core/actions/generalAction';
import * as constants from '../../../constants/Communication.js';
import * as requestCreator from '../../../core/common/request.js';
import Portlet from '../../../core/common/Portlet.jsx';
import BlockchainSearchFrom from './BlockchainSearchForm.jsx';
import BlockchainEditorFrom from './BlockchainEditorForm.jsx';

class BlockchainEditor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.search = this.search.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            collectionNames: [
                {
                    "label": "ConsolidatedView",
                    "value": "ConsolidatedView"
                }
            ],
            filterCriteria: undefined,
            searchResult: undefined,
            isLoading: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            searchResult: {document: JSON.stringify(nextProps.document, undefined, 4)},
            isLoading: nextProps.isLoading
        });
    }

    componentDidMount() {
        // this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
        //     "currentPageNo": 1,
        //     "pageSize": this.state.pageSize
        // }));
        // this.setState({isLoading: true});
    }

    search(data) {
        this.props.actions.generalProcess(constants.fetchCollectionValueByKey, requestCreator.createFetchCollectionByKeyRequest(data));
        this.setState({filterCriteria: data, isLoading: true});
    }

    submit(data) {
        let validJSON;
        try {
            validJSON = JSON.parse(data.document);
        } catch (e) {
            alert(e); // error in the above string (in this case, yes)!
        }

        if (validJSON) {
            this.props.actions.generalProcess(constants.updateCollectionValueByKey, requestCreator.createUpdateCollectionByKeyRequest({
                key: this.state.filterCriteria.key,
                document: data.document
            }));
        }
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <Portlet title={"BlockchainEditor"}>
                    <Portlet title={"Find"}>
                        <BlockchainSearchFrom onSubmit={this.search} initialValues={this.state.filterCriteria}
                                              state={this.state}/>
                    </Portlet>
                    {this.state.searchResult && <Portlet title={"Editor"}>
                        <BlockchainEditorFrom onSubmit={this.submit} initialValues={this.state.searchResult}
                                              state={this.state}/>
                    </Portlet>}
                </Portlet>
            );
        }
        else
            return (<div className="loader">Loading...</div>)
    }
}

function mapStateToProps(state, ownProps) {
    let fetchCollectionValueByKey = state.app.ResultData;
    return {
        isLoading: false,
        document: fetchCollectionValueByKey ? fetchCollectionValueByKey.value : undefined
    };

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

BlockchainEditor.displayName = "Blockchain Editor";

export default connect(mapStateToProps, mapDispatchToProps)(BlockchainEditor)