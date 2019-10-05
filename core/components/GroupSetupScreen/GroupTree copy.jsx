import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'

const GroupTree = props => {
    const {updateState, state, initialValues} = props;

    return (
        <div className="row">
            <div className="col-md-2">
                <h4 className="caption" style={{fontWeight: "bold"}}>Permissions</h4>
            </div>
            <div>
                <div className="col-md-12">
                    <div className="form-group">
                        <CheckboxTree
                            nodes={initialValues.nodes}
                            checked={state.checked}
                            expanded={state.expanded}
                            onCheck={checked => {
                                updateState({checked})
                            }}
                            onExpand={expanded => {
                                updateState({expanded})
                            }}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};
export default GroupTree;