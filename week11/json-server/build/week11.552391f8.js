// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"authHelpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRequest = makeRequest;
exports.Errors = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Errors =
/*#__PURE__*/
function () {
  function Errors(errorElementId) {
    _classCallCheck(this, Errors);

    this.errorElement = document.getElementById(errorElementId);
  }

  _createClass(Errors, [{
    key: "handleError",
    value: function handleError(error, callback) {
      // parse out the error code from the error string
      var code = error.message.substring(0, 3);
      this.displayError(error); // if it is something related to authentication then show the login form again.

      if (code == 500 || code == 401) {
        callback();
      }

      console.log(code);
    }
  }, {
    key: "displayError",
    value: function displayError(error) {
      this.errorElement.innerHTML = error.message;
      this.errorElement.classList.remove('hidden');
    }
  }, {
    key: "clearError",
    value: function clearError() {
      this.errorElement.innerHTML = '';
      this.errorElement.classList.add('hidden');
    }
  }]);

  return Errors;
}();

exports.Errors = Errors;
var baseURL = 'http://127.0.0.1:1234/'; // helper function to make an http request with fetch.
// returns a promise to a json object

function makeRequest(url) {
  var method,
      body,
      token,
      options,
      response,
      data,
      _args = arguments;
  return regeneratorRuntime.async(function makeRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          method = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'GET';
          body = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
          token = _args.length > 3 && _args[3] !== undefined ? _args[3] : null;
          options = {
            method: method,
            headers: {
              'Content-Type': 'application/json'
            }
          }; // if we are sending any data with the request add it here

          if (method == 'POST' || method == 'PUT') {
            options.body = JSON.stringify(body);
          } // if a token was passed in we should send it on.


          if (token) {
            options.headers.Authorization = "Bearer ".concat(token);
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(fetch(baseURL + url, options));

        case 8:
          response = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(response.json());

        case 11:
          data = _context.sent;

          if (response.ok) {
            _context.next = 17;
            break;
          }

          // server will send a 500 server error if the token expires...or a 401 if we are not authorized, ie bad username/password combination, and a 404 if the URL we requested does not exist. All of these would cause response.ok to be false
          console.log(response);
          throw new Error("".concat(data.status, ": ").concat(data.message));

        case 17:
          return _context.abrupt("return", data);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
}
},{}],"auth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authHelpers = require("./authHelpers.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Auth =
/*#__PURE__*/
function () {
  function Auth(errorHandler) {
    _classCallCheck(this, Auth);

    this.jwtToken = '';
    this.user = {};
    this.errors = errorHandler;
  }

  _createClass(Auth, [{
    key: "login",
    value: function login(callback) {
      var password, username, postData, data;
      return regeneratorRuntime.async(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              password = document.getElementById('password');
              username = document.getElementById('username');
              postData = {
                email: username.value,
                password: password.value
              };
              _context.prev = 3;
              _context.next = 6;
              return regeneratorRuntime.awrap((0, _authHelpers.makeRequest)('login', 'POST', postData));

            case 6:
              data = _context.sent;
              // a successful response...we have a token!  Store it since we will need to send it with every request to the API.
              this.jwtToken = data.accessToken; // let's get the user details as well and store them locally in the class

              _context.next = 10;
              return regeneratorRuntime.awrap(this.getCurrentUser(username.value));

            case 10:
              this.user = _context.sent;
              console.log(data); // hide the login form.

              hideLogin(); // clear the password

              password.value = ''; // clear any errors from the login process

              this.errors.clearError(); // since we have a token let's go grab some data from the API

              callback();
              _context.next = 22;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](3);
              // if there were any errors display them
              this.errors.handleError(_context.t0);
              console.log(_context.t0);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[3, 18]]);
    } // uses the email of the currently logged in user to pull up the full user details for that user from the database

  }, {
    key: "getCurrentUser",
    value: function getCurrentUser(email) {
      var data;
      return regeneratorRuntime.async(function getCurrentUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap((0, _authHelpers.makeRequest)('users?email=' + email, 'GET', null, this.jwtToken));

            case 3:
              data = _context2.sent;
              console.log(data);
              return _context2.abrupt("return", data[0]);

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              // if there were any errors display them
              this.errors.handleError(_context2.t0);
              console.log(_context2.t0);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 8]]);
    }
  }, {
    key: "updateUser",
    value: function updateUser() {
      var result;
      return regeneratorRuntime.async(function updateUser$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // after logging in we pulled down the user from the api...including the id...we can use that to do our update.
              this.user.age = 40;
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap((0, _authHelpers.makeRequest)('users/' + this.user.id, 'PUT', this.user, this.jwtToken));

            case 4:
              result = _context3.sent;
              console.log('Update user:', result);
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              this.errors.handleError(_context3.t0, showLogin);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[1, 8]]);
    }
  }, {
    key: "token",
    set: function set(value) {// we need this for the getter to work...but we don't want to allow setting the token through this so we are leaving it blank.
    },
    get: function get() {
      return this.jwtToken;
    }
  }]);

  return Auth;
}(); // end auth class


exports.default = Auth;

function showLogin() {
  document.getElementById('login').classList.remove('hidden');
}

function hideLogin() {
  document.getElementById('login').classList.add('hidden');
}
},{"./authHelpers.js":"authHelpers.js"}],"week11.js":[function(require,module,exports) {
"use strict";

var _auth = _interopRequireDefault(require("./auth.js"));

var _authHelpers = require("./authHelpers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// makeRequest('login', 'POST', {
//   password: 'user1',
//   email: 'user1@email.com'
// });
var myErrors = new _authHelpers.Errors('errors');
var myAuth = new _auth.default(myErrors);
var loginForm = document.getElementById('login');
loginForm.querySelector('button').addEventListener('click', function () {
  myAuth.login(getPosts);
});

function getPosts() {
  var data, ul, i, li;
  return regeneratorRuntime.async(function getPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _authHelpers.makeRequest)('posts', 'GET', null, myAuth.token));

        case 3:
          data = _context.sent;
          // make sure the element is shown
          document.getElementById('content').classList.remove('hidden');
          console.log(data);
          ul = document.getElementById('list');
          ul.innerHTML = '';

          for (i = 0; i < data.length; i++) {
            li = document.createElement('li');
            li.appendChild(document.createTextNode(data[i].title));
            ul.appendChild(li);
          }

          myErrors.clearError();
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          // if there were any errors display them
          myErrors.handleError(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

document.getElementById('createSubmit').addEventListener('click', function () {
  createPost();
});

function createPost() {
  var form, data, res;
  return regeneratorRuntime.async(function createPost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          form = document.forms.postForm;
          console.dir(form);

          if (!(form.title.validity.valid && form.content.validity.valid)) {
            _context2.next = 20;
            break;
          }

          myErrors.clearError();
          data = {
            title: form.title.value,
            content: form.content.value
          };
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap((0, _authHelpers.makeRequest)('posts', 'POST', data, myAuth.token));

        case 8:
          res = _context2.sent;
          console.log('Post create:', data);
          form.title.value = '';
          form.content.value = '';
          getPosts();
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](5);
          myErrors.handleError(_context2.t0);

        case 18:
          _context2.next = 21;
          break;

        case 20:
          myErrors.displayError({
            message: 'Title and Content are required'
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 15]]);
}
},{"./auth.js":"auth.js","./authHelpers.js":"authHelpers.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63527" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","week11.js"], null)
//# sourceMappingURL=/week11.552391f8.js.map