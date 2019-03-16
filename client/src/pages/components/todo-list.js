import React, { Component } from 'react'

import {Query} from 'react-apollo';
import {Container, Row, Col} from 'reactstrap'

export default class TodoList extends Component {
    render() {
        return (
            <div>
                this should be your list
                list data should be stored somewhere in database!
                Create new model on server and some api routes!  
            </div>
        )
    }
}
