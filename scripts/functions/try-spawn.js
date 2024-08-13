// function to generate random number and if chosen number then run spawnMob function
import { world} from "@minecraft/server";
import spawnMob from "./spawn-mob";
const num = 69;


const trySpawn = async (player) => {
    try {
        if (Math.floor(Math.random() * 1000) === num) {
        let players = [...world.getPlayers()];
        let target = players[Math.floor(Math.random() * players.length)];
        
        await spawnMob(player, "minecraft:warden", 1,target);
            
        }
    } 
    catch (error) {
        console.error("Error trying to spawn mobs:", error);
    }
}

export default trySpawn;