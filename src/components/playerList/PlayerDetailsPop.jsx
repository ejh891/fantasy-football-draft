import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as playerListActions from '../../redux/actions/playerListActions';
import dateUtil from '../../utils/dateUtil';

class PlayerDetailsPop extends Component {
    state = {
        open: false,
        dialogNotes: []
    }

    getPlayerInfo = (playerId) => {
        axios.get('http://api.fantasy.nfl.com/v1/players/details', {params: {playerId: playerId}})
            .then((res) => {
                console.log(res);
                this.setState({
                    dialogPlayerName: res.data.players[0].name,
                    dialogNotes: res.data.players[0].notes
                });
            });
    }

    openDialog = (playerId) => {
        this.setState({ open: true, dialogPlayer: playerId });
        this.getPlayerInfo(playerId);
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    getDialogBody = () => {
        if (this.state.dialogNotes.length === 0) {
            return (
                <div>No recent news</div>
            )
        } else {
            return this.state.dialogNotes.map((note) => {
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
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <Dialog
                title={this.state.dialogPlayerName}
                actions={actions}
                modal={false}
                open={this.state.open}
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
	};
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetailsPop);
