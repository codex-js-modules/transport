(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["transport"] = factory();
	else
		root["transport"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ajax = __webpack_require__(1);

/**
 * File transport module
 *
 * @module Transport module. Upload file and return response from server
 * @copyright CodeX Team 2017
 */

module.exports = function (transport) {
  'use strict';

  /** Empty configuration */

  var config_ = null;

  /** File holder */
  transport.input = null;

  var clickInput_ = function clickInput_() {
    transport.input.click();
  };

  /**
     * Sends transport AJAX request
     */
  var send_ = function send_() {
    var url = config_.url,
        data = config_.data,
        before = config_.before,
        progress = config_.progress,
        success = config_.success,
        error = config_.error,
        after = config_.after,
        formData = new FormData(),
        files = transport.input.files;

    if (files.length > 1) {
      for (var i = 0; i < files.length; i++) {
        formData.append('files[]', files[i], files[i].name);
      }
    } else {
      formData.append('files', files[0], files[0].name);
    }

    /**
         * Append additional data
         */
    if (data !== null && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
      for (var key in data) {
        formData.append(key, data[key]);
      }
    }

    ajax.call({
      type: 'POST',
      data: formData,
      url: url,
      before: before,
      progress: progress,
      success: success,
      error: error,
      after: after
    });
  };

  /** initialize module */
  transport.init = function (configuration) {
    if (!configuration.url) {
      console.log('Can\'t send request because `url` is missed');
      return;
    }

    config_ = configuration;

    var inputElement = document.createElement('INPUT');

    inputElement.type = 'file';

    if (config_ && config_.multiple) {
      inputElement.setAttribute('multiple', 'multiple');
    }

    if (config_ && config_.accept) {
      inputElement.setAttribute('accept', config_.accept);
    }

    inputElement.addEventListener('change', send_, false);

    /** Save input */
    transport.input = inputElement;

    /** click input to show upload window */
    clickInput_();
  };

  return transport;
}({});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * AJAX module
 */
module.exports = function () {
  'use strict';

  /**
   * Function for checking is it FormData object to send.
   *
   * @param {Object} object to check
   * @return boolean
   */
  let isFormData = function (object) {
    return object instanceof FormData;
  };

  /**
   * Call AJAX request function
   *
   * @param {Object} data
   * @param {String} data.type          'GET' or 'POST' request type
   * @param {String} data.url           request url
   * @param {String} data.data          data to send
   * @param {Function} data.before      call this function before request
   * @param {Function} data.progress    callback function for progress
   * @param {Function} data.success     success function
   * @param {Function} data.error       error function
   * @param {Function} data.atfer       call this function after request
   */
  let call = function call(data) {
    if (!data || !data.url) return;

    let XMLHTTP = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP'),
        progressCallback = data.progress || null,
        successFunction = data.success || function () {},
        errorFunction = data.error || function () {},
        beforeFunction = data.before || null,
        afterFunction = data.after || null;


    data.async = true;
    data.type = data.type || 'GET';
    data.data = data.data || '';
    data['content-type'] = data['content-type'] || 'application/json; charset=utf-8';

    if (data.type === 'GET' && data.data) {
      data.url = /\?/.test(data.url) ? data.url + '&' + data.data : data.url + '?' + data.data;
    }

    if (data.withCredentials) {
      XMLHTTP.withCredentials = true;
    }

    if (beforeFunction && typeof beforeFunction === 'function') {
      beforeFunction();
    }

    XMLHTTP.open(data.type, data.url, data.async);

    /**
     * If data is not FormData then create FormData
     */
    if (!isFormData(data.data)) {
      let requestData = new FormData();

      for (let key in data.data) {
        requestData.append(key, data.data[key]);
      }

      data.data = requestData;
    }

    /**
     * Add progress listener
     */
    if (progressCallback && typeof progressCallback === 'function') {
      XMLHTTP.upload.addEventListener('progress', function (e) {
        let percentage = parseInt(e.loaded / e.total * 100);

        progressCallback(percentage);
      }, false);
    }

    XMLHTTP.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    XMLHTTP.onreadystatechange = function () {
      /**
       * XMLHTTP.readyState
       * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
       *
       * 0    UNSENT              Client has been created. open() not called yet.
       * 1    OPENED              open() has been called.
       * 2    HEADERS_RECEIVED    send() has been called, and headers and status are available.
       * 3    LOADING             Downloading; responseText holds partial data.
       * 4    DONE                The operation is complete.
       */
      if (XMLHTTP.readyState === 4) {
        let responseText = XMLHTTP.responseText;

        try {
          responseText = JSON.parse(responseText);
        } catch (e) {
          // Oh well, but whatever...
        }

        if (XMLHTTP.status === 200) {
          successFunction(responseText);
        } else {
          errorFunction(responseText);
        }

        if (afterFunction && typeof afterFunction === 'function') {
          afterFunction();
        }
      }
    };

    XMLHTTP.send(data.data);
  };

  return {
    call: call
  };
}();


/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map