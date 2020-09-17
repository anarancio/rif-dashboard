import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faTrafficLight } from '@fortawesome/free-solid-svg-icons'
import CustomDialog from '../utils/CustomDialog'
import { getProjectData } from "../../redux/actions";

const ProjectStatusWidget = (props) => {
    const [show, setShow] = useState(false);
    const [dialogTitle, setDialogTitle] = useState(false);
    const [dialogData, setDialogData] = useState([]);

    const { projectData, getProjectDataAction } = props;

    useEffect(() => {
        getProjectDataAction();
    }, []);

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

    const handleClose = () => setShow(false);

    const returnEnvIcon = (envStatus) => {
        const status = envStatus.toLowerCase();
        if(status == 'yes') {
            return <FontAwesomeIcon icon={faCheckCircle} style={{color: "green"}} />;
        } else if (status == 'no') {
            return <FontAwesomeIcon icon={faTimesCircle} style={{color: "red"}} />;
        } else {
            return <span>Not Applicable</span>;
        }
    }

    return (
        <div>
            <Card>
                <Card.Body>
                <Table striped bordered hover size="sm">
                    <thead style={{backgroundColor: "#133b5c", color: "white"}}>
                        <tr>
                            <th style={{textAlign: "center"}}>Service</th>
                            <th style={{textAlign: "center"}}>Project</th>
                            <th style={{textAlign: "center"}}>TestNet/Staging</th>
                            <th style={{textAlign: "center"}}>MainNet/Production</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectData.map((project) => {
                            const key = project.category + '-' + project.name;
                            const status = getStatusLight(project.status);
                            const testNet = returnEnvIcon(project.testnet);
                            const mainNet = returnEnvIcon(project.mainnet);
                            return <tr key={key}>
                                        <td style={{textAlign: "center"}}>{project.category}</td>
                                        <td onClick={() => {
                                            setDialogTitle(project.name + ' events');
                                            setDialogData(project.events);
                                            setShow(true);
                                        }}>{status} {project.name}</td>
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
            <CustomDialog showDialog={show} title={dialogTitle} closeAction={handleClose}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th style={{textAlign: "center", width: "70%"}}>Event</th>
                            <th style={{textAlign: "center"}}>Dates</th>
                        </tr>
                    </thead>
                    <tbody style={{fontSize: "small"}}>
                        {dialogData.map((data, idx) => {
                            const key = data.date + '-' + idx;
                            return <tr key={key}>
                                        <td>{data.text}</td>
                                        <td style={{fontSize: "xx-small"}}>
                                            <b>Date:</b> {data.date}<br />
                                            <b>Delivery date:</b> {data.deliveryDate}
                                        </td>
                                    </tr>
                        })}
                    </tbody>
                </Table>
            </CustomDialog>
        </div>
    );
};

const mapStateToProps = ({ dataReducer }) => ({
    projectData: dataReducer.projects,
});
  
const mapDispatchToProps = (dispatch) => ({
    getProjectDataAction: () => dispatch(getProjectData()),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectStatusWidget);