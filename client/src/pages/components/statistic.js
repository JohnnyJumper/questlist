import React, { Component } from 'react';
import ProgressArc from 'react-progress-arc';
import {Query} from 'react-apollo';
import {getStatisticsQuery} from '../../queries/queries';

import {Container, Row, Col, Button} from 'reactstrap';

export default class Statistics extends Component {

	infographics = (id) => (
		<Query query={getStatisticsQuery} variables={{id}}>
		{({loading, error, data}) => {
			if (loading) return "Loading...";
			if (error) return "Error" + error;
			console.log('this is data from infographics ', data);
			const {statistics: {completed, incompleted, total}} = data;
			return (
				<Container  style={{display:"flex", flexDirection:"column"}}>
					<Row xs={12}>
						<Col xs={12} sm={4} md={4} lg={4} className="statistics-field">
							<ProgressArc completed={completed/total} />
							<span>Completed</span>
						</Col>
						<Col xs={12} sm={4} md={4} lg={4} className="statistics-field">
							<ProgressArc completed={(total - incompleted) / total} />
							<span>Incompleted</span>
						</Col>
						<Col xs={12} sm={4} md={4} lg={4} className="statistics-field">
							<span id="arc-size">{total}</span>
							<span>Total</span>
						</Col>
					</Row>
					<hr />
					<Row>
						<Button style={{margin:"auto"}} color="info">+</Button>
					</Row>
				</Container>
			)
		}}

		</Query>
	)

	render() {
		const {userID} = this.props;
		return (
			<div className="statistics-wrapper">
				{this.infographics(userID)}
			</div>
		);
	}
}

