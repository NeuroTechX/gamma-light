var Lifx = require("node-lifx").Client;
var client = new Lifx();
var light = {};

client.on("error", function(err) {
  console.log("LIFX error:\n" + err.stack);
  client.destroy();
});

client.on("light-new", function(newLight) {
  console.log("found light ", newLight.getState());
  light = newLight;

  while (true) {
    light.on(error => {
      if (!error) {
        setTimeout(() => light.off(), 25);
      } else {
        throw new Error("Error with light on function");
      }
    });
  }
});

client.init();
