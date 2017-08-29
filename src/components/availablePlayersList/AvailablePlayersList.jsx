import React, { Component } from 'react';
import axios from 'axios';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Pagination from 'react-js-pagination';

import './pagination.css';

class AvailablePlayersList extends Component {
    state = {
        availablePlayers: [],
        activePage: 1
    }

    componentDidMount() {
        axios.get('http://api.fantasy.nfl.com/v1/players/editordraftranks/', {params: {format: 'json', count: 20}})
            .then((res) => {
                console.log(res);
                this.setState({availablePlayers: res.data.players});
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handlePageChange = (pageNumber) => {
        this.setState({activePage: pageNumber});

        axios.get('http://api.fantasy.nfl.com/v1/players/editordraftranks/', {params: {format: 'json', count: 20, offset: (pageNumber - 1)*20}})
            .then((res) => {
                console.log(res);
                this.setState({
                    availablePlayers: res.data.players,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <div>
                <Table>
                    <TableHeader>
                        <TableHeaderColumn>Player Name</TableHeaderColumn>
                        <TableHeaderColumn>Position</TableHeaderColumn>
                        <TableHeaderColumn>Team</TableHeaderColumn>
                        <TableHeaderColumn>Details</TableHeaderColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            this.state.availablePlayers.map((player) => { 
                                return (
                                    <TableRow>
                                        <TableRowColumn>{player.firstName + ' ' + player.lastName}</TableRowColumn>
                                        <TableRowColumn>{player.position}</TableRowColumn>
                                        <TableRowColumn>{player.teamAbbr}</TableRowColumn>
                                        <TableRowColumn><a>News</a></TableRowColumn>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={160}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </div>

        )
    }
}

export default AvailablePlayersList;
