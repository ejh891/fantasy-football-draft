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

class App extends Component {
    isUserRegisteredAsOwner = (user) => {
        if (!this.props.ownerData.owners) { 
            return false; 
        }

        const matchingOwners = this.props.ownerData.owners.filter((owner) => { return owner.user.uid === user.uid });

        if (matchingOwners.length > 1) { throw new Error('Multiple owners with the same id encountered.'); }
        
        return matchingOwners.length === 1;
    }

    registerUserAsOwner = (user) => {
        this.props.ownerActions.registerNewOwner(user);
    }

    onAuthStateChanged = (user) => {        
        if (user) {
            this.props.authActions.setUser(user);
        } else {
            this.props.authActions.setUser(null);
        }
    }

    componentWillMount() {
        // listen to changes to the data
        let ownerDataRef = firebaseDatabase().ref('ownerData/');
        ownerDataRef.on('value', this.updateOwnerDataFromServer);

        // listen to auth state changes
        firebaseAuth().onAuthStateChanged(this.onAuthStateChanged);
    }

    updateOwnerDataFromServer = (snapshot) => {
        this.props.ownerActions.readOwnerData(snapshot.val());
        this.props.ownerActions.setReceivedInitialOwnerData(true);
    }

    getPage = () => {
        // show the sign in page depending on sign-in and registration status
        if(!this.userLoggingIn && this.props.user && this.props.receivedInitialOwnerData) {
            if (!this.isUserRegisteredAsOwner(this.props.user)) {
                this.registerUserAsOwner(this.props.user);
            }

            switch (this.props.currentPage) {
                case appPages.playerList:
                    return (<PlayerList/>);
                case appPages.playerDetails:
                    return (<PlayerDetails/>);
                default:
                    return (<div>Bad job</div>);
            }
        } else {
            return (<LogIn/>)
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
        userLoggingIn: state.auth.userLoggingIn,
        user: state.auth.user,
        receivedInitialOwnerData: state.owner.receivedInitialOwnerData,
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
