class Player {
    constructor({id, firstName, lastName, position, teamAbbr, overallRank, positionalRank}) {
        this.id = id;
        this.fullName = firstName + ' ' + lastName;
        this.position = position;
        this.teamAbbr = teamAbbr;
        this.overallRank = overallRank;
        this.positionalRank = positionalRank;
    }
}

export default Player;
