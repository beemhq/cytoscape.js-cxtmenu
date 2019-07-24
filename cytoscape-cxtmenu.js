(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeCxtmenu"] = factory();
	else
		root["cytoscapeCxtmenu"] = factory();
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(2);
var assign = __webpack_require__(1);

var _require = __webpack_require__(3),
    removeEles = _require.removeEles,
    setStyles = _require.setStyles,
    createElement = _require.createElement,
    getPixelRatio = _require.getPixelRatio,
    getOffset = _require.getOffset;

var cxtmenu = function cxtmenu(params) {
  var options = assign({}, defaults, params);
  var cy = this;
  var container = cy.container();
  var target = void 0;

  var data = {
    options: options,
    handlers: [],
    container: createElement({ class: 'cxtmenu' })
  };

  var wrapper = data.container;
  var parent = createElement();
  var canvas = createElement({ tag: 'canvas' });
  var commands = [];
  var c2d = canvas.getContext('2d');
  var r = options.menuRadius;
  var containerSize = (r + options.activePadding) * 2;
  var activeCommandI = void 0;
  var offset = void 0;

  container.insertBefore(wrapper, container.firstChild);
  wrapper.appendChild(parent);
  parent.appendChild(canvas);

  setStyles(wrapper, {
    position: 'absolute',
    zIndex: options.zIndex,
    userSelect: 'none',
    pointerEvents: 'none' // prevent events on menu in modern browsers
  });

  // prevent events on menu in legacy browsers
  ['mousedown', 'mousemove', 'mouseup', 'contextmenu'].forEach(function (evt) {
    wrapper.addEventListener(evt, function (e) {
      e.preventDefault();

      return false;
    });
  });

  setStyles(parent, {
    display: 'none',
    width: containerSize + 'px',
    height: containerSize + 'px',
    position: 'absolute',
    zIndex: 1,
    marginLeft: -options.activePadding + 'px',
    marginTop: -options.activePadding + 'px',
    userSelect: 'none'
  });

  canvas.width = containerSize;
  canvas.height = containerSize;

  function createMenuItems() {
    removeEles('.cxtmenu-item', parent);
    var dtheta = 2 * Math.PI * (options.menuArc / 360) / commands.length;
    var theta1 = Math.PI / 2 + Math.PI * 2 * (options.menuRotation / 360);
    var theta2 = theta1 + dtheta;

    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];

      var midtheta = (theta1 + theta2) / 2;
      var rx1 = 0.66 * r * Math.cos(midtheta);
      var ry1 = 0.66 * r * Math.sin(midtheta);

      var item = createElement({ class: 'cxtmenu-item' });
      setStyles(item, {
        color: options.itemColor,
        cursor: 'default',
        display: 'table',
        'text-align': 'center',
        //background: 'red',
        position: 'absolute',
        'text-shadow': '-1px -1px 2px ' + options.itemTextShadowColor + ', 1px -1px 2px ' + options.itemTextShadowColor + ', -1px 1px 2px ' + options.itemTextShadowColor + ', 1px 1px 1px ' + options.itemTextShadowColor,
        left: '50%',
        top: '50%',
        'min-height': r * 0.66 + 'px',
        width: r * 0.66 + 'px',
        height: r * 0.66 + 'px',
        marginLeft: rx1 - r * 0.33 + 'px',
        marginTop: -ry1 - r * 0.33 + 'px'
      });

      var content = createElement({ class: 'cxtmenu-content' });

      if (command.content instanceof HTMLElement) {
        content.appendChild(command.content);
      } else {
        content.innerHTML = command.content;
      }

      setStyles(content, {
        'width': r * 0.66 + 'px',
        'height': r * 0.66 + 'px',
        'vertical-align': 'middle',
        'display': 'table-cell'
      });

      setStyles(content, command.contentStyle || {});

      if (command.disabled === true || command.enabled === false) {
        content.setAttribute('class', 'cxtmenu-content cxtmenu-disabled');
      }

      parent.appendChild(item);
      item.appendChild(content);

      theta1 += dtheta;
      theta2 += dtheta;
    }
  }

  function queueDrawBg(rspotlight) {
    redrawQueue.drawBg = [rspotlight];
  }

  function drawBg(rspotlight) {
    rspotlight = rspotlight !== undefined ? rspotlight : rs;

    c2d.globalCompositeOperation = 'source-over';

    c2d.clearRect(0, 0, containerSize, containerSize);

    // draw background items
    c2d.fillStyle = options.fillColor;
    var dtheta = 2 * Math.PI * (options.menuArc / 360) / commands.length;
    var theta1 = Math.PI / 2 + Math.PI * 2 * (options.menuRotation / 360);
    var theta2 = theta1 + dtheta;

    for (var index = 0; index < commands.length; index++) {
      var command = commands[index];

      if (command.fillColor) {
        c2d.fillStyle = command.fillColor;
      }
      c2d.beginPath();
      c2d.moveTo(r + options.activePadding, r + options.activePadding);
      c2d.arc(r + options.activePadding, r + options.activePadding, r, 2 * Math.PI - theta1, 2 * Math.PI - theta2, true);
      c2d.closePath();
      c2d.fill();

      theta1 += dtheta;
      theta2 += dtheta;

      c2d.fillStyle = options.fillColor;
    }

    // draw separators between items
    c2d.globalCompositeOperation = 'destination-out';
    c2d.strokeStyle = 'white';
    c2d.lineWidth = options.separatorWidth;
    theta1 = Math.PI / 2;
    theta2 = theta1 + dtheta;

    for (var i = 0; i < commands.length; i++) {
      var rx1 = r * Math.cos(theta1);
      var ry1 = r * Math.sin(theta1);
      c2d.beginPath();
      c2d.moveTo(r + options.activePadding, r + options.activePadding);
      c2d.lineTo(r + options.activePadding + rx1, r + options.activePadding - ry1);
      c2d.closePath();
      c2d.stroke();

      theta1 += dtheta;
      theta2 += dtheta;
    }

    c2d.fillStyle = 'white';
    c2d.globalCompositeOperation = 'destination-out';
    c2d.beginPath();
    c2d.arc(r + options.activePadding, r + options.activePadding, rspotlight + options.spotlightPadding, 0, Math.PI * 2, true);
    c2d.closePath();
    c2d.fill();

    c2d.globalCompositeOperation = 'source-over';
  }

  function queueDrawCommands(rx, ry, theta) {
    redrawQueue.drawCommands = [rx, ry, theta];
  }

  function drawCommands(rx, ry, theta) {
    var dtheta = 2 * Math.PI * (options.menuArc / 360) / commands.length;
    var theta1 = Math.PI / 2 + Math.PI * 2 * (options.menuRotation / 360);
    var theta2 = theta1 + dtheta;

    theta1 += dtheta * activeCommandI;
    theta2 += dtheta * activeCommandI;

    c2d.fillStyle = options.activeFillColor;
    c2d.strokeStyle = 'black';
    c2d.lineWidth = 1;
    c2d.beginPath();
    c2d.moveTo(r + options.activePadding, r + options.activePadding);
    c2d.arc(r + options.activePadding, r + options.activePadding, r + options.activePadding, 2 * Math.PI - theta1, 2 * Math.PI - theta2, true);
    c2d.closePath();
    c2d.fill();

    c2d.fillStyle = 'white';
    c2d.globalCompositeOperation = 'destination-out';

    var tx = r + options.activePadding + rx / r * (rs + options.spotlightPadding - options.indicatorSize / 4);
    var ty = r + options.activePadding + ry / r * (rs + options.spotlightPadding - options.indicatorSize / 4);
    var rot = Math.PI / 4 - theta;

    c2d.translate(tx, ty);
    c2d.rotate(rot);

    // clear the indicator
    c2d.beginPath();
    c2d.fillRect(-options.indicatorSize / 2, -options.indicatorSize / 2, options.indicatorSize, options.indicatorSize);
    c2d.closePath();
    c2d.fill();

    c2d.rotate(-rot);
    c2d.translate(-tx, -ty);

    // c2d.setTransform( 1, 0, 0, 1, 0, 0 );

    // clear the spotlight
    c2d.beginPath();
    c2d.arc(r + options.activePadding, r + options.activePadding, rs + options.spotlightPadding, 0, Math.PI * 2, true);
    c2d.closePath();
    c2d.fill();

    c2d.globalCompositeOperation = 'source-over';
  }

  function updatePixelRatio() {
    var pxr = getPixelRatio();
    var w = containerSize;
    var h = containerSize;

    canvas.width = w * pxr;
    canvas.height = h * pxr;

    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    c2d.setTransform(1, 0, 0, 1, 0, 0);
    c2d.scale(pxr, pxr);
  }

  var redrawing = true;
  var redrawQueue = {};

  var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
    return setTimeout(fn, 16);
  };

  var redraw = function redraw() {
    if (redrawQueue.drawBg) {
      drawBg.apply(null, redrawQueue.drawBg);
    }

    if (redrawQueue.drawCommands) {
      drawCommands.apply(null, redrawQueue.drawCommands);
    }

    redrawQueue = {};

    if (redrawing) {
      raf(redraw);
    }
  };

  // kick off
  updatePixelRatio();
  redraw();

  var ctrx = void 0,
      ctry = void 0,
      rs = void 0;

  var bindings = {
    on: function on(events, selector, fn) {

      var _fn = fn;
      if (selector === 'core') {
        _fn = function _fn(e) {
          if (e.cyTarget === cy || e.target === cy) {
            // only if event target is directly core
            return fn.apply(this, [e]);
          }
        };
      }

      data.handlers.push({
        events: events,
        selector: selector,
        fn: _fn
      });

      if (selector === 'core') {
        cy.on(events, _fn);
      } else {
        cy.on(events, selector, _fn);
      }

      return this;
    }
  };

  function addEventListeners() {
    var grabbable = void 0;
    var inGesture = false;
    var dragHandler = void 0;
    var zoomEnabled = void 0;
    var panEnabled = void 0;
    var boxEnabled = void 0;
    var gestureStartEvent = void 0;

    var restoreZoom = function restoreZoom() {
      if (zoomEnabled) {
        cy.userZoomingEnabled(true);
      }
    };

    var restoreGrab = function restoreGrab() {
      if (grabbable) {
        target.grabify();
      }
    };

    var restorePan = function restorePan() {
      if (panEnabled) {
        cy.userPanningEnabled(true);
      }
    };

    var restoreBoxSeln = function restoreBoxSeln() {
      if (boxEnabled) {
        cy.boxSelectionEnabled(true);
      }
    };

    var restoreGestures = function restoreGestures() {
      restoreGrab();
      restoreZoom();
      restorePan();
      restoreBoxSeln();
    };

    window.addEventListener('resize', updatePixelRatio);

    bindings.on('resize', function () {
      updatePixelRatio();
    }).on(options.openMenuEvents, options.selector, function (e) {
      target = this; // Remember which node the context menu is for
      var ele = this;
      var isCy = this === cy;

      if (inGesture) {
        parent.style.display = 'none';

        inGesture = false;

        restoreGestures();
      }

      if (typeof options.commands === 'function') {
        var res = options.commands(target);
        if (res.then) {
          res.then(function (_commands) {
            commands = _commands;
            openMenu();
          });
        } else {
          commands = res;
          openMenu();
        }
      } else {
        commands = options.commands;
        openMenu();
      }

      function openMenu() {
        if (!commands || commands.length === 0) {
          return;
        }

        zoomEnabled = cy.userZoomingEnabled();
        cy.userZoomingEnabled(false);

        panEnabled = cy.userPanningEnabled();
        cy.userPanningEnabled(false);

        boxEnabled = cy.boxSelectionEnabled();
        cy.boxSelectionEnabled(false);

        grabbable = target.grabbable && target.grabbable();
        if (grabbable) {
          target.ungrabify();
        }

        var rp = void 0,
            rw = void 0,
            rh = void 0;
        if (!isCy && ele.isNode() && !ele.isParent() && !options.atMouse) {
          rp = ele.renderedPosition();
          rw = ele.renderedWidth();
          rh = ele.renderedHeight();
        } else {
          rp = e.renderedPosition || e.cyRenderedPosition;
          rw = 1;
          rh = 1;
        }

        offset = getOffset(container);

        ctrx = rp.x;
        ctry = rp.y;

        createMenuItems();

        setStyles(parent, {
          display: 'block',
          left: rp.x - r + 'px',
          top: rp.y - r + 'px'
        });

        rs = Math.max(rw, rh) / 2;
        rs = Math.max(rs, options.minSpotlightRadius);
        rs = Math.min(rs, options.maxSpotlightRadius);

        queueDrawBg();

        activeCommandI = undefined;

        inGesture = true;
        gestureStartEvent = e;
      }
    }).on('cxtdrag tapdrag', options.selector, dragHandler = function dragHandler(e) {

      if (!inGesture) {
        return;
      }

      var origE = e.originalEvent;
      var isTouch = origE.touches && origE.touches.length > 0;

      var pageX = isTouch ? origE.touches[0].pageX : origE.pageX;
      var pageY = isTouch ? origE.touches[0].pageY : origE.pageY;

      activeCommandI = undefined;

      var dx = pageX - offset.left - ctrx;
      var dy = pageY - offset.top - ctry;

      if (dx === 0) {
        dx = 0.01;
      }

      var d = Math.sqrt(dx * dx + dy * dy);
      var cosTheta = (dy * dy - d * d - dx * dx) / (-2 * d * dx);
      var theta = Math.acos(cosTheta);

      if (d < rs + options.spotlightPadding) {
        queueDrawBg();
        return;
      }

      queueDrawBg();

      var rx = dx * r / d;
      var ry = dy * r / d;

      if (dy > 0) {
        theta = Math.PI + Math.abs(theta - Math.PI);
      }

      var dtheta = 2 * Math.PI * (options.menuArc / 360) / commands.length;
      var theta1 = Math.PI / 2 + Math.PI * 2 * (options.menuRotation / 360);
      var theta2 = theta1 + dtheta;

      for (var i = 0; i < commands.length; i++) {
        var command = commands[i];

        var inThisCommand = theta1 <= theta && theta <= theta2 || theta1 <= theta + 2 * Math.PI && theta + 2 * Math.PI <= theta2;

        if (command.disabled === true || command.enabled === false) {
          inThisCommand = false;
        }

        if (inThisCommand) {
          activeCommandI = i;
          break;
        }

        theta1 += dtheta;
        theta2 += dtheta;
      }

      queueDrawCommands(rx, ry, theta);
    }).on('tapdrag', dragHandler).on('cxttapend tapend', function () {
      parent.style.display = 'none';

      if (activeCommandI !== undefined) {
        var select = commands[activeCommandI].select;

        if (select) {
          select.apply(target, [target, gestureStartEvent]);
          activeCommandI = undefined;
        }
      }

      inGesture = false;

      restoreGestures();
    });
  }

  function removeEventListeners() {
    var handlers = data.handlers;

    for (var i = 0; i < handlers.length; i++) {
      var h = handlers[i];

      if (h.selector === 'core') {
        cy.off(h.events, h.fn);
      } else {
        cy.off(h.events, h.selector, h.fn);
      }
    }

    window.removeEventListener('resize', updatePixelRatio);
  }

  function destroyInstance() {
    redrawing = false;

    removeEventListeners();

    wrapper.remove();
  }

  addEventListeners();

  return {
    destroy: function destroy() {
      destroyInstance();
    }
  };
};

