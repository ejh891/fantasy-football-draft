import nflTeams from '../data/nflTeams';
import store from '../redux/store/configureStore';

class Player {
    constructor({id, firstName, lastName, position, teamAbbr, overallRank, positionalRank, portraitSrc}) {
        this.id = id;
        this.fullName = firstName + ' ' + lastName;
        this.position = position;
        if (teamAbbr === '') { teamAbbr = 'UNK'; } // set teamAbbr to unknown if API doesn't work
        this.teamAbbr = teamAbbr;
        this.overallRank = overallRank;
        this.positionalRank = positionalRank;
        this.portraitSrc = portraitSrc;
        this.team = nflTeams[teamAbbr];

        if (teamAbbr !== 'UNK') {
            this.team.logoSrc = `http://s.nflcdn.com/static/content/public/static/img/fantasy/player-card/headshot-logo-bg/${teamAbbr}.png`
        } else {
            this.team.logoSrc = 'http://fantasy.nfl.com/static/img/nflLogo200x213_1504112416.png';
        }
    }

    getOwner = () => {
        const owners = store().getState().owner.ownerData.owners;

        for (const owner of owners) {
            if (!owner.players) { continue; }

            const matchingPlayers = owner.players.filter((playerId) => {
                return playerId === this.id;
            });

            if (matchingPlayers.length > 0) {
                return owner;
            }

            return null;
        }
    }
}

export default Player;
