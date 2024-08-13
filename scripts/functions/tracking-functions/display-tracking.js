import endTrackingForPlayer from "./end-tracking";

// Function to display tracking information to the player via actionbar and subtitle
const displayTracking = async (player, targetplayer, compass) => {
    let playerName = player.nameTag;
    let playerTags;
    let targetTags;
    let targetName;

    try {
        playerTags = await player.getTags();
        targetTags = await targetplayer.getTags();
    } catch (error) {
        console.error("Error during tracking:", error);
        endTrackingForPlayer(player);
        endTrackingForPlayer(targetplayer);

        return; // Exit the function if there's an error
    }
    
    // Check if player and target player have the same tags
    if (JSON.stringify(playerTags) === JSON.stringify(targetTags)) {
        targetName = `§a${targetplayer.nameTag}`; // Green name
    } else {
        // Check specific conditions for target player's tags
        if (targetTags.includes("unassigned")) {
            targetName = `§7${targetplayer.nameTag}`; // Gray name
        } else if (targetTags.includes("Speedrunner")) {
            targetName = `§c${targetplayer.nameTag}`; // Red name
        } else {
            targetName = `${targetplayer.nameTag}`; // Default, no color
        }
    }

    try {
       
        await player.runCommandAsync(`titleraw ${playerName} actionbar {"rawtext":[{"text":"Tracking: ${targetName} "}]}`);
        await player.runCommandAsync(`titleraw ${playerName} subtitle {"rawtext":[{"text":"\n\n\n\n\n\n\n\n\n\n\n\n\n\n${compass}                              "}]}`)  

        
                                    
    } catch (error) {
        await player.runCommandAsync(`titleraw "${playerName}" actionbar {"rawtext":[{"text":"Tracking: ${targetName} "}]}`);
        await player.runCommandAsync(`titleraw "${playerName}" subtitle {"rawtext":[{"text":"\n\n\n\n\n\n\n\n\n\n\n\n\n\n${compass}                              "}]}`)  
    }
}

export default displayTracking;