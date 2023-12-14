// this code gets run at the document start (as indicated in the manifest.json file)
// create a new script tag
var scriptTag = document.createElement('script');

// set its contents to our inject.js file
scriptTag.src = chrome.runtime.getURL('inject.js');

// inject it into the document
(document.head || document.documentElement).appendChild(scriptTag);

// log
console.log('USAA Full Transaction Exporter - injected');
