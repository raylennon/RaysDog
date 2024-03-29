$( document ).ready(function() {

    // Device
    var address = "10.194.145.32";
    var device = new Device(address);

    // Buttons

    document.addEventListener('keydown', function(event) {

        if (event.repeat) return;
        var request = new XMLHttpRequest();

        // Add the key to the keysPressed object
        keysPressed[event.key] = true;
        console.log(event.key);
        // Check which key or combination of keys was pressed
        if ((keysPressed['ArrowUp'] || keysPressed['w']) && (keysPressed['ArrowLeft'] || keysPressed['d'])) {
            request.open("GET", "/go_fl", true);
        } else if ((keysPressed['ArrowUp'] || keysPressed['w']) && (keysPressed['ArrowRight'] || keysPressed['a'])) {
            request.open("GET", "/go_fr", true);
        } else if ((keysPressed['ArrowDown'] || keysPressed['s']) && (keysPressed['ArrowLeft'] || keysPressed['d'])) {
            request.open("GET", "/go_bl", true);
        } else if ((keysPressed['ArrowDown'] || keysPressed['s']) && (keysPressed['ArrowRight'] || keysPressed['a'])) {
            request.open("GET", "/go_br", true);
        } else if (event.key === 'ArrowUp' || event.key === 'w') {
            request.open("GET", "/go_forward", true);
            console.log("Forward ho!!");
        } else if (event.key === 'ArrowDown' || event.key === 's') {
            request.open("GET", "/go_back", true);
        } else if (event.key === 'ArrowRight' || event.key === 'd') {
            request.open("GET", "/go_right", true);
        } else if (event.key === 'ArrowLeft'  || event.key === 'a') {
            request.open("GET", "/go_left", true);
        } else {
            return
        }
        request.send();
      });
      
      document.addEventListener('keyup', function(event) {
        // Remove the key from the keysPressed object
        var request = new XMLHttpRequest();
        delete keysPressed[event.key];
        if (Object.keys(keysPressed).length === 0) {
            var request = new XMLHttpRequest();
            request.open("GET", "/go_stop", true);
            request.send();
            device.callFunction("stop");
            return
        }

        console.log(event.key);
        // Check which key or combination of keys was pressed
        if ((keysPressed['ArrowUp'] || keysPressed['w']) && (keysPressed['ArrowLeft'] || keysPressed['d'])) {
            request.open("GET", "/go_fl", true);
        } else if ((keysPressed['ArrowUp'] || keysPressed['w']) && (keysPressed['ArrowRight'] || keysPressed['a'])) {
            request.open("GET", "/go_fr", true);
        } else if ((keysPressed['ArrowDown'] || keysPressed['s']) && (keysPressed['ArrowLeft'] || keysPressed['d'])) {
            request.open("GET", "/go_bl", true);
        } else if ((keysPressed['ArrowDown'] || keysPressed['s']) && (keysPressed['ArrowRight'] || keysPressed['a'])) {
            request.open("GET", "/go_br", true);
        } else if ((keysPressed['ArrowUp'] || keysPressed['w'])) {
            request.open("GET", "/go_forward", true);
            console.log("Forward ho!!");
        } else if ((keysPressed['ArrowDown'] || keysPressed['s'])) {
            request.open("GET", "/go_back", true);
        } else if ((keysPressed['ArrowRight'] || keysPressed['a'])) {
            request.open("GET", "/go_right", true);
        } else if ((keysPressed['ArrowLeft'] || keysPressed['d'])) {
            request.open("GET", "/go_left", true);
        } else {
            return
        }
        request.send();
      });
});
function heartbeat() {
    var request = new XMLHttpRequest();
    request.open("GET", "/still_alive", true);
    request.send();
}
const myInterval = setInterval(heartbeat, 800);

var keysPressed = {}; // Keep track of which keys are currently pressed

document.getElementById("fname").addEventListener("change", updateresolution);

function updateresolution() {
  console.log("WHAT!!")
  var res = document.getElementById("fname");
  var val = res.value;
  var request = new XMLHttpRequest();
  request.open("GET", "/res_"+val, true);
  request.send();
}

function handleUpButtonPressed() {
    // code to handle when up button is pressed
  }
  
  function handleUpButtonReleased() {
    // code to handle when up button is released
  }
  
  function handleLeftButtonPressed() {
    // code to handle when left button is pressed
  }
  
  function handleLeftButtonReleased() {
    // code to handle when left button is released
  }
  
  function handleDownButtonPressed() {
    // code to handle when down button is pressed
  }
  
  function handleDownButtonReleased() {
    // code to handle when down button is released
  }
  
  function handleRightButtonPressed() {
    // code to handle when right button is pressed
  }
  
  function handleRightButtonReleased() {
    // code to handle when right button is released
  }