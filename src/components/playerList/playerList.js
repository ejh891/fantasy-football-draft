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
import FilterDrawer from './filterDrawer';
import appPages from '../../enums/appPages';
import nflTeams from '../../data/nflTeams';
import colorUtil from '../../utils/colorUtil';

class PlayerList extends Component {
    componentDidMount() {
        if (this.props.allPlayers.length === 0) {
            this.props.playerListActions.discoverPlayers();
        }
    }

    getPlayersOnThisPage = () => {
        const pageStartIndex = this.props.numberOfPlayersPerPage * (this.props.currentPageNumber - 1);
        const pageEndIndex = pageStartIndex + this.props.numberOfPlayersPerPage;
        
        return this.props.filteredPlayers.slice(pageStartIndex, pageEndIndex);
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

    openFilterDrawer = () => {
        this.props.filterDrawerActions.setFilterDrawerOpen(true);
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
                            <TableRow>
                                <TableHeaderColumn>Rank</TableHeaderColumn>
                                <TableHeaderColumn>Player Name</TableHeaderColumn>
                                <TableHeaderColumn>Position</TableHeaderColumn>
                                <TableHeaderColumn>Team</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                                this.getPlayersOnThisPage().map((player) => {
                                    const team = nflTeams[player.teamAbbr];
                                    const rgb1 = colorUtil.hexToRgb(team.colors[0]);
                                    const rgb2 = colorUtil.hexToRgb(team.colors[1]);

                                    const rgba1 = `rgba(${rgb1.r},${rgb1.g},${rgb1.b},0.5)`;
                                    const rgba2 = `rgba(${rgb2.r},${rgb2.g},${rgb2.b},0.5)`;

                                    const rowStyle = {
                                        backgroundImage: `linear-gradient(to right, ${rgba1}, ${rgba2})`
                                    }; 

                                    return (
                                        <TableRow key={player.id} style={rowStyle}>
                                            <TableRowColumn>{player.overallRank}</TableRowColumn>
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

    render() {
        return (
            <div>
                <AppBar 
                    title={'Players'}
                    iconElementLeft={
                        <IconButton
                            onTouchTap={this.openFilterDrawer}
                        >
                            <NavigationMenu />
                        </IconButton>
                    }
                />
                <FilterDrawer/>
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
