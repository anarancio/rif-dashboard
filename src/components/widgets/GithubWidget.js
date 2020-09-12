import React from "react";
import { connect } from "react-redux";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faGlasses, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

const GithubWidget = (props) => {

    const { githubData } = props;

    return (
        <Card>
            <Card.Header>Github Metrics</Card.Header>
            <Card.Body>
            <Card.Text>
                <FontAwesomeIcon icon={faStar} /> {githubData.stars} <span style={{width: "10px", marginLeft: "10px", marginRight: "10px"}}></span>
                <FontAwesomeIcon icon={faGlasses} /> {githubData.watchers} <span style={{width: "10px", marginLeft: "10px", marginRight: "10px"}}></span>
                <FontAwesomeIcon icon={faCodeBranch} /> {githubData.forks}
            </Card.Text>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = ({ dataReducer }) => ({
    githubData: dataReducer.github,
});
  
const mapDispatchToProps = (dispatch) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(GithubWidget);