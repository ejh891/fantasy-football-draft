import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
 
import './app.css';
import { firebaseAuth, firebaseDatabase } from '../../config/firebase';
import * as appActions from '../../redux/actions/appActions';
import * as authActions from '../../redux/actions/authActions';
import * as ownerActions from '../../redux/actions/ownerActions';
import appPages from '../../enums/appPages';
import LogIn from '../logIn/logIn';
import PlayerList from '../playerList/playerList';
import PlayerDetails from '../playerDetails/playerDetails';
import owners from '../../data/owners';

class App extends Component {
    isUserRegistedAsOwner = (user) => {
        if (!this.props.ownerData.owners) { 
            return false; 
        }

        const matchingOwners = this.props.ownerData.owners.filter((owner) => { return owner.user.uid = user.uid });

        if (matchingOwners.length > 1) { throw new Error('Multiple owners with the same id encountered.'); }
        
        return matchingOwners.length === 1;
    }

    registerUserAsOwner = (user) => {
        this.props.ownerActions.registerNewOwner(user);
    }

    onAuthStateChanged = (user) => {        
        if (user) {
            this.props.authActions.setUser(user);
            
            firebaseDatabase().ref('ownerData').once('value').then((snapshot) => { // ensure that we have owner data
                this.updateOwnerDataFromServer(snapshot);

                if (!this.isUserRegistedAsOwner(user)) {
                    this.registerUserAsOwner(user);
                }

                this.props.authActions.setUserLoggingIn(false);
                this.props.appActions.setCurrentAppPage(appPages.playerList);
            });

        } else {
            this.props.authActions.setUser(null);
        }
    }

    componentWillMount() {
        if(!firebaseAuth().currentUser) {
            this.props.appActions.setCurrentAppPage(appPages.logIn);
        } else {
            this.props.appActions.setCurrentAppPage(appPages.playerList);
        }

        let ownerDataRef = firebaseDatabase().ref('ownerData/');
        ownerDataRef.on('value', this.updateOwnerDataFromServer);
        // this.props.ownerActions.writeOwnerData({owners}); // seed firebase with data

        firebaseAuth().onAuthStateChanged(this.onAuthStateChanged);
    }

    updateOwnerDataFromServer = (snapshot) => {
        this.props.ownerActions.readOwnerData(snapshot.val());
    }

    getPage = () => {
        switch (this.props.currentPage) {
            case appPages.logIn:
                return (<LogIn/>)
            case appPages.playerList:
                return (<PlayerList/>);
            case appPages.playerDetails:
                return (<PlayerDetails/>);
            default:
                return (<div>Bad job</div>);
        }
    }

    render() {
        // MuiThemProvider may only have one child element
        return (
            <MuiThemeProvider>
                {this.getPage()}
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state, props) => {
	return {
        currentPage: state.app.appPageId,
        ownerData: state.owner.ownerData,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        ownerActions: bindActionCreators(ownerActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
