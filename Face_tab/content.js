// Thanks Chino Kim for the code allowing the webcam to open! He is great: http://chino.kim/info/

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
var video;

function getWebcam() {
  var errorCallback = function(e) {
    // console.log('error', e);
    stockHead();
  };

  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  video = document.getElementById('cam');

  if (navigator.getUserMedia) {
    navigator.getUserMedia({
      video: {
        width: {
          exact: 320
        },
        height: {
          exact: 240
        }
      }
    }, function(stream) {
      video.src = window.URL.createObjectURL(stream);
    }, errorCallback);
  } else {
    stockHead();
  }
}

window.onload = function() {
  if (hasGetUserMedia()) {
    getWebcam();
  } else {
    alert('getUserMedia() is not supported in your browser');
  }
};

function stockHead() {
  console.log('stock head');
  document.body.removeChild(document.getElementById('cam'));
}


var resizeTimeout;
window.onresize = function(e) {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    window.resizeTo(320, 262);
  }, 200);
};

// Tracker
var ctracker;
var distance = 0;

setTimeout(function() {
  ctracker = new clm.tracker();
  ctracker.init();
  ctracker.start(video);
  setInterval(function() {
    // Mouth open
    let top = ctracker.getCurrentPosition()[60]; //[5,6]
    let bottom = ctracker.getCurrentPosition()[57]; //[5,6]

    var a = top[0] - bottom[0]; // x0 and x1
    var b = top[1] - bottom[1]; // y0 and y1
    var distance = Math.sqrt(a * a + b * b);
    // var distanceclean = Math.floor(distance);
    // console.log(distanceclean);
    //
    //   let eye = ctracker.getCurrentPosition()[32];
    //   if (eye < 1){
    //   console.log('eye is closed');
    // }
    chrome.runtime.sendMessage(distance);
  }, 1000);
}, 5000);
