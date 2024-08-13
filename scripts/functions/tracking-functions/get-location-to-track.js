//function to get the location to track based on logic surrounding dimensions that the player and target are in
import playerPortals from "../player-portals";

// Define the async function to get the location to track
const getLocationToTrack = async (hunter, hunted) => {
    try {
        // Ensure consistent property access
        const hunterDimension = hunter.dimension.id
        const huntedDimension = hunted.dimension.id
        
        let coordsToReturn= { x: 0, y: 0, z: 0 };
        
        if (hunterDimension === huntedDimension) {
            coordsToReturn = hunted.location;
        } else {
            // Check if the hunter is in the end
            if (hunterDimension === "minecraft:the_end") {
                coordsToReturn = { x: 0, y: 0, z: 0 };
            } 
            
            else if (huntedDimension === "minecraft:the_end" && hunterDimension === "minecraft:overworld") {
                const { x, y, z } = playerPortals[hunted.nameTag]?.fromCoords.end || { x: 0, y: 0, z: 0 };
                coordsToReturn = { x, y, z };
            }
                
            else if (huntedDimension === "minecraft:the_end" && hunterDimension === "minecraft:nether") {
                const { x, y, z } = playerPortals[hunted.nameTag]?.fromCoords.overworld || playerPortals[hunter.nameTag]?.toCoords.nether || { x: 0, y: 0, z: 0 };
                coordsToReturn = { x, y, z };
            }
            else if (huntedDimension === "minecraft:nether" && hunterDimension === "minecraft:overworld") {
                const { x, y, z } = playerPortals[hunted.nameTag]?.fromCoords.nether || { x: 0, y: 0, z: 0 };
                coordsToReturn = { x, y, z };
            }
            else if (huntedDimension === "minecraft:overworld" && hunterDimension === "minecraft:nether") {
                const { x, y, z } = playerPortals[hunted.nameTag]?.fromCoords.overworld || playerPortals[hunter.nameTag]?.toCoords.nether || { x: 0, y: 0, z: 0 };
                coordsToReturn = { x, y, z };
            }
    
        }
        
        
        return coordsToReturn;
    } catch (error) {
        console.error("An error occurred:", error);
        return null; // Return null in case of any error
    }
};

export default getLocationToTrack;