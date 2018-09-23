/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    './plugins/cordova-plugin-advanced-http/src/browser/cordova-http-plugin.js',
    './plugins/cordova-plugin-android-permissions/www/permissions-dummy.js',
    './plugins/cordova-plugin-camera/src/browser/CameraProxy.js',
    './plugins/cordova-plugin-file/src/browser/FileProxy.js',
    './plugins/cordova-plugin-firebase/www/firebase-browser.js',
    './plugins/cordova-plugin-network-information/src/browser/network.js',
    './plugins/es6-promise-plugin/www/promise.js',
    './plugins/ionic-plugin-keyboard/www/browser/keyboard.js',
    './OneSignalSDKUpdaterWorker.js',
    './OneSignalSDKWorker.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
