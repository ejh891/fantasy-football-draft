import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { firebaseAuth } from '../../config/firebase';

import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

import appPages from '../../enums/appPages';
import * as appActions from '../../redux/actions/appActions';
import * as playerListActions from '../../redux/actions/playerListActions';
import * as filterDrawerActions from '../../redux/actions/filterDrawerActions';

import style from './style';

class SideDrawer extends Component {
    signOut = () => {
        firebaseAuth().signOut();
        this.props.appActions.setCurrentAppPage(appPages.logIn);
        this.closeDrawer();
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
        this.closeDrawer();
    }

    closeDrawer = () => {
        this.props.filterDrawerActions.setFilterDrawerOpen(false);
    }

    toggleFilter = (filter) => {
        if (this.props.filters.includes(filter)) {
            this.props.playerListActions.removeFilter(filter);
        } else {
            this.props.playerListActions.addFilter(filter);
        }

        this.props.playerListActions.applyFilters();
    }

    onlyShowAvailableOnToggle = (event, toggled) => {
        this.props.playerListActions.setOnlyShowAvailable(toggled);
        this.props.playerListActions.applyFilters();
    }

    render() {
        if (!this.props.user) { return null; }

        return (
            <Drawer
                docked={false}
                width={300}
                open={this.props.filterDrawerOpen}
            >
            <div style={style.userInfo}>
                <Avatar
                    src={this.props.user.photoURL}
                    style={style.avatar}
                />
                <div>{this.props.user.displayName}</div>
            </div>
            <FlatButton onClick={this.signOut}>Sign Out</FlatButton>
            <hr/>
            <h3 style={{marginLeft: '10px'}}>Show</h3>
            <Checkbox
                label="QBs"
                checked={this.props.filters.indexOf('QB') > -1}
                onCheck={() => { this.toggleFilter('QB'); }}
                style={style.checkbox}
            />
            <Checkbox
                label="RBs"
                checked={this.props.filters.indexOf('RB') > -1}
                onCheck={() => { this.toggleFilter('RB'); }}
                style={style.checkbox}
            />
            <Checkbox
                label="WRs"
                checked={this.props.filters.indexOf('WR') > -1}
                onCheck={() => { this.toggleFilter('WR'); }}
                style={style.checkbox}
            />
            <Checkbox
                label="TEs"
                checked={this.props.filters.indexOf('TE') > -1}
                onCheck={() => { this.toggleFilter('TE'); }}
                style={style.checkbox}
            />
            <Checkbox
                label="Ks"
                checked={this.props.filters.indexOf('K') > -1}
                onCheck={() => { this.toggleFilter('K'); }}
                style={style.checkbox}
            />
            <Checkbox
                label="DEFs"
                checked={this.props.filters.indexOf('DEF') > -1}
                onCheck={() => { this.toggleFilter('DEF'); }}
                style={style.checkbox}
            />
            <Toggle
                label="Only show available players"
                labelPosition="right"
                toggled={this.props.onlyShowAvailable}
                onToggle={this.onlyShowAvailableOnToggle}
                style={style.toggle}
            />
            <MenuItem style={style.closeButton} onClick={this.closeDrawer}>Close Menu</MenuItem>
        </Drawer>
        )
    }
}

const mapStateToProps = (state, props) => {
	return {
        allPlayers: state.playerList.allPlayers,
        filterDrawerOpen: state.filterDrawer.isOpen,
        user: state.auth.user,
        filters: state.playerList.filters,
        onlyShowAvailable: state.playerList.onlyShowAvailable
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        playerListActions: bindActionCreators(playerListActions, dispatch),
        filterDrawerActions: bindActionCreators(filterDrawerActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);