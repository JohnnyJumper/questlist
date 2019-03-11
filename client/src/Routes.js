import React from 'react'
import {Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const Logging = (props) => {
	console.log('props = ', props);
	const {match: {params: {id}}} = props;
	if (!props.isLogged())
		props.loginUser(id);
	return <Redirect to={`/questprofile/${id}`} />
}

const Header = () => (
	<div className="header-container">
				<span> This is my awesome header </span>
				<Link to="/">Home</Link>
	</div>
);

const AppliedRoute = ({path, Component,  AuthData}) => <Route path={path} 
															render={props => <Component {...props} {...AuthData} />} />

export default function Routes(props) {
  return (
	<Router>
		<Container className="mainContainer">
					<Header />
					<Switch>
						<AppliedRoute exact path ="/" Component={LoginPage} AuthData={props.auth} />
						<AppliedRoute path="/questprofile/:id" Component={ProfilePage} AuthData={props.auth} />
						<AppliedRoute exact path="/logging/:id" Component={Logging} AuthData={props.auth} />
					</Switch>
		</Container>            
	</Router>
	)
}