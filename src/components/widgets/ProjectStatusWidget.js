import React from "react";
import { connect } from "react-redux";
import { Card, Table } from 'react-bootstrap';

const ProjectStatusWidget = (props) => {

    return (
        <Card>
              <Card.Body>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Status</th>
                            <th>TestNet/Staging</th>
                            <th>MainNet/Production</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </Table>
              </Card.Body>
            </Card>
    );
};

const mapStateToProps = ({ dataReducer }) => ({
});
  
const mapDispatchToProps = (dispatch) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectStatusWidget);