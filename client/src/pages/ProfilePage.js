import React, { Component } from 'react'
import TodoList from './components/todo-list';
import Statistics from './components/statistic';

import {Container, Row, Col} from 'reactstrap';
import {Query} from 'react-apollo';
import {getProfileQuery} from '../queries/queries';

class ProfilePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userID: props.match.params.id
		}
	}


	welcomeUser = ({id}) => (
		<Query query={getProfileQuery} variables={{id}}>
		{({loading, error, data}) => {
			if (loading) return "loading";
			if (error) return "Error" + error;

			return data.user.name;
		}}
		
		</Query>
	)

	profilePciture = ({id}) => (
		<Query query={getProfileQuery} variables={{id}}>
		{({loading, error, data}) => {
			if (loading) return null;
			if (error) console.error(error);
			console.log('this is data!!!   ', data);
			const {user} = data;
			return(<Container>
				<Row className="center">
					<Col xs={12} sm={8} md={8} lg={8} className="center">
						<div className="profile-picture">
                            <img src={user.picture} alt="profile picture" />
						</div>
					</Col>
				</Row>
			</Container>);
		}}
		
		</Query>
	)

	render() {
		const {userID} = this.state;
		return (
			<div className="page-wrapper">
				<div className="profile-wrapper">
					{this.profilePciture({id: userID})}
					<div className="profile-header">
						<span>Welcome back {this.welcomeUser({id: userID})}!</span>
					</div>
				</div>
				<div className="profile-wrapper">
					<Statistics userID={userID}/>
				</div>
				<div className="profile-wrapper">
					<TodoList userID={userID}/>
				</div>
			</div>
		)
	}
}

export default ProfilePage;