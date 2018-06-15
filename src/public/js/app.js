let worker,
    URL = window.location.origin;

window.onload = onLoad;

/**
 * @function onLoad
 * @description calls loadWebWorker on page load
 */
function onLoad () {
    if (typeof(worker) !== undefined) {
      loadWebWorker();
    } else {
      console.log("web worker not supported");
  }
};

/**
 * @function loadWebWorker
 * @description creates web worker
 */
function loadWebWorker() {
  if (worker == undefined) {
    worker = new Worker("js/worker.js");
    worker.onmessage = function(e) {
      console.log("worker msg: ", e.data);
    }
    console.log("web worker loaded");
  }
  worker.postMessage(JSON.stringify({URL : URL}));
}