import React, { Component } from 'react'
import {Button} from 'reactstrap';
import axios from 'axios';

export default class LoginPage extends Component {

	render() {
		return (
		  <div className="page-wrapper">
				<div className="login-bg">
						<a href="http://localhost:6357/auth/google"><Button>Google +</Button></a>
				</div>	
		  </div>
		)
	}

}
