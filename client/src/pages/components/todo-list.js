import React, { Component } from 'react'

import {Query} from 'react-apollo';
import {Container, Row, Col, Button} from 'reactstrap'
import {getIncompleteQuestsQuery} from '../../queries/queries';
import Modal from '../components/modal';

export default class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: props.userID,
            selected: null,
            showModal: false
        }
    }

    toggleModal() {
        return this.setState(PrevState => ({showModal: !PrevState.showModal}));
    }

    getList = (id) => (
        <Query query={getIncompleteQuestsQuery} variables={{id}}>
        {({loading, error, data}) => {
            if (loading) return <span>Loading</span>
            if (error) return <span>error: {error}</span>

            return data.user.incompleteQuests.map(quest => 
                <li key={quest.id} onClick={() => this.setState({selected: quest, showModal: true})}>
                    {quest.description}
                </li>
            );
        }}
        </Query>
    )


    render() {
        const {userID, showModal, selected} = this.state;
        return (
            <React.Fragment>
                <div className="list-container">
                    <ul className="ul-quests">
                        {this.getList(userID)}
                    </ul>
                </div>
                {!showModal ? null : 
                    <Modal control={showModal} toggle={this.toggleModal.bind(this)}>
                        <div className="modal-quest">
                            <div className="quest-modal-header">
                                <span>{this.state.selected.name}</span>
                            </div>
                            <div className="quest-modal-body">
                                <div className="quest-modal-description">
                                    <span>{this.state.selected.description}</span>
                                </div>
                                <div className="quest-modal-options">
                                    <Button block color="primary">Check for completion</Button>
                                    <Button disabled block color="info">edit</Button>
                                    <Button disabled block color="danger">delete</Button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                }
            </React.Fragment>
        )
    }
}
