import React from "react";
import { connect } from "react-redux";
import { Card } from 'react-bootstrap';

const GithubWidget = (props) => {

    return (
        <Card>
            <Card.Header>Github Metrics</Card.Header>
            <Card.Body>
            <Card.Text>
                With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = ({ dataReducer }) => ({
});
  
const mapDispatchToProps = (dispatch) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(GithubWidget);