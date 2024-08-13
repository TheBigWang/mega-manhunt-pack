//function to take angle to point and return corresponding compass sprite

function getCompassSymbol(angleToPoint) {
    return new Promise((resolve, reject) => {
        try {
            const compassSymbols = [
                "", 
                "", "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", ""
            ];

            // Normalize the angle to be within 0 to 360 degrees
            angleToPoint = angleToPoint % 360;
            if (angleToPoint < 0) angleToPoint += 360;

            // Calculate the index for the compass symbol
            const index = Math.floor((angleToPoint + 5.625) / 11.25) % 32;

            // Return the corresponding compass symbol
            resolve(compassSymbols[index]);
        } catch (error) {
            reject(error);
        }
    });
}


export default getCompassSymbol;