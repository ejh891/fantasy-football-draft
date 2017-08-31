import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as playerDetailsPopActions from '../../redux/actions/playerDetailsPopActions';
import dateUtil from '../../utils/dateUtil';

class PlayerDetailsPop extends Component {
    handleClose = () => {
        this.props.playerDetailsPopActions.setPlayerDetailsPopOpen(false);
    }

    getDialogBody = () => {
        if (this.props.playerDetailsPopLoading) {
            return (<div>Loading</div>);
        }

        if (this.props.playerDetailsPopPlayer.notes.length === 0) {
            return (
                <div>No recent news</div>
            )
        } else {
            return this.props.playerDetailsPopPlayer.notes.map((note) => {
                return (
                    <div key={note.id}>
                        <h3 style={{fontStyle: 'italic', fontWeight: 400}}>{dateUtil.getPrettyDate(note.timestamp)}</h3>
                        <h4 style={{fontWeight: 'bold'}}>Story</h4>
                        <div>{note.body}</div>
                        <h4 style={{fontWeight: 'bold'}}>Analysis</h4>
                        <div>{note.analysis}</div>
                        <hr/>
                    </div>
                )
            });
        }
    }

    render() {
        if (!this.props.playerDetailsPopPlayer) { return null; }

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <Dialog
                title={this.props.playerDetailsPopPlayer.name}
                actions={actions}
                modal={false}
                open={this.props.playerDetailsPopOpen}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
            >
                {this.getDialogBody()}
            </Dialog>
        )
    }
}


const mapStateToProps = (state, props) => {
	return {
        playerDetailsPopLoading: state.playerDetailsPop.playerDetailsPopLoading,
        playerDetailsPopOpen: state.playerDetailsPop.playerDetailsPopOpen,
        playerDetailsPopPlayer: state.playerDetailsPop.playerDetailsPopPlayer,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        playerDetailsPopActions: bindActionCreators(playerDetailsPopActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetailsPop);
