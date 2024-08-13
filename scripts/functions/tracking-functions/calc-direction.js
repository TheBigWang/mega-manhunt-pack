// crazy ass maths function to calculate angle from player

const calculateDirectionToTarget = (playerPosition, playerYaw, targetCoordinates) => {
    return new Promise((resolve, reject) => {
        try {
            // Calculate vector from player to target
            let vectorToTarget = {
                x: targetCoordinates.x - playerPosition.x,
                z: targetCoordinates.z - playerPosition.z
            };

            // Normalize the vector to target
            let distance = Math.sqrt(vectorToTarget.x ** 2 + vectorToTarget.z ** 2);
            let normalizedVectorToTarget = {
                x: vectorToTarget.x / distance,
                z: vectorToTarget.z / distance
            };

            // Convert player yaw to radians and calculate facing vector
            let playerYawRadians = playerYaw * (Math.PI / 180);
            let playerFacingVector = {
                x: -Math.sin(playerYawRadians), // Adjusting for Minecraft's coordinate system
                z: Math.cos(playerYawRadians)
            };

            // Calculate the angle between the player's facing vector and the vector to the target
            let angleRadians = Math.atan2(normalizedVectorToTarget.z, normalizedVectorToTarget.x) - Math.atan2(playerFacingVector.z, playerFacingVector.x);

            // Normalize the angle to the range 0 to 2π
            angleRadians = (angleRadians + 2 * Math.PI) % (2 * Math.PI);

            // Convert angle to degrees
            let angleDegrees = angleRadians * (180 / Math.PI);

            // Normalize the angle to the range 0 to 360 degrees
            angleDegrees = (angleDegrees + 360) % 360;

            resolve(angleDegrees.toFixed(2));
        } catch (error) {
            reject(error);
        }
    });
}

export default calculateDirectionToTarget;