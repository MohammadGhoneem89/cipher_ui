import * as React from "react";
import Modal from 'react-modal';
import { Scrollbars } from 'react-custom-scrollbars';
// https://www.npmjs.com/package/react-modal
const ModalBox = ({ isOpen, children }) => {
    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            overflowY: "hidden",
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
        content: {
            top: '50%',
            left: '30%',
            right: 'auto',
            bottom: 'auto',
            overflowY: "hidden",
            marginRight: '-50%',
            transform: 'translate(-25%, -44%)',
            // width: '80%',
            padding: '0px',
            // maxHeight: '80%',
            // overflow:"hidden",
            background: 'white',
            border: 'none'
        }
    };

    return (<Modal
        isOpen={(() => {
            if (isOpen) {
                // setTimeout(()=>{
                //     $("body").addClass('page-sidebar-closed');
                //     $("#SideMenuIcons").addClass('page-sidebar-menu-closed');
                // },1);
            }
            else {
                $("body").removeClass('page-sidebar-closed');
                $("#SideMenuIcons").removeClass('page-sidebar-menu-closed');
            }
            return isOpen;
        })()}
        style={customStyles}
    >
        <Scrollbars style={{ height: "650" }}>

            {children}

        </Scrollbars>
    </Modal>);
};

export default ModalBox;