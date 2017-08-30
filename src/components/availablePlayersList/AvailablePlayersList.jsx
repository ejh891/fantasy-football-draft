import React, { Component } from 'react';
import axios from 'axios';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Pagination from 'material-ui-pagination';

import style from './style.js';
import dateUtil from '../../utils/dateUtil';

class AvailablePlayersList extends Component {
    state = {
        playersOnThisPage: [],
        allPlayers: [],
        activePage: 1,
        open: false,
        dialogPlayer: 0,
        dialogNotes: []
    }

    PLAYERS_PER_PAGE = 20;

    discoverPlayers(iteration) {
        axios.get('http://api.fantasy.nfl.com/v1/players/editordraftranks/', {params: {format: 'json', count: 100, offset: 100*iteration}})
            .then((res) => {
                this.setState((prevState) => {
                    return {
                        allPlayers: [...prevState.allPlayers, ...res.data.players]
                    }
                }, () => { 
                    if (res.data.players.length > 0) { // there might be more players, recursively discover more
                        this.discoverPlayers(iteration + 1)
                    } else {
                        this.setState({
                            loading: false,
                            activePage: 1
                        }, () => {this.handlePageChange(1);}); // set the page to page 1
                    }
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    componentDidMount() {
        this.setState({loading: true});
        this.discoverPlayers(0);
    }

    getPlayerInfo = (playerId) => {
        axios.get('http://api.fantasy.nfl.com/v1/players/details', {params: {playerId: playerId}})
            .then((res) => {
                console.log(res);
                this.setState({
                    dialogPlayerName: res.data.players[0].name,
                    dialogNotes: res.data.players[0].notes
                });
            });
    }

    handlePageChange = (pageNumber) => {
        this.setState((prevState) => {
            const pageStartIndex = this.PLAYERS_PER_PAGE * (pageNumber - 1);
            const pageEndIndex = pageStartIndex + this.PLAYERS_PER_PAGE;
            return {
                activePage: pageNumber,
                playersOnThisPage: prevState.allPlayers.slice(pageStartIndex, pageEndIndex)
            }
        });
    }

    openDialog = (playerId) => {
        this.setState({ open: true, dialogPlayer: playerId });
        this.getPlayerInfo(playerId);
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        if (this.state.loading) {
            return (
                <div style={style.loading}>
                    <div style={style.loadingMessage}>Getting the latest player rankings</div>
                    <CircularProgress size={80} thickness={5} />
                </div>
            )
        } else {
            return (
                <div>
                     <Dialog
                        title={this.state.dialogPlayerName}
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}
                    >
                        {this.state.dialogNotes.map((note) => {
                            return (
                                <div>
                                    <h3 style={{fontStyle: 'italic', fontWeight: 400}}>{dateUtil.getPrettyDate(note.timestamp)}</h3>
                                    <h4 style={{fontWeight: 'bold'}}>Story</h4>
                                    <div>{note.body}</div>
                                    <h4 style={{fontWeight: 'bold'}}>Analysis</h4>
                                    <div>{note.analysis}</div>
                                    <hr/>
                                </div>
                            )
                        })}
                    </Dialog>
                    <Table>
                        <TableHeader>
                            <TableHeaderColumn>Player Name</TableHeaderColumn>
                            <TableHeaderColumn>Position</TableHeaderColumn>
                            <TableHeaderColumn>Team</TableHeaderColumn>
                            <TableHeaderColumn>Details</TableHeaderColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                this.state.playersOnThisPage.map((player) => { 
                                    return (
                                        <TableRow key={player.id}>
                                            <TableRowColumn>{player.firstName + ' ' + player.lastName}</TableRowColumn>
                                            <TableRowColumn>{player.position}</TableRowColumn>
                                            <TableRowColumn>{player.teamAbbr}</TableRowColumn>
                                            <TableRowColumn>
                                                <button onClick={() => {this.openDialog(player.id)}}>Click me!</button>
                                            </TableRowColumn>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                    <Pagination
                        current={this.state.activePage}
                        total={10}
                        display={5}
                        onChange={this.handlePageChange}
                    />
                </div>
            )
        }
    }
}

export default AvailablePlayersList;
