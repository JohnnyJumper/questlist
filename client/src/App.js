import React, { Component } from 'react';
import Routes from './Routes';

import './styles.css';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({uri: 'http://localhost:6357/graphql'});

class App extends Component {
	constructor() {
		super();
		this.state = {
			user: undefined,
		}

		this.setUser = this.setUser.bind(this);
		this.logoutUser = this.logoutUser.bind(this);
		this.isLogged = this.isLogged.bind(this);
	}

	setUser(user) {
		this.setState({user}, () => console.log(this.state));
	}

	logoutUser() {
		this.setState({user: undefined},  () => console.log(this.state));
	}

	isLogged() {
		console.log(this.state);
		if (typeof this.state.user === "undefined") return 0;
		return 1;
	}
	
	render() {
		return (
			<ApolloProvider client={client}>
				<Routes auth={{loginUser: this.setUser, logoutUser: this.logoutUser, isLogged: this.isLogged}}/>
			</ApolloProvider>
		);
	}
}

export default App;
