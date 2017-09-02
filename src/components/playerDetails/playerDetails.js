import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';

import * as appActions from '../../redux/actions/appActions';
import * as playerDetailsActions from '../../redux/actions/playerDetailsActions';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import dateUtil from '../../utils/dateUtil';
import appPages from '../../enums/appPages';
import style from './style';

class PlayerDetails extends Component {
    goBack = () => {
        this.props.appActions.setCurrentAppPage(appPages.playerList);
    }

    getImageLoadingSpinner = () => {
        return (<CircularProgress size={80} thickness={5} />);
    }

    getPageContent = () => {
        if (!this.props.playerDetailsPlayer) { return null; }
        
        if (this.props.playerDetailsLoading) {
            return (<LoadingSpinner loadingMessage={'Getting the latest news'}/>);
        }

        if (this.props.playerDetailsPlayer.notes.length === 0) {
            return (
                <div>No recent news</div>
            )
        } else {
            const player = this.props.playerDetailsPlayer;
            return (
                <div>
                    <div style={style.marquee}>
                        <div style={{...style.portraitWrapper}}>
                            <Avatar
                                src={player.portraitSrc}
                                size={175}
                                style={{border: `8px solid ${player.team.colors[0]}`, backgroundImage: `url(${player.team.logoSrc})`}}
                            />
                        </div>
                        <div style={style.details}>
                            <h3>{`${player.position} - ${player.teamAbbr}`}</h3>
                            <h3>{`Bye: ${player.team.bye}`}</h3>
                            <div>{`Overall rank: ${player.overallRank}`}</div>
                            <div>{`${player.position} rank: ${player.positionalRank}`}</div>
                        </div>
                    </div>
                    {this.props.playerDetailsPlayer.notes.map((note) => {
                        const dateData = dateUtil.parseTimestamp(note.timestamp);
                        return (
                            <div key={note.id}>
                                <h3 style={{fontStyle: 'italic', fontWeight: 400}}>{dateData.date + ' (' + dateData.fromNow + ')'}</h3>
                                <h4 style={{fontWeight: 'bold'}}>Story</h4>
                                <div>{note.body}</div>
                                <h4 style={{fontWeight: 'bold'}}>Analysis</h4>
                                <div>{note.analysis}</div>
                                <hr/>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <AppBar 
                    title={this.props.playerDetailsPlayer ? this.props.playerDetailsPlayer.fullName : 'Player'}
                    iconElementLeft={
                        <IconButton
                            onTouchTap={this.goBack}
                        >
                            <NavigationChevronLeft />
                        </IconButton>
                    }
                />
                {this.getPageContent()}
            </div>
  
        )
    }
}

const mapStateToProps = (state, props) => {
	return {
        playerDetailsLoading: state.playerDetails.playerDetailsLoading,
        playerDetailsPlayer: state.playerDetails.playerDetailsPlayer,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        playerDetailsActions: bindActionCreators(playerDetailsActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetails);
