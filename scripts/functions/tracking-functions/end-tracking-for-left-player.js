import {system} from "@minecraft/server";
import trackingIntervalIds from "./tracking-interval-ids";


const endTrackingForLeftPlayer = (playerName) => {
    // Construct keys for tracking and title intervals
    const trackingKey = `${playerName}_tracking`;
    const titleKey = `${playerName}_title`;

    // Variable to track if any interval was cleared
    let actionTaken = false;

    // Clear the tracking interval if it exists
    if (trackingIntervalIds.has(trackingKey)) {
        system.clearRun(trackingIntervalIds.get(trackingKey));
        trackingIntervalIds.delete(trackingKey);
        actionTaken = true;
    }

    // Clear the title interval if it exists
    if (trackingIntervalIds.has(titleKey)) {
        system.clearRun(trackingIntervalIds.get(titleKey)); 
        trackingIntervalIds.delete(titleKey);
        actionTaken = true;
    }

}

export default endTrackingForLeftPlayer;