module.exports = cxtmenu;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.filter(function (src) {
    return src != null;
  }).forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return tgt[k] = src[k];
    });
  });

  return tgt;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = {
  menuRadius: 100, // the radius of the circular menu in pixels
  selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
  commands: [// an array of commands to list in the menu or a function that returns the array
    /*
    { // example command
      fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
      content: 'a command name' // html/text content to be displayed in the menu
      contentStyle: {}, // css key:value pairs to set the command's css in js if you want
      select: function(ele){ // a function to execute when the command is selected
        console.log( ele.id() ) // `ele` holds the reference to the active element
      },
      enabled: true // whether the command is selectable
    }
    */
  ], // function( ele ){ return [ /*...*/ ] }, // example function for commands
  fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
  activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
  activePadding: 20, // additional size in pixels for the active command
  indicatorSize: 24, // the size in pixels of the pointer to the active command
  separatorWidth: 3, // the empty spacing in pixels between successive commands
  spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
  minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
  maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
  openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
  itemColor: 'white', // the colour of text in the command's content
  itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
  zIndex: 9999, // the z-index of the ui div
  atMouse: false, // draw menu at mouse position
  menuArc: 360, // the arc length of the menu in degrees
  menuRotation: 0 // the rotation of the menu in degrees
};

module.exports = defaults;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var removeEles = function removeEles(query) {
  var ancestor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  var els = ancestor.querySelectorAll(query);

  for (var i = 0; i < els.length; i++) {
    var el = els[i];

    el.parentNode.removeChild(el);
  }
};

var setStyles = function setStyles(el, style) {
  var props = Object.keys(style);

  for (var i = 0, l = props.length; i < l; i++) {
    el.style[props[i]] = style[props[i]];
  }
};

var createElement = function createElement(options) {
  options = options || {};

  var el = document.createElement(options.tag || 'div');

  el.className = options.class || '';

  if (options.style) {
    setStyles(el, options.style);
  }

  return el;
};

var getPixelRatio = function getPixelRatio() {
  return window.devicePixelRatio || 1;
};

var getOffset = function getOffset(el) {
  var offset = el.getBoundingClientRect();

  return {
    left: offset.left + document.body.scrollLeft + parseFloat(getComputedStyle(document.body)['padding-left']) + parseFloat(getComputedStyle(document.body)['border-left-width']),
    top: offset.top + document.body.scrollTop + parseFloat(getComputedStyle(document.body)['padding-top']) + parseFloat(getComputedStyle(document.body)['border-top-width'])
  };
};

