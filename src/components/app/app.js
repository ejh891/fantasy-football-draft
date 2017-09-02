import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
 
import './app.css';
import { database } from '../../config/firebase';
import * as appActions from '../../redux/actions/appActions';
import * as ownerActions from '../../redux/actions/ownerActions';
import appPages from '../../enums/appPages';
import PlayerList from '../playerList/playerList';
import PlayerDetails from '../playerDetails/playerDetails';
import owners from '../../data/owners';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

class App extends Component {
    componentDidMount() {
        let ownerDataRef = database().ref('ownerData/');
        ownerDataRef.on('value', this.updateOwnerDataFromServer);
        // this.props.ownerActions.writeOwnerData({owners}); // seed firebase with data
    }

    updateOwnerDataFromServer = (snapshot) => {
        console.log(snapshot);
        this.props.ownerActions.readOwnerData(snapshot.val());
    }

    getPage = () => {
        switch (this.props.currentPage) {
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
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        ownerActions: bindActionCreators(ownerActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
