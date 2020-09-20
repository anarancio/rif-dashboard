import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faUsers, faDatabase } from '@fortawesome/free-solid-svg-icons'
import { getOkrsSummary } from "../../redux/actions";

const OkrsWidget = (props) => {

    const { okrsData, getOkrsSummaryAction } = props;

    useEffect(() => {
        getOkrsSummaryAction();
    }, []);

    return (
        <div>
            <Card>
                <Card.Header style={{backgroundColor: "#133b5c", color: "white"}}>OKRs</Card.Header>
                <Card.Body>
                    <div>
                        <FontAwesomeIcon icon={faCoins} style={{marginRight: "5px", marginLeft: "5px"}} />{okrsData.staking.total} RIF staked (~{okrsData.staking.totalUsd} USD)
                        <ProgressBar variant="info" now={okrsData.staking.percentage} />
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
    okrsData: dataReducer.okrs,
});
  
const mapDispatchToProps = (dispatch) => ({
    getOkrsSummaryAction: () => dispatch(getOkrsSummary()),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(OkrsWidget);