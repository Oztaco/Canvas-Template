// This makes sure the code only runs once the page is loaded
window.addEventListener("load", function() {
	init();
	requestAnimationFrame(loop);
});
// This runs every time the browser wants you to
// draw stuff. It calls the other functions to 
// keep your code organized
function loop() {
	update();
	draw();
	requestAnimationFrame(loop);
}

// This is code to help you with getting mouse and keyboard input, borrowed from
// my library https://github.com/Oztaco/Efe.js
// This is beyond the scope of this seminar and I just wanted to give you a starting point
keys = {
	enter: false,
	shift: false,
	ctrl: false,
	alt: false,
	up: false,
	down: false,
	left: false,
	right: false
}
keyCodeList = {
	enter: 13,
	shift: 16,
	ctrl: 17,
	alt: 18,
	up: 38,
	down: 40,
	left: 37,
	right: 39
}
alphabet = "abcdefghijklmnopqrstuvwxyz"; // Defined as global in case other code needs it
populateKeys(); // Adds the alphabet and numbers to the "keys" object
function populateKeys() {
	for (var i = 0; i < alphabet.length; i++) {
		keys[alphabet.substring(i, i + 1)] = false;
	}
	for (var i = 0; i < 10; i++) {
		keys["num" + i] = false; // Set when either numpad or number row keys are pushed
	}
}
window.addEventListener("keydown", function (e) { // For all the special keys (shift, ctrl, etc)
	keySetter(e, true);
})
window.addEventListener("keypress", function (e) { // For all the text/number keys
	var letter = e.key || String.fromCharCode(e.keyCode).toLowerCase(); // Gets key as string
	if (!isNaN(parseInt(letter, 10))) keys["num" + letter] = true; // Checks for number
	for (var i = 0; i < alphabet.length; i++) { // Checks alphabet
		if (letter == alphabet.substring(i, i + 1)) {
			keys[letter] = true;
			break;
		}
	}
})

window.addEventListener("keyup", function (e) { // For all keys
	keySetter(e, false);
	var letter = e.key || String.fromCharCode(e.keyCode).toLowerCase();
	for (var i = 0; i < alphabet.length; i++) {
		if (letter == alphabet.substring(i, i + 1)) {
			keys[letter] = false;
			break;
		}
	}

	if (!isNaN(parseInt(letter, 10))) keys["num" + letter] = false;
	else if (!isNaN(parseInt(String.fromCharCode(e.keyCode - 48), 10))) keys["num" + String.fromCharCode(e.keyCode - 48)] = false; // The numpad should give you keycodes that are 48 off. This checks for that
})
function keySetter(e, value) { // Checks special keys, used by multiple functions above
	if (value) value = performance.now(); // This way you can tell which button was first
	switch (e.keyCode) {
		case keyCodeList.enter:
		keys.enter = value;
			break;
		case keyCodeList.shift:
		keys.shift = value;
			break;
		case keyCodeList.ctrl:
		keys.ctrl = value;
			break;
		case keyCodeList.alt:
		keys.alt = value;
			break;
		case keyCodeList.up:
		keys.up = value;
			break;
		case keyCodeList.down:
		keys.down = value;
			break;
		case keyCodeList.left:
		keys.left = value;
			break;
		case keyCodeList.right:
		keys.right = value;
			break;
	}
}



// Add your code below here ================================================================================

// Use this to create any objects or load things
function init() {
	myCanvas = document.getElementById("myCanvas");
	ctx = myCanvas.getContext("2d"); // Lets you access the canvas's data. There is also a 3D one with WebGL
	player = {
		x: 200,
		y: 200
	}
}
// Use this for any non-graphic stuff in your app
function update() {
	if (keys.up) player.y -= config.playerSpeed;
	if (keys.right) player.x += config.playerSpeed;
	if (keys.down) player.y += config.playerSpeed;
	if (keys.left) player.x -= config.playerSpeed;
}
// Use this only to render stuff to the screen
function draw() {
	ctx.fillStyle = config.background;
	ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

	ctx.fillStyle = config.playerFill;
	ctx.fillRect(player.x, player.y, 40, 40);
}

// It's a good idea to keep some constants that you can play with later
config = {
	playerSpeed: 10,
	playerFill: "#000",
	background: "#aaf"
}