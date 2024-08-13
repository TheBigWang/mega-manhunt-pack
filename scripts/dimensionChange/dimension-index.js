//event that listens for a player changing dimensions and logs the coordinates of the portal 
//they used to do so and the portal they are travelling to, along with the dimension they changed to
console.warn('the dimensionChange index is loaded');
import { world } from "@minecraft/server";
import playerPortals from "../functions/player-portals";
import runCommandWithDelay from "../functions/run-command-with-delay";

world.afterEvents.playerDimensionChange.subscribe(async(event) => {
  const player = event.player;
  const toDimension = event.toDimension.id;
  const fromCoords = event.fromLocation;
  const toCoords = event.toLocation;



  // Ensure playerPortals entry exists for the player
  if (!playerPortals[player.nameTag]) {
    playerPortals[player.nameTag] = {
      fromCoords: { nether: {}, end: {}, overworld: {} },
      toCoords: { nether: {}, end: {}, overworld: {} },
      netherCount: 0,
      endCount: 0,
      overworldCount: 0,
    };
  }

  // Helper function to format coordinates
  const formatCoords = (coords) => ({
    x: coords.x.toFixed(2),
    y: coords.y.toFixed(2),
    z: coords.z.toFixed(2),
  });

  // Update coordinates based on the dimension
  switch (toDimension) {
    case "minecraft:nether":
      playerPortals[player.nameTag].fromCoords.nether = formatCoords(fromCoords);
      playerPortals[player.nameTag].toCoords.nether = formatCoords(toCoords);
      playerPortals[player.nameTag].netherCount += 1;
      break;
    case "minecraft:the_end":
      playerPortals[player.nameTag].fromCoords.end = formatCoords(fromCoords);
      playerPortals[player.nameTag].toCoords.end = formatCoords(toCoords);
      playerPortals[player.nameTag].endCount += 1;
      break;
    default: // Assuming 'default' as 'minecraft:overworld'
      playerPortals[player.nameTag].fromCoords.overworld = formatCoords(fromCoords);
      playerPortals[player.nameTag].toCoords.overworld = formatCoords(toCoords);
      playerPortals[player.nameTag].overworldCount += 1;
  }

  // Always store the current dimension in toCoords at the top level
  playerPortals[player.nameTag].toCoords.dimension = toDimension;
  
    // Store both the 'from' and 'to' portal coordinates for the player

  if (playerPortals[player.nameTag].netherCount == 1 && toDimension == "minecraft:nether"){  {
    player.runCommand(`/tellraw @a {"rawtext":[{"text":"${player.nameTag} has made the advancement §a[We Need to Go Deeper]"}]}`)
  }

  }
  else if (playerPortals[player.nameTag].endCount == 1 && toDimension == "minecraft:the_end") {
    player.runCommand(`/tellraw @a {"rawtext":[{"text":"${player.nameTag} has made the advancement §a[The End?]"}]}`)

  }
  
  try{
    runCommandWithDelay(player)
  }
  catch (error) {
    console.error("An error occurred:", error);
  }

  
  
});




   