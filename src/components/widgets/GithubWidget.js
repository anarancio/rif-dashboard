import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faGlasses, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import CustomDialog from '../utils/CustomDialog'
import { PieChart, Pie, Sector, Legend, Tooltip, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

const GithubWidget = (props) => {
    const [show, setShow] = useState(false);

    const { githubData } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
      ];

    return (
        <div>
            <Card onClick={handleShow}>
                <Card.Header>Github Metrics</Card.Header>
                <Card.Body>
                <Card.Text>
                    <FontAwesomeIcon icon={faStar} /> {githubData.stars} <span style={{width: "10px", marginLeft: "10px", marginRight: "10px"}}></span>
                    <FontAwesomeIcon icon={faGlasses} /> {githubData.watchers} <span style={{width: "10px", marginLeft: "10px", marginRight: "10px"}}></span>
                    <FontAwesomeIcon icon={faCodeBranch} /> {githubData.forks}
                </Card.Text>
                </Card.Body>
            </Card>
            <CustomDialog showDialog={show} title={"Github Details"} closeAction={handleClose}>
                <div>
                    <PieChart width={460} height={460}>
                        <Pie dataKey="value" isAnimationActive={false} data={data} cx={230} cy={180} outerRadius={120} fill="#ff7300" labelLine={false} label>
                            {
                                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Legend />
                    </PieChart>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th style={{textAlign: "center"}}><FontAwesomeIcon icon={faStar} /><span style={{width: "5px", marginLeft: "5px"}}></span>Stars</th>
                                <th style={{textAlign: "center"}}><FontAwesomeIcon icon={faGlasses} /><span style={{width: "5px", marginLeft: "5px"}}></span>Watchers</th>
                                <th style={{textAlign: "center"}}><FontAwesomeIcon icon={faCodeBranch} /><span style={{width: "5px", marginLeft: "5px"}}></span>Forks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {githubData.data.map((githubData) => (
                                <tr key={githubData.id}>
                                    <td>{githubData.id}</td>
                                    <td style={{textAlign: "center"}}>{githubData.stars}</td>
                                    <td style={{textAlign: "center"}}>{githubData.watchers}</td>
                                    <td style={{textAlign: "center"}}>{githubData.forks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </CustomDialog>
        </div>
    );
};

const mapStateToProps = ({ dataReducer }) => ({
    githubData: dataReducer.github,
});
  
const mapDispatchToProps = (dispatch) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(GithubWidget);