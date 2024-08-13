// This script is run when a player joins the world. 
//It gives the player a clock with the keep_on_death tag 

const giveClock = (player) => {
    try {
        player.runCommand(`/give @s clock 1 0 {"item_lock": {"mode": "lock_in_inventory"}}`);
       
    } catch (error) {
        console.error("Error giving clock:", error);
        
    }
}

export default giveClock;