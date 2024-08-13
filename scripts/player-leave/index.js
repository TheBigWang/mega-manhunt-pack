//event that fires when player leaves, ends any tracking they were doing
import {world} from "@minecraft/server"
import endTrackingForLeftPlayer from "../functions/tracking-functions/end-tracking-for-left-player";

world.beforeEvents.playerLeave.subscribe(async (event) => {
    
    let player = event.player;

    try {
        endTrackingForLeftPlayer(player.nameTag);
    } catch (error) {
        console.warn("Error when ending tracking for player:", error);
    }

})