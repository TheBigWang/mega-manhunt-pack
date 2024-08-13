//function to get the current team a player is on based on their tags

const getPlayerTeam = async (player) => {
    try {
        const team = await player.getTags()
        return team;
    } catch (error) {
        console.error("Failed to get player team:", error);
    }
}

export default getPlayerTeam;