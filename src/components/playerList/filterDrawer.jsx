import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import * as playerListActions from '../../redux/actions/playerListActions';
import * as filterDrawerActions from '../../redux/actions/filterDrawerActions';

class FilterDrawer extends Component {
    filterPlayersByPosition = (position) => {
        let filteredPlayers = this.props.allPlayers;
        if (position !== 'ALL') {
            filteredPlayers = this.props.allPlayers.filter((player) => {
                return player.position === position;
            });
        }

        this.props.playerListActions.setFilteredPlayers(filteredPlayers);
        this.props.playerListActions.setCurrentPageNumber(1); // go back to the first page after filtering
        this.props.filterDrawerActions.setFilterDrawerOpen(false);
    }

    render() {
        return (
            <Drawer
                docked={false}
                width={200}
                open={this.props.filterDrawerOpen}
            >
            <h3 style={{marginLeft: '10px'}}>Show</h3>
            <MenuItem onClick={() => {this.filterPlayersByPosition('ALL');}}>All</MenuItem>
            <MenuItem onClick={() => {this.filterPlayersByPosition('QB');}}>QBs</MenuItem>
            <MenuItem onClick={() => {this.filterPlayersByPosition('RB');}}>RBs</MenuItem>
            <MenuItem onClick={() => {this.filterPlayersByPosition('WR');}}>WRs</MenuItem>
            <MenuItem onClick={() => {this.filterPlayersByPosition('K');}}>Ks</MenuItem>
            <MenuItem onClick={() => {this.filterPlayersByPosition('DEF');}}>DEFs</MenuItem>
        </Drawer>
        )
    }
}

const mapStateToProps = (state, props) => {
	return {
        allPlayers: state.playerList.allPlayers,
        filterDrawerOpen: state.filterDrawer.isOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        playerListActions: bindActionCreators(playerListActions, dispatch),
        filterDrawerActions: bindActionCreators(filterDrawerActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDrawer);