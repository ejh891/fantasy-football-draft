import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Pagination from 'material-ui-pagination';

import PlayerDetailsPop from './PlayerDetailsPop';
import * as playerListActions from '../../redux/actions/playerListActions';
import * as playerDetailsPopActions from '../../redux/actions/playerDetailsPopActions';
import style from './playerListStyle.js';
import dateUtil from '../../utils/dateUtil';

class PlayerList extends Component {
    componentDidMount() {
        this.props.playerListActions.discoverPlayers();
    }

    handlePageChange = (pageNumber) => {
        this.props.playerListActions.setCurrentPageNumber(pageNumber);

        const pageStartIndex = this.props.numberOfPlayersPerPage * (pageNumber - 1);
        const pageEndIndex = pageStartIndex + this.props.numberOfPlayersPerPage;
        this.props.playerListActions.setPlayersOnThisPage(this.props.allPlayers.slice(pageStartIndex, pageEndIndex))
    }

    openDialog = (player) => {
        this.props.playerDetailsPopActions.setPlayerDetailsPopPlayer(player);
        
        if (!player.notes) {
            this.props.playerDetailsPopActions.setPlayerDetailsPopLoading(true);
            this.props.playerListActions.discoverPlayerDetails(player.id);
        }

        this.props.playerDetailsPopActions.setPlayerDetailsPopOpen(true);
    }

    render() {
        if (this.props.discoveringPlayers) {
            return (
                <div style={style.loading}>
                    <div style={style.loadingMessage}>Getting the latest player rankings</div>
                    <CircularProgress size={80} thickness={5} />
                </div>
            )
        } else {
            return (
                <div>
                    <PlayerDetailsPop />
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Overall Rank</TableHeaderColumn>
                                <TableHeaderColumn>Positional Rank</TableHeaderColumn>
                                <TableHeaderColumn>Player Name</TableHeaderColumn>
                                <TableHeaderColumn>Position</TableHeaderColumn>
                                <TableHeaderColumn>Team</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                                this.props.playersOnThisPage.map((player) => { 
                                    return (
                                        <TableRow key={player.id}>
                                            <TableRowColumn>{player.overallRank}</TableRowColumn>
                                            <TableRowColumn>{player.positionalRank}</TableRowColumn>
                                            <TableRowColumn>
                                                <a style={style.playerName} onClick={() => {this.openDialog(player)}}>
                                                    {player.fullName}
                                                </a>
                                            </TableRowColumn>
                                            <TableRowColumn>{player.position}</TableRowColumn>
                                            <TableRowColumn>{player.teamAbbr}</TableRowColumn>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                    <Pagination
                        current={this.props.currentPageNumber}
                        total={this.props.allPlayers.length / this.props.numberOfPlayersPerPage}
                        display={5} // show this many page numbers between the < and > arrows
                        onChange={this.handlePageChange}
                    />
                </div>
            )
        }
    }
}


const mapStateToProps = (state, props) => {
	return {
		discoveringPlayers: state.playerList.discoveringPlayers,
        allPlayers: state.playerList.allPlayers,
        playersOnThisPage: state.playerList.playersOnThisPage,
        numberOfPlayersPerPage: state.playerList.numberOfPlayersPerPage,
        currentPageNumber: state.playerList.currentPageNumber,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        playerListActions: bindActionCreators(playerListActions, dispatch),
        playerDetailsPopActions: bindActionCreators(playerDetailsPopActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);
