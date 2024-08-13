// function to spawn certain amount of certain mob
import { world,system } from "@minecraft/server";

const spawnMob = async (player, mobId, amount,target) =>{
    try{
        for (let i = 0; i < amount; i++) {
            await player.runCommandAsync(`/summon ${mobId} ${target.location.x} ${target.location.y} ${target.location.z}`);
        }
    }
    catch(error){
        console.error("Error spawning mobs:", error);
    }
}

export default spawnMob;