//event that is triggered upon a player joining a server for the first time
console.warn('onJoin.js loaded');

import {world} from "@minecraft/server"
import wait from "../functions/wait"
import giveClock from "../functions/give-clock-on-join";
import playerPortals from "../functions/player-portals";

world.afterEvents.playerSpawn.subscribe(async({player,initialSpawn}) => {
    if (initialSpawn){
   
    
    await wait(20)
    player.runCommandAsync(`/titleraw ${player.nameTag} times 10 9999999 10`)
    player.runCommandAsync(`/titleraw ${player.nameTag} title {"rawtext":[{"text":"\n"}]}`)
    giveClock(player)
    player.removeTag("Speedrunner")
    player.removeTag("Hunter")
    player.addTag("Unassigned")

      // Initialize player entry if not exists
    if (!playerPortals[player.nameTag]) {
        playerPortals[player.nameTag] = {
        fromCoords: {},
        toCoords: {
            dimension: player.dimension.id // Storing the 'to' dimension
        },
        netherCount: 0, // Initialize Nether counter
        endCount: 0,
        forttessCount: 0// Initialize End counter
        };
    }
  }

  else if (!initialSpawn){
        giveClock(player)
        
    }

    

})

world.afterEvents.entityHitEntity.subscribe((event) => {
    let attacker = event.damagingEntity;
    let victim = event.hitEntity;
    try {
        if ((victim.typeId === "minecraft:blaze"|| victim.typeId === "minecraft:wither_skeleton")
            && attacker.typeId === "minecraft:player" 
            && attacker.dimension.id === "minecraft:nether"
            && playerPortals[attacker.nameTag].forttessCount < 1) {
                let player = attacker;
            
                player.runCommand(`/tellraw @a {"rawtext":[{"text":"${player.nameTag} has made the advancement §a[A Terrible Fortress]"}]}`);
                playerPortals[player.nameTag].forttessCount++;}
        else if ((attacker.typeId === "minecraft:blaze"|| attacker.typeId === "minecraft:wither_skeleton")
            && victim.typeId === "minecraft:player" 
            && victim.dimension.id === "minecraft:nether"
            && playerPortals[victim.nameTag].forttessCount < 1) {
                let player = victim;
            
                player.runCommand(`/tellraw @a {"rawtext":[{"text":"${player.nameTag} has made the advancement §a[A Terrible Fortress]"}]}`);
                playerPortals[player.nameTag].forttessCount++;}
        }
        
        
     catch (error) {
        console.log("Error:", error);
     }
    
});






