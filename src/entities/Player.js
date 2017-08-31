class Player {
    constructor({id, firstName, lastName, position, teamAbbr}) {
        this.id = id;
        this.fullName = firstName + ' ' + lastName;
        this.position = position;
        this.teamAbbr = teamAbbr;
    }
}

export default Player;
