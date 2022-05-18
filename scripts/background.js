function onError(error) {
  console.log(`Error: ${error}`);
  browser.browserAction.setBadgeBackgroundColor({'color': 'red'});
  browser.browserAction.setBadgeText({text: "×"});
}

function onSuccess() {
  browser.browserAction.setBadgeBackgroundColor({'color': 'green'});
  browser.browserAction.setBadgeText({text: "✓"});
}

function updateCount() {
  browser.tabs.query({highlighted: true, currentWindow: true})
  .then((tabs) => {
    browser.browserAction.setBadgeBackgroundColor({'color': 'blue'});
    browser.browserAction.setBadgeText({text: tabs.length.toString()});
  }).catch(onError);
}

function buildList(tabs) {
  return tabs.map(tab => `* TODO [[${tab.url}][${tab.title}]]`).join("\n");
}

function copyToClipboard() {
  browser.tabs.query({highlighted: true, currentWindow: true})
  .then(tabs => navigator.clipboard.writeText(buildList(tabs)))
  .then(onSuccess)
  .catch(onError);
}

browser.tabs.onHighlighted.addListener(updateCount);
browser.browserAction.onClicked.addListener(copyToClipboard);
updateCount();