//function to play a specific sound for a specific player

const playSound = async (player, sound) => {
    try {
        await player.runCommand(`/playsound ${sound} @s ~ ~ ~ 1 1 1`);
    } catch (error) {
        console.error("Error playing sound:", error);
        // Optionally, take other corrective actions here
    }
}

export default playSound;