import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Pagination from 'material-ui-pagination';

import * as appActions from '../../redux/actions/appActions';
import * as playerListActions from '../../redux/actions/playerListActions';
import * as playerDetailsActions from '../../redux/actions/playerDetailsActions';
import appPages from '../../enums/appPages';
import style from './playerListStyle.js';

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

    onRowSelection = (selectedRowNumbers) => {
        let selectedRowNumber = selectedRowNumbers[0]; // row on this page
        const previousRows = (this.props.currentPageNumber - 1) * this.props.numberOfPlayersPerPage // rows on previous pages
        const playerIndex = previousRows + selectedRowNumber;
        const player = this.props.allPlayers[playerIndex];
        this.openDialog(player);
    }

    openDialog = (player) => {
        this.props.playerDetailsActions.setPlayerDetailsPlayer(player);
        
        if (!player.notes) {
            this.props.playerDetailsActions.setPlayerDetailsLoading(true);
            this.props.playerListActions.discoverPlayerDetails(player.id);
        }

        this.props.appActions.setCurrentAppPage(appPages.playerDetails);
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
                    <Table 
                        style={{tableLayout: 'auto'}}
                        onRowSelection={this.onRowSelection}
                    >
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
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
                                            <TableRowColumn>{player.fullName}</TableRowColumn>
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
        appActions: bindActionCreators(appActions, dispatch),
        playerListActions: bindActionCreators(playerListActions, dispatch),
        playerDetailsActions: bindActionCreators(playerDetailsActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);
