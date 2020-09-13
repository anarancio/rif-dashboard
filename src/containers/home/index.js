import React from "react";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import TextContainer from "../../components/textContainer";
import "./index.css";
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import GithubWidget from "../../components/widgets/GithubWidget"
import ProjectStatusWidget from "../../components/widgets/ProjectStatusWidget"

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
      <h2>Home</h2>
      <TextContainer text={data} />
      <button onClick={onClick}>Fetch data</button>
    </div>
  );
};

const mapStateToProps = ({ dataReducer }) => ({
  data: dataReducer.data,
  githubData: dataReducer.github,
});

const mapDispatchToProps = (dispatch) => ({
  getDataAction: () => dispatch(getData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