module.exports = { removeEles: removeEles, setStyles: setStyles, createElement: createElement, getPixelRatio: getPixelRatio, getOffset: getOffset };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cxtmenu = __webpack_require__(0);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('core', 'cxtmenu', cxtmenu); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzNjFlZjRmMTIwNGMxNzg4ZmIxZCIsIndlYnBhY2s6Ly8vLi9zcmMvY3h0bWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZG9tLXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHRzIiwicmVxdWlyZSIsImFzc2lnbiIsInJlbW92ZUVsZXMiLCJzZXRTdHlsZXMiLCJjcmVhdGVFbGVtZW50IiwiZ2V0UGl4ZWxSYXRpbyIsImdldE9mZnNldCIsImN4dG1lbnUiLCJwYXJhbXMiLCJvcHRpb25zIiwiY3kiLCJjb250YWluZXIiLCJ0YXJnZXQiLCJkYXRhIiwiaGFuZGxlcnMiLCJjbGFzcyIsIndyYXBwZXIiLCJwYXJlbnQiLCJjYW52YXMiLCJ0YWciLCJjb21tYW5kcyIsImMyZCIsImdldENvbnRleHQiLCJyIiwibWVudVJhZGl1cyIsImNvbnRhaW5lclNpemUiLCJhY3RpdmVQYWRkaW5nIiwiYWN0aXZlQ29tbWFuZEkiLCJvZmZzZXQiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJwb3NpdGlvbiIsInpJbmRleCIsInVzZXJTZWxlY3QiLCJwb2ludGVyRXZlbnRzIiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJlIiwicHJldmVudERlZmF1bHQiLCJkaXNwbGF5Iiwid2lkdGgiLCJoZWlnaHQiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwiY3JlYXRlTWVudUl0ZW1zIiwiZHRoZXRhIiwiTWF0aCIsIlBJIiwibWVudUFyYyIsImxlbmd0aCIsInRoZXRhMSIsIm1lbnVSb3RhdGlvbiIsInRoZXRhMiIsImkiLCJjb21tYW5kIiwibWlkdGhldGEiLCJyeDEiLCJjb3MiLCJyeTEiLCJzaW4iLCJpdGVtIiwiY29sb3IiLCJpdGVtQ29sb3IiLCJjdXJzb3IiLCJpdGVtVGV4dFNoYWRvd0NvbG9yIiwibGVmdCIsInRvcCIsImNvbnRlbnQiLCJIVE1MRWxlbWVudCIsImlubmVySFRNTCIsImNvbnRlbnRTdHlsZSIsImRpc2FibGVkIiwiZW5hYmxlZCIsInNldEF0dHJpYnV0ZSIsInF1ZXVlRHJhd0JnIiwicnNwb3RsaWdodCIsInJlZHJhd1F1ZXVlIiwiZHJhd0JnIiwidW5kZWZpbmVkIiwicnMiLCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24iLCJjbGVhclJlY3QiLCJmaWxsU3R5bGUiLCJmaWxsQ29sb3IiLCJpbmRleCIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImFyYyIsImNsb3NlUGF0aCIsImZpbGwiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsInNlcGFyYXRvcldpZHRoIiwibGluZVRvIiwic3Ryb2tlIiwic3BvdGxpZ2h0UGFkZGluZyIsInF1ZXVlRHJhd0NvbW1hbmRzIiwicngiLCJyeSIsInRoZXRhIiwiZHJhd0NvbW1hbmRzIiwiYWN0aXZlRmlsbENvbG9yIiwidHgiLCJpbmRpY2F0b3JTaXplIiwidHkiLCJyb3QiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJmaWxsUmVjdCIsInVwZGF0ZVBpeGVsUmF0aW8iLCJweHIiLCJ3IiwiaCIsInN0eWxlIiwic2V0VHJhbnNmb3JtIiwic2NhbGUiLCJyZWRyYXdpbmciLCJyYWYiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtc1JlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldFRpbWVvdXQiLCJmbiIsInJlZHJhdyIsImFwcGx5IiwiY3RyeCIsImN0cnkiLCJiaW5kaW5ncyIsIm9uIiwiZXZlbnRzIiwic2VsZWN0b3IiLCJfZm4iLCJjeVRhcmdldCIsInB1c2giLCJhZGRFdmVudExpc3RlbmVycyIsImdyYWJiYWJsZSIsImluR2VzdHVyZSIsImRyYWdIYW5kbGVyIiwiem9vbUVuYWJsZWQiLCJwYW5FbmFibGVkIiwiYm94RW5hYmxlZCIsImdlc3R1cmVTdGFydEV2ZW50IiwicmVzdG9yZVpvb20iLCJ1c2VyWm9vbWluZ0VuYWJsZWQiLCJyZXN0b3JlR3JhYiIsImdyYWJpZnkiLCJyZXN0b3JlUGFuIiwidXNlclBhbm5pbmdFbmFibGVkIiwicmVzdG9yZUJveFNlbG4iLCJib3hTZWxlY3Rpb25FbmFibGVkIiwicmVzdG9yZUdlc3R1cmVzIiwib3Blbk1lbnVFdmVudHMiLCJlbGUiLCJpc0N5IiwicmVzIiwidGhlbiIsIl9jb21tYW5kcyIsIm9wZW5NZW51IiwidW5ncmFiaWZ5IiwicnAiLCJydyIsInJoIiwiaXNOb2RlIiwiaXNQYXJlbnQiLCJhdE1vdXNlIiwicmVuZGVyZWRQb3NpdGlvbiIsInJlbmRlcmVkV2lkdGgiLCJyZW5kZXJlZEhlaWdodCIsImN5UmVuZGVyZWRQb3NpdGlvbiIsIngiLCJ5IiwibWF4IiwibWluU3BvdGxpZ2h0UmFkaXVzIiwibWluIiwibWF4U3BvdGxpZ2h0UmFkaXVzIiwib3JpZ0UiLCJvcmlnaW5hbEV2ZW50IiwiaXNUb3VjaCIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiZHgiLCJkeSIsImQiLCJzcXJ0IiwiY29zVGhldGEiLCJhY29zIiwiYWJzIiwiaW5UaGlzQ29tbWFuZCIsInNlbGVjdCIsInJlbW92ZUV2ZW50TGlzdGVuZXJzIiwib2ZmIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlc3Ryb3lJbnN0YW5jZSIsInJlbW92ZSIsImRlc3Ryb3kiLCJtb2R1bGUiLCJleHBvcnRzIiwiT2JqZWN0IiwiYmluZCIsInRndCIsInNyY3MiLCJmaWx0ZXIiLCJzcmMiLCJrZXlzIiwiayIsInF1ZXJ5IiwiYW5jZXN0b3IiLCJkb2N1bWVudCIsImVscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInByb3BzIiwibCIsImNsYXNzTmFtZSIsImRldmljZVBpeGVsUmF0aW8iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib2R5Iiwic2Nyb2xsTGVmdCIsInBhcnNlRmxvYXQiLCJnZXRDb21wdXRlZFN0eWxlIiwic2Nyb2xsVG9wIiwicmVnaXN0ZXIiLCJjeXRvc2NhcGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUEsSUFBTUEsV0FBV0MsbUJBQU9BLENBQUMsQ0FBUixDQUFqQjtBQUNBLElBQU1DLFNBQVNELG1CQUFPQSxDQUFDLENBQVIsQ0FBZjs7ZUFDMkVBLG1CQUFPQSxDQUFDLENBQVIsQztJQUFuRUUsVSxZQUFBQSxVO0lBQVlDLFMsWUFBQUEsUztJQUFXQyxhLFlBQUFBLGE7SUFBZUMsYSxZQUFBQSxhO0lBQWVDLFMsWUFBQUEsUzs7QUFFN0QsSUFBSUMsVUFBVSxTQUFWQSxPQUFVLENBQVNDLE1BQVQsRUFBZ0I7QUFDNUIsTUFBSUMsVUFBVVIsT0FBTyxFQUFQLEVBQVdGLFFBQVgsRUFBcUJTLE1BQXJCLENBQWQ7QUFDQSxNQUFJRSxLQUFLLElBQVQ7QUFDQSxN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QUFYLEVBQW1CLFNBQW5CLEVBQThCOU4sT0FBOUIsRUFIa0MsQ0FHTztBQUMxQyxDQUpEOztBQU1BLElBQUksT0FBTzhOLFNBQVAsS0FBcUIsV0FBekIsRUFBc0M7QUFBRTtBQUN0Q0QsV0FBVUMsU0FBVjtBQUNEOztBQUVEN0IsT0FBT0MsT0FBUCxHQUFpQjJCLFFBQWpCLEMiLCJmaWxlIjoiY3l0b3NjYXBlLWN4dG1lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjeXRvc2NhcGVDeHRtZW51XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN5dG9zY2FwZUN4dG1lbnVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNjFlZjRmMTIwNGMxNzg4ZmIxZCIsImNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKTtcbmNvbnN0IHsgcmVtb3ZlRWxlcywgc2V0U3R5bGVzLCBjcmVhdGVFbGVtZW50LCBnZXRQaXhlbFJhdGlvLCBnZXRPZmZzZXQgfSA9IHJlcXVpcmUoJy4vZG9tLXV0aWwnKTtcblxubGV0IGN4dG1lbnUgPSBmdW5jdGlvbihwYXJhbXMpe1xuICBsZXQgb3B0aW9ucyA9IGFzc2lnbih7fSwgZGVmYXVsdHMsIHBhcmFtcyk7XG4gIGxldCBjeSA9IHRoaXM7XG4gIGxldCBjb250YWluZXIgPSBjeS5jb250YWluZXIoKTtcbiAgbGV0IHRhcmdldDtcblxuICBsZXQgZGF0YSA9IHtcbiAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgIGhhbmRsZXJzOiBbXSxcbiAgICBjb250YWluZXI6IGNyZWF0ZUVsZW1lbnQoe2NsYXNzOiAnY3h0bWVudSd9KVxuICB9O1xuXG4gIGxldCB3cmFwcGVyID0gZGF0YS5jb250YWluZXI7XG4gIGxldCBwYXJlbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gIGxldCBjYW52YXMgPSBjcmVhdGVFbGVtZW50KHt0YWc6ICdjYW52YXMnfSk7XG4gIGxldCBjb21tYW5kcyA9IFtdO1xuICBsZXQgYzJkID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGxldCByID0gb3B0aW9ucy5tZW51UmFkaXVzO1xuICBsZXQgY29udGFpbmVyU2l6ZSA9IChyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nKSoyO1xuICBsZXQgYWN0aXZlQ29tbWFuZEk7XG4gIGxldCBvZmZzZXQ7XG5cbiAgY29udGFpbmVyLmluc2VydEJlZm9yZSh3cmFwcGVyLCBjb250YWluZXIuZmlyc3RDaGlsZCk7XG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQocGFyZW50KTtcbiAgcGFyZW50LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbiAgc2V0U3R5bGVzKHdyYXBwZXIsIHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB6SW5kZXg6IG9wdGlvbnMuekluZGV4LFxuICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScgLy8gcHJldmVudCBldmVudHMgb24gbWVudSBpbiBtb2Rlcm4gYnJvd3NlcnNcbiAgfSk7XG5cbiAgLy8gcHJldmVudCBldmVudHMgb24gbWVudSBpbiBsZWdhY3kgYnJvd3NlcnNcbiAgWydtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNldXAnLCAnY29udGV4dG1lbnUnXS5mb3JFYWNoKGV2dCA9PiB7XG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKGV2dCwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgc2V0U3R5bGVzKHBhcmVudCwge1xuICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICB3aWR0aDogY29udGFpbmVyU2l6ZSArICdweCcsXG4gICAgaGVpZ2h0OiBjb250YWluZXJTaXplICsgJ3B4JyxcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB6SW5kZXg6IDEsXG4gICAgbWFyZ2luTGVmdDogLSBvcHRpb25zLmFjdGl2ZVBhZGRpbmcgKyAncHgnLFxuICAgIG1hcmdpblRvcDogLSBvcHRpb25zLmFjdGl2ZVBhZGRpbmcgKyAncHgnLFxuICAgIHVzZXJTZWxlY3Q6ICdub25lJ1xuICB9KTtcblxuICBjYW52YXMud2lkdGggPSBjb250YWluZXJTaXplO1xuICBjYW52YXMuaGVpZ2h0ID0gY29udGFpbmVyU2l6ZTtcblxuICBmdW5jdGlvbiBjcmVhdGVNZW51SXRlbXMoKSB7XG4gICAgcmVtb3ZlRWxlcygnLmN4dG1lbnUtaXRlbScsIHBhcmVudCk7XG4gICAgbGV0IGR0aGV0YSA9ICgyICogTWF0aC5QSSAqIChvcHRpb25zLm1lbnVBcmMgLyAzNjApKSAvIChjb21tYW5kcy5sZW5ndGgpO1xuICAgIGxldCB0aGV0YTEgPSAoTWF0aC5QSSAvIDIpICsgKE1hdGguUEkqMioob3B0aW9ucy5tZW51Um90YXRpb24gLyAzNjApKTtcbiAgICBsZXQgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNvbW1hbmQgPSBjb21tYW5kc1tpXTtcblxuICAgICAgbGV0IG1pZHRoZXRhID0gKHRoZXRhMSArIHRoZXRhMikgLyAyO1xuICAgICAgbGV0IHJ4MSA9IDAuNjYgKiByICogTWF0aC5jb3MobWlkdGhldGEpO1xuICAgICAgbGV0IHJ5MSA9IDAuNjYgKiByICogTWF0aC5zaW4obWlkdGhldGEpO1xuXG4gICAgICBsZXQgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoe2NsYXNzOiAnY3h0bWVudS1pdGVtJ30pO1xuICAgICAgc2V0U3R5bGVzKGl0ZW0sIHtcbiAgICAgICAgY29sb3I6IG9wdGlvbnMuaXRlbUNvbG9yLFxuICAgICAgICBjdXJzb3I6ICdkZWZhdWx0JyxcbiAgICAgICAgZGlzcGxheTogJ3RhYmxlJyxcbiAgICAgICAgJ3RleHQtYWxpZ24nOiAnY2VudGVyJyxcbiAgICAgICAgLy9iYWNrZ3JvdW5kOiAncmVkJyxcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICd0ZXh0LXNoYWRvdyc6ICctMXB4IC0xcHggMnB4ICcgKyBvcHRpb25zLml0ZW1UZXh0U2hhZG93Q29sb3IgKyAnLCAxcHggLTFweCAycHggJyArIG9wdGlvbnMuaXRlbVRleHRTaGFkb3dDb2xvciArICcsIC0xcHggMXB4IDJweCAnICsgb3B0aW9ucy5pdGVtVGV4dFNoYWRvd0NvbG9yICsgJywgMXB4IDFweCAxcHggJyArIG9wdGlvbnMuaXRlbVRleHRTaGFkb3dDb2xvcixcbiAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgICdtaW4taGVpZ2h0JzogKHIgKiAwLjY2KSArICdweCcsXG4gICAgICAgIHdpZHRoOiAociAqIDAuNjYpICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiAociAqIDAuNjYpICsgJ3B4JyxcbiAgICAgICAgbWFyZ2luTGVmdDogKHJ4MSAtIHIgKiAwLjMzKSArICdweCcsXG4gICAgICAgIG1hcmdpblRvcDogKC1yeTEgLSByICogMC4zMykgKyAncHgnXG4gICAgICB9KTtcblxuICAgICAgbGV0IGNvbnRlbnQgPSBjcmVhdGVFbGVtZW50KHtjbGFzczogJ2N4dG1lbnUtY29udGVudCd9KTtcblxuICAgICAgaWYoIGNvbW1hbmQuY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICl7XG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoIGNvbW1hbmQuY29udGVudCApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBjb21tYW5kLmNvbnRlbnQ7XG4gICAgICB9XG5cbiAgICAgIHNldFN0eWxlcyhjb250ZW50LCB7XG4gICAgICAgICd3aWR0aCc6IChyICogMC42NikgKyAncHgnLFxuICAgICAgICAnaGVpZ2h0JzogKHIgKiAwLjY2KSArICdweCcsXG4gICAgICAgICd2ZXJ0aWNhbC1hbGlnbic6ICdtaWRkbGUnLFxuICAgICAgICAnZGlzcGxheSc6ICd0YWJsZS1jZWxsJ1xuICAgICAgfSk7XG5cbiAgICAgIHNldFN0eWxlcyhjb250ZW50LCBjb21tYW5kLmNvbnRlbnRTdHlsZSB8fCB7fSk7XG5cbiAgICAgIGlmIChjb21tYW5kLmRpc2FibGVkID09PSB0cnVlIHx8IGNvbW1hbmQuZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29udGVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2N4dG1lbnUtY29udGVudCBjeHRtZW51LWRpc2FibGVkJyk7XG4gICAgICB9XG5cbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cbiAgICAgIHRoZXRhMSArPSBkdGhldGE7XG4gICAgICB0aGV0YTIgKz0gZHRoZXRhO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHF1ZXVlRHJhd0JnKCByc3BvdGxpZ2h0ICl7XG4gICAgcmVkcmF3UXVldWUuZHJhd0JnID0gWyByc3BvdGxpZ2h0IF07XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3QmcoIHJzcG90bGlnaHQgKXtcbiAgICByc3BvdGxpZ2h0ID0gcnNwb3RsaWdodCAhPT0gdW5kZWZpbmVkID8gcnNwb3RsaWdodCA6IHJzO1xuXG4gICAgYzJkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG5cbiAgICBjMmQuY2xlYXJSZWN0KDAsIDAsIGNvbnRhaW5lclNpemUsIGNvbnRhaW5lclNpemUpO1xuXG4gICAgLy8gZHJhdyBiYWNrZ3JvdW5kIGl0ZW1zXG4gICAgYzJkLmZpbGxTdHlsZSA9IG9wdGlvbnMuZmlsbENvbG9yO1xuICAgIGxldCBkdGhldGEgPSAoMipNYXRoLlBJKihvcHRpb25zLm1lbnVBcmMvMzYwKSkvKGNvbW1hbmRzLmxlbmd0aCk7XG4gICAgbGV0IHRoZXRhMSA9IE1hdGguUEkgLyAyICsgTWF0aC5QSSAqIDIgKiAob3B0aW9ucy5tZW51Um90YXRpb24gLyAzNjApO1xuICAgIGxldCB0aGV0YTIgPSB0aGV0YTEgKyBkdGhldGE7XG5cbiAgICBmb3IoIGxldCBpbmRleCA9IDA7IGluZGV4IDwgY29tbWFuZHMubGVuZ3RoOyBpbmRleCsrICl7XG4gICAgICBsZXQgY29tbWFuZCA9IGNvbW1hbmRzW2luZGV4XTtcblxuICAgICAgaWYoIGNvbW1hbmQuZmlsbENvbG9yICl7XG4gICAgICAgIGMyZC5maWxsU3R5bGUgPSBjb21tYW5kLmZpbGxDb2xvcjtcbiAgICAgIH1cbiAgICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICAgIGMyZC5tb3ZlVG8ociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyk7XG4gICAgICBjMmQuYXJjKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIsIDIqTWF0aC5QSSAtIHRoZXRhMSwgMipNYXRoLlBJIC0gdGhldGEyLCB0cnVlKTtcbiAgICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICAgIGMyZC5maWxsKCk7XG5cbiAgICAgIHRoZXRhMSArPSBkdGhldGE7XG4gICAgICB0aGV0YTIgKz0gZHRoZXRhO1xuXG4gICAgICBjMmQuZmlsbFN0eWxlID0gb3B0aW9ucy5maWxsQ29sb3I7XG4gICAgfVxuXG4gICAgLy8gZHJhdyBzZXBhcmF0b3JzIGJldHdlZW4gaXRlbXNcbiAgICBjMmQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG4gICAgYzJkLnN0cm9rZVN0eWxlID0gJ3doaXRlJztcbiAgICBjMmQubGluZVdpZHRoID0gb3B0aW9ucy5zZXBhcmF0b3JXaWR0aDtcbiAgICB0aGV0YTEgPSBNYXRoLlBJLzI7XG4gICAgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7IGkrKyApe1xuICAgICAgbGV0IHJ4MSA9IHIgKiBNYXRoLmNvcyh0aGV0YTEpO1xuICAgICAgbGV0IHJ5MSA9IHIgKiBNYXRoLnNpbih0aGV0YTEpO1xuICAgICAgYzJkLmJlZ2luUGF0aCgpO1xuICAgICAgYzJkLm1vdmVUbyhyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nKTtcbiAgICAgIGMyZC5saW5lVG8ociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyArIHJ4MSwgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyAtIHJ5MSk7XG4gICAgICBjMmQuY2xvc2VQYXRoKCk7XG4gICAgICBjMmQuc3Ryb2tlKCk7XG5cbiAgICAgIHRoZXRhMSArPSBkdGhldGE7XG4gICAgICB0aGV0YTIgKz0gZHRoZXRhO1xuICAgIH1cblxuXG4gICAgYzJkLmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgYzJkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xuICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICBjMmQuYXJjKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHJzcG90bGlnaHQgKyBvcHRpb25zLnNwb3RsaWdodFBhZGRpbmcsIDAsIE1hdGguUEkqMiwgdHJ1ZSk7XG4gICAgYzJkLmNsb3NlUGF0aCgpO1xuICAgIGMyZC5maWxsKCk7XG5cbiAgICBjMmQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1ZXVlRHJhd0NvbW1hbmRzKCByeCwgcnksIHRoZXRhICl7XG4gICAgcmVkcmF3UXVldWUuZHJhd0NvbW1hbmRzID0gWyByeCwgcnksIHRoZXRhIF07XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3Q29tbWFuZHMoIHJ4LCByeSwgdGhldGEgKXtcbiAgICBsZXQgZHRoZXRhID0gKDIgKiBNYXRoLlBJICogKG9wdGlvbnMubWVudUFyYyAvIDM2MCkpIC8gY29tbWFuZHMubGVuZ3RoO1xuICAgIGxldCB0aGV0YTEgPSBNYXRoLlBJIC8gMiArIE1hdGguUEkgKiAyICogKG9wdGlvbnMubWVudVJvdGF0aW9uIC8gMzYwKTtcbiAgICBsZXQgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgdGhldGExICs9IGR0aGV0YSAqIGFjdGl2ZUNvbW1hbmRJO1xuICAgIHRoZXRhMiArPSBkdGhldGEgKiBhY3RpdmVDb21tYW5kSTtcblxuICAgIGMyZC5maWxsU3R5bGUgPSBvcHRpb25zLmFjdGl2ZUZpbGxDb2xvcjtcbiAgICBjMmQuc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xuICAgIGMyZC5saW5lV2lkdGggPSAxO1xuICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICBjMmQubW92ZVRvKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcpO1xuICAgIGMyZC5hcmMociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgMipNYXRoLlBJIC0gdGhldGExLCAyKk1hdGguUEkgLSB0aGV0YTIsIHRydWUpO1xuICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICBjMmQuZmlsbCgpO1xuXG4gICAgYzJkLmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgYzJkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xuXG4gICAgbGV0IHR4ID0gciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyArIHJ4L3IqKHJzICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nIC0gb3B0aW9ucy5pbmRpY2F0b3JTaXplLzQpO1xuICAgIGxldCB0eSA9IHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcgKyByeS9yKihycyArIG9wdGlvbnMuc3BvdGxpZ2h0UGFkZGluZyAtIG9wdGlvbnMuaW5kaWNhdG9yU2l6ZS80KTtcbiAgICBsZXQgcm90ID0gTWF0aC5QSS80IC0gdGhldGE7XG5cbiAgICBjMmQudHJhbnNsYXRlKCB0eCwgdHkgKTtcbiAgICBjMmQucm90YXRlKCByb3QgKTtcblxuICAgIC8vIGNsZWFyIHRoZSBpbmRpY2F0b3JcbiAgICBjMmQuYmVnaW5QYXRoKCk7XG4gICAgYzJkLmZpbGxSZWN0KC1vcHRpb25zLmluZGljYXRvclNpemUvMiwgLW9wdGlvbnMuaW5kaWNhdG9yU2l6ZS8yLCBvcHRpb25zLmluZGljYXRvclNpemUsIG9wdGlvbnMuaW5kaWNhdG9yU2l6ZSk7XG4gICAgYzJkLmNsb3NlUGF0aCgpO1xuICAgIGMyZC5maWxsKCk7XG5cbiAgICBjMmQucm90YXRlKCAtcm90ICk7XG4gICAgYzJkLnRyYW5zbGF0ZSggLXR4LCAtdHkgKTtcblxuICAgIC8vIGMyZC5zZXRUcmFuc2Zvcm0oIDEsIDAsIDAsIDEsIDAsIDAgKTtcblxuICAgIC8vIGNsZWFyIHRoZSBzcG90bGlnaHRcbiAgICBjMmQuYmVnaW5QYXRoKCk7XG4gICAgYzJkLmFyYyhyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCBycyArIG9wdGlvbnMuc3BvdGxpZ2h0UGFkZGluZywgMCwgTWF0aC5QSSoyLCB0cnVlKTtcbiAgICBjMmQuY2xvc2VQYXRoKCk7XG4gICAgYzJkLmZpbGwoKTtcblxuICAgIGMyZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGl4ZWxSYXRpbygpe1xuICAgIGxldCBweHIgPSBnZXRQaXhlbFJhdGlvKCk7XG4gICAgbGV0IHcgPSBjb250YWluZXJTaXplO1xuICAgIGxldCBoID0gY29udGFpbmVyU2l6ZTtcblxuICAgIGNhbnZhcy53aWR0aCA9IHcgKiBweHI7XG4gICAgY2FudmFzLmhlaWdodCA9IGggKiBweHI7XG5cbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG5cbiAgICBjMmQuc2V0VHJhbnNmb3JtKCAxLCAwLCAwLCAxLCAwLCAwICk7XG4gICAgYzJkLnNjYWxlKCBweHIsIHB4ciApO1xuICB9XG5cbiAgbGV0IHJlZHJhd2luZyA9IHRydWU7XG4gIGxldCByZWRyYXdRdWV1ZSA9IHt9O1xuXG4gIGxldCByYWYgPSAoXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgKGZuID0+IHNldFRpbWVvdXQoZm4sIDE2KSlcbiAgKTtcblxuICBsZXQgcmVkcmF3ID0gZnVuY3Rpb24oKXtcbiAgICBpZiggcmVkcmF3UXVldWUuZHJhd0JnICl7XG4gICAgICBkcmF3QmcuYXBwbHkoIG51bGwsIHJlZHJhd1F1ZXVlLmRyYXdCZyApO1xuICAgIH1cblxuICAgIGlmKCByZWRyYXdRdWV1ZS5kcmF3Q29tbWFuZHMgKXtcbiAgICAgIGRyYXdDb21tYW5kcy5hcHBseSggbnVsbCwgcmVkcmF3UXVldWUuZHJhd0NvbW1hbmRzICk7XG4gICAgfVxuXG4gICAgcmVkcmF3UXVldWUgPSB7fTtcblxuICAgIGlmKCByZWRyYXdpbmcgKXtcbiAgICAgIHJhZiggcmVkcmF3ICk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGtpY2sgb2ZmXG4gIHVwZGF0ZVBpeGVsUmF0aW8oKTtcbiAgcmVkcmF3KCk7XG5cbiAgbGV0IGN0cngsIGN0cnksIHJzO1xuXG4gIGxldCBiaW5kaW5ncyA9IHtcbiAgICBvbjogZnVuY3Rpb24oZXZlbnRzLCBzZWxlY3RvciwgZm4pe1xuXG4gICAgICBsZXQgX2ZuID0gZm47XG4gICAgICBpZiggc2VsZWN0b3IgPT09ICdjb3JlJyl7XG4gICAgICAgIF9mbiA9IGZ1bmN0aW9uKCBlICl7XG4gICAgICAgICAgaWYoIGUuY3lUYXJnZXQgPT09IGN5IHx8IGUudGFyZ2V0ID09PSBjeSApeyAvLyBvbmx5IGlmIGV2ZW50IHRhcmdldCBpcyBkaXJlY3RseSBjb3JlXG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkoIHRoaXMsIFsgZSBdICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBkYXRhLmhhbmRsZXJzLnB1c2goe1xuICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgICBmbjogX2ZuXG4gICAgICB9KTtcblxuICAgICAgaWYoIHNlbGVjdG9yID09PSAnY29yZScgKXtcbiAgICAgICAgY3kub24oZXZlbnRzLCBfZm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3kub24oZXZlbnRzLCBzZWxlY3RvciwgX2ZuKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCl7XG4gICAgbGV0IGdyYWJiYWJsZTtcbiAgICBsZXQgaW5HZXN0dXJlID0gZmFsc2U7XG4gICAgbGV0IGRyYWdIYW5kbGVyO1xuICAgIGxldCB6b29tRW5hYmxlZDtcbiAgICBsZXQgcGFuRW5hYmxlZDtcbiAgICBsZXQgYm94RW5hYmxlZDtcbiAgICBsZXQgZ2VzdHVyZVN0YXJ0RXZlbnQ7XG5cbiAgICBsZXQgcmVzdG9yZVpvb20gPSBmdW5jdGlvbigpe1xuICAgICAgaWYoIHpvb21FbmFibGVkICl7XG4gICAgICAgIGN5LnVzZXJab29taW5nRW5hYmxlZCggdHJ1ZSApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcmVzdG9yZUdyYWIgPSBmdW5jdGlvbigpe1xuICAgICAgaWYoIGdyYWJiYWJsZSApe1xuICAgICAgICB0YXJnZXQuZ3JhYmlmeSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcmVzdG9yZVBhbiA9IGZ1bmN0aW9uKCl7XG4gICAgICBpZiggcGFuRW5hYmxlZCApe1xuICAgICAgICBjeS51c2VyUGFubmluZ0VuYWJsZWQoIHRydWUgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHJlc3RvcmVCb3hTZWxuID0gZnVuY3Rpb24oKXtcbiAgICAgIGlmKCBib3hFbmFibGVkICl7XG4gICAgICAgIGN5LmJveFNlbGVjdGlvbkVuYWJsZWQoIHRydWUgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHJlc3RvcmVHZXN0dXJlcyA9IGZ1bmN0aW9uKCl7XG4gICAgICByZXN0b3JlR3JhYigpO1xuICAgICAgcmVzdG9yZVpvb20oKTtcbiAgICAgIHJlc3RvcmVQYW4oKTtcbiAgICAgIHJlc3RvcmVCb3hTZWxuKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVQaXhlbFJhdGlvKTtcblxuICAgIGJpbmRpbmdzXG4gICAgICAub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHVwZGF0ZVBpeGVsUmF0aW8oKTtcbiAgICAgIH0pXG5cbiAgICAgIC5vbihvcHRpb25zLm9wZW5NZW51RXZlbnRzLCBvcHRpb25zLnNlbGVjdG9yLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdGFyZ2V0ID0gdGhpczsgLy8gUmVtZW1iZXIgd2hpY2ggbm9kZSB0aGUgY29udGV4dCBtZW51IGlzIGZvclxuICAgICAgICBsZXQgZWxlID0gdGhpcztcbiAgICAgICAgbGV0IGlzQ3kgPSB0aGlzID09PSBjeTtcblxuICAgICAgICBpZiAoaW5HZXN0dXJlKSB7XG4gICAgICAgICAgcGFyZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgICBpbkdlc3R1cmUgPSBmYWxzZTtcblxuICAgICAgICAgIHJlc3RvcmVHZXN0dXJlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHR5cGVvZiBvcHRpb25zLmNvbW1hbmRzID09PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgY29uc3QgcmVzID0gb3B0aW9ucy5jb21tYW5kcyh0YXJnZXQpO1xuICAgICAgICAgIGlmKCByZXMudGhlbiApe1xuICAgICAgICAgICAgcmVzLnRoZW4oX2NvbW1hbmRzID0+IHtcbiAgICAgICAgICAgICAgY29tbWFuZHMgPSBfY29tbWFuZHM7XG4gICAgICAgICAgICAgIG9wZW5NZW51KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21tYW5kcyA9IHJlcztcbiAgICAgICAgICAgIG9wZW5NZW51KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1hbmRzID0gb3B0aW9ucy5jb21tYW5kcztcbiAgICAgICAgICBvcGVuTWVudSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb3Blbk1lbnUoKXtcbiAgICAgICAgICBpZiggIWNvbW1hbmRzIHx8IGNvbW1hbmRzLmxlbmd0aCA9PT0gMCApeyByZXR1cm47IH1cblxuICAgICAgICAgIHpvb21FbmFibGVkID0gY3kudXNlclpvb21pbmdFbmFibGVkKCk7XG4gICAgICAgICAgY3kudXNlclpvb21pbmdFbmFibGVkKCBmYWxzZSApO1xuXG4gICAgICAgICAgcGFuRW5hYmxlZCA9IGN5LnVzZXJQYW5uaW5nRW5hYmxlZCgpO1xuICAgICAgICAgIGN5LnVzZXJQYW5uaW5nRW5hYmxlZCggZmFsc2UgKTtcblxuICAgICAgICAgIGJveEVuYWJsZWQgPSBjeS5ib3hTZWxlY3Rpb25FbmFibGVkKCk7XG4gICAgICAgICAgY3kuYm94U2VsZWN0aW9uRW5hYmxlZCggZmFsc2UgKTtcblxuICAgICAgICAgIGdyYWJiYWJsZSA9IHRhcmdldC5ncmFiYmFibGUgJiYgIHRhcmdldC5ncmFiYmFibGUoKTtcbiAgICAgICAgICBpZiggZ3JhYmJhYmxlICl7XG4gICAgICAgICAgICB0YXJnZXQudW5ncmFiaWZ5KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHJwLCBydywgcmg7XG4gICAgICAgICAgaWYoICFpc0N5ICYmIGVsZS5pc05vZGUoKSAmJiAhZWxlLmlzUGFyZW50KCkgJiYgIW9wdGlvbnMuYXRNb3VzZSApe1xuICAgICAgICAgICAgcnAgPSBlbGUucmVuZGVyZWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgcncgPSBlbGUucmVuZGVyZWRXaWR0aCgpO1xuICAgICAgICAgICAgcmggPSBlbGUucmVuZGVyZWRIZWlnaHQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcnAgPSBlLnJlbmRlcmVkUG9zaXRpb24gfHwgZS5jeVJlbmRlcmVkUG9zaXRpb247XG4gICAgICAgICAgICBydyA9IDE7XG4gICAgICAgICAgICByaCA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb2Zmc2V0ID0gZ2V0T2Zmc2V0KGNvbnRhaW5lcik7XG5cbiAgICAgICAgICBjdHJ4ID0gcnAueDtcbiAgICAgICAgICBjdHJ5ID0gcnAueTtcblxuICAgICAgICAgIGNyZWF0ZU1lbnVJdGVtcygpO1xuXG4gICAgICAgICAgc2V0U3R5bGVzKHBhcmVudCwge1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIGxlZnQ6IChycC54IC0gcikgKyAncHgnLFxuICAgICAgICAgICAgdG9wOiAocnAueSAtIHIpICsgJ3B4J1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcnMgPSBNYXRoLm1heChydywgcmgpLzI7XG4gICAgICAgICAgcnMgPSBNYXRoLm1heChycywgb3B0aW9ucy5taW5TcG90bGlnaHRSYWRpdXMpO1xuICAgICAgICAgIHJzID0gTWF0aC5taW4ocnMsIG9wdGlvbnMubWF4U3BvdGxpZ2h0UmFkaXVzKTtcblxuICAgICAgICAgIHF1ZXVlRHJhd0JnKCk7XG5cbiAgICAgICAgICBhY3RpdmVDb21tYW5kSSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIGluR2VzdHVyZSA9IHRydWU7XG4gICAgICAgICAgZ2VzdHVyZVN0YXJ0RXZlbnQgPSBlO1xuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAub24oJ2N4dGRyYWcgdGFwZHJhZycsIG9wdGlvbnMuc2VsZWN0b3IsIGRyYWdIYW5kbGVyID0gZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgaWYoICFpbkdlc3R1cmUgKXsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IG9yaWdFID0gZS5vcmlnaW5hbEV2ZW50O1xuICAgICAgICBsZXQgaXNUb3VjaCA9IG9yaWdFLnRvdWNoZXMgJiYgb3JpZ0UudG91Y2hlcy5sZW5ndGggPiAwO1xuXG4gICAgICAgIGxldCBwYWdlWCA9IGlzVG91Y2ggPyBvcmlnRS50b3VjaGVzWzBdLnBhZ2VYIDogb3JpZ0UucGFnZVg7XG4gICAgICAgIGxldCBwYWdlWSA9IGlzVG91Y2ggPyBvcmlnRS50b3VjaGVzWzBdLnBhZ2VZIDogb3JpZ0UucGFnZVk7XG5cbiAgICAgICAgYWN0aXZlQ29tbWFuZEkgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgbGV0IGR4ID0gcGFnZVggLSBvZmZzZXQubGVmdCAtIGN0cng7XG4gICAgICAgIGxldCBkeSA9IHBhZ2VZIC0gb2Zmc2V0LnRvcCAtIGN0cnk7XG5cbiAgICAgICAgaWYoIGR4ID09PSAwICl7IGR4ID0gMC4wMTsgfVxuXG4gICAgICAgIGxldCBkID0gTWF0aC5zcXJ0KCBkeCpkeCArIGR5KmR5ICk7XG4gICAgICAgIGxldCBjb3NUaGV0YSA9IChkeSpkeSAtIGQqZCAtIGR4KmR4KS8oLTIgKiBkICogZHgpO1xuICAgICAgICBsZXQgdGhldGEgPSBNYXRoLmFjb3MoIGNvc1RoZXRhICk7XG5cbiAgICAgICAgaWYoIGQgPCBycyArIG9wdGlvbnMuc3BvdGxpZ2h0UGFkZGluZyApe1xuICAgICAgICAgIHF1ZXVlRHJhd0JnKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcXVldWVEcmF3QmcoKTtcblxuICAgICAgICBsZXQgcnggPSBkeCpyIC8gZDtcbiAgICAgICAgbGV0IHJ5ID0gZHkqciAvIGQ7XG5cbiAgICAgICAgaWYoIGR5ID4gMCApe1xuICAgICAgICAgIHRoZXRhID0gTWF0aC5QSSArIE1hdGguYWJzKHRoZXRhIC0gTWF0aC5QSSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZHRoZXRhID1cbiAgICAgICAgICAoMiAqIE1hdGguUEkgKiAob3B0aW9ucy5tZW51QXJjIC8gMzYwKSkgLyBjb21tYW5kcy5sZW5ndGg7XG4gICAgICAgIGxldCB0aGV0YTEgPVxuICAgICAgICAgIE1hdGguUEkgLyAyICsgTWF0aC5QSSAqIDIgKiAob3B0aW9ucy5tZW51Um90YXRpb24gLyAzNjApO1xuICAgICAgICBsZXQgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgY29tbWFuZHMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgICBsZXQgY29tbWFuZCA9IGNvbW1hbmRzW2ldO1xuXG4gICAgICAgICAgbGV0IGluVGhpc0NvbW1hbmQgPSB0aGV0YTEgPD0gdGhldGEgJiYgdGhldGEgPD0gdGhldGEyXG4gICAgICAgICAgICB8fCB0aGV0YTEgPD0gdGhldGEgKyAyKk1hdGguUEkgJiYgdGhldGEgKyAyKk1hdGguUEkgPD0gdGhldGEyO1xuXG4gICAgICAgICAgaWYoIGNvbW1hbmQuZGlzYWJsZWQgPT09IHRydWUgfHwgY29tbWFuZC5lbmFibGVkID09PSBmYWxzZSApe1xuICAgICAgICAgICAgaW5UaGlzQ29tbWFuZCA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBpblRoaXNDb21tYW5kICl7XG4gICAgICAgICAgICBhY3RpdmVDb21tYW5kSSA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGV0YTEgKz0gZHRoZXRhO1xuICAgICAgICAgIHRoZXRhMiArPSBkdGhldGE7XG4gICAgICAgIH1cblxuICAgICAgICBxdWV1ZURyYXdDb21tYW5kcyggcngsIHJ5LCB0aGV0YSApO1xuICAgICAgfSlcblxuICAgICAgLm9uKCd0YXBkcmFnJywgZHJhZ0hhbmRsZXIpXG5cbiAgICAgIC5vbignY3h0dGFwZW5kIHRhcGVuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHBhcmVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgIGlmKCBhY3RpdmVDb21tYW5kSSAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgbGV0IHNlbGVjdCA9IGNvbW1hbmRzWyBhY3RpdmVDb21tYW5kSSBdLnNlbGVjdDtcblxuICAgICAgICAgIGlmKCBzZWxlY3QgKXtcbiAgICAgICAgICAgIHNlbGVjdC5hcHBseSggdGFyZ2V0LCBbdGFyZ2V0LCBnZXN0dXJlU3RhcnRFdmVudF0gKTtcbiAgICAgICAgICAgIGFjdGl2ZUNvbW1hbmRJID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGluR2VzdHVyZSA9IGZhbHNlO1xuXG4gICAgICAgIHJlc3RvcmVHZXN0dXJlcygpO1xuICAgICAgfSlcbiAgICA7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycygpe1xuICAgIGxldCBoYW5kbGVycyA9IGRhdGEuaGFuZGxlcnM7XG5cbiAgICBmb3IoIGxldCBpID0gMDsgaSA8IGhhbmRsZXJzLmxlbmd0aDsgaSsrICl7XG4gICAgICBsZXQgaCA9IGhhbmRsZXJzW2ldO1xuXG4gICAgICBpZiggaC5zZWxlY3RvciA9PT0gJ2NvcmUnICl7XG4gICAgICAgIGN5Lm9mZihoLmV2ZW50cywgaC5mbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjeS5vZmYoaC5ldmVudHMsIGguc2VsZWN0b3IsIGguZm4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVQaXhlbFJhdGlvKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3lJbnN0YW5jZSgpe1xuICAgIHJlZHJhd2luZyA9IGZhbHNlO1xuXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHdyYXBwZXIucmVtb3ZlKCk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpO1xuXG4gIHJldHVybiB7XG4gICAgZGVzdHJveTogZnVuY3Rpb24oKXtcbiAgICAgIGRlc3Ryb3lJbnN0YW5jZSgpO1xuICAgIH1cbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjeHRtZW51O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4dG1lbnUuanMiLCIvLyBTaW1wbGUsIGludGVybmFsIE9iamVjdC5hc3NpZ24oKSBwb2x5ZmlsbCBmb3Igb3B0aW9ucyBvYmplY3RzIGV0Yy5cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduICE9IG51bGwgPyBPYmplY3QuYXNzaWduLmJpbmQoIE9iamVjdCApIDogZnVuY3Rpb24oIHRndCwgLi4uc3JjcyApe1xuICBzcmNzLmZpbHRlcihzcmMgPT4gc3JjICE9IG51bGwpLmZvckVhY2goIHNyYyA9PiB7XG4gICAgT2JqZWN0LmtleXMoIHNyYyApLmZvckVhY2goIGsgPT4gdGd0W2tdID0gc3JjW2tdICk7XG4gIH0gKTtcblxuICByZXR1cm4gdGd0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NpZ24uanMiLCJsZXQgZGVmYXVsdHMgPSB7XG4gIG1lbnVSYWRpdXM6IDEwMCwgLy8gdGhlIHJhZGl1cyBvZiB0aGUgY2lyY3VsYXIgbWVudSBpbiBwaXhlbHNcbiAgc2VsZWN0b3I6ICdub2RlJywgLy8gZWxlbWVudHMgbWF0Y2hpbmcgdGhpcyBDeXRvc2NhcGUuanMgc2VsZWN0b3Igd2lsbCB0cmlnZ2VyIGN4dG1lbnVzXG4gIGNvbW1hbmRzOiBbIC8vIGFuIGFycmF5IG9mIGNvbW1hbmRzIHRvIGxpc3QgaW4gdGhlIG1lbnUgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGFycmF5XG4gICAgLypcbiAgICB7IC8vIGV4YW1wbGUgY29tbWFuZFxuICAgICAgZmlsbENvbG9yOiAncmdiYSgyMDAsIDIwMCwgMjAwLCAwLjc1KScsIC8vIG9wdGlvbmFsOiBjdXN0b20gYmFja2dyb3VuZCBjb2xvciBmb3IgaXRlbVxuICAgICAgY29udGVudDogJ2EgY29tbWFuZCBuYW1lJyAvLyBodG1sL3RleHQgY29udGVudCB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIG1lbnVcbiAgICAgIGNvbnRlbnRTdHlsZToge30sIC8vIGNzcyBrZXk6dmFsdWUgcGFpcnMgdG8gc2V0IHRoZSBjb21tYW5kJ3MgY3NzIGluIGpzIGlmIHlvdSB3YW50XG4gICAgICBzZWxlY3Q6IGZ1bmN0aW9uKGVsZSl7IC8vIGEgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBjb21tYW5kIGlzIHNlbGVjdGVkXG4gICAgICAgIGNvbnNvbGUubG9nKCBlbGUuaWQoKSApIC8vIGBlbGVgIGhvbGRzIHRoZSByZWZlcmVuY2UgdG8gdGhlIGFjdGl2ZSBlbGVtZW50XG4gICAgICB9LFxuICAgICAgZW5hYmxlZDogdHJ1ZSAvLyB3aGV0aGVyIHRoZSBjb21tYW5kIGlzIHNlbGVjdGFibGVcbiAgICB9XG4gICAgKi9cbiAgXSwgLy8gZnVuY3Rpb24oIGVsZSApeyByZXR1cm4gWyAvKi4uLiovIF0gfSwgLy8gZXhhbXBsZSBmdW5jdGlvbiBmb3IgY29tbWFuZHNcbiAgZmlsbENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjc1KScsIC8vIHRoZSBiYWNrZ3JvdW5kIGNvbG91ciBvZiB0aGUgbWVudVxuICBhY3RpdmVGaWxsQ29sb3I6ICdyZ2JhKDEsIDEwNSwgMjE3LCAwLjc1KScsIC8vIHRoZSBjb2xvdXIgdXNlZCB0byBpbmRpY2F0ZSB0aGUgc2VsZWN0ZWQgY29tbWFuZFxuICBhY3RpdmVQYWRkaW5nOiAyMCwgLy8gYWRkaXRpb25hbCBzaXplIGluIHBpeGVscyBmb3IgdGhlIGFjdGl2ZSBjb21tYW5kXG4gIGluZGljYXRvclNpemU6IDI0LCAvLyB0aGUgc2l6ZSBpbiBwaXhlbHMgb2YgdGhlIHBvaW50ZXIgdG8gdGhlIGFjdGl2ZSBjb21tYW5kXG4gIHNlcGFyYXRvcldpZHRoOiAzLCAvLyB0aGUgZW1wdHkgc3BhY2luZyBpbiBwaXhlbHMgYmV0d2VlbiBzdWNjZXNzaXZlIGNvbW1hbmRzXG4gIHNwb3RsaWdodFBhZGRpbmc6IDQsIC8vIGV4dHJhIHNwYWNpbmcgaW4gcGl4ZWxzIGJldHdlZW4gdGhlIGVsZW1lbnQgYW5kIHRoZSBzcG90bGlnaHRcbiAgbWluU3BvdGxpZ2h0UmFkaXVzOiAyNCwgLy8gdGhlIG1pbmltdW0gcmFkaXVzIGluIHBpeGVscyBvZiB0aGUgc3BvdGxpZ2h0XG4gIG1heFNwb3RsaWdodFJhZGl1czogMzgsIC8vIHRoZSBtYXhpbXVtIHJhZGl1cyBpbiBwaXhlbHMgb2YgdGhlIHNwb3RsaWdodFxuICBvcGVuTWVudUV2ZW50czogJ2N4dHRhcHN0YXJ0IHRhcGhvbGQnLCAvLyBzcGFjZS1zZXBhcmF0ZWQgY3l0b3NjYXBlIGV2ZW50cyB0aGF0IHdpbGwgb3BlbiB0aGUgbWVudTsgb25seSBgY3h0dGFwc3RhcnRgIGFuZC9vciBgdGFwaG9sZGAgd29yayBoZXJlXG4gIGl0ZW1Db2xvcjogJ3doaXRlJywgLy8gdGhlIGNvbG91ciBvZiB0ZXh0IGluIHRoZSBjb21tYW5kJ3MgY29udGVudFxuICBpdGVtVGV4dFNoYWRvd0NvbG9yOiAndHJhbnNwYXJlbnQnLCAvLyB0aGUgdGV4dCBzaGFkb3cgY29sb3VyIG9mIHRoZSBjb21tYW5kJ3MgY29udGVudFxuICB6SW5kZXg6IDk5OTksIC8vIHRoZSB6LWluZGV4IG9mIHRoZSB1aSBkaXZcbiAgYXRNb3VzZTogZmFsc2UsIC8vIGRyYXcgbWVudSBhdCBtb3VzZSBwb3NpdGlvblxuICBtZW51QXJjOiAzNjAsIC8vIHRoZSBhcmMgbGVuZ3RoIG9mIHRoZSBtZW51IGluIGRlZ3JlZXNcbiAgbWVudVJvdGF0aW9uOiAwLCAvLyB0aGUgcm90YXRpb24gb2YgdGhlIG1lbnUgaW4gZGVncmVlc1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZWZhdWx0cy5qcyIsImNvbnN0IHJlbW92ZUVsZXMgPSBmdW5jdGlvbihxdWVyeSwgYW5jZXN0b3IgPSBkb2N1bWVudCkge1xuICBsZXQgZWxzID0gYW5jZXN0b3IucXVlcnlTZWxlY3RvckFsbChxdWVyeSk7XG5cbiAgZm9yKCBsZXQgaSA9IDA7IGkgPCBlbHMubGVuZ3RoOyBpKysgKXtcbiAgICBsZXQgZWwgPSBlbHNbaV07XG5cbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgfVxufTtcblxuY29uc3Qgc2V0U3R5bGVzID0gZnVuY3Rpb24oZWwsIHN0eWxlKSB7XG4gIGxldCBwcm9wcyA9IE9iamVjdC5rZXlzKHN0eWxlKTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IHByb3BzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGVsLnN0eWxlW3Byb3BzW2ldXSA9IHN0eWxlW3Byb3BzW2ldXTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG9wdGlvbnMudGFnIHx8ICdkaXYnKTtcblxuICBlbC5jbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzIHx8ICcnO1xuXG4gIGlmIChvcHRpb25zLnN0eWxlKSB7XG4gICAgc2V0U3R5bGVzKGVsLCBvcHRpb25zLnN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBlbDtcbn07XG5cbmNvbnN0IGdldFBpeGVsUmF0aW8gPSBmdW5jdGlvbigpe1xuICByZXR1cm4gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbn07XG5cbmNvbnN0IGdldE9mZnNldCA9IGZ1bmN0aW9uKGVsKXtcbiAgbGV0IG9mZnNldCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIHJldHVybiB7XG4gICAgbGVmdDogb2Zmc2V0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgK1xuICAgICAgICAgIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsncGFkZGluZy1sZWZ0J10pICtcbiAgICAgICAgICBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbJ2JvcmRlci1sZWZ0LXdpZHRoJ10pLFxuICAgIHRvcDogb2Zmc2V0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wICtcbiAgICAgICAgIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsncGFkZGluZy10b3AnXSkgK1xuICAgICAgICAgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpWydib3JkZXItdG9wLXdpZHRoJ10pXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVtb3ZlRWxlcywgc2V0U3R5bGVzLCBjcmVhdGVFbGVtZW50LCBnZXRQaXhlbFJhdGlvLCBnZXRPZmZzZXQgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kb20tdXRpbC5qcyIsImNvbnN0IGN4dG1lbnUgPSByZXF1aXJlKCcuL2N4dG1lbnUnKTtcblxuLy8gcmVnaXN0ZXJzIHRoZSBleHRlbnNpb24gb24gYSBjeXRvc2NhcGUgbGliIHJlZlxubGV0IHJlZ2lzdGVyID0gZnVuY3Rpb24oIGN5dG9zY2FwZSApe1xuICBpZiggIWN5dG9zY2FwZSApeyByZXR1cm47IH0gLy8gY2FuJ3QgcmVnaXN0ZXIgaWYgY3l0b3NjYXBlIHVuc3BlY2lmaWVkXG5cbiAgY3l0b3NjYXBlKCAnY29yZScsICdjeHRtZW51JywgY3h0bWVudSApOyAvLyByZWdpc3RlciB3aXRoIGN5dG9zY2FwZS5qc1xufTtcblxuaWYoIHR5cGVvZiBjeXRvc2NhcGUgIT09ICd1bmRlZmluZWQnICl7IC8vIGV4cG9zZSB0byBnbG9iYWwgY3l0b3NjYXBlIChpLmUuIHdpbmRvdy5jeXRvc2NhcGUpXG4gIHJlZ2lzdGVyKCBjeXRvc2NhcGUgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWdpc3RlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=