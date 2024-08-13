//function to display blank title on players screen (so compass subtitle is visible)
const titleDisplay = async (player) => {
    try{
        await player.runCommandAsync(`/titleraw ${player.nameTag} title {"rawtext":[{"text":"\n"}]}`);
    }
    catch (error){
        await player.runCommandAsync(`/titleraw "${player.nameTag}" title {"rawtext":[{"text":"\n"}]}`);
    }
    
}

export default titleDisplay;