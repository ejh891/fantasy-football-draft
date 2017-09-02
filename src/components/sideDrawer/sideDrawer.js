import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { firebaseAuth } from '../../config/firebase';

import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';

import appPages from '../../enums/appPages';
import * as appActions from '../../redux/actions/appActions';
import * as playerListActions from '../../redux/actions/playerListActions';
import * as filterDrawerActions from '../../redux/actions/filterDrawerActions';

import style from './style';

class FilterDrawer extends Component {
    signOut = () => {
        firebaseAuth().signOut();
        this.props.appActions.setCurrentAppPage(appPages.logIn);
    }

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
        if (!firebaseAuth().currentUser) { return null; }

        return (
            <Drawer
                docked={false}
                width={200}
                open={this.props.filterDrawerOpen}
            >
            <div style={style.userInfo}>
                <Avatar
                    src={this.props.user.photoURL}
                />
                <div>{this.props.user.displayName}</div>
                <FlatButton onClick={this.signOut}>Sign Out</FlatButton>
            </div>
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
        user: state.auth.user,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        playerListActions: bindActionCreators(playerListActions, dispatch),
        filterDrawerActions: bindActionCreators(filterDrawerActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDrawer);