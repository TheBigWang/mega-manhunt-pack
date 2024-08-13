// concurrent tracking function for multiple players
import getCompassSymbol from "../compass-symbol.js";
import getLocationToTrack from "./get-location-to-track.js";
import displayTracking from "./display-tracking.js";
import calculateDirectionToTarget from "./calc-direction.js";
import endTrackingForPlayer from "./end-tracking.js";

// This function is designed to be called concurrently for multiple players.
// It independently tracks a target player for each player calling the function,
// ensuring that each player receives personalized tracking information.
const tracking = async (player, targetplayer) => {
    try {
        let targetPosition = await getLocationToTrack(player, targetplayer);

        if (targetPosition !== null) {
            try{
            
            let playerPosition = player.location;
            let playerYaw = player.getRotation().y;
            
            let angleToPoint = await calculateDirectionToTarget(playerPosition, playerYaw, targetPosition);
            let compass = await getCompassSymbol(angleToPoint);
            await displayTracking(player, targetplayer, compass);
            } catch (error) {
                console.error("Error during tracking:", error);
                endTrackingForPlayer(player);
            }
        }
        else {
            endTrackingForPlayer(player);
            endTrackingForPlayer(targetplayer);

        }
    } catch (error) {
        
        endTrackingForPlayer(player);}
        
    
};

export default tracking;












