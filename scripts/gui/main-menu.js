//main menu for gui
import { ActionFormData } from "@minecraft/server-ui"
import teams from "./teams-menu"
import trackingMenu from "./tracking-menu"
import endTrackingForPlayer from "../functions/tracking-functions/end-tracking"
import trySpawn from "../functions/try-spawn"



const main = (player) => {
   
    const form = new ActionFormData()
        let team = player.getTags()
        if (player.getTags().includes("Hunter")) {
            team = "§cHunter"
        } else if (player.getTags().includes("Speedrunner")) {
            team = "§9Speedrunner"
        }
        else{
            team = "§7Unassigned"
        }

        form.title("§l§b§k???§r §l§0WangTrak§6+ §b§k???")
        form.body(`Greetings §a${player.nameTag}§f!\nTeam: ${team}`) 
        
        
        form.button("§0Tracking\n§7[Press For Tracking Options]")
        form.button("§0Teams\n§7[Press For Team Options]")
        form.button("§0End Tracking\n§7[Press To End Tracking]")
        form.button("§dWarden Roulette\n§7[DONT PRESS]")
        form.button("§0Close\n§7[Press To Close")
        form.show(player).then(r => {
            
            if (r.selection == 0) trackingMenu(player)
            if (r.selection == 1) teams(player)
            if (r.selection == 2) endTrackingForPlayer(player)
            if (r.selection == 3) trySpawn(player)

        
        })
}

export default main;