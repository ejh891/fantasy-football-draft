import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
 
import './app.css';
import * as appActions from '../../redux/actions/appActions';
import appPages from '../../enums/appPages';
import PlayerList from '../playerList/PlayerList';
import PlayerDetails from '../playerDetails/PlayerDetails';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

class App extends Component {
    getPage = () => {
        switch (this.props.currentPage) {
            case appPages.playerList:
                return (<PlayerList/>);
            case appPages.playerDetails:
                return (<PlayerDetails/>);
            default:
                return (<div>Bad job</div>)
        }
    }
    render() {
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
        appActions: bindActionCreators(appActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
