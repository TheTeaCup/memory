const fs = require('fs');

function EventHandler(Bumper) {
  fs.readdir('./src/Bot/Events/', (err, files) => {
    if (err) {
     return console.log(`(Bot) Found an error while loading Memory's Events.\n${err.stack}`);
    };
      
    files.forEach(file => {
      if (!file.endsWith('.js')) {
        return undefined;
      };
      
      const event = require(`../Events/${file}`);
      let eventName = file.split('.')[0];

      Bumper.on(eventName, event.bind(null, Bumper));
      delete require.cache[require.resolve(`../Events/${file}`)];
    });
  });
}

module.exports = EventHandler;