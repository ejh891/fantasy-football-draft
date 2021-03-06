import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppBar from 'material-ui/AppBar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Pagination from 'material-ui-pagination';

import * as appActions from '../../redux/actions/appActions';
import * as playerListActions from '../../redux/actions/playerListActions';
import * as playerDetailsActions from '../../redux/actions/playerDetailsActions';
import * as filterDrawerActions from '../../redux/actions/filterDrawerActions';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import SideDrawer from '../sideDrawer/sideDrawer';
import appPages from '../../enums/appPages';

class PlayerList extends Component {
    componentDidMount() {
        if (this.props.allPlayers.length === 0) {
            this.props.playerListActions.discoverPlayers();
        }
    }

    getPlayersOnPage = (pageNumber=this.props.currentPageNumber) => {
        const pageStartIndex = this.props.numberOfPlayersPerPage * (pageNumber - 1);
        const pageEndIndex = pageStartIndex + this.props.numberOfPlayersPerPage;
        
        const playersOnThisPage = this.props.filteredPlayers.slice(pageStartIndex, pageEndIndex);

        return playersOnThisPage;
    }

    handlePageChange = (pageNumber) => {
        this.props.playerListActions.setCurrentPageNumber(pageNumber);
    }

    onRowSelection = (selectedRowNumbers) => {
        let selectedRowNumber = selectedRowNumbers[0]; // row on this page
        const previousRows = (this.props.currentPageNumber - 1) * this.props.numberOfPlayersPerPage // rows on previous pages
        const playerIndex = previousRows + selectedRowNumber;
        const player = this.props.filteredPlayers[playerIndex];
        this.openDetailsPage(player);
    }

    openDetailsPage = (player) => {
        this.props.playerDetailsActions.setPlayerDetailsPlayer(player);
        
        if (!player.notes) {
            this.props.playerDetailsActions.setPlayerDetailsLoading(true);
            this.props.playerListActions.discoverPlayerDetails(player.id);
        }

        this.props.appActions.setCurrentAppPage(appPages.playerDetails);
    }

    openSideDrawer = () => {
        this.props.filterDrawerActions.setFilterDrawerOpen(true);
    }

    getRedBubble = () => {
        return (
            <div
                style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#F44336',
                    marginLeft: '10px'
                    }}>
            </div>
        )
    }

    getPageContent = () => {
        if (this.props.discoveringPlayers) {
            return (
                <LoadingSpinner loadingMessage={'Getting the latest player rankings'}/>
            )
        } else {
            return (
                <div>
                    <Table 
                        style={{tableLayout: 'auto'}}
                        onRowSelection={this.onRowSelection}
                    >
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow style={{color: 'white'}}>
                                <TableHeaderColumn>Rank</TableHeaderColumn>
                                <TableHeaderColumn>Player Name</TableHeaderColumn>
                                <TableHeaderColumn>Position</TableHeaderColumn>
                                <TableHeaderColumn>Bye</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                                this.getPlayersOnPage().map((player) => {
                                    const hasRedBubble = player.status !== 'ACT';
                                    return (
                                        <TableRow key={player.id}>
                                            <TableRowColumn>{player.overallRank}</TableRowColumn>
                                            <TableRowColumn>
                                                <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        maxWidth: '100px',
                                                        whiteSpace: 'normal'
                                                    }}
                                                >
                                                    <div>{player.fullName}</div>
                                                    {hasRedBubble ? this.getRedBubble() : null}
                                                </div>
                                               </TableRowColumn>
                                            <TableRowColumn>{player.position}</TableRowColumn>
                                            <TableRowColumn>{player.team.bye}</TableRowColumn>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Pagination
                        current={this.props.currentPageNumber}
                        total={Math.ceil(this.props.filteredPlayers.length / this.props.numberOfPlayersPerPage)}
                        display={5} // show this many page numbers between the < and > arrows
                        onChange={this.handlePageChange}
                    />
                    </div>
                </div>
            )
        }
    }

    render() {
        if (!this.props.user) { return null; }
        return (
            <div>
                <AppBar 
                    title={'Players'}
                    iconElementLeft={
                        <IconButton
                            onTouchTap={this.openSideDrawer}
                        >
                            <NavigationMenu />
                        </IconButton>
                    }
                />
                <SideDrawer/>
                {this.getPageContent()}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
	return {
		discoveringPlayers: state.playerList.discoveringPlayers,
        allPlayers: state.playerList.allPlayers,
        filteredPlayers: state.playerList.filteredPlayers,
        playersOnThisPage: state.playerList.playersOnThisPage,
        numberOfPlayersPerPage: state.playerList.numberOfPlayersPerPage,
        currentPageNumber: state.playerList.currentPageNumber,
        user: state.auth.user,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        playerListActions: bindActionCreators(playerListActions, dispatch),
        playerDetailsActions: bindActionCreators(playerDetailsActions, dispatch),
        filterDrawerActions: bindActionCreators(filterDrawerActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);
