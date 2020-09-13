import React from "react";
import { connect } from "react-redux";
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faTrafficLight } from '@fortawesome/free-solid-svg-icons'

const ProjectStatusWidget = (props) => {

    const { projectData } = props;

    const getStatusLight = (_status) => {
        let color = "gray";
        switch (_status.toLowerCase()) {
            case "on track":
                color = "green";
                break;
            case "delayed":
                color = "red";
                break;
            case "in design":
                color = "purple";
                break;
            case "suspended":
                color = "#FFB627";
                break;
            case "delivered":
                color = "blue";
                break;
        }
        return <FontAwesomeIcon icon={faTrafficLight} style={{color: color}} />;
    };

    return (
        <Card>
              <Card.Body>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th style={{textAlign: "center"}}>Project</th>
                            <th style={{textAlign: "center"}}>TestNet/Staging</th>
                            <th style={{textAlign: "center"}}>MainNet/Production</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectData.map((project) => {
                            const status = getStatusLight(project.status);
                            const testNet = (project.testnet?<FontAwesomeIcon icon={faCheckCircle} style={{color: "green"}} />:<FontAwesomeIcon icon={faTimesCircle} style={{color: "red"}} />)
                            const mainNet = (project.mainnet?<FontAwesomeIcon icon={faCheckCircle} style={{color: "green"}} />:<FontAwesomeIcon icon={faTimesCircle} style={{color: "red"}} />)
                            return <tr key={project.name}>
                                        <td>{status} {project.name}</td>
                                        <td style={{textAlign: "center"}}>{testNet}</td>
                                        <td style={{textAlign: "center"}}>{mainNet}</td>
                                    </tr>
                        })}
                    </tbody>
                </Table>
              </Card.Body>
              <Card.Footer>
                <FontAwesomeIcon icon={faTrafficLight} style={{color: "green", marginRight: "5px", marginLeft: "5px"}} />On Track
                <FontAwesomeIcon icon={faTrafficLight} style={{color: "red", marginRight: "5px", marginLeft: "5px"}} />Delayed
                <FontAwesomeIcon icon={faTrafficLight} style={{color: "#FFB627", marginRight: "5px", marginLeft: "5px"}} />Suspended
                <FontAwesomeIcon icon={faTrafficLight} style={{color: "purple", marginRight: "5px", marginLeft: "5px"}} />In design
                <FontAwesomeIcon icon={faTrafficLight} style={{color: "blue", marginRight: "5px", marginLeft: "5px"}} />delivered
                <FontAwesomeIcon icon={faTrafficLight} style={{color: "gray", marginRight: "5px", marginLeft: "5px"}} />Not Started
              </Card.Footer>
            </Card>
    );
};

const mapStateToProps = ({ dataReducer }) => ({
    projectData: dataReducer.projects,
});
  
const mapDispatchToProps = (dispatch) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectStatusWidget);