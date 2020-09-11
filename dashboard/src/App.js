import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import './scss/style.scss';
import { getData } from 'src/redux/actions';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  async componentDidMount() {
    console.log("App initialized!")
    const {getDataAction} = this.props;
    await getDataAction();
    console.log(this.props.data);
  }

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ dataReducer }) => ({
  data: dataReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  getDataAction: () => dispatch(getData()),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);