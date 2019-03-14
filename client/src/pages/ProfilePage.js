import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import TodoList from './components/todo-list';
import Statistics from './components/statistic';

export default class ProfilePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userID: props.match.params.id
		}
		console.log('profile props = ', props);
	}

	async componentDidMount() {
		if (!this.props.isLogged()) {
			console.log('%cgetting out of here! are not allowed', 'color:red;');
			const {history} = this.props;
			return history.push('/');
		}
			const result = await axios.get(`http://localhost:6357/api/profile/${this.state.userID}`);
			this.setState({user: result.data}, () => console.log('this.state = ', this.state));
	}

	render() {
		if (typeof this.state.user === 'undefined') return null;
		console.log('isLooged = ', this.props.isLogged());
		return (
			<div className="page-wrapper">
				<div className="profile-wrapper">
					<div className="profile-picture">
						<img src={this.state.user.picture} alt="profile-picture" />
					</div>
					<div className="profile-header">
						<span>Welcome back {this.state.user.name}!</span>
					</div>
				</div>
				<div className="profile-wrapper">
					<Statistics />
				</div>
				<div className="profile-wrapper">
					<TodoList />
				</div>
			</div>
		)
	}
}
