import React from "react";
import { connect } from "react-redux";
import { Card, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faUsers, faDatabase } from '@fortawesome/free-solid-svg-icons'

const OkrsWidget = (props) => {

    return (
        <div>
            <Card>
                <Card.Header style={{backgroundColor: "#133b5c", color: "white"}}>OKRs</Card.Header>
                <Card.Body>
                    <div>
                        <FontAwesomeIcon icon={faCoins} style={{marginRight: "5px", marginLeft: "5px"}} />RIF staked
                        <ProgressBar variant="info" now={10} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faUsers} style={{marginRight: "5px", marginLeft: "5px"}} />Daily Active Users
                        <ProgressBar variant="warning" now={30} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faDatabase} style={{marginRight: "5px", marginLeft: "5px"}} />Transactions per day
                        <ProgressBar variant="success" now={20} />
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

const mapStateToProps = ({ dataReducer }) => ({
});
  
const mapDispatchToProps = (dispatch) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(OkrsWidget);