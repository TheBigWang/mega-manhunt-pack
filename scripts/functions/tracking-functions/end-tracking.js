//function to end tracking for player using tracking interval Id's
import {system} from "@minecraft/server";
import trackingIntervalIds from "./tracking-interval-ids";
import playSound from "../playSound";
const endTrackingForPlayer = async (player) => {
    // Construct keys for tracking and title intervals
    const trackingKey = `${player.nameTag}_tracking`;
    const titleKey = `${player.nameTag}_title`;

    // Variable to track if any interval was cleared
    let actionTaken = false;

    // Clear the tracking interval if it exists
    if (trackingIntervalIds.has(trackingKey)) {
        system.clearRun(trackingIntervalIds.get(trackingKey));
        trackingIntervalIds.delete(trackingKey);
        actionTaken = true;
    }

    // Clear the title interval if it exists
    if (trackingIntervalIds.has(titleKey)) {
        system.clearRun(trackingIntervalIds.get(titleKey)); 
        trackingIntervalIds.delete(titleKey);
        actionTaken = true;
    }

    // Send feedback to the player based on action taken
    if (actionTaken) {
       
        
        try{
            await player.runCommandAsync(`tellraw ${player.nameTag} {"rawtext":[{"text":"§eTracking ended."}]}`);
            
        }
        catch (error){
            await player.runCommandAsync(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§eTracking ended."}]}`);
            
        }
        playSound(player, "random.burp");

    } 
    
    else {
        try{
            await player.runCommandAsync(`tellraw ${player.nameTag} {"rawtext":[{"text":"§eNo tracking to end."}]}`);
        }
        catch (error){
        await player.runCommandAsync(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§eNo tracking to end."}]}`);
        }
        
    }

    // Always clear the title to ensure no errors and consistent state
    try{
        await player.runCommandAsync(`titleraw ${player.nameTag} clear`);

    }
    catch (error){
        await player.runCommandAsync(`titleraw "${player.nameTag}" clear`);

    }
    
};

export default endTrackingForPlayer;