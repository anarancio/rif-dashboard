import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Table, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faGlasses, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import CustomDialog from '../utils/CustomDialog'
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { getGithubSummary } from "../../redux/actions";

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

    const { githubData, getGithubSummaryAction } = props;

    useEffect(() => {
        getGithubSummaryAction();
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Card onClick={handleShow}>
                <Card.Header style={{backgroundColor: "#133b5c", color: "white"}}>Github Metrics</Card.Header>
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
                <Tabs defaultActiveKey="stars" id="github-chart-selector">
                    <Tab eventKey="stars" title="Stars">
                        <PieChart width={400} height={300}>
                            <Pie dataKey="value" nameKey="category" isAnimationActive={false} data={githubData.dataByAttrs.stars} cx={230} cy={130} outerRadius={80} fill="#ff7300" labelLine={false} label>
                                {
                                    githubData.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </Tab>
                    <Tab eventKey="watchers" title="Watchers">
                        <PieChart width={400} height={300}>
                            <Pie dataKey="value" nameKey="category" isAnimationActive={false} data={githubData.dataByAttrs.watchers} cx={230} cy={130} outerRadius={80} fill="#ff7300" labelLine={false} label>
                                {
                                    githubData.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </Tab>
                    <Tab eventKey="forks" title="Forks">
                        <PieChart width={400} height={300}>
                            <Pie dataKey="value" nameKey="category" isAnimationActive={false} data={githubData.dataByAttrs.forks} cx={230} cy={130} outerRadius={80} fill="#ff7300" labelLine={false} label>
                                {
                                    githubData.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </Tab>
                </Tabs>
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
    getGithubSummaryAction: () => dispatch(getGithubSummary()),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(GithubWidget);