//tracking menu for gui
import{world, system } from "@minecraft/server"
import{ModalFormData} from "@minecraft/server-ui"
import runTracking from "../functions/tracking-functions/run-tracking";

const tickRate = 1;
const titleRate = 5000;

const trackingMenu = (player) => {
    
    const players = [...world.getPlayers()];
    

    // Filter out the current player from the list
    const otherPlayers = players.filter(p => p.nameTag !== player.nameTag);

    new ModalFormData()
        .title("§l§b§k???§r §l§0Tracking Menu §b§k???")
        .dropdown('Select player to track', otherPlayers.map(p => p.nameTag))
        .show(player)
        .then(({ formValues: [dropdown] }) => {
            const selectedPlayer = otherPlayers[dropdown];
            
            
            system.run(() => runTracking(player, tickRate, selectedPlayer, titleRate));
        })
}

export default trackingMenu;