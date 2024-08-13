//function to take time in ticks and wait accordingly
import { system } from "@minecraft/server";

const wait = (time) => {
    return new Promise((resolve) => {
        const waitTimeout = system.runTimeout(() => {
            system.clearRun(waitTimeout);
            resolve();
        },time);
    })
}

export default wait;