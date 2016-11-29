var session = null;

// Check for cast API
window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
  	console.log('Cast has loaded.');
    initializeCastApi();
  }
};

function initializeCastApi() {
  var applicationID = '33D44AE0';
  var sessionRequest = new chrome.cast.SessionRequest(applicationID);
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
          sessionListener,
          receiverListener);
  chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
};

function sessionListener(e) {
    session = e;
    console.log('New session');
    if (session.media.length != 0) {
            console.log('Found ' + session.media.length + ' sessions.');
    }
}

function receiverListener(e) {
  if( e === 'available' ) {
          console.log("Chromecast was found on the network.");
  }
  else {
          console.log("There are no Chromecasts available.");
  }
}


function onInitSuccess() {
  console.log("Initialization succeeded");
}

function onInitError() {
  console.log("Initialization failed");
}

// Lauching application function
function launchApp() {
	console.log("Launching the Chromecast App...");
  chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
}

function onRequestSessionSuccess(e) {
  console.log("Successfully created session: " + e.sessionId);
  session = e;

  // Load stuff
  loadMedia();
}

function onLaunchError() {
  console.log("Error connecting to the Chromecast.");
}


function loadMedia() {
  if (!session) {
          console.log("No session.");
          return;
  }

  var mediaInfo = new
chrome.cast.media.MediaInfo('https://google.com');
  

  var request = new chrome.cast.media.LoadRequest(mediaInfo);
  request.autoplay = true;

  session.loadMedia(request, onLoadSuccess, onLoadError);
}

function onLoadSuccess() {
  console.log('Successfully loaded image.');
}

function onLoadError() {
  console.log('Failed to load image.');
}








// Event for cast button
$(document).ready(function() {
	$('#castme').click(function(){
		launchApp();
	});
});