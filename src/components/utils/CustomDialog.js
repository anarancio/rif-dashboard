import React from "react";
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap';

const CustomDialog = (props) => {

    const { children, title, showDialog, closeAction } = props;

    return (
        <Modal show={showDialog} onHide={closeAction}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
};

const mapStateToProps = ({ dataReducer }) => ({
});
  
const mapDispatchToProps = (dispatch) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CustomDialog);