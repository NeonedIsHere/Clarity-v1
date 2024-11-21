module.exports = client => {
    process.on('unhandledRejection', (reason, p) => {
        console.log(' [antiCrash] :: Unhandled Rejection/Catch');
        console.log(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch');
        console.log(err, origin);
    }) 
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [antiCrash] :: Multiple Resolves');
        console.log(type, promise, reason);
    });
    
    client.on('interactionCreate', async interaction => {
        try {
            // Your interaction handling code goes here
        } catch (error) {
            if (error instanceof DiscordAPIError && error.code === 10062) {
                console.log('The interaction has already been acknowledged.');
            } else {
                console.log('An error occurred while handling the interaction.');
                console.log(error);
            }
        }
    })

     
     
     Promise.all([Promise.reject(), Promise.reject()])
 }