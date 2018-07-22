function init(selector, callback, time) {
  if (document.querySelector(selector) !== null) {
    callback();
  } else {
    setTimeout(function () {
      init(selector, callback, time);
    }, time);
  }
}

function moveStarred() {
  var stars = document.querySelectorAll('.starButton-starred');

  if (stars) {
    var wrapper = document.querySelector('.conversation-wrapper');

    wrapper.style.display = 'flex';
    wrapper.style['flex-direction'] = 'column';

    for (var star of stars) {
      var message = star.closest('.conversation');

      message.style.order = '-1';
    }
  }
}

// Run
init('.conversation', moveStarred, 100);

// Listen for URL changes
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.url.endsWith('inbox')) {
      init('.conversation', moveStarred, 100);
    }
  }
);
