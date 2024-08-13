//teams menu for gui
import{world} from "@minecraft/server"
import{ActionFormData} from "@minecraft/server-ui"
import main from "./main-menu";

const teams = (player) => {
    let teamsForm = new ActionFormData();
    teamsForm.title("§l§b§k???§r §l§0Teams Menu §b§k???");
    teamsForm.body("Select a team below");
    teamsForm.button("§9Speed Runner");
    teamsForm.button("§cHunter");
    
    
    teamsForm.button("§0Back");
    

    // Get the names of players in each team
    const huntersNames = world.getPlayers().filter(p => p.hasTag("Hunter")).map(p => p.name).join(", ");
    const speedrunnersNames = world.getPlayers().filter(p => p.hasTag("Speedrunner")).map(p => p.name).join(", ");

    // Update the body to include the names of the players
    teamsForm.body(`§9Speed Runners: §f${speedrunnersNames}\n§cHunters: §f${huntersNames}`)
    .show(player).then(response => {
        switch (response.selection) {
            case 0:
                player.removeTag("Hunter");
                player.removeTag("Unassigned");
                player.addTag("Speedrunner");
                teams(player); // Refresh the teams page
                break;
            case 1:
                player.removeTag("Speedrunner");
                player.removeTag("Unassigned");
                player.addTag("Hunter");
                teams(player); // Refresh the teams page
                break;
            
            case 2:
                main(player, "§lTheBigWang's Big Menu"); // Go back to the main GUI
                break;
            
            default:
                teams(player); // Refresh the teams page for any unhandled selections
        }
    });
}

export default teams;

 