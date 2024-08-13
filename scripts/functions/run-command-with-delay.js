//function ran when dimension changed, runs title display 5 times every 100 ticks
//to account for loading times
import wait from "./wait";

async function runCommandWithDelay(player) {
    for (let i = 0; i < 5; i++) {
      await wait(100); // Wait for 100 ticks
      player.runCommand(`titleraw @s title {"rawtext":[{"text":"\n"}]}`);
    }
  }

export default runCommandWithDelay;