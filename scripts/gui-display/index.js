//event that is triggered upon a player using the clock item, displays the main gui menu
console.warn('the gui index is loaded');
import{world, system} from "@minecraft/server"
import main from "../gui/main-menu";

// defining item uses that will trigger the gui
world.beforeEvents.itemUse.subscribe((data) => {
    let player = data.source
    if (data.itemStack.typeId == "minecraft:clock") system.run(() => main(player))
    
    
})






  
    
  
























