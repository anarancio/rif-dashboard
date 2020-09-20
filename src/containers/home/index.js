import React from "react";
import { connect } from "react-redux";
import { getProjectData } from "../../redux/actions";
import "./index.css";
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import GithubWidget from "../../components/widgets/GithubWidget"
import ProjectStatusWidget from "../../components/widgets/ProjectStatusWidget"
import OkrsWidget from "../../components/widgets/OkrsWidget"

const Home = (props) => {
  const { data, getDataAction } = props;

  const onClick = () => getDataAction();

  return (
    <div className="homeContainer">
      <Container>
        <Row style={{marginTop: "10px"}}>
          <Col>
            <GithubWidget />
          </Col>
          <Col>
            <OkrsWidget />
          </Col>
        </Row>
        <Row style={{marginTop: "10px"}}>
          <Col>
            <ProjectStatusWidget />
          </Col>
        </Row>
        <Row>
          <Col>
          
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ dataReducer }) => ({
  data: dataReducer.data,
  githubData: dataReducer.github,
});

const mapDispatchToProps = (dispatch) => ({
  getDataAction: () => dispatch(getProjectData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
