import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'

const GroupTree = props => {
    const { updateState, state, initialValues } = props;

    return (
        <div className="row">
            
            <div className="col-md-6">
                <div className="table100 ver1 m-b-110">
                    <div className="table100-head orderdetails-table" style={{ paddingBottom: '3px' }}>
                        <h4 className="caption" style={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Permissions</h4>
                    </div>

                    <div className="form-group" style={{ padding: '15'}}>
                        <CheckboxTree
                            nodes={initialValues.nodes}
                            checked={state.checked}
                            expanded={state.expanded}
                            onCheck={checked => {
                                updateState({ checked })
                            }}
                            onExpand={expanded => {
                                updateState({ expanded })
                            }}
                        />
                    </div>

                </div>
            </div>


        </div>
    );
};
export default GroupTree;