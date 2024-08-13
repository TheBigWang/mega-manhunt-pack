//function to execute tracking and title display procedures 
import tracking from "./tracking";
import { system,world} from "@minecraft/server";
import playSound from "../playSound";
import endTrackingForPlayer from "./end-tracking";

import titleDisplay from "./title-display";
import trackingIntervalIds from "./tracking-interval-ids";




const clearAndSetInterval = async (player, intervalName, action, rate) => {
    // Use player's unique nameTag as part of the key to ensure uniqueness
    const key = `${player.nameTag}_${intervalName}`;
    if (trackingIntervalIds.has(key)) {
        system.clearRun(trackingIntervalIds.get(key));
        trackingIntervalIds.delete(key);
    }
    const intervalId = system.runInterval(async () => {
        // Check if the player still has the 'Hunter' tag
        if (!player.getTags().includes("Hunter")) {
            // If not, clear both intervals and exit the action
            system.clearRun(trackingIntervalIds.get(`${player.nameTag}_tracking`));
            system.clearRun(trackingIntervalIds.get(`${player.nameTag}_title`));
            player.runCommandAsync(`/tellraw ${player.nameTag} {"rawtext":[{"text":"§eOnly Hunters can track players!"}]}`);
            endTrackingForPlayer(player);

            return;
        }

        
        // Run the provided action if the player still has the 'Hunter' tag
        await action();
    }, rate);
    trackingIntervalIds.set(key, intervalId);
    return intervalId; // Return the interval ID for external control
};

const runTracking = async (player, tickRate, targetplayer,titleRate) => {

    try{
        player.runCommandAsync(`/titleraw ${player.nameTag} title {"rawtext":[{"text":"\n"}]}`);


    }
    catch (error){
        player.runCommandAsync(`/titleraw "${player.nameTag}" title {"rawtext":[{"text":"\n"}]}`);

    
    }
   
    if (player.getTags().includes("Hunter")) {
        try {
            await playSound(player, "random.orb");

            clearAndSetInterval(player, "tracking", async () => {
                try {
                    await tracking(player, targetplayer);
                } catch (error) {
                    console.error("Error during tracking:", error);
                }
            }, tickRate);

            clearAndSetInterval(player, "title", async () => {
                try {
                    await titleDisplay(player);
                } catch (error) {
                    console.error("Error during displayTitle:", error);
                }
            }, titleRate); // Run displayTitle every 8000 ticks
        } catch (error) {
            console.error("Error setting subtitle or starting tracking:", error);
        }
    }
    else {
        try{
            player.runCommandAsync(`/tellraw ${player.nameTag} {"rawtext":[{"text":"§eOnly Hunters can track players!"}]}`);

        }
        catch (error){
            player.runCommandAsync(`/tellraw "${player.nameTag}" {"rawtext":[{"text":"§eOnly Hunters can track players!"}]}`);

        }
    }
};

export default runTracking;
export { trackingIntervalIds };