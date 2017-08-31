import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as playerDetailsActions from '../../redux/actions/playerDetailsActions';
import dateUtil from '../../utils/dateUtil';

class PlayerDetails extends Component {
    getJsx = () => {
        if (this.props.playerDetailsLoading) {
            return (<div>Loading</div>);
        }

        if (this.props.playerDetailsPlayer.notes.length === 0) {
            return (
                <div>No recent news</div>
            )
        } else {
            const player = this.props.playerDetailsPlayer;
            return (
                <div>
                    <h1>{player.fullName}</h1>
                    <h3>{player.position + ' - ' + player.teamAbbr}</h3>
                    <div>{'Overall rank: ' + player.overallRank}</div>
                    <div>{player.position + ' rank: ' + player.positionalRank}</div>
                    {this.props.playerDetailsPlayer.notes.map((note) => {
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
                    })}
                </div>
            )
        }
    }

    render() {
        if (!this.props.playerDetailsPlayer) { return null; }

        return this.getJsx();
    }
}

const mapStateToProps = (state, props) => {
	return {
        playerDetailsLoading: state.playerDetails.playerDetailsLoading,
        playerDetailsPlayer: state.playerDetails.playerDetailsPlayer,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        playerDetailsActions: bindActionCreators(playerDetailsActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetails);
