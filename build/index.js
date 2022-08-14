/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Middleware.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Parser.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");





var last = function last(arr) {
  return arr.length ? arr[arr.length - 1] : null;
}; // based on https://github.com/thysultan/stylis.js/blob/e6843c373ebcbbfade25ebcc23f540ed8508da0a/src/Tokenizer.js#L239-L244


var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      break;
    }

    (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)();
  }

  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.slice)(begin, stylis__WEBPACK_IMPORTED_MODULE_3__.position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      case 0:
        // &\f
        if (character === 38 && (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(stylis__WEBPACK_IMPORTED_MODULE_3__.position - 1, points, index);
        break;

      case 2:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.delimit)(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_4__.from)(character);
    }
  } while (character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)());

  return parsed;
};

var getRules = function getRules(value, points) {
  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.dealloc)(toRules((0,stylis__WEBPACK_IMPORTED_MODULE_3__.alloc)(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return !!element && element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule') return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses && cache.compat !== true) {
      var prevElement = index > 0 ? children[index - 1] : null;

      if (prevElement && isIgnoringComment(last(prevElement.children))) {
        return;
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

var defaultStylisPlugins = [stylis__WEBPACK_IMPORTED_MODULE_5__.prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if ( true && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if ( key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if (true) {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (true) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  {
    var currentSheet;
    var finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_6__.stringify,  true ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== stylis__WEBPACK_IMPORTED_MODULE_7__.COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : 0];
    var serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_5__.middleware)(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_8__.compile)(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if ( true && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

/* harmony default export */ __webpack_exports__["default"] = (createCache);


/***/ }),

/***/ "./node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.esm.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.esm.js ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/css/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");




function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert('', serialized, cache.sheet, true);
  }
}

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_2__.getRegisteredStyles)(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var createEmotion = function createEmotion(options) {
  var cache = (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_0__["default"])(options); // $FlowFixMe

  cache.sheet.speedy = function (value) {
    if ( true && this.ctr !== 0) {
      throw new Error('speedy must be changed before any rules are inserted');
    }

    this.isSpeedy = value;
  };

  cache.compat = true;

  var css = function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_1__.serializeStyles)(args, cache.registered, undefined);
    (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_2__.insertStyles)(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var keyframes = function keyframes() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_1__.serializeStyles)(args, cache.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };

  var injectGlobal = function injectGlobal() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_1__.serializeStyles)(args, cache.registered);
    insertWithoutScoping(cache, serialized);
  };

  var cx = function cx() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return merge(cache.registered, css, classnames(args));
  };

  return {
    css: css,
    cx: cx,
    injectGlobal: injectGlobal,
    keyframes: keyframes,
    hydrate: function hydrate(ids) {
      ids.forEach(function (key) {
        cache.inserted[key] = true;
      });
    },
    flush: function flush() {
      cache.registered = {};
      cache.inserted = {};
      cache.sheet.flush();
    },
    // $FlowFixMe
    sheet: cache.sheet,
    cache: cache,
    getRegisteredStyles: _emotion_utils__WEBPACK_IMPORTED_MODULE_2__.getRegisteredStyles.bind(null, cache.registered),
    merge: merge.bind(null, cache.registered, css)
  };
};

var classnames = function classnames(args) {
  var cls = '';

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

/* harmony default export */ __webpack_exports__["default"] = (createEmotion);


/***/ }),

/***/ "./node_modules/@emotion/css/dist/emotion-css.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/@emotion/css/dist/emotion-css.esm.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cache": function() { return /* binding */ cache; },
/* harmony export */   "css": function() { return /* binding */ css; },
/* harmony export */   "cx": function() { return /* binding */ cx; },
/* harmony export */   "flush": function() { return /* binding */ flush; },
/* harmony export */   "getRegisteredStyles": function() { return /* binding */ getRegisteredStyles; },
/* harmony export */   "hydrate": function() { return /* binding */ hydrate; },
/* harmony export */   "injectGlobal": function() { return /* binding */ injectGlobal; },
/* harmony export */   "keyframes": function() { return /* binding */ keyframes; },
/* harmony export */   "merge": function() { return /* binding */ merge; },
/* harmony export */   "sheet": function() { return /* binding */ sheet; }
/* harmony export */ });
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/css/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _create_instance_dist_emotion_css_create_instance_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../create-instance/dist/emotion-css-create-instance.esm.js */ "./node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.esm.js");





var _createEmotion = (0,_create_instance_dist_emotion_css_create_instance_esm_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
  key: 'css'
}),
    flush = _createEmotion.flush,
    hydrate = _createEmotion.hydrate,
    cx = _createEmotion.cx,
    merge = _createEmotion.merge,
    getRegisteredStyles = _createEmotion.getRegisteredStyles,
    injectGlobal = _createEmotion.injectGlobal,
    keyframes = _createEmotion.keyframes,
    css = _createEmotion.css,
    sheet = _createEmotion.sheet,
    cache = _createEmotion.cache;




/***/ }),

/***/ "./node_modules/@emotion/css/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@emotion/css/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegisteredStyles": function() { return /* binding */ getRegisteredStyles; },
/* harmony export */   "insertStyles": function() { return /* binding */ insertStyles; },
/* harmony export */   "registerStyles": function() { return /* binding */ registerStyles; }
/* harmony export */ });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/emotion-hash.esm.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ __webpack_exports__["default"] = (murmur2);


/***/ }),

/***/ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__["default"])(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

/* harmony default export */ __webpack_exports__["default"] = (isPropValid);


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ __webpack_exports__["default"] = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__);


// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = (function (targetComponent, sourceComponent) {
  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default()(targetComponent, sourceComponent);
});

/* harmony default export */ __webpack_exports__["default"] = (hoistNonReactStatics);


/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": function() { return /* binding */ CacheProvider; },
/* harmony export */   "E": function() { return /* binding */ Emotion; },
/* harmony export */   "T": function() { return /* binding */ ThemeContext; },
/* harmony export */   "_": function() { return /* binding */ __unsafe_useEmotionCache; },
/* harmony export */   "a": function() { return /* binding */ useTheme; },
/* harmony export */   "b": function() { return /* binding */ ThemeProvider; },
/* harmony export */   "c": function() { return /* binding */ createEmotionProps; },
/* harmony export */   "d": function() { return /* binding */ withTheme; },
/* harmony export */   "h": function() { return /* binding */ hasOwnProperty; },
/* harmony export */   "u": function() { return /* binding */ useInsertionEffectMaybe; },
/* harmony export */   "w": function() { return /* binding */ withEmotionCache; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js */ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");









var hasOwnProperty = {}.hasOwnProperty;

var EmotionCacheContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */(0,_emotion_cache__WEBPACK_IMPORTED_MODULE_1__["default"])({
  key: 'css'
}) : null);

if (true) {
  EmotionCacheContext.displayName = 'EmotionCacheContext';
}

var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
};

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
    // the cache will never be null in the browser
    var cache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});

if (true) {
  ThemeContext.displayName = 'EmotionThemeContext';
}

var useTheme = function useTheme() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
};

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    if ( true && (mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
      throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
    }

    return mergedTheme;
  }

  if ( true && (theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
    throw new Error('[ThemeProvider] Please make your theme prop a plain object');
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */(0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (outerTheme) {
  return (0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      theme: theme,
      ref: ref
    }, props));
  }; // $FlowFixMe


  var WithTheme = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return (0,_isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_6__["default"])(WithTheme, Component);
}

var getLastPart = function getLastPart(functionName) {
  // The match may be something like 'Object.createEmotionProps' or
  // 'Loader.prototype.render'
  var parts = functionName.split('.');
  return parts[parts.length - 1];
};

var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine(line) {
  // V8
  var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
  if (match) return getLastPart(match[1]); // Safari / Firefox

  match = /^([A-Za-z0-9$.]+)@/.exec(line);
  if (match) return getLastPart(match[1]);
  return undefined;
};

var internalReactFunctionNames = /* #__PURE__ */new Set(['renderWithHooks', 'processChild', 'finishClassComponent', 'renderToString']); // These identifiers come from error stacks, so they have to be valid JS
// identifiers, thus we only need to replace what is a valid character for JS,
// but not for CSS.

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var getLabelFromStackTrace = function getLabelFromStackTrace(stackTrace) {
  if (!stackTrace) return undefined;
  var lines = stackTrace.split('\n');

  for (var i = 0; i < lines.length; i++) {
    var functionName = getFunctionNameFromStackTraceLine(lines[i]); // The first line of V8 stack traces is just "Error"

    if (!functionName) continue; // If we reach one of these, we have gone too far and should quit

    if (internalReactFunctionNames.has(functionName)) break; // The component name is the first function in the stack that starts with an
    // uppercase letter

    if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
  }

  return undefined;
};

var useInsertionEffect = react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] ? react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] : function useInsertionEffect(create) {
  create();
};
function useInsertionEffectMaybe(create) {

  useInsertionEffect(create);
}

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if ( true && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // For performance, only call getLabelFromStackTrace in development and when
  // the label hasn't already been computed

  if ( true && !!props.css && (typeof props.css !== 'object' || typeof props.css.name !== 'string' || props.css.name.indexOf('-') === -1)) {
    var label = getLabelFromStackTrace(new Error().stack);
    if (label) newProps[labelPropName] = label;
  }

  return newProps;
};

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.registerStyles)(cache, serialized, isStringTag);
  var rules = useInsertionEffectMaybe(function () {
    return (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.insertStyles)(cache, serialized, isStringTag);
  });

  return null;
};

var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.getRegisteredStyles)(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)(registeredStyles, undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext));

  if ( true && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( false || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Insertion, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, newProps));
});

if (true) {
  Emotion.displayName = 'EmotionCssPropInternal';
}




/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-react.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheProvider": function() { return /* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.C; },
/* harmony export */   "ClassNames": function() { return /* binding */ ClassNames; },
/* harmony export */   "Global": function() { return /* binding */ Global; },
/* harmony export */   "ThemeContext": function() { return /* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T; },
/* harmony export */   "ThemeProvider": function() { return /* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.b; },
/* harmony export */   "__unsafe_useEmotionCache": function() { return /* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__._; },
/* harmony export */   "createElement": function() { return /* binding */ jsx; },
/* harmony export */   "css": function() { return /* binding */ css; },
/* harmony export */   "jsx": function() { return /* binding */ jsx; },
/* harmony export */   "keyframes": function() { return /* binding */ keyframes; },
/* harmony export */   "useTheme": function() { return /* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.a; },
/* harmony export */   "withEmotionCache": function() { return /* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w; },
/* harmony export */   "withTheme": function() { return /* reexport safe */ _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.d; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emotion-element-cbed451f.browser.esm.js */ "./node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");












var pkg = {
	name: "@emotion/react",
	version: "11.10.0",
	main: "dist/emotion-react.cjs.js",
	module: "dist/emotion-react.esm.js",
	browser: {
		"./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
	},
	exports: {
		".": {
			module: {
				worker: "./dist/emotion-react.worker.esm.js",
				browser: "./dist/emotion-react.browser.esm.js",
				"default": "./dist/emotion-react.esm.js"
			},
			"default": "./dist/emotion-react.cjs.js"
		},
		"./jsx-runtime": {
			module: {
				worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
				browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
				"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
			},
			"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
		},
		"./_isolated-hnrs": {
			module: {
				worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
				browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
				"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
			},
			"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
		},
		"./jsx-dev-runtime": {
			module: {
				worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
				browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
				"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
			},
			"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
		},
		"./package.json": "./package.json",
		"./types/css-prop": "./types/css-prop.d.ts",
		"./macro": "./macro.js"
	},
	types: "types/index.d.ts",
	files: [
		"src",
		"dist",
		"jsx-runtime",
		"jsx-dev-runtime",
		"_isolated-hnrs",
		"types/*.d.ts",
		"macro.js",
		"macro.d.ts",
		"macro.js.flow"
	],
	sideEffects: false,
	author: "Emotion Contributors",
	license: "MIT",
	scripts: {
		"test:typescript": "dtslint types"
	},
	dependencies: {
		"@babel/runtime": "^7.18.3",
		"@emotion/babel-plugin": "^11.10.0",
		"@emotion/cache": "^11.10.0",
		"@emotion/serialize": "^1.1.0",
		"@emotion/utils": "^1.2.0",
		"@emotion/weak-memoize": "^0.3.0",
		"hoist-non-react-statics": "^3.3.1"
	},
	peerDependencies: {
		"@babel/core": "^7.0.0",
		react: ">=16.8.0"
	},
	peerDependenciesMeta: {
		"@babel/core": {
			optional: true
		},
		"@types/react": {
			optional: true
		}
	},
	devDependencies: {
		"@babel/core": "^7.18.5",
		"@definitelytyped/dtslint": "0.0.112",
		"@emotion/css": "11.10.0",
		"@emotion/css-prettifier": "1.1.0",
		"@emotion/server": "11.10.0",
		"@emotion/styled": "11.10.0",
		"html-tag-names": "^1.1.2",
		react: "16.14.0",
		"svg-tag-names": "^1.1.1",
		typescript: "^4.5.5"
	},
	repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
	publishConfig: {
		access: "public"
	},
	"umd:main": "dist/emotion-react.umd.min.js",
	preconstruct: {
		entrypoints: [
			"./index.js",
			"./jsx-runtime.js",
			"./jsx-dev-runtime.js",
			"./_isolated-hnrs.js"
		],
		umdName: "emotionReact",
		exports: {
			envConditions: [
				"browser",
				"worker"
			],
			extra: {
				"./types/css-prop": "./types/css-prop.d.ts",
				"./macro": "./macro.js"
			}
		}
	}
};

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.h.call(props, 'css')) {
    // $FlowFixMe
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = _emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.E;
  createElementArgArray[1] = (0,_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.c)(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(null, createElementArgArray);
};

var useInsertionEffect = react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] ? react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] : react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;
var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */(0,_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  if ( true && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;
  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)([styles], undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T));
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  useInsertionEffect(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  useInsertionEffect(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

if (true) {
  Global.displayName = 'EmotionGlobal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args);
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if ( true && arg.styles !== undefined && arg.name !== undefined) {
              console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
            }

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.getRegisteredStyles)(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serializedArr = _ref.serializedArr;
  var rules = (0,_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.u)(function () {

    for (var i = 0; i < serializedArr.length; i++) {
      var res = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serializedArr[i], false);
    }
  });

  return null;
};

var ClassNames = /* #__PURE__ */(0,_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  var hasRendered = false;
  var serializedArr = [];

  var css = function css() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args, cache.registered);
    serializedArr.push(serialized); // registration has to happen here as the result of this might get consumed by `cx`

    (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.registerStyles)(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_cbed451f_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Insertion, {
    cache: cache,
    serializedArr: serializedArr
  }), ele);
});

if (true) {
  ClassNames.displayName = 'EmotionClassNames';
}

if (true) {
  var isBrowser = "object" !== 'undefined'; // #1727 for some reason Jest evaluates modules twice if some consuming module gets mocked with jest.mock

  var isJest = typeof jest !== 'undefined';

  if (isBrowser && !isJest) {
    // globalThis has wide browser support - https://caniuse.com/?search=globalThis, Node.js 12 and later
    var globalContext = // $FlowIgnore
    typeof globalThis !== 'undefined' ? globalThis // eslint-disable-line no-undef
    : isBrowser ? window : __webpack_require__.g;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";

    if (globalContext[globalKey]) {
      console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
    }

    globalContext[globalKey] = true;
  }
}




/***/ }),

/***/ "./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@emotion/react/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegisteredStyles": function() { return /* binding */ getRegisteredStyles; },
/* harmony export */   "insertStyles": function() { return /* binding */ insertStyles; },
/* harmony export */   "registerStyles": function() { return /* binding */ registerStyles; }
/* harmony export */ });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serializeStyles": function() { return /* binding */ serializeStyles; }
/* harmony export */ });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");




var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__["default"][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (true) {
  var contentValuePattern = /(var|attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error(noComponentSelectorMessage);
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( true && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (true) {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( true && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;

if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if ( true && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if ( true && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (true) {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = (0,_emotion_hash__WEBPACK_IMPORTED_MODULE_0__["default"])(styles) + identifierName;

  if (true) {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};




/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleSheet": function() { return /* binding */ StyleSheet; }
/* harmony export */ });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (true) {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if ( true && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (true) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/styled/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");








var testOmitPropsOnStringTag = _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__["default"];

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme';
};

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps(tag, options, isReal) {
  var shouldForwardProp;

  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  return shouldForwardProp;
};

var useInsertionEffect = react__WEBPACK_IMPORTED_MODULE_1__['useInsertion' + 'Effect'] ? react__WEBPACK_IMPORTED_MODULE_1__['useInsertion' + 'Effect'] : function useInsertionEffect(create) {
  create();
};
function useInsertionEffectMaybe(create) {

  useInsertionEffect(create);
}

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_3__.registerStyles)(cache, serialized, isStringTag);
  var rules = useInsertionEffectMaybe(function () {
    return (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_3__.insertStyles)(cache, serialized, isStringTag);
  });

  return null;
};

var createStyled = function createStyled(tag, options) {
  if (true) {
    if (tag === undefined) {
      throw new Error('You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.');
    }
  }

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
  }

  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {
      if ( true && args[0][0] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {
        if ( true && args[0][i] === undefined) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }

        styles.push(args[i], args[0][i]);
      }
    } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class


    var Styled = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_5__.w)(function (props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = '';
      var classInterpolations = [];
      var mergedProps = props;

      if (props.theme == null) {
        mergedProps = {};

        for (var key in props) {
          mergedProps[key] = props[key];
        }

        mergedProps.theme = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_emotion_react__WEBPACK_IMPORTED_MODULE_5__.T);
      }

      if (typeof props.className === 'string') {
        className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_3__.getRegisteredStyles)(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }

      var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__.serializeStyles)(styles.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;

      if (targetClassName !== undefined) {
        className += " " + targetClassName;
      }

      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};

      for (var _key in props) {
        if (shouldUseAs && _key === 'as') continue;

        if ( // $FlowFixMe
        finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }

      newProps.className = className;
      newProps.ref = ref;
      return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(Insertion, {
        cache: cache,
        serialized: serialized,
        isStringTag: typeof FinalTag === 'string'
      }), /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && "development" !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        } // $FlowFixMe: coerce undefined to string


        return "." + targetClassName;
      }
    });

    Styled.withComponent = function (nextTag, nextOptions) {
      return createStyled(nextTag, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };

    return Styled;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (createStyled);


/***/ }),

/***/ "./node_modules/@emotion/styled/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@emotion/styled/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegisteredStyles": function() { return /* binding */ getRegisteredStyles; },
/* harmony export */   "insertStyles": function() { return /* binding */ insertStyles; },
/* harmony export */   "registerStyles": function() { return /* binding */ registerStyles; }
/* harmony export */ });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ __webpack_exports__["default"] = (unitlessKeys);


/***/ }),

/***/ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegisteredStyles": function() { return /* binding */ getRegisteredStyles; },
/* harmony export */   "insertStyles": function() { return /* binding */ insertStyles; }
/* harmony export */ });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (weakMemoize);


/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/close-small.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/close-small.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const closeSmall = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
}));
/* harmony default export */ __webpack_exports__["default"] = (closeSmall);
//# sourceMappingURL=close-small.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/close.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/close.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const close = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"
}));
/* harmony default export */ __webpack_exports__["default"] = (close);
//# sourceMappingURL=close.js.map

/***/ }),

/***/ "./src/city-field/block.js":
/*!*********************************!*\
  !*** ./src/city-field/block.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Block; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _city_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./city-input */ "./src/city-field/city-input.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _woocommerce_block_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @woocommerce/block-data */ "@woocommerce/block-data");
/* harmony import */ var _woocommerce_block_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_woocommerce_block_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _woocommerce_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @woocommerce/settings */ "@woocommerce/settings");
/* harmony import */ var _woocommerce_settings__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_woocommerce_settings__WEBPACK_IMPORTED_MODULE_5__);







function Block(_ref) {
  let {
    validation
  } = _ref;
  const {
    shippingAddress
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    const store = select(_woocommerce_block_data__WEBPACK_IMPORTED_MODULE_4__.CART_STORE_KEY);
    const {
      shippingAddress,
      useShippingAsBilling
    } = store.getCustomerData();
    return {
      shippingAddress,
      useShippingAsBilling
    };
  });
  const {
    setShippingAddress,
    setBillingAddress
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_woocommerce_block_data__WEBPACK_IMPORTED_MODULE_4__.CART_STORE_KEY);
  const setCity = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(city => {
    setShippingAddress({
      city
    });
    setBillingAddress({
      city
    });
  }, [setShippingAddress, setBillingAddress]);
  const {
    cities
  } = (0,_woocommerce_settings__WEBPACK_IMPORTED_MODULE_5__.getSetting)('city_field_data');
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_city_input__WEBPACK_IMPORTED_MODULE_1__["default"], {
    validation: validation,
    id: "yalidine-city",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('City', 'woo-gutenberg-products-block'),
    onChange: setCity,
    autoComplete: "off",
    value: shippingAddress.city,
    state: shippingAddress.state,
    cities: cities,
    required: "true"
  });
}

/***/ }),

/***/ "./src/city-field/city-input.js":
/*!**************************************!*\
  !*** ./src/city-field/city-input.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _text_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text-input */ "./src/city-field/text-input/index.js");
/* harmony import */ var _combobox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./combobox */ "./src/city-field/combobox.js");


/**
 * External dependencies
 */




/**
 * Internal dependencies
 */




const optionMatcher = (value, options) => {
  const foundOption = options.find(option => option.label.toLocaleUpperCase() === value.toLocaleUpperCase() || option.value.toLocaleUpperCase() === value.toLocaleUpperCase());
  return foundOption ? foundOption.value : '';
};

const StateInput = _ref => {
  let {
    className,
    id,
    cities = {},
    state,
    label,
    onChange,
    autoComplete = 'off',
    value = '',
    required = false,
    validation
  } = _ref;
  const options = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => Object.entries(cities[state]).map(_ref2 => {
    let [id, value] = _ref2;
    return {
      value: id,
      label: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__.decodeEntities)(value)
    };
  }), [[cities, state]]);
  /**
   * Handles state selection onChange events. Finds a matching state by key or value.
   */

  const onChangeState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(stateValue => {
    onChange(options.length > 0 ? optionMatcher(stateValue, options) : stateValue);
  }, [onChange, options]);
  /**
   * Track value changes.
   */

  const valueRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, [value]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (state && Boolean(value) === false) {
      onChangeState(options[0].value);
    }
  }, [state, value]);
  /**
   * If given a list of options, ensure the value matches those options or trigger change.
   */

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (options.length > 0 && valueRef.current) {
      const match = optionMatcher(valueRef.current, options);

      if (match !== valueRef.current) {
        onChangeState(match);
      }
    }
  }, [options, onChangeState]);

  if (options.length > 0) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_combobox__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, 'wc-block-components-city-input'),
      id: id,
      label: label,
      onChange: onChangeState,
      options: options,
      value: value,
      errorMessage: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please select a city.', 'woo-gutenberg-products-block'),
      required: required,
      autoComplete: autoComplete,
      validation: validation
    }), autoComplete !== 'off' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      "aria-hidden": true,
      autoComplete: autoComplete,
      value: value,
      onChange: event => onChangeState(event.target.value),
      style: {
        minHeight: '0',
        height: '0',
        border: '0',
        padding: '0',
        position: 'absolute'
      },
      tabIndex: -1
    }));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_text_input__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: className,
    id: id,
    label: label,
    onChange: onChangeState,
    autoComplete: autoComplete,
    value: value,
    required: required,
    validation: validation
  });
};

/* harmony default export */ __webpack_exports__["default"] = (StateInput);

/***/ }),

/***/ "./src/city-field/combobox.js":
/*!************************************!*\
  !*** ./src/city-field/combobox.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wordpress-components */ "./node_modules/wordpress-components/build-module/combobox-control/index.js");
/* harmony import */ var _text_input_validation_input_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text-input/validation-input-error */ "./src/city-field/text-input/validation-input-error.js");


/**
 * External dependencies
 */







const Combobox = _ref => {
  let {
    id,
    className,
    label,
    onChange,
    options,
    value,
    required = false,
    errorMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please select a value.', 'woo-gutenberg-products-block'),
    errorId: incomingErrorId,
    instanceId = '0',
    autoComplete = 'off',
    validation
  } = _ref;
  const {
    getValidationError,
    setValidationErrors,
    clearValidationError
  } = validation;
  const controlRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const controlId = id || 'control-' + instanceId;
  const errorId = incomingErrorId || controlId;
  const error = getValidationError(errorId) || {
    message: '',
    hidden: false
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!required || value) {
      clearValidationError(errorId);
    } else {
      setValidationErrors({
        [errorId]: {
          message: errorMessage,
          hidden: true
        }
      });
    }

    return () => {
      clearValidationError(errorId);
    };
  }, [clearValidationError, value, errorId, errorMessage, required, setValidationErrors]); // @todo Remove patch for ComboboxControl once https://github.com/WordPress/gutenberg/pull/33928 is released
  // Also see https://github.com/WordPress/gutenberg/pull/34090

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: controlId,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('wc-block-components-combobox', className, {
      'is-active': value,
      'has-error': error.message && !error.hidden
    }),
    ref: controlRef
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(wordpress_components__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: 'wc-block-components-combobox-control',
    label: label,
    onChange: onChange,
    onFilterValueChange: filterValue => {
      if (filterValue.length) {
        // If we have a value and the combobox is not focussed, this could be from browser autofill.
        const activeElement = controlRef.current instanceof Object ? controlRef.current.ownerDocument.activeElement : undefined;

        if (activeElement && controlRef.current instanceof Object && controlRef.current.contains(activeElement)) {
          return;
        } // Try to match.


        const normalizedFilterValue = filterValue.toLocaleUpperCase();
        const foundOption = options.find(option => option.label.toLocaleUpperCase().startsWith(normalizedFilterValue) || option.value.toLocaleUpperCase() === normalizedFilterValue);

        if (foundOption) {
          onChange(foundOption.value);
        }
      }
    },
    options: options,
    value: value || '',
    allowReset: false,
    autoComplete: autoComplete,
    "aria-invalid": error.message && !error.hidden
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_text_input_validation_input_error__WEBPACK_IMPORTED_MODULE_4__["default"], {
    getValidationError: getValidationError,
    propertyName: errorId
  }));
};

/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.withInstanceId)(Combobox));

/***/ }),

/***/ "./src/city-field/edit.js":
/*!********************************!*\
  !*** ./src/city-field/edit.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Edit": function() { return /* binding */ Edit; },
/* harmony export */   "Save": function() { return /* binding */ Save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _woocommerce_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @woocommerce/settings */ "@woocommerce/settings");
/* harmony import */ var _woocommerce_settings__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_woocommerce_settings__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block */ "./src/city-field/block.js");


/**
 * External dependencies
 */



/**
* Internal dependencies
*/


const {
  optinDefaultText
} = (0,_woocommerce_settings__WEBPACK_IMPORTED_MODULE_3__.getSetting)('newsletter-test_data', '');
const Edit = _ref => {
  let {
    attributes,
    setAttributes
  } = _ref;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  const validation = {
    hasValidationErrors: false,
    getValidationError: () => undefined,
    clearValidationError: () => undefined,
    hideValidationError: () => undefined,
    setValidationErrors: () => undefined
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_block__WEBPACK_IMPORTED_MODULE_4__["default"], {
    validation: validation
  }));
};
const Save = _ref2 => {
  let {
    attributes
  } = _ref2;
  const {
    text
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    value: text
  }));
};

/***/ }),

/***/ "./src/city-field/text-input/index.js":
/*!********************************************!*\
  !*** ./src/city-field/text-input/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _validation_input_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validation-input-error */ "./src/city-field/text-input/validation-input-error.js");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _text_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./text-input */ "./src/city-field/text-input/text-input.js");



/**
 * External dependencies
 */





/**
 * Internal dependencies
 */



const ValidatedTextInput = _ref => {
  let {
    className,
    instanceId,
    id,
    ariaDescribedBy,
    errorId,
    focusOnMount = false,
    onChange,
    showError = true,
    errorMessage: passedErrorMessage = '',
    value = '',
    validation,
    ...rest
  } = _ref;
  const [isPristine, setIsPristine] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const inputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const {
    getValidationError,
    hideValidationError,
    setValidationErrors,
    clearValidationError
  } = validation;
  const getValidationErrorId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(_errorId => {
    const error = getValidationError(_errorId);

    if (!error || error.hidden) {
      return '';
    }

    return `validate-error-${_errorId}`;
  }, [getValidationError]);
  const textInputId = typeof id !== 'undefined' ? id : 'textinput-' + instanceId;
  const errorIdString = errorId !== undefined ? errorId : textInputId;
  const validateInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    let errorsHidden = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const inputObject = inputRef.current || null;

    if (!inputObject) {
      return;
    } // Trim white space before validation.


    inputObject.value = inputObject.value.trim();
    const inputIsValid = inputObject.checkValidity();

    if (inputIsValid) {
      clearValidationError(errorIdString);
    } else {
      setValidationErrors({
        [errorIdString]: {
          message: inputObject.validationMessage || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Invalid value.', 'woo-gutenberg-products-block'),
          hidden: errorsHidden
        }
      });
    }
  }, [clearValidationError, errorIdString, setValidationErrors]);
  /**
   * Focus on mount
   *
   * If the input is in pristine state, focus the element.
   */

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isPristine && focusOnMount) {
      var _inputRef$current;

      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    }

    setIsPristine(false);
  }, [focusOnMount, isPristine, setIsPristine]);
  /**
   * Value Validation
   *
   * Runs validation on state change if the current element is not in focus. This is because autofilled elements do not
   * trigger the blur() event, and so values can be validated in the background if the state changes elsewhere.
   */

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var _inputRef$current2, _inputRef$current2$ow;

    if (((_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : (_inputRef$current2$ow = _inputRef$current2.ownerDocument) === null || _inputRef$current2$ow === void 0 ? void 0 : _inputRef$current2$ow.activeElement) !== inputRef.current) {
      validateInput(true);
    } // We need to track value even if it is not directly used so we know when it changes.

  }, [value, validateInput]); // Remove validation errors when unmounted.

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    return () => {
      clearValidationError(errorIdString);
    };
  }, [clearValidationError, errorIdString]); // @todo - When useValidationContext is converted to TypeScript, remove this cast and use the correct type.

  const errorMessage = getValidationError(errorIdString) || {};

  if (passedErrorMessage !== '') {
    errorMessage.message = passedErrorMessage;
  }

  const hasError = errorMessage.message && !errorMessage.hidden;
  const describedBy = showError && hasError && getValidationErrorId(errorIdString) ? getValidationErrorId(errorIdString) : ariaDescribedBy;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_text_input__WEBPACK_IMPORTED_MODULE_6__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, {
      'has-error': hasError
    }),
    "aria-invalid": hasError === true,
    id: textInputId,
    onBlur: () => {
      validateInput(false);
    },
    feedback: showError && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_validation_input_error__WEBPACK_IMPORTED_MODULE_4__["default"], {
      getValidationError: getValidationError,
      errorMessage: passedErrorMessage,
      propertyName: errorIdString
    }),
    ref: inputRef,
    onChange: val => {
      hideValidationError(errorIdString);
      onChange(val);
    },
    ariaDescribedBy: describedBy,
    value: value
  }, rest));
};

/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.withInstanceId)(ValidatedTextInput));

/***/ }),

/***/ "./src/city-field/text-input/label.js":
/*!********************************************!*\
  !*** ./src/city-field/text-input/label.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);


/**
 * External dependencies
 */



const Label = _ref => {
  let {
    label,
    screenReaderLabel,
    wrapperElement,
    wrapperProps = {}
  } = _ref;
  let Wrapper;
  const hasLabel = typeof label !== 'undefined' && label !== null;
  const hasScreenReaderLabel = typeof screenReaderLabel !== 'undefined' && screenReaderLabel !== null;

  if (!hasLabel && hasScreenReaderLabel) {
    Wrapper = wrapperElement || 'span';
    wrapperProps = { ...wrapperProps,
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(wrapperProps.className, 'screen-reader-text')
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Wrapper, wrapperProps, screenReaderLabel);
  }

  Wrapper = wrapperElement || _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment;

  if (hasLabel && hasScreenReaderLabel && label !== screenReaderLabel) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Wrapper, wrapperProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      "aria-hidden": "true"
    }, label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "screen-reader-text"
    }, screenReaderLabel));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Wrapper, wrapperProps, label);
};

/* harmony default export */ __webpack_exports__["default"] = (Label);

/***/ }),

/***/ "./src/city-field/text-input/text-input.js":
/*!*************************************************!*\
  !*** ./src/city-field/text-input/text-input.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./label */ "./src/city-field/text-input/label.js");



/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


const TextInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((_ref, ref) => {
  let {
    className,
    id,
    type = 'text',
    ariaLabel,
    ariaDescribedBy,
    label,
    screenReaderLabel,
    disabled,
    help,
    autoCapitalize = 'off',
    autoComplete = 'off',
    value = '',
    onChange,
    required = false,
    onBlur = () => {
      /* Do nothing */
    },
    feedback,
    ...rest
  } = _ref;
  const [isActive, setIsActive] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('wc-block-components-text-input', className, {
      'is-active': isActive || value
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    type: type,
    id: id,
    value: value,
    ref: ref,
    autoCapitalize: autoCapitalize,
    autoComplete: autoComplete,
    onChange: event => {
      onChange(event.target.value);
    },
    onFocus: () => setIsActive(true),
    onBlur: event => {
      onBlur(event.target.value);
      setIsActive(false);
    },
    "aria-label": ariaLabel || label,
    disabled: disabled,
    "aria-describedby": !!help && !ariaDescribedBy ? id + '__help' : ariaDescribedBy,
    required: required
  }, rest)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_label__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: label,
    screenReaderLabel: screenReaderLabel || label,
    wrapperElement: "label",
    wrapperProps: {
      htmlFor: id
    },
    htmlFor: id
  }), !!help && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    id: id + '__help',
    className: "wc-block-components-text-input__help"
  }, help), feedback);
});
/* harmony default export */ __webpack_exports__["default"] = (TextInput);

/***/ }),

/***/ "./src/city-field/text-input/validation-input-error.js":
/*!*************************************************************!*\
  !*** ./src/city-field/text-input/validation-input-error.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValidationInputError": function() { return /* binding */ ValidationInputError; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


const ValidationInputError = _ref => {
  let {
    errorMessage = '',
    propertyName = '',
    elementId = '',
    getValidationError
  } = _ref;
  const errorId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const error = getValidationError(propertyName);

    if (!error || error.hidden) {
      return '';
    }

    return `validate-error-${propertyName}`;
  }, []);

  if (!errorMessage || typeof errorMessage !== 'string') {
    const error = getValidationError(propertyName) || {};

    if (error.message && !error.hidden) {
      errorMessage = error.message;
    } else {
      return null;
    }
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wc-block-components-validation-error",
    role: "alert"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    id: errorId
  }, errorMessage));
};
/* harmony default export */ __webpack_exports__["default"] = (ValidationInputError);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/dom-scroll-into-view/lib/dom-scroll-into-view.js":
/*!***********************************************************************!*\
  !*** ./node_modules/dom-scroll-into-view/lib/dom-scroll-into-view.js ***!
  \***********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(/*! ./util */ "./node_modules/dom-scroll-into-view/lib/util.js");

function scrollIntoView(elem, container, config) {
  config = config || {};
  // document 归一化到 window
  if (container.nodeType === 9) {
    container = util.getWindow(container);
  }

  var allowHorizontalScroll = config.allowHorizontalScroll;
  var onlyScrollIfNeeded = config.onlyScrollIfNeeded;
  var alignWithTop = config.alignWithTop;
  var alignWithLeft = config.alignWithLeft;
  var offsetTop = config.offsetTop || 0;
  var offsetLeft = config.offsetLeft || 0;
  var offsetBottom = config.offsetBottom || 0;
  var offsetRight = config.offsetRight || 0;

  allowHorizontalScroll = allowHorizontalScroll === undefined ? true : allowHorizontalScroll;

  var isWin = util.isWindow(container);
  var elemOffset = util.offset(elem);
  var eh = util.outerHeight(elem);
  var ew = util.outerWidth(elem);
  var containerOffset = undefined;
  var ch = undefined;
  var cw = undefined;
  var containerScroll = undefined;
  var diffTop = undefined;
  var diffBottom = undefined;
  var win = undefined;
  var winScroll = undefined;
  var ww = undefined;
  var wh = undefined;

  if (isWin) {
    win = container;
    wh = util.height(win);
    ww = util.width(win);
    winScroll = {
      left: util.scrollLeft(win),
      top: util.scrollTop(win)
    };
    // elem 相对 container 可视视窗的距离
    diffTop = {
      left: elemOffset.left - winScroll.left - offsetLeft,
      top: elemOffset.top - winScroll.top - offsetTop
    };
    diffBottom = {
      left: elemOffset.left + ew - (winScroll.left + ww) + offsetRight,
      top: elemOffset.top + eh - (winScroll.top + wh) + offsetBottom
    };
    containerScroll = winScroll;
  } else {
    containerOffset = util.offset(container);
    ch = container.clientHeight;
    cw = container.clientWidth;
    containerScroll = {
      left: container.scrollLeft,
      top: container.scrollTop
    };
    // elem 相对 container 可视视窗的距离
    // 注意边框, offset 是边框到根节点
    diffTop = {
      left: elemOffset.left - (containerOffset.left + (parseFloat(util.css(container, 'borderLeftWidth')) || 0)) - offsetLeft,
      top: elemOffset.top - (containerOffset.top + (parseFloat(util.css(container, 'borderTopWidth')) || 0)) - offsetTop
    };
    diffBottom = {
      left: elemOffset.left + ew - (containerOffset.left + cw + (parseFloat(util.css(container, 'borderRightWidth')) || 0)) + offsetRight,
      top: elemOffset.top + eh - (containerOffset.top + ch + (parseFloat(util.css(container, 'borderBottomWidth')) || 0)) + offsetBottom
    };
  }

  if (diffTop.top < 0 || diffBottom.top > 0) {
    // 强制向上
    if (alignWithTop === true) {
      util.scrollTop(container, containerScroll.top + diffTop.top);
    } else if (alignWithTop === false) {
      util.scrollTop(container, containerScroll.top + diffBottom.top);
    } else {
      // 自动调整
      if (diffTop.top < 0) {
        util.scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        util.scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  } else {
    if (!onlyScrollIfNeeded) {
      alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
      if (alignWithTop) {
        util.scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        util.scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  }

  if (allowHorizontalScroll) {
    if (diffTop.left < 0 || diffBottom.left > 0) {
      // 强制向上
      if (alignWithLeft === true) {
        util.scrollLeft(container, containerScroll.left + diffTop.left);
      } else if (alignWithLeft === false) {
        util.scrollLeft(container, containerScroll.left + diffBottom.left);
      } else {
        // 自动调整
        if (diffTop.left < 0) {
          util.scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          util.scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    } else {
      if (!onlyScrollIfNeeded) {
        alignWithLeft = alignWithLeft === undefined ? true : !!alignWithLeft;
        if (alignWithLeft) {
          util.scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          util.scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    }
  }
}

module.exports = scrollIntoView;

/***/ }),

/***/ "./node_modules/dom-scroll-into-view/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/dom-scroll-into-view/lib/index.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./dom-scroll-into-view */ "./node_modules/dom-scroll-into-view/lib/dom-scroll-into-view.js");

/***/ }),

/***/ "./node_modules/dom-scroll-into-view/lib/util.js":
/*!*******************************************************!*\
  !*** ./node_modules/dom-scroll-into-view/lib/util.js ***!
  \*******************************************************/
/***/ (function(module) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

function getClientPosition(elem) {
  var box = undefined;
  var x = undefined;
  var y = undefined;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement;
  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
  box = elem.getBoundingClientRect();

  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

  x = box.left;
  y = box.top;

  // In IE, most of the time, 2 extra pixels are added to the top and left
  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
  // IE6 standards mode, this border can be overridden by setting the
  // document element's border to zero -- thus, we cannot rely on the
  // offset always being 2 pixels.

  // In quirks mode, the offset can be determined by querying the body's
  // clientLeft/clientTop, but in standards mode, it is found by querying
  // the document element's clientLeft/clientTop.  Since we already called
  // getClientBoundingRect we have already forced a reflow, so it is not
  // too expensive just to query them all.

  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
  // 窗口边框标准是设 documentElement ,quirks 时设置 body
  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
  // 标准 ie 下 docElem.clientTop 就是 border-top
  // ie7 html 即窗口边框改变不了。永远为 2
  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;

  return {
    left: x,
    top: y
  };
}

function getScroll(w, top) {
  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  var method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    var d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getScrollLeft(w) {
  return getScroll(w);
}

function getScrollTop(w) {
  return getScroll(w, true);
}

function getOffset(el) {
  var pos = getClientPosition(el);
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScrollLeft(w);
  pos.top += getScrollTop(w);
  return pos;
}
function _getComputedStyle(elem, name, computedStyle_) {
  var val = '';
  var d = elem.ownerDocument;
  var computedStyle = computedStyle_ || d.defaultView.getComputedStyle(elem, null);

  // https://github.com/kissyteam/kissy/issues/61
  if (computedStyle) {
    val = computedStyle.getPropertyValue(name) || computedStyle[name];
  }

  return val;
}

var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
var RE_POS = /^(top|right|bottom|left)$/;
var CURRENT_STYLE = 'currentStyle';
var RUNTIME_STYLE = 'runtimeStyle';
var LEFT = 'left';
var PX = 'px';

function _getComputedStyleIE(elem, name) {
  // currentStyle maybe null
  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
  // 在 ie 下不对，需要直接用 offset 方式
  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

  // From the awesome hack by Dean Edwards
  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
  // If we're not dealing with a regular pixel number
  // but a number that has a weird ending, we need to convert it to pixels
  // exclude left right for relativity
  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
    // Remember the original values
    var style = elem.style;
    var left = style[LEFT];
    var rsLeft = elem[RUNTIME_STYLE][LEFT];

    // prevent flashing of content
    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

    // Put in the new values to get a computed value out
    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
    ret = style.pixelLeft + PX;

    // Revert the changed values
    style[LEFT] = left;

    elem[RUNTIME_STYLE][LEFT] = rsLeft;
  }
  return ret === '' ? 'auto' : ret;
}

var getComputedStyleX = undefined;
if (typeof window !== 'undefined') {
  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
}

function each(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}

function isBorderBoxFn(elem) {
  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
}

var BOX_MODELS = ['margin', 'border', 'padding'];
var CONTENT_INDEX = -1;
var PADDING_INDEX = 2;
var BORDER_INDEX = 1;
var MARGIN_INDEX = 0;

function swap(elem, options, callback) {
  var old = {};
  var style = elem.style;
  var name = undefined;

  // Remember the old values, and insert the new ones
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      old[name] = style[name];
      style[name] = options[name];
    }
  }

  callback.call(elem);

  // Revert the old values
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      style[name] = old[name];
    }
  }
}

function getPBMWidth(elem, props, which) {
  var value = 0;
  var prop = undefined;
  var j = undefined;
  var i = undefined;
  for (j = 0; j < props.length; j++) {
    prop = props[j];
    if (prop) {
      for (i = 0; i < which.length; i++) {
        var cssProp = undefined;
        if (prop === 'border') {
          cssProp = prop + which[i] + 'Width';
        } else {
          cssProp = prop + which[i];
        }
        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
      }
    }
  }
  return value;
}

/**
 * A crude way of determining if an object is a window
 * @member util
 */
function isWindow(obj) {
  // must use == for ie8
  /* eslint eqeqeq:0 */
  return obj != null && obj == obj.window;
}

var domUtils = {};

each(['Width', 'Height'], function (name) {
  domUtils['doc' + name] = function (refWin) {
    var d = refWin.document;
    return Math.max(
    // firefox chrome documentElement.scrollHeight< body.scrollHeight
    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
    d.documentElement['scroll' + name],
    // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
    d.body['scroll' + name], domUtils['viewport' + name](d));
  };

  domUtils['viewport' + name] = function (win) {
    // pc browser includes scrollbar in window.innerWidth
    var prop = 'client' + name;
    var doc = win.document;
    var body = doc.body;
    var documentElement = doc.documentElement;
    var documentElementProp = documentElement[prop];
    // 标准模式取 documentElement
    // backcompat 取 body
    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
  };
});

/*
 得到元素的大小信息
 @param elem
 @param name
 @param {String} [extra]  'padding' : (css width) + padding
 'border' : (css width) + padding + border
 'margin' : (css width) + padding + border + margin
 */
function getWH(elem, name, extra) {
  if (isWindow(elem)) {
    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
  } else if (elem.nodeType === 9) {
    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
  }
  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
  var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
  var computedStyle = getComputedStyleX(elem);
  var isBorderBox = isBorderBoxFn(elem, computedStyle);
  var cssBoxValue = 0;
  if (borderBoxValue == null || borderBoxValue <= 0) {
    borderBoxValue = undefined;
    // Fall back to computed then un computed css if necessary
    cssBoxValue = getComputedStyleX(elem, name);
    if (cssBoxValue == null || Number(cssBoxValue) < 0) {
      cssBoxValue = elem.style[name] || 0;
    }
    // Normalize '', auto, and prepare for extra
    cssBoxValue = parseFloat(cssBoxValue) || 0;
  }
  if (extra === undefined) {
    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
  }
  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
  var val = borderBoxValue || cssBoxValue;
  if (extra === CONTENT_INDEX) {
    if (borderBoxValueOrIsBorderBox) {
      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
    }
    return cssBoxValue;
  }
  if (borderBoxValueOrIsBorderBox) {
    var padding = extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle);
    return val + (extra === BORDER_INDEX ? 0 : padding);
  }
  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
}

var cssShow = {
  position: 'absolute',
  visibility: 'hidden',
  display: 'block'
};

// fix #119 : https://github.com/kissyteam/kissy/issues/119
function getWHIgnoreDisplay(elem) {
  var val = undefined;
  var args = arguments;
  // in case elem is window
  // elem.offsetWidth === undefined
  if (elem.offsetWidth !== 0) {
    val = getWH.apply(undefined, args);
  } else {
    swap(elem, cssShow, function () {
      val = getWH.apply(undefined, args);
    });
  }
  return val;
}

function css(el, name, v) {
  var value = v;
  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
    for (var i in name) {
      if (name.hasOwnProperty(i)) {
        css(el, i, name[i]);
      }
    }
    return undefined;
  }
  if (typeof value !== 'undefined') {
    if (typeof value === 'number') {
      value += 'px';
    }
    el.style[name] = value;
    return undefined;
  }
  return getComputedStyleX(el, name);
}

each(['width', 'height'], function (name) {
  var first = name.charAt(0).toUpperCase() + name.slice(1);
  domUtils['outer' + first] = function (el, includeMargin) {
    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
  };
  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

  domUtils[name] = function (elem, val) {
    if (val !== undefined) {
      if (elem) {
        var computedStyle = getComputedStyleX(elem);
        var isBorderBox = isBorderBoxFn(elem);
        if (isBorderBox) {
          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
        }
        return css(elem, name, val);
      }
      return undefined;
    }
    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
  };
});

// 设置 elem 相对 elem.ownerDocument 的坐标
function setOffset(elem, offset) {
  // set position first, in-case top/left are set even on static elem
  if (css(elem, 'position') === 'static') {
    elem.style.position = 'relative';
  }

  var old = getOffset(elem);
  var ret = {};
  var current = undefined;
  var key = undefined;

  for (key in offset) {
    if (offset.hasOwnProperty(key)) {
      current = parseFloat(css(elem, key)) || 0;
      ret[key] = current + offset[key] - old[key];
    }
  }
  css(elem, ret);
}

module.exports = _extends({
  getWindow: function getWindow(node) {
    var doc = node.ownerDocument || node;
    return doc.defaultView || doc.parentWindow;
  },
  offset: function offset(el, value) {
    if (typeof value !== 'undefined') {
      setOffset(el, value);
    } else {
      return getOffset(el);
    }
  },

  isWindow: isWindow,
  each: each,
  css: css,
  clone: function clone(obj) {
    var ret = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        ret[i] = obj[i];
      }
    }
    var overflow = obj.overflow;
    if (overflow) {
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          ret.overflow[i] = obj.overflow[i];
        }
      }
    }
    return ret;
  },
  scrollLeft: function scrollLeft(w, v) {
    if (isWindow(w)) {
      if (v === undefined) {
        return getScrollLeft(w);
      }
      window.scrollTo(v, getScrollTop(w));
    } else {
      if (v === undefined) {
        return w.scrollLeft;
      }
      w.scrollLeft = v;
    }
  },
  scrollTop: function scrollTop(w, v) {
    if (isWindow(w)) {
      if (v === undefined) {
        return getScrollTop(w);
      }
      window.scrollTo(getScrollLeft(w), v);
    } else {
      if (v === undefined) {
        return w.scrollTop;
      }
      w.scrollTop = v;
    }
  },

  viewportWidth: 0,
  viewportHeight: 0
}, domUtils);

/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/index.js ***!
  \*****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/memize/index.js":
/*!**************************************!*\
  !*** ./node_modules/memize/index.js ***!
  \**************************************/
/***/ (function(module) {

/**
 * Memize options object.
 *
 * @typedef MemizeOptions
 *
 * @property {number} [maxSize] Maximum size of the cache.
 */

/**
 * Internal cache entry.
 *
 * @typedef MemizeCacheNode
 *
 * @property {?MemizeCacheNode|undefined} [prev] Previous node.
 * @property {?MemizeCacheNode|undefined} [next] Next node.
 * @property {Array<*>}                   args   Function arguments for cache
 *                                               entry.
 * @property {*}                          val    Function result.
 */

/**
 * Properties of the enhanced function for controlling cache.
 *
 * @typedef MemizeMemoizedFunction
 *
 * @property {()=>void} clear Clear the cache.
 */

/**
 * Accepts a function to be memoized, and returns a new memoized function, with
 * optional options.
 *
 * @template {Function} F
 *
 * @param {F}             fn        Function to memoize.
 * @param {MemizeOptions} [options] Options object.
 *
 * @return {F & MemizeMemoizedFunction} Memoized function.
 */
function memize( fn, options ) {
	var size = 0;

	/** @type {?MemizeCacheNode|undefined} */
	var head;

	/** @type {?MemizeCacheNode|undefined} */
	var tail;

	options = options || {};

	function memoized( /* ...args */ ) {
		var node = head,
			len = arguments.length,
			args, i;

		searchCache: while ( node ) {
			// Perform a shallow equality test to confirm that whether the node
			// under test is a candidate for the arguments passed. Two arrays
			// are shallowly equal if their length matches and each entry is
			// strictly equal between the two sets. Avoid abstracting to a
			// function which could incur an arguments leaking deoptimization.

			// Check whether node arguments match arguments length
			if ( node.args.length !== arguments.length ) {
				node = node.next;
				continue;
			}

			// Check whether node arguments match arguments values
			for ( i = 0; i < len; i++ ) {
				if ( node.args[ i ] !== arguments[ i ] ) {
					node = node.next;
					continue searchCache;
				}
			}

			// At this point we can assume we've found a match

			// Surface matched node to head if not already
			if ( node !== head ) {
				// As tail, shift to previous. Must only shift if not also
				// head, since if both head and tail, there is no previous.
				if ( node === tail ) {
					tail = node.prev;
				}

				// Adjust siblings to point to each other. If node was tail,
				// this also handles new tail's empty `next` assignment.
				/** @type {MemizeCacheNode} */ ( node.prev ).next = node.next;
				if ( node.next ) {
					node.next.prev = node.prev;
				}

				node.next = head;
				node.prev = null;
				/** @type {MemizeCacheNode} */ ( head ).prev = node;
				head = node;
			}

			// Return immediately
			return node.val;
		}

		// No cached value found. Continue to insertion phase:

		// Create a copy of arguments (avoid leaking deoptimization)
		args = new Array( len );
		for ( i = 0; i < len; i++ ) {
			args[ i ] = arguments[ i ];
		}

		node = {
			args: args,

			// Generate the result from original function
			val: fn.apply( null, args ),
		};

		// Don't need to check whether node is already head, since it would
		// have been returned above already if it was

		// Shift existing head down list
		if ( head ) {
			head.prev = node;
			node.next = head;
		} else {
			// If no head, follows that there's no tail (at initial or reset)
			tail = node;
		}

		// Trim tail if we're reached max size and are pending cache insertion
		if ( size === /** @type {MemizeOptions} */ ( options ).maxSize ) {
			tail = /** @type {MemizeCacheNode} */ ( tail ).prev;
			/** @type {MemizeCacheNode} */ ( tail ).next = null;
		} else {
			size++;
		}

		head = node;

		return node.val;
	}

	memoized.clear = function() {
		head = null;
		tail = null;
		size = 0;
	};

	if ( false ) {}

	// Ignore reason: There's not a clear solution to create an intersection of
	// the function with additional properties, where the goal is to retain the
	// function signature of the incoming argument and add control properties
	// on the return value.

	// @ts-ignore
	return memoized;
}

module.exports = memize;


/***/ }),

/***/ "./node_modules/remove-accents/index.js":
/*!**********************************************!*\
  !*** ./node_modules/remove-accents/index.js ***!
  \**********************************************/
/***/ (function(module) {

var characterMap = {
	"À": "A",
	"Á": "A",
	"Â": "A",
	"Ã": "A",
	"Ä": "A",
	"Å": "A",
	"Ấ": "A",
	"Ắ": "A",
	"Ẳ": "A",
	"Ẵ": "A",
	"Ặ": "A",
	"Æ": "AE",
	"Ầ": "A",
	"Ằ": "A",
	"Ȃ": "A",
	"Ç": "C",
	"Ḉ": "C",
	"È": "E",
	"É": "E",
	"Ê": "E",
	"Ë": "E",
	"Ế": "E",
	"Ḗ": "E",
	"Ề": "E",
	"Ḕ": "E",
	"Ḝ": "E",
	"Ȇ": "E",
	"Ì": "I",
	"Í": "I",
	"Î": "I",
	"Ï": "I",
	"Ḯ": "I",
	"Ȋ": "I",
	"Ð": "D",
	"Ñ": "N",
	"Ò": "O",
	"Ó": "O",
	"Ô": "O",
	"Õ": "O",
	"Ö": "O",
	"Ø": "O",
	"Ố": "O",
	"Ṍ": "O",
	"Ṓ": "O",
	"Ȏ": "O",
	"Ù": "U",
	"Ú": "U",
	"Û": "U",
	"Ü": "U",
	"Ý": "Y",
	"à": "a",
	"á": "a",
	"â": "a",
	"ã": "a",
	"ä": "a",
	"å": "a",
	"ấ": "a",
	"ắ": "a",
	"ẳ": "a",
	"ẵ": "a",
	"ặ": "a",
	"æ": "ae",
	"ầ": "a",
	"ằ": "a",
	"ȃ": "a",
	"ç": "c",
	"ḉ": "c",
	"è": "e",
	"é": "e",
	"ê": "e",
	"ë": "e",
	"ế": "e",
	"ḗ": "e",
	"ề": "e",
	"ḕ": "e",
	"ḝ": "e",
	"ȇ": "e",
	"ì": "i",
	"í": "i",
	"î": "i",
	"ï": "i",
	"ḯ": "i",
	"ȋ": "i",
	"ð": "d",
	"ñ": "n",
	"ò": "o",
	"ó": "o",
	"ô": "o",
	"õ": "o",
	"ö": "o",
	"ø": "o",
	"ố": "o",
	"ṍ": "o",
	"ṓ": "o",
	"ȏ": "o",
	"ù": "u",
	"ú": "u",
	"û": "u",
	"ü": "u",
	"ý": "y",
	"ÿ": "y",
	"Ā": "A",
	"ā": "a",
	"Ă": "A",
	"ă": "a",
	"Ą": "A",
	"ą": "a",
	"Ć": "C",
	"ć": "c",
	"Ĉ": "C",
	"ĉ": "c",
	"Ċ": "C",
	"ċ": "c",
	"Č": "C",
	"č": "c",
	"C̆": "C",
	"c̆": "c",
	"Ď": "D",
	"ď": "d",
	"Đ": "D",
	"đ": "d",
	"Ē": "E",
	"ē": "e",
	"Ĕ": "E",
	"ĕ": "e",
	"Ė": "E",
	"ė": "e",
	"Ę": "E",
	"ę": "e",
	"Ě": "E",
	"ě": "e",
	"Ĝ": "G",
	"Ǵ": "G",
	"ĝ": "g",
	"ǵ": "g",
	"Ğ": "G",
	"ğ": "g",
	"Ġ": "G",
	"ġ": "g",
	"Ģ": "G",
	"ģ": "g",
	"Ĥ": "H",
	"ĥ": "h",
	"Ħ": "H",
	"ħ": "h",
	"Ḫ": "H",
	"ḫ": "h",
	"Ĩ": "I",
	"ĩ": "i",
	"Ī": "I",
	"ī": "i",
	"Ĭ": "I",
	"ĭ": "i",
	"Į": "I",
	"į": "i",
	"İ": "I",
	"ı": "i",
	"Ĳ": "IJ",
	"ĳ": "ij",
	"Ĵ": "J",
	"ĵ": "j",
	"Ķ": "K",
	"ķ": "k",
	"Ḱ": "K",
	"ḱ": "k",
	"K̆": "K",
	"k̆": "k",
	"Ĺ": "L",
	"ĺ": "l",
	"Ļ": "L",
	"ļ": "l",
	"Ľ": "L",
	"ľ": "l",
	"Ŀ": "L",
	"ŀ": "l",
	"Ł": "l",
	"ł": "l",
	"Ḿ": "M",
	"ḿ": "m",
	"M̆": "M",
	"m̆": "m",
	"Ń": "N",
	"ń": "n",
	"Ņ": "N",
	"ņ": "n",
	"Ň": "N",
	"ň": "n",
	"ŉ": "n",
	"N̆": "N",
	"n̆": "n",
	"Ō": "O",
	"ō": "o",
	"Ŏ": "O",
	"ŏ": "o",
	"Ő": "O",
	"ő": "o",
	"Œ": "OE",
	"œ": "oe",
	"P̆": "P",
	"p̆": "p",
	"Ŕ": "R",
	"ŕ": "r",
	"Ŗ": "R",
	"ŗ": "r",
	"Ř": "R",
	"ř": "r",
	"R̆": "R",
	"r̆": "r",
	"Ȓ": "R",
	"ȓ": "r",
	"Ś": "S",
	"ś": "s",
	"Ŝ": "S",
	"ŝ": "s",
	"Ş": "S",
	"Ș": "S",
	"ș": "s",
	"ş": "s",
	"Š": "S",
	"š": "s",
	"Ţ": "T",
	"ţ": "t",
	"ț": "t",
	"Ț": "T",
	"Ť": "T",
	"ť": "t",
	"Ŧ": "T",
	"ŧ": "t",
	"T̆": "T",
	"t̆": "t",
	"Ũ": "U",
	"ũ": "u",
	"Ū": "U",
	"ū": "u",
	"Ŭ": "U",
	"ŭ": "u",
	"Ů": "U",
	"ů": "u",
	"Ű": "U",
	"ű": "u",
	"Ų": "U",
	"ų": "u",
	"Ȗ": "U",
	"ȗ": "u",
	"V̆": "V",
	"v̆": "v",
	"Ŵ": "W",
	"ŵ": "w",
	"Ẃ": "W",
	"ẃ": "w",
	"X̆": "X",
	"x̆": "x",
	"Ŷ": "Y",
	"ŷ": "y",
	"Ÿ": "Y",
	"Y̆": "Y",
	"y̆": "y",
	"Ź": "Z",
	"ź": "z",
	"Ż": "Z",
	"ż": "z",
	"Ž": "Z",
	"ž": "z",
	"ſ": "s",
	"ƒ": "f",
	"Ơ": "O",
	"ơ": "o",
	"Ư": "U",
	"ư": "u",
	"Ǎ": "A",
	"ǎ": "a",
	"Ǐ": "I",
	"ǐ": "i",
	"Ǒ": "O",
	"ǒ": "o",
	"Ǔ": "U",
	"ǔ": "u",
	"Ǖ": "U",
	"ǖ": "u",
	"Ǘ": "U",
	"ǘ": "u",
	"Ǚ": "U",
	"ǚ": "u",
	"Ǜ": "U",
	"ǜ": "u",
	"Ứ": "U",
	"ứ": "u",
	"Ṹ": "U",
	"ṹ": "u",
	"Ǻ": "A",
	"ǻ": "a",
	"Ǽ": "AE",
	"ǽ": "ae",
	"Ǿ": "O",
	"ǿ": "o",
	"Þ": "TH",
	"þ": "th",
	"Ṕ": "P",
	"ṕ": "p",
	"Ṥ": "S",
	"ṥ": "s",
	"X́": "X",
	"x́": "x",
	"Ѓ": "Г",
	"ѓ": "г",
	"Ќ": "К",
	"ќ": "к",
	"A̋": "A",
	"a̋": "a",
	"E̋": "E",
	"e̋": "e",
	"I̋": "I",
	"i̋": "i",
	"Ǹ": "N",
	"ǹ": "n",
	"Ồ": "O",
	"ồ": "o",
	"Ṑ": "O",
	"ṑ": "o",
	"Ừ": "U",
	"ừ": "u",
	"Ẁ": "W",
	"ẁ": "w",
	"Ỳ": "Y",
	"ỳ": "y",
	"Ȁ": "A",
	"ȁ": "a",
	"Ȅ": "E",
	"ȅ": "e",
	"Ȉ": "I",
	"ȉ": "i",
	"Ȍ": "O",
	"ȍ": "o",
	"Ȑ": "R",
	"ȑ": "r",
	"Ȕ": "U",
	"ȕ": "u",
	"B̌": "B",
	"b̌": "b",
	"Č̣": "C",
	"č̣": "c",
	"Ê̌": "E",
	"ê̌": "e",
	"F̌": "F",
	"f̌": "f",
	"Ǧ": "G",
	"ǧ": "g",
	"Ȟ": "H",
	"ȟ": "h",
	"J̌": "J",
	"ǰ": "j",
	"Ǩ": "K",
	"ǩ": "k",
	"M̌": "M",
	"m̌": "m",
	"P̌": "P",
	"p̌": "p",
	"Q̌": "Q",
	"q̌": "q",
	"Ř̩": "R",
	"ř̩": "r",
	"Ṧ": "S",
	"ṧ": "s",
	"V̌": "V",
	"v̌": "v",
	"W̌": "W",
	"w̌": "w",
	"X̌": "X",
	"x̌": "x",
	"Y̌": "Y",
	"y̌": "y",
	"A̧": "A",
	"a̧": "a",
	"B̧": "B",
	"b̧": "b",
	"Ḑ": "D",
	"ḑ": "d",
	"Ȩ": "E",
	"ȩ": "e",
	"Ɛ̧": "E",
	"ɛ̧": "e",
	"Ḩ": "H",
	"ḩ": "h",
	"I̧": "I",
	"i̧": "i",
	"Ɨ̧": "I",
	"ɨ̧": "i",
	"M̧": "M",
	"m̧": "m",
	"O̧": "O",
	"o̧": "o",
	"Q̧": "Q",
	"q̧": "q",
	"U̧": "U",
	"u̧": "u",
	"X̧": "X",
	"x̧": "x",
	"Z̧": "Z",
	"z̧": "z",
};

var chars = Object.keys(characterMap).join('|');
var allAccents = new RegExp(chars, 'g');
var firstAccent = new RegExp(chars, '');

var removeAccents = function(string) {	
	return string.replace(allAccents, function(match) {
		return characterMap[match];
	});
};

var hasAccents = function(string) {
	return !!string.match(firstAccent);
};

module.exports = removeAccents;
module.exports.has = hasAccents;
module.exports.remove = removeAccents;


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ rng; }
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ __webpack_exports__["default"] = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ __webpack_exports__["default"] = (validate);

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/animate/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/animate/index.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Animate; },
/* harmony export */   "getAnimateClassName": function() { return /* binding */ getAnimateClassName; }
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External dependencies
 */

/**
 * @typedef {'top' | 'top left' | 'top right' | 'middle' | 'middle left' | 'middle right' | 'bottom' | 'bottom left' | 'bottom right'} AppearOrigin
 * @typedef {'left' | 'right'} SlideInOrigin
 * @typedef {{ type: 'appear'; origin?: AppearOrigin }} AppearOptions
 * @typedef {{ type: 'slide-in'; origin?: SlideInOrigin }} SlideInOptions
 * @typedef {{ type: 'loading' }} LoadingOptions
 * @typedef {AppearOptions | SlideInOptions | LoadingOptions} GetAnimateOptions
 */

/* eslint-disable jsdoc/valid-types */

/**
 * @param {GetAnimateOptions['type']} type The animation type
 * @return {'top' | 'left'} Default origin
 */

function getDefaultOrigin(type) {
  return type === 'appear' ? 'top' : 'left';
}
/* eslint-enable jsdoc/valid-types */

/**
 * @param {GetAnimateOptions} options
 *
 * @return {string | void} ClassName that applies the animations
 */


function getAnimateClassName(options) {
  if (options.type === 'loading') {
    return classnames__WEBPACK_IMPORTED_MODULE_0___default()('components-animate__loading');
  }

  const {
    type,
    origin = getDefaultOrigin(type)
  } = options;

  if (type === 'appear') {
    const [yAxis, xAxis = 'center'] = origin.split(' ');
    return classnames__WEBPACK_IMPORTED_MODULE_0___default()('components-animate__appear', {
      ['is-from-' + xAxis]: xAxis !== 'center',
      ['is-from-' + yAxis]: yAxis !== 'middle'
    });
  }

  if (type === 'slide-in') {
    return classnames__WEBPACK_IMPORTED_MODULE_0___default()('components-animate__slide-in', 'is-from-' + origin);
  }
} // @ts-ignore Reason: Planned for deprecation

function Animate(_ref) {
  let {
    type,
    options = {},
    children
  } = _ref;
  return children({
    className: getAnimateClassName({
      type,
      ...options
    })
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/base-control/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/base-control/index.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseControl": function() { return /* binding */ BaseControl; },
/* harmony export */   "VisualLabel": function() { return /* binding */ VisualLabel; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _visually_hidden__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../visually-hidden */ "./node_modules/wordpress-components/build-module/visually-hidden/component.js");
/* harmony import */ var _styles_base_control_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/base-control-styles */ "./node_modules/wordpress-components/build-module/base-control/styles/base-control-styles.js");



/**
 * External dependencies
 */

/**
 * Internal dependencies
 */




/**
 * `BaseControl` is a component used to generate labels and help text for components handling user inputs.
 *
 * @example
 * // Render a `BaseControl` for a textarea input
 * import { BaseControl } from '@wordpress/components';
 *
 * // The `id` prop is necessary to accessibly associate the label with the textarea
 * const MyBaseControl = () => (
 *   <BaseControl id="textarea-1" label="Text" help="Enter some text" __nextHasNoMarginBottom={ true }>
 *     <textarea id="textarea-1" />
 *   </BaseControl>
 * );
 */
const BaseControl = _ref => {
  let {
    __nextHasNoMarginBottom = false,
    id,
    label,
    hideLabelFromVision = false,
    help,
    className,
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_styles_base_control_styles__WEBPACK_IMPORTED_MODULE_3__.Wrapper, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('components-base-control', className)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_styles_base_control_styles__WEBPACK_IMPORTED_MODULE_3__.StyledField, {
    className: "components-base-control__field" // TODO: Official deprecation for this should start after all internal usages have been migrated
    ,
    __nextHasNoMarginBottom: __nextHasNoMarginBottom
  }, label && id && (hideLabelFromVision ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_visually_hidden__WEBPACK_IMPORTED_MODULE_4__["default"], {
    as: "label",
    htmlFor: id
  }, label) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_styles_base_control_styles__WEBPACK_IMPORTED_MODULE_3__.StyledLabel, {
    className: "components-base-control__label",
    htmlFor: id
  }, label)), label && !id && (hideLabelFromVision ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_visually_hidden__WEBPACK_IMPORTED_MODULE_4__["default"], {
    as: "label"
  }, label) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BaseControl.VisualLabel, null, label)), children), !!help && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_styles_base_control_styles__WEBPACK_IMPORTED_MODULE_3__.StyledHelp, {
    id: id ? id + '__help' : undefined,
    className: "components-base-control__help",
    __nextHasNoMarginBottom: __nextHasNoMarginBottom
  }, help));
};
/**
 * `BaseControl.VisualLabel` is used to render a purely visual label inside a `BaseControl` component.
 *
 * It should only be used in cases where the children being rendered inside `BaseControl` are already accessibly labeled,
 * e.g., a button, but we want an additional visual label for that section equivalent to the labels `BaseControl` would
 * otherwise use if the `label` prop was passed.
 *
 * @example
 * import { BaseControl } from '@wordpress/components';
 *
 * const MyBaseControl = () => (
 * 	<BaseControl help="This button is already accessibly labeled.">
 * 		<BaseControl.VisualLabel>Author</BaseControl.VisualLabel>
 * 		<Button>Select an author</Button>
 * 	</BaseControl>
 * );
 */

const VisualLabel = _ref2 => {
  let {
    className,
    children,
    ...props
  } = _ref2;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_styles_base_control_styles__WEBPACK_IMPORTED_MODULE_3__.StyledVisualLabel, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('components-base-control__label', className)
  }), children);
};
BaseControl.VisualLabel = VisualLabel;
/* harmony default export */ __webpack_exports__["default"] = (BaseControl);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/base-control/styles/base-control-styles.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/base-control/styles/base-control-styles.js ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyledField": function() { return /* binding */ StyledField; },
/* harmony export */   "StyledHelp": function() { return /* binding */ StyledHelp; },
/* harmony export */   "StyledLabel": function() { return /* binding */ StyledLabel; },
/* harmony export */   "StyledVisualLabel": function() { return /* binding */ StyledVisualLabel; },
/* harmony export */   "Wrapper": function() { return /* binding */ Wrapper; }
/* harmony export */ });
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled/base */ "./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./node_modules/wordpress-components/build-module/utils/font.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "./node_modules/wordpress-components/build-module/utils/box-sizing.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils */ "./node_modules/wordpress-components/build-module/utils/base-label.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils */ "./node_modules/wordpress-components/build-module/utils/colors-values.js");
/* harmony import */ var _ui_utils_space__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui/utils/space */ "./node_modules/wordpress-components/build-module/ui/utils/space.js");


function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */



const Wrapper = (0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__["default"])("div",  false ? 0 : {
  target: "ej5x27r4",
  label: "Wrapper"
})("font-family:", (0,_utils__WEBPACK_IMPORTED_MODULE_1__.font)('default.fontFamily'), ";font-size:", (0,_utils__WEBPACK_IMPORTED_MODULE_1__.font)('default.fontSize'), ";", _utils__WEBPACK_IMPORTED_MODULE_2__.boxSizingReset, ";" + ( false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYmFzZS1jb250cm9sL3N0eWxlcy9iYXNlLWNvbnRyb2wtc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlpQyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2Jhc2UtY29udHJvbC9zdHlsZXMvYmFzZS1jb250cm9sLXN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgYmFzZUxhYmVsVHlwb2dyYXBoeSwgYm94U2l6aW5nUmVzZXQsIGZvbnQsIENPTE9SUyB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSAnLi4vLi4vdWkvdXRpbHMvc3BhY2UnO1xuXG5leHBvcnQgY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXG5cdGZvbnQtZmFtaWx5OiAkeyBmb250KCAnZGVmYXVsdC5mb250RmFtaWx5JyApIH07XG5cdGZvbnQtc2l6ZTogJHsgZm9udCggJ2RlZmF1bHQuZm9udFNpemUnICkgfTtcblxuXHQkeyBib3hTaXppbmdSZXNldCB9XG5gO1xuXG5jb25zdCBkZXByZWNhdGVkTWFyZ2luRmllbGQgPSAoIHsgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gPSBmYWxzZSB9ICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdCEgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gJiZcblx0XHRjc3NgXG5cdFx0XHRtYXJnaW4tYm90dG9tOiAkeyBzcGFjZSggMiApIH07XG5cdFx0YFxuXHQpO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEZpZWxkID0gc3R5bGVkLmRpdmBcblx0JHsgZGVwcmVjYXRlZE1hcmdpbkZpZWxkIH1cblxuXHQuY29tcG9uZW50cy1wYW5lbF9fcm93ICYge1xuXHRcdG1hcmdpbi1ib3R0b206IGluaGVyaXQ7XG5cdH1cbmA7XG5cbmNvbnN0IGxhYmVsU3R5bGVzID0gY3NzYFxuXHQkeyBiYXNlTGFiZWxUeXBvZ3JhcGh5IH07XG5cblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRtYXJnaW4tYm90dG9tOiAkeyBzcGFjZSggMiApIH07XG5cdC8qKlxuXHQgKiBSZW1vdmVzIENocm9tZS9TYWZhcmkvRmlyZWZveCB1c2VyIGFnZW50IHN0eWxlc2hlZXQgcGFkZGluZyBmcm9tXG5cdCAqIFN0eWxlZExhYmVsIHdoZW4gaXQgaXMgcmVuZGVyZWQgYXMgYSBsZWdlbmQuXG5cdCAqL1xuXHRwYWRkaW5nOiAwO1xuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZExhYmVsID0gc3R5bGVkLmxhYmVsYFxuXHQkeyBsYWJlbFN0eWxlcyB9XG5gO1xuXG5jb25zdCBkZXByZWNhdGVkTWFyZ2luSGVscCA9ICggeyBfX25leHRIYXNOb01hcmdpbkJvdHRvbSA9IGZhbHNlIH0gKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0ISBfX25leHRIYXNOb01hcmdpbkJvdHRvbSAmJlxuXHRcdGNzc2Bcblx0XHRcdG1hcmdpbi1ib3R0b206IHJldmVydDtcblx0XHRgXG5cdCk7XG59O1xuXG5leHBvcnQgY29uc3QgU3R5bGVkSGVscCA9IHN0eWxlZC5wYFxuXHRtYXJnaW4tdG9wOiAkeyBzcGFjZSggMiApIH07XG5cdG1hcmdpbi1ib3R0b206IDA7XG5cdGZvbnQtc2l6ZTogJHsgZm9udCggJ2hlbHBUZXh0LmZvbnRTaXplJyApIH07XG5cdGZvbnQtc3R5bGU6IG5vcm1hbDtcblx0Y29sb3I6ICR7IENPTE9SUy5tZWRpdW1HcmF5LnRleHQgfTtcblxuXHQkeyBkZXByZWNhdGVkTWFyZ2luSGVscCB9XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkVmlzdWFsTGFiZWwgPSBzdHlsZWQuc3BhbmBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcbiJdfQ== */"));

const deprecatedMarginField = _ref2 => {
  let {
    __nextHasNoMarginBottom = false
  } = _ref2;
  return !__nextHasNoMarginBottom && /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.css)("margin-bottom:", (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_4__.space)(2), ";" + ( false ? 0 : ";label:deprecatedMarginField;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYmFzZS1jb250cm9sL3N0eWxlcy9iYXNlLWNvbnRyb2wtc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCSyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2Jhc2UtY29udHJvbC9zdHlsZXMvYmFzZS1jb250cm9sLXN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgYmFzZUxhYmVsVHlwb2dyYXBoeSwgYm94U2l6aW5nUmVzZXQsIGZvbnQsIENPTE9SUyB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSAnLi4vLi4vdWkvdXRpbHMvc3BhY2UnO1xuXG5leHBvcnQgY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXG5cdGZvbnQtZmFtaWx5OiAkeyBmb250KCAnZGVmYXVsdC5mb250RmFtaWx5JyApIH07XG5cdGZvbnQtc2l6ZTogJHsgZm9udCggJ2RlZmF1bHQuZm9udFNpemUnICkgfTtcblxuXHQkeyBib3hTaXppbmdSZXNldCB9XG5gO1xuXG5jb25zdCBkZXByZWNhdGVkTWFyZ2luRmllbGQgPSAoIHsgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gPSBmYWxzZSB9ICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdCEgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gJiZcblx0XHRjc3NgXG5cdFx0XHRtYXJnaW4tYm90dG9tOiAkeyBzcGFjZSggMiApIH07XG5cdFx0YFxuXHQpO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEZpZWxkID0gc3R5bGVkLmRpdmBcblx0JHsgZGVwcmVjYXRlZE1hcmdpbkZpZWxkIH1cblxuXHQuY29tcG9uZW50cy1wYW5lbF9fcm93ICYge1xuXHRcdG1hcmdpbi1ib3R0b206IGluaGVyaXQ7XG5cdH1cbmA7XG5cbmNvbnN0IGxhYmVsU3R5bGVzID0gY3NzYFxuXHQkeyBiYXNlTGFiZWxUeXBvZ3JhcGh5IH07XG5cblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRtYXJnaW4tYm90dG9tOiAkeyBzcGFjZSggMiApIH07XG5cdC8qKlxuXHQgKiBSZW1vdmVzIENocm9tZS9TYWZhcmkvRmlyZWZveCB1c2VyIGFnZW50IHN0eWxlc2hlZXQgcGFkZGluZyBmcm9tXG5cdCAqIFN0eWxlZExhYmVsIHdoZW4gaXQgaXMgcmVuZGVyZWQgYXMgYSBsZWdlbmQuXG5cdCAqL1xuXHRwYWRkaW5nOiAwO1xuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZExhYmVsID0gc3R5bGVkLmxhYmVsYFxuXHQkeyBsYWJlbFN0eWxlcyB9XG5gO1xuXG5jb25zdCBkZXByZWNhdGVkTWFyZ2luSGVscCA9ICggeyBfX25leHRIYXNOb01hcmdpbkJvdHRvbSA9IGZhbHNlIH0gKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0ISBfX25leHRIYXNOb01hcmdpbkJvdHRvbSAmJlxuXHRcdGNzc2Bcblx0XHRcdG1hcmdpbi1ib3R0b206IHJldmVydDtcblx0XHRgXG5cdCk7XG59O1xuXG5leHBvcnQgY29uc3QgU3R5bGVkSGVscCA9IHN0eWxlZC5wYFxuXHRtYXJnaW4tdG9wOiAkeyBzcGFjZSggMiApIH07XG5cdG1hcmdpbi1ib3R0b206IDA7XG5cdGZvbnQtc2l6ZTogJHsgZm9udCggJ2hlbHBUZXh0LmZvbnRTaXplJyApIH07XG5cdGZvbnQtc3R5bGU6IG5vcm1hbDtcblx0Y29sb3I6ICR7IENPTE9SUy5tZWRpdW1HcmF5LnRleHQgfTtcblxuXHQkeyBkZXByZWNhdGVkTWFyZ2luSGVscCB9XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkVmlzdWFsTGFiZWwgPSBzdHlsZWQuc3BhbmBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcbiJdfQ== */");
};

const StyledField = (0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__["default"])("div",  false ? 0 : {
  target: "ej5x27r3",
  label: "StyledField"
})(deprecatedMarginField, " .components-panel__row &{margin-bottom:inherit;}" + ( false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYmFzZS1jb250cm9sL3N0eWxlcy9iYXNlLWNvbnRyb2wtc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCcUMiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9iYXNlLWNvbnRyb2wvc3R5bGVzL2Jhc2UtY29udHJvbC1zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGJhc2VMYWJlbFR5cG9ncmFwaHksIGJveFNpemluZ1Jlc2V0LCBmb250LCBDT0xPUlMgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3VpL3V0aWxzL3NwYWNlJztcblxuZXhwb3J0IGNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuXHRmb250LWZhbWlseTogJHsgZm9udCggJ2RlZmF1bHQuZm9udEZhbWlseScgKSB9O1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdkZWZhdWx0LmZvbnRTaXplJyApIH07XG5cblx0JHsgYm94U2l6aW5nUmVzZXQgfVxuYDtcblxuY29uc3QgZGVwcmVjYXRlZE1hcmdpbkZpZWxkID0gKCB7IF9fbmV4dEhhc05vTWFyZ2luQm90dG9tID0gZmFsc2UgfSApID0+IHtcblx0cmV0dXJuIChcblx0XHQhIF9fbmV4dEhhc05vTWFyZ2luQm90dG9tICYmXG5cdFx0Y3NzYFxuXHRcdFx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHRcdGBcblx0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRGaWVsZCA9IHN0eWxlZC5kaXZgXG5cdCR7IGRlcHJlY2F0ZWRNYXJnaW5GaWVsZCB9XG5cblx0LmNvbXBvbmVudHMtcGFuZWxfX3JvdyAmIHtcblx0XHRtYXJnaW4tYm90dG9tOiBpbmhlcml0O1xuXHR9XG5gO1xuXG5jb25zdCBsYWJlbFN0eWxlcyA9IGNzc2Bcblx0JHsgYmFzZUxhYmVsVHlwb2dyYXBoeSB9O1xuXG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHQvKipcblx0ICogUmVtb3ZlcyBDaHJvbWUvU2FmYXJpL0ZpcmVmb3ggdXNlciBhZ2VudCBzdHlsZXNoZWV0IHBhZGRpbmcgZnJvbVxuXHQgKiBTdHlsZWRMYWJlbCB3aGVuIGl0IGlzIHJlbmRlcmVkIGFzIGEgbGVnZW5kLlxuXHQgKi9cblx0cGFkZGluZzogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcblxuY29uc3QgZGVwcmVjYXRlZE1hcmdpbkhlbHAgPSAoIHsgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gPSBmYWxzZSB9ICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdCEgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gJiZcblx0XHRjc3NgXG5cdFx0XHRtYXJnaW4tYm90dG9tOiByZXZlcnQ7XG5cdFx0YFxuXHQpO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEhlbHAgPSBzdHlsZWQucGBcblx0bWFyZ2luLXRvcDogJHsgc3BhY2UoIDIgKSB9O1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdoZWxwVGV4dC5mb250U2l6ZScgKSB9O1xuXHRmb250LXN0eWxlOiBub3JtYWw7XG5cdGNvbG9yOiAkeyBDT0xPUlMubWVkaXVtR3JheS50ZXh0IH07XG5cblx0JHsgZGVwcmVjYXRlZE1hcmdpbkhlbHAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZFZpc3VhbExhYmVsID0gc3R5bGVkLnNwYW5gXG5cdCR7IGxhYmVsU3R5bGVzIH1cbmA7XG4iXX0= */"));
const labelStyles = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.css)(_utils__WEBPACK_IMPORTED_MODULE_5__.baseLabelTypography, ";display:inline-block;margin-bottom:", (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_4__.space)(2), ";padding:0;" + ( false ? 0 : ";label:labelStyles;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYmFzZS1jb250cm9sL3N0eWxlcy9iYXNlLWNvbnRyb2wtc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9DdUIiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9iYXNlLWNvbnRyb2wvc3R5bGVzL2Jhc2UtY29udHJvbC1zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGJhc2VMYWJlbFR5cG9ncmFwaHksIGJveFNpemluZ1Jlc2V0LCBmb250LCBDT0xPUlMgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3VpL3V0aWxzL3NwYWNlJztcblxuZXhwb3J0IGNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuXHRmb250LWZhbWlseTogJHsgZm9udCggJ2RlZmF1bHQuZm9udEZhbWlseScgKSB9O1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdkZWZhdWx0LmZvbnRTaXplJyApIH07XG5cblx0JHsgYm94U2l6aW5nUmVzZXQgfVxuYDtcblxuY29uc3QgZGVwcmVjYXRlZE1hcmdpbkZpZWxkID0gKCB7IF9fbmV4dEhhc05vTWFyZ2luQm90dG9tID0gZmFsc2UgfSApID0+IHtcblx0cmV0dXJuIChcblx0XHQhIF9fbmV4dEhhc05vTWFyZ2luQm90dG9tICYmXG5cdFx0Y3NzYFxuXHRcdFx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHRcdGBcblx0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRGaWVsZCA9IHN0eWxlZC5kaXZgXG5cdCR7IGRlcHJlY2F0ZWRNYXJnaW5GaWVsZCB9XG5cblx0LmNvbXBvbmVudHMtcGFuZWxfX3JvdyAmIHtcblx0XHRtYXJnaW4tYm90dG9tOiBpbmhlcml0O1xuXHR9XG5gO1xuXG5jb25zdCBsYWJlbFN0eWxlcyA9IGNzc2Bcblx0JHsgYmFzZUxhYmVsVHlwb2dyYXBoeSB9O1xuXG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHQvKipcblx0ICogUmVtb3ZlcyBDaHJvbWUvU2FmYXJpL0ZpcmVmb3ggdXNlciBhZ2VudCBzdHlsZXNoZWV0IHBhZGRpbmcgZnJvbVxuXHQgKiBTdHlsZWRMYWJlbCB3aGVuIGl0IGlzIHJlbmRlcmVkIGFzIGEgbGVnZW5kLlxuXHQgKi9cblx0cGFkZGluZzogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcblxuY29uc3QgZGVwcmVjYXRlZE1hcmdpbkhlbHAgPSAoIHsgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gPSBmYWxzZSB9ICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdCEgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gJiZcblx0XHRjc3NgXG5cdFx0XHRtYXJnaW4tYm90dG9tOiByZXZlcnQ7XG5cdFx0YFxuXHQpO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEhlbHAgPSBzdHlsZWQucGBcblx0bWFyZ2luLXRvcDogJHsgc3BhY2UoIDIgKSB9O1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdoZWxwVGV4dC5mb250U2l6ZScgKSB9O1xuXHRmb250LXN0eWxlOiBub3JtYWw7XG5cdGNvbG9yOiAkeyBDT0xPUlMubWVkaXVtR3JheS50ZXh0IH07XG5cblx0JHsgZGVwcmVjYXRlZE1hcmdpbkhlbHAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZFZpc3VhbExhYmVsID0gc3R5bGVkLnNwYW5gXG5cdCR7IGxhYmVsU3R5bGVzIH1cbmA7XG4iXX0= */");
const StyledLabel = (0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__["default"])("label",  false ? 0 : {
  target: "ej5x27r2",
  label: "StyledLabel"
})(labelStyles, ";" + ( false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYmFzZS1jb250cm9sL3N0eWxlcy9iYXNlLWNvbnRyb2wtc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdEdUMiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9iYXNlLWNvbnRyb2wvc3R5bGVzL2Jhc2UtY29udHJvbC1zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGJhc2VMYWJlbFR5cG9ncmFwaHksIGJveFNpemluZ1Jlc2V0LCBmb250LCBDT0xPUlMgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3VpL3V0aWxzL3NwYWNlJztcblxuZXhwb3J0IGNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuXHRmb250LWZhbWlseTogJHsgZm9udCggJ2RlZmF1bHQuZm9udEZhbWlseScgKSB9O1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdkZWZhdWx0LmZvbnRTaXplJyApIH07XG5cblx0JHsgYm94U2l6aW5nUmVzZXQgfVxuYDtcblxuY29uc3QgZGVwcmVjYXRlZE1hcmdpbkZpZWxkID0gKCB7IF9fbmV4dEhhc05vTWFyZ2luQm90dG9tID0gZmFsc2UgfSApID0+IHtcblx0cmV0dXJuIChcblx0XHQhIF9fbmV4dEhhc05vTWFyZ2luQm90dG9tICYmXG5cdFx0Y3NzYFxuXHRcdFx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHRcdGBcblx0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRGaWVsZCA9IHN0eWxlZC5kaXZgXG5cdCR7IGRlcHJlY2F0ZWRNYXJnaW5GaWVsZCB9XG5cblx0LmNvbXBvbmVudHMtcGFuZWxfX3JvdyAmIHtcblx0XHRtYXJnaW4tYm90dG9tOiBpbmhlcml0O1xuXHR9XG5gO1xuXG5jb25zdCBsYWJlbFN0eWxlcyA9IGNzc2Bcblx0JHsgYmFzZUxhYmVsVHlwb2dyYXBoeSB9O1xuXG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHQvKipcblx0ICogUmVtb3ZlcyBDaHJvbWUvU2FmYXJpL0ZpcmVmb3ggdXNlciBhZ2VudCBzdHlsZXNoZWV0IHBhZGRpbmcgZnJvbVxuXHQgKiBTdHlsZWRMYWJlbCB3aGVuIGl0IGlzIHJlbmRlcmVkIGFzIGEgbGVnZW5kLlxuXHQgKi9cblx0cGFkZGluZzogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcblxuY29uc3QgZGVwcmVjYXRlZE1hcmdpbkhlbHAgPSAoIHsgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gPSBmYWxzZSB9ICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdCEgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gJiZcblx0XHRjc3NgXG5cdFx0XHRtYXJnaW4tYm90dG9tOiByZXZlcnQ7XG5cdFx0YFxuXHQpO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEhlbHAgPSBzdHlsZWQucGBcblx0bWFyZ2luLXRvcDogJHsgc3BhY2UoIDIgKSB9O1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdoZWxwVGV4dC5mb250U2l6ZScgKSB9O1xuXHRmb250LXN0eWxlOiBub3JtYWw7XG5cdGNvbG9yOiAkeyBDT0xPUlMubWVkaXVtR3JheS50ZXh0IH07XG5cblx0JHsgZGVwcmVjYXRlZE1hcmdpbkhlbHAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZFZpc3VhbExhYmVsID0gc3R5bGVkLnNwYW5gXG5cdCR7IGxhYmVsU3R5bGVzIH1cbmA7XG4iXX0= */"));

var _ref =  false ? 0 : {
  name: "1xen9ob-deprecatedMarginHelp",
  styles: "margin-bottom:revert;label:deprecatedMarginHelp;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYmFzZS1jb250cm9sL3N0eWxlcy9iYXNlLWNvbnRyb2wtc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVESyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2Jhc2UtY29udHJvbC9zdHlsZXMvYmFzZS1jb250cm9sLXN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgYmFzZUxhYmVsVHlwb2dyYXBoeSwgYm94U2l6aW5nUmVzZXQsIGZvbnQsIENPTE9SUyB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSAnLi4vLi4vdWkvdXRpbHMvc3BhY2UnO1xuXG5leHBvcnQgY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXG5cdGZvbnQtZmFtaWx5OiAkeyBmb250KCAnZGVmYXVsdC5mb250RmFtaWx5JyApIH07XG5cdGZvbnQtc2l6ZTogJHsgZm9udCggJ2RlZmF1bHQuZm9udFNpemUnICkgfTtcblxuXHQkeyBib3hTaXppbmdSZXNldCB9XG5gO1xuXG5jb25zdCBkZXByZWNhdGVkTWFyZ2luRmllbGQgPSAoIHsgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gPSBmYWxzZSB9ICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdCEgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gJiZcblx0XHRjc3NgXG5cdFx0XHRtYXJnaW4tYm90dG9tOiAkeyBzcGFjZSggMiApIH07XG5cdFx0YFxuXHQpO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEZpZWxkID0gc3R5bGVkLmRpdmBcblx0JHsgZGVwcmVjYXRlZE1hcmdpbkZpZWxkIH1cblxuXHQuY29tcG9uZW50cy1wYW5lbF9fcm93ICYge1xuXHRcdG1hcmdpbi1ib3R0b206IGluaGVyaXQ7XG5cdH1cbmA7XG5cbmNvbnN0IGxhYmVsU3R5bGVzID0gY3NzYFxuXHQkeyBiYXNlTGFiZWxUeXBvZ3JhcGh5IH07XG5cblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRtYXJnaW4tYm90dG9tOiAkeyBzcGFjZSggMiApIH07XG5cdC8qKlxuXHQgKiBSZW1vdmVzIENocm9tZS9TYWZhcmkvRmlyZWZveCB1c2VyIGFnZW50IHN0eWxlc2hlZXQgcGFkZGluZyBmcm9tXG5cdCAqIFN0eWxlZExhYmVsIHdoZW4gaXQgaXMgcmVuZGVyZWQgYXMgYSBsZWdlbmQuXG5cdCAqL1xuXHRwYWRkaW5nOiAwO1xuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZExhYmVsID0gc3R5bGVkLmxhYmVsYFxuXHQkeyBsYWJlbFN0eWxlcyB9XG5gO1xuXG5jb25zdCBkZXByZWNhdGVkTWFyZ2luSGVscCA9ICggeyBfX25leHRIYXNOb01hcmdpbkJvdHRvbSA9IGZhbHNlIH0gKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0ISBfX25leHRIYXNOb01hcmdpbkJvdHRvbSAmJlxuXHRcdGNzc2Bcblx0XHRcdG1hcmdpbi1ib3R0b206IHJldmVydDtcblx0XHRgXG5cdCk7XG59O1xuXG5leHBvcnQgY29uc3QgU3R5bGVkSGVscCA9IHN0eWxlZC5wYFxuXHRtYXJnaW4tdG9wOiAkeyBzcGFjZSggMiApIH07XG5cdG1hcmdpbi1ib3R0b206IDA7XG5cdGZvbnQtc2l6ZTogJHsgZm9udCggJ2hlbHBUZXh0LmZvbnRTaXplJyApIH07XG5cdGZvbnQtc3R5bGU6IG5vcm1hbDtcblx0Y29sb3I6ICR7IENPTE9SUy5tZWRpdW1HcmF5LnRleHQgfTtcblxuXHQkeyBkZXByZWNhdGVkTWFyZ2luSGVscCB9XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkVmlzdWFsTGFiZWwgPSBzdHlsZWQuc3BhbmBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

const deprecatedMarginHelp = _ref3 => {
  let {
    __nextHasNoMarginBottom = false
  } = _ref3;
  return !__nextHasNoMarginBottom && _ref;
};

const StyledHelp = (0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__["default"])("p",  false ? 0 : {
  target: "ej5x27r1",
  label: "StyledHelp"
})("margin-top:", (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_4__.space)(2), ";margin-bottom:0;font-size:", (0,_utils__WEBPACK_IMPORTED_MODULE_1__.font)('helpText.fontSize'), ";font-style:normal;color:", _utils__WEBPACK_IMPORTED_MODULE_6__.COLORS.mediumGray.text, ";", deprecatedMarginHelp, ";" + ( false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYmFzZS1jb250cm9sL3N0eWxlcy9iYXNlLWNvbnRyb2wtc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZEa0MiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9iYXNlLWNvbnRyb2wvc3R5bGVzL2Jhc2UtY29udHJvbC1zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGJhc2VMYWJlbFR5cG9ncmFwaHksIGJveFNpemluZ1Jlc2V0LCBmb250LCBDT0xPUlMgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3VpL3V0aWxzL3NwYWNlJztcblxuZXhwb3J0IGNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuXHRmb250LWZhbWlseTogJHsgZm9udCggJ2RlZmF1bHQuZm9udEZhbWlseScgKSB9O1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdkZWZhdWx0LmZvbnRTaXplJyApIH07XG5cblx0JHsgYm94U2l6aW5nUmVzZXQgfVxuYDtcblxuY29uc3QgZGVwcmVjYXRlZE1hcmdpbkZpZWxkID0gKCB7IF9fbmV4dEhhc05vTWFyZ2luQm90dG9tID0gZmFsc2UgfSApID0+IHtcblx0cmV0dXJuIChcblx0XHQhIF9fbmV4dEhhc05vTWFyZ2luQm90dG9tICYmXG5cdFx0Y3NzYFxuXHRcdFx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHRcdGBcblx0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRGaWVsZCA9IHN0eWxlZC5kaXZgXG5cdCR7IGRlcHJlY2F0ZWRNYXJnaW5GaWVsZCB9XG5cblx0LmNvbXBvbmVudHMtcGFuZWxfX3JvdyAmIHtcblx0XHRtYXJnaW4tYm90dG9tOiBpbmhlcml0O1xuXHR9XG5gO1xuXG5jb25zdCBsYWJlbFN0eWxlcyA9IGNzc2Bcblx0JHsgYmFzZUxhYmVsVHlwb2dyYXBoeSB9O1xuXG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHQvKipcblx0ICogUmVtb3ZlcyBDaHJvbWUvU2FmYXJpL0ZpcmVmb3ggdXNlciBhZ2VudCBzdHlsZXNoZWV0IHBhZGRpbmcgZnJvbVxuXHQgKiBTdHlsZWRMYWJlbCB3aGVuIGl0IGlzIHJlbmRlcmVkIGFzIGEgbGVnZW5kLlxuXHQgKi9cblx0cGFkZGluZzogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcblxuY29uc3QgZGVwcmVjYXRlZE1hcmdpbkhlbHAgPSAoIHsgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gPSBmYWxzZSB9ICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdCEgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gJiZcblx0XHRjc3NgXG5cdFx0XHRtYXJnaW4tYm90dG9tOiByZXZlcnQ7XG5cdFx0YFxuXHQpO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEhlbHAgPSBzdHlsZWQucGBcblx0bWFyZ2luLXRvcDogJHsgc3BhY2UoIDIgKSB9O1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdoZWxwVGV4dC5mb250U2l6ZScgKSB9O1xuXHRmb250LXN0eWxlOiBub3JtYWw7XG5cdGNvbG9yOiAkeyBDT0xPUlMubWVkaXVtR3JheS50ZXh0IH07XG5cblx0JHsgZGVwcmVjYXRlZE1hcmdpbkhlbHAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZFZpc3VhbExhYmVsID0gc3R5bGVkLnNwYW5gXG5cdCR7IGxhYmVsU3R5bGVzIH1cbmA7XG4iXX0= */"));
const StyledVisualLabel = (0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__["default"])("span",  false ? 0 : {
  target: "ej5x27r0",
  label: "StyledVisualLabel"
})(labelStyles, ";" + ( false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvYmFzZS1jb250cm9sL3N0eWxlcy9iYXNlLWNvbnRyb2wtc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVFNEMiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9iYXNlLWNvbnRyb2wvc3R5bGVzL2Jhc2UtY29udHJvbC1zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGJhc2VMYWJlbFR5cG9ncmFwaHksIGJveFNpemluZ1Jlc2V0LCBmb250LCBDT0xPUlMgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3VpL3V0aWxzL3NwYWNlJztcblxuZXhwb3J0IGNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuXHRmb250LWZhbWlseTogJHsgZm9udCggJ2RlZmF1bHQuZm9udEZhbWlseScgKSB9O1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdkZWZhdWx0LmZvbnRTaXplJyApIH07XG5cblx0JHsgYm94U2l6aW5nUmVzZXQgfVxuYDtcblxuY29uc3QgZGVwcmVjYXRlZE1hcmdpbkZpZWxkID0gKCB7IF9fbmV4dEhhc05vTWFyZ2luQm90dG9tID0gZmFsc2UgfSApID0+IHtcblx0cmV0dXJuIChcblx0XHQhIF9fbmV4dEhhc05vTWFyZ2luQm90dG9tICYmXG5cdFx0Y3NzYFxuXHRcdFx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHRcdGBcblx0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRGaWVsZCA9IHN0eWxlZC5kaXZgXG5cdCR7IGRlcHJlY2F0ZWRNYXJnaW5GaWVsZCB9XG5cblx0LmNvbXBvbmVudHMtcGFuZWxfX3JvdyAmIHtcblx0XHRtYXJnaW4tYm90dG9tOiBpbmhlcml0O1xuXHR9XG5gO1xuXG5jb25zdCBsYWJlbFN0eWxlcyA9IGNzc2Bcblx0JHsgYmFzZUxhYmVsVHlwb2dyYXBoeSB9O1xuXG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHQvKipcblx0ICogUmVtb3ZlcyBDaHJvbWUvU2FmYXJpL0ZpcmVmb3ggdXNlciBhZ2VudCBzdHlsZXNoZWV0IHBhZGRpbmcgZnJvbVxuXHQgKiBTdHlsZWRMYWJlbCB3aGVuIGl0IGlzIHJlbmRlcmVkIGFzIGEgbGVnZW5kLlxuXHQgKi9cblx0cGFkZGluZzogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcblxuY29uc3QgZGVwcmVjYXRlZE1hcmdpbkhlbHAgPSAoIHsgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gPSBmYWxzZSB9ICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdCEgX19uZXh0SGFzTm9NYXJnaW5Cb3R0b20gJiZcblx0XHRjc3NgXG5cdFx0XHRtYXJnaW4tYm90dG9tOiByZXZlcnQ7XG5cdFx0YFxuXHQpO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEhlbHAgPSBzdHlsZWQucGBcblx0bWFyZ2luLXRvcDogJHsgc3BhY2UoIDIgKSB9O1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdoZWxwVGV4dC5mb250U2l6ZScgKSB9O1xuXHRmb250LXN0eWxlOiBub3JtYWw7XG5cdGNvbG9yOiAkeyBDT0xPUlMubWVkaXVtR3JheS50ZXh0IH07XG5cblx0JHsgZGVwcmVjYXRlZE1hcmdpbkhlbHAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZFZpc3VhbExhYmVsID0gc3R5bGVkLnNwYW5gXG5cdCR7IGxhYmVsU3R5bGVzIH1cbmA7XG4iXX0= */"));
//# sourceMappingURL=base-control-styles.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/button/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/button/index.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Button": function() { return /* binding */ Button; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/deprecated */ "@wordpress/deprecated");
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../tooltip */ "./node_modules/wordpress-components/build-module/tooltip/index.js");
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../icon */ "./node_modules/wordpress-components/build-module/icon/index.js");
/* harmony import */ var _visually_hidden__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../visually-hidden */ "./node_modules/wordpress-components/build-module/visually-hidden/component.js");


// @ts-nocheck

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */




const disabledEventsOnDisabledButton = ['onMouseDown', 'onClick'];

function useDeprecatedProps(_ref) {
  let {
    isDefault,
    isPrimary,
    isSecondary,
    isTertiary,
    isLink,
    variant,
    ...otherProps
  } = _ref;
  let computedVariant = variant;

  if (isPrimary) {
    var _computedVariant;

    (_computedVariant = computedVariant) !== null && _computedVariant !== void 0 ? _computedVariant : computedVariant = 'primary';
  }

  if (isTertiary) {
    var _computedVariant2;

    (_computedVariant2 = computedVariant) !== null && _computedVariant2 !== void 0 ? _computedVariant2 : computedVariant = 'tertiary';
  }

  if (isSecondary) {
    var _computedVariant3;

    (_computedVariant3 = computedVariant) !== null && _computedVariant3 !== void 0 ? _computedVariant3 : computedVariant = 'secondary';
  }

  if (isDefault) {
    var _computedVariant4;

    _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_3___default()('Button isDefault prop', {
      since: '5.4',
      alternative: 'variant="secondary"',
      version: '6.2'
    });
    (_computedVariant4 = computedVariant) !== null && _computedVariant4 !== void 0 ? _computedVariant4 : computedVariant = 'secondary';
  }

  if (isLink) {
    var _computedVariant5;

    (_computedVariant5 = computedVariant) !== null && _computedVariant5 !== void 0 ? _computedVariant5 : computedVariant = 'link';
  }

  return { ...otherProps,
    variant: computedVariant
  };
}

function Button(props, ref) {
  const {
    href,
    target,
    isSmall,
    isPressed,
    isBusy,
    isDestructive,
    className,
    disabled,
    icon,
    iconPosition = 'left',
    iconSize,
    showTooltip,
    tooltipPosition,
    shortcut,
    label,
    children,
    text,
    variant,
    __experimentalIsFocusable: isFocusable,
    describedBy,
    ...additionalProps
  } = useDeprecatedProps(props);
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.useInstanceId)(Button, 'components-button__description');
  const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('components-button', className, {
    'is-secondary': variant === 'secondary',
    'is-primary': variant === 'primary',
    'is-small': isSmall,
    'is-tertiary': variant === 'tertiary',
    'is-pressed': isPressed,
    'is-busy': isBusy,
    'is-link': variant === 'link',
    'is-destructive': isDestructive,
    'has-text': !!icon && !!children,
    'has-icon': !!icon
  });
  const trulyDisabled = disabled && !isFocusable;
  const Tag = href !== undefined && !trulyDisabled ? 'a' : 'button';
  const tagProps = Tag === 'a' ? {
    href,
    target
  } : {
    type: 'button',
    disabled: trulyDisabled,
    'aria-pressed': isPressed
  };

  if (disabled && isFocusable) {
    // In this case, the button will be disabled, but still focusable and
    // perceivable by screen reader users.
    tagProps['aria-disabled'] = true;

    for (const disabledEvent of disabledEventsOnDisabledButton) {
      additionalProps[disabledEvent] = event => {
        event.stopPropagation();
        event.preventDefault();
      };
    }
  } // Should show the tooltip if...


  const shouldShowTooltip = !trulyDisabled && ( // An explicit tooltip is passed or...
  showTooltip && label || // There's a shortcut or...
  shortcut || // There's a label and...
  !!label && // The children are empty and...
  !(children !== null && children !== void 0 && children.length) && // The tooltip is not explicitly disabled.
  false !== showTooltip);
  const descriptionId = describedBy ? instanceId : null;
  const describedById = additionalProps['aria-describedby'] || descriptionId;
  const element = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Tag, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, tagProps, additionalProps, {
    className: classes,
    "aria-label": additionalProps['aria-label'] || label,
    "aria-describedby": describedById,
    ref: ref
  }), icon && iconPosition === 'left' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    icon: icon,
    size: iconSize
  }), text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, text), icon && iconPosition === 'right' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    icon: icon,
    size: iconSize
  }), children);

  if (!shouldShowTooltip) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, element, describedBy && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_visually_hidden__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      id: descriptionId
    }, describedBy)));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_tooltip__WEBPACK_IMPORTED_MODULE_7__["default"], {
    text: children !== null && children !== void 0 && children.length && describedBy ? describedBy : label,
    shortcut: shortcut,
    position: tooltipPosition
  }, element), describedBy && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_visually_hidden__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    id: descriptionId
  }, describedBy)));
}
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(Button));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/combobox-control/index.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/combobox-control/index.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var remove_accents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! remove-accents */ "./node_modules/remove-accents/index.js");
/* harmony import */ var remove_accents__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(remove_accents__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./styles */ "./node_modules/wordpress-components/build-module/combobox-control/styles.js");
/* harmony import */ var _form_token_field_token_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../form-token-field/token-input */ "./node_modules/wordpress-components/build-module/form-token-field/token-input.js");
/* harmony import */ var _form_token_field_suggestions_list__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../form-token-field/suggestions-list */ "./node_modules/wordpress-components/build-module/form-token-field/suggestions-list.js");
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../base-control */ "./node_modules/wordpress-components/build-module/base-control/index.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../button */ "./node_modules/wordpress-components/build-module/button/index.js");
/* harmony import */ var _flex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../flex */ "./node_modules/wordpress-components/build-module/flex/flex-block/component.js");
/* harmony import */ var _flex__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../flex */ "./node_modules/wordpress-components/build-module/flex/flex-item/component.js");
/* harmony import */ var _higher_order_with_focus_outside__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../higher-order/with-focus-outside */ "./node_modules/wordpress-components/build-module/higher-order/with-focus-outside/index.js");
/* harmony import */ var _utils_hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/hooks */ "./node_modules/wordpress-components/build-module/utils/hooks/use-controlled-value.js");


/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */










const noop = () => {};

const DetectOutside = (0,_higher_order_with_focus_outside__WEBPACK_IMPORTED_MODULE_6__["default"])(class extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  handleFocusOutside(event) {
    this.props.onFocusOutside(event);
  }

  render() {
    return this.props.children;
  }

});

function ComboboxControl(_ref) {
  var _currentOption$label;

  let {
    __next36pxDefaultSize,
    value: valueProp,
    label,
    options,
    onChange: onChangeProp,
    onFilterValueChange = noop,
    hideLabelFromVision,
    help,
    allowReset = true,
    className,
    messages = {
      selected: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Item selected.')
    },
    __experimentalRenderItem
  } = _ref;
  const [value, setValue] = (0,_utils_hooks__WEBPACK_IMPORTED_MODULE_7__.useControlledValue)({
    value: valueProp,
    onChange: onChangeProp
  });
  const currentOption = options.find(option => option.value === value);
  const currentLabel = (_currentOption$label = currentOption === null || currentOption === void 0 ? void 0 : currentOption.label) !== null && _currentOption$label !== void 0 ? _currentOption$label : ''; // Use a custom prefix when generating the `instanceId` to avoid having
  // duplicate input IDs when rendering this component and `FormTokenField`
  // in the same page (see https://github.com/WordPress/gutenberg/issues/42112).

  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.useInstanceId)(ComboboxControl, 'combobox-control');
  const [selectedSuggestion, setSelectedSuggestion] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(currentOption || null);
  const [isExpanded, setIsExpanded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [inputHasFocus, setInputHasFocus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [inputValue, setInputValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const inputContainer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const matchingSuggestions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const startsWithMatch = [];
    const containsMatch = [];
    const match = remove_accents__WEBPACK_IMPORTED_MODULE_2___default()(inputValue.toLocaleLowerCase());
    options.forEach(option => {
      const index = remove_accents__WEBPACK_IMPORTED_MODULE_2___default()(option.label).toLocaleLowerCase().indexOf(match);

      if (index === 0) {
        startsWithMatch.push(option);
      } else if (index > 0) {
        containsMatch.push(option);
      }
    });
    return startsWithMatch.concat(containsMatch);
  }, [inputValue, options, value]);

  const onSuggestionSelected = newSelectedSuggestion => {
    setValue(newSelectedSuggestion.value);
    (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_5__.speak)(messages.selected, 'assertive');
    setSelectedSuggestion(newSelectedSuggestion);
    setInputValue('');
    setIsExpanded(false);
  };

  const handleArrowNavigation = function () {
    let offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    const index = matchingSuggestions.indexOf(selectedSuggestion);
    let nextIndex = index + offset;

    if (nextIndex < 0) {
      nextIndex = matchingSuggestions.length - 1;
    } else if (nextIndex >= matchingSuggestions.length) {
      nextIndex = 0;
    }

    setSelectedSuggestion(matchingSuggestions[nextIndex]);
    setIsExpanded(true);
  };

  const onKeyDown = event => {
    let preventDefault = false;

    if (event.defaultPrevented) {
      return;
    }

    switch (event.code) {
      case 'Enter':
        if (selectedSuggestion) {
          onSuggestionSelected(selectedSuggestion);
          preventDefault = true;
        }

        break;

      case 'ArrowUp':
        handleArrowNavigation(-1);
        preventDefault = true;
        break;

      case 'ArrowDown':
        handleArrowNavigation(1);
        preventDefault = true;
        break;

      case 'Escape':
        setIsExpanded(false);
        setSelectedSuggestion(null);
        preventDefault = true;
        break;

      default:
        break;
    }

    if (preventDefault) {
      event.preventDefault();
    }
  };

  const onBlur = () => {
    setInputHasFocus(false);
  };

  const onFocus = () => {
    setInputHasFocus(true);
    setIsExpanded(true);
    onFilterValueChange('');
    setInputValue('');
  };

  const onFocusOutside = () => {
    setIsExpanded(false);
  };

  const onInputChange = event => {
    const text = event.value;
    setInputValue(text);
    onFilterValueChange(text);

    if (inputHasFocus) {
      setIsExpanded(true);
    }
  };

  const handleOnReset = () => {
    setValue(null);
    inputContainer.current.focus();
  }; // Update current selections when the filter input changes.


  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const hasMatchingSuggestions = matchingSuggestions.length > 0;
    const hasSelectedMatchingSuggestions = matchingSuggestions.indexOf(selectedSuggestion) > 0;

    if (hasMatchingSuggestions && !hasSelectedMatchingSuggestions) {
      // If the current selection isn't present in the list of suggestions, then automatically select the first item from the list of suggestions.
      setSelectedSuggestion(matchingSuggestions[0]);
    }
  }, [matchingSuggestions, selectedSuggestion]); // Announcements.

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const hasMatchingSuggestions = matchingSuggestions.length > 0;

    if (isExpanded) {
      const message = hasMatchingSuggestions ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(
      /* translators: %d: number of results. */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__._n)('%d result found, use up and down arrow keys to navigate.', '%d results found, use up and down arrow keys to navigate.', matchingSuggestions.length), matchingSuggestions.length) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No results.');
      (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_5__.speak)(message, 'polite');
    }
  }, [matchingSuggestions, isExpanded]); // Disable reason: There is no appropriate role which describes the
  // input container intended accessible usability.
  // TODO: Refactor click detection to use blur to stop propagation.

  /* eslint-disable jsx-a11y/no-static-element-interactions */

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DetectOutside, {
    onFocusOutside: onFocusOutside
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_base_control__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, 'components-combobox-control'),
    tabIndex: "-1",
    label: label,
    id: `components-form-token-input-${instanceId}`,
    hideLabelFromVision: hideLabelFromVision,
    help: help
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-combobox-control__suggestions-container",
    tabIndex: "-1",
    onKeyDown: onKeyDown
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styles__WEBPACK_IMPORTED_MODULE_9__.InputWrapperFlex, {
    __next36pxDefaultSize: __next36pxDefaultSize
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_flex__WEBPACK_IMPORTED_MODULE_10__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_form_token_field_token_input__WEBPACK_IMPORTED_MODULE_11__["default"], {
    className: "components-combobox-control__input",
    instanceId: instanceId,
    ref: inputContainer,
    value: isExpanded ? inputValue : currentLabel,
    "aria-label": currentLabel ? `${currentLabel}, ${label}` : null,
    onFocus: onFocus,
    onBlur: onBlur,
    isExpanded: isExpanded,
    selectedSuggestionIndex: matchingSuggestions.indexOf(selectedSuggestion),
    onChange: onInputChange
  })), allowReset && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_flex__WEBPACK_IMPORTED_MODULE_12__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_button__WEBPACK_IMPORTED_MODULE_13__["default"], {
    className: "components-combobox-control__reset",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__["default"],
    disabled: !value,
    onClick: handleOnReset,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Reset')
  }))), isExpanded && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_form_token_field_suggestions_list__WEBPACK_IMPORTED_MODULE_15__["default"], {
    instanceId: instanceId,
    match: {
      label: inputValue
    },
    displayTransform: suggestion => suggestion.label,
    suggestions: matchingSuggestions,
    selectedIndex: matchingSuggestions.indexOf(selectedSuggestion),
    onHover: setSelectedSuggestion,
    onSelect: onSuggestionSelected,
    scrollIntoView: true,
    __experimentalRenderItem: __experimentalRenderItem
  }))));
  /* eslint-enable jsx-a11y/no-static-element-interactions */
}

/* harmony default export */ __webpack_exports__["default"] = (ComboboxControl);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/combobox-control/styles.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/combobox-control/styles.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputWrapperFlex": function() { return /* binding */ InputWrapperFlex; }
/* harmony export */ });
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled/base */ "./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var _flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../flex */ "./node_modules/wordpress-components/build-module/flex/flex/component.js");
/* harmony import */ var _ui_utils_space__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/utils/space */ "./node_modules/wordpress-components/build-module/ui/utils/space.js");


/**
 * External dependencies
 */

/**
 * Internal dependencies
 */




const deprecatedDefaultSize = _ref => {
  let {
    __next36pxDefaultSize
  } = _ref;
  return !__next36pxDefaultSize && /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.css)("height:28px;padding-left:", (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_2__.space)(1), ";padding-right:", (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_2__.space)(1), ";" + ( false ? 0 : ";label:deprecatedDefaultSize;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvY29tYm9ib3gtY29udHJvbC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY0kiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9jb21ib2JveC1jb250cm9sL3N0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgRmxleCB9IGZyb20gJy4uL2ZsZXgnO1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi91aS91dGlscy9zcGFjZSc7XG5cbmNvbnN0IGRlcHJlY2F0ZWREZWZhdWx0U2l6ZSA9ICggeyBfX25leHQzNnB4RGVmYXVsdFNpemUgfSApID0+XG5cdCEgX19uZXh0MzZweERlZmF1bHRTaXplICYmXG5cdGNzc2Bcblx0XHRoZWlnaHQ6IDI4cHg7IC8vIDMwcHggLSAycHggdmVydGljYWwgYm9yZGVycyBvbiBwYXJlbnQgY29udGFpbmVyXG5cdFx0cGFkZGluZy1sZWZ0OiAkeyBzcGFjZSggMSApIH07XG5cdFx0cGFkZGluZy1yaWdodDogJHsgc3BhY2UoIDEgKSB9O1xuXHRgO1xuXG5leHBvcnQgY29uc3QgSW5wdXRXcmFwcGVyRmxleCA9IHN0eWxlZCggRmxleCApYFxuXHRoZWlnaHQ6IDM0cHg7IC8vIDM2cHggLSAycHggdmVydGljYWwgYm9yZGVycyBvbiBwYXJlbnQgY29udGFpbmVyXG5cdHBhZGRpbmctbGVmdDogJHsgc3BhY2UoIDIgKSB9O1xuXHRwYWRkaW5nLXJpZ2h0OiAkeyBzcGFjZSggMiApIH07XG5cblx0JHsgZGVwcmVjYXRlZERlZmF1bHRTaXplIH1cbmA7XG4iXX0= */");
};

const InputWrapperFlex = /*#__PURE__*/(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__["default"])(_flex__WEBPACK_IMPORTED_MODULE_3__["default"],  false ? 0 : {
  target: "evuatpg0",
  label: "InputWrapperFlex"
})("height:34px;padding-left:", (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_2__.space)(2), ";padding-right:", (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_2__.space)(2), ";", deprecatedDefaultSize, ";" + ( false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvY29tYm9ib3gtY29udHJvbC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0I4QyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2NvbWJvYm94LWNvbnRyb2wvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBGbGV4IH0gZnJvbSAnLi4vZmxleCc7XG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uL3VpL3V0aWxzL3NwYWNlJztcblxuY29uc3QgZGVwcmVjYXRlZERlZmF1bHRTaXplID0gKCB7IF9fbmV4dDM2cHhEZWZhdWx0U2l6ZSB9ICkgPT5cblx0ISBfX25leHQzNnB4RGVmYXVsdFNpemUgJiZcblx0Y3NzYFxuXHRcdGhlaWdodDogMjhweDsgLy8gMzBweCAtIDJweCB2ZXJ0aWNhbCBib3JkZXJzIG9uIHBhcmVudCBjb250YWluZXJcblx0XHRwYWRkaW5nLWxlZnQ6ICR7IHNwYWNlKCAxICkgfTtcblx0XHRwYWRkaW5nLXJpZ2h0OiAkeyBzcGFjZSggMSApIH07XG5cdGA7XG5cbmV4cG9ydCBjb25zdCBJbnB1dFdyYXBwZXJGbGV4ID0gc3R5bGVkKCBGbGV4IClgXG5cdGhlaWdodDogMzRweDsgLy8gMzZweCAtIDJweCB2ZXJ0aWNhbCBib3JkZXJzIG9uIHBhcmVudCBjb250YWluZXJcblx0cGFkZGluZy1sZWZ0OiAkeyBzcGFjZSggMiApIH07XG5cdHBhZGRpbmctcmlnaHQ6ICR7IHNwYWNlKCAyICkgfTtcblxuXHQkeyBkZXByZWNhdGVkRGVmYXVsdFNpemUgfVxuYDtcbiJdfQ== */"));
//# sourceMappingURL=styles.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/dashicon/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/dashicon/index.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);



/**
 * @typedef OwnProps
 *
 * @property {import('./types').IconKey} icon        Icon name
 * @property {string}                    [className] Class name
 */

/** @typedef {import('react').ComponentPropsWithoutRef<'span'> & OwnProps} Props */

/**
 * @param {Props} props
 * @return {JSX.Element} Element
 */
function Dashicon(_ref) {
  let {
    icon,
    className,
    ...extraProps
  } = _ref;
  const iconClass = ['dashicon', 'dashicons', 'dashicons-' + icon, className].filter(Boolean).join(' ');
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: iconClass
  }, extraProps));
}

/* harmony default export */ __webpack_exports__["default"] = (Dashicon);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/flex/context.js":
/*!************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/flex/context.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlexContext": function() { return /* binding */ FlexContext; },
/* harmony export */   "useFlexContext": function() { return /* binding */ useFlexContext; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

const FlexContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  flexItemDisplay: undefined
});
const useFlexContext = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(FlexContext);
//# sourceMappingURL=context.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/flex/flex-block/component.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/flex/flex-block/component.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlexBlock": function() { return /* binding */ FlexBlock; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui/context */ "./node_modules/wordpress-components/build-module/ui/context/context-connect.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../view */ "./node_modules/wordpress-components/build-module/view/component.js");
/* harmony import */ var _hook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hook */ "./node_modules/wordpress-components/build-module/flex/flex-block/hook.js");



/**
 * External dependencies
 */

/**
 * Internal dependencies
 */




function UnconnectedFlexBlock(props, forwardedRef) {
  const flexBlockProps = (0,_hook__WEBPACK_IMPORTED_MODULE_2__.useFlexBlock)(props);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_view__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, flexBlockProps, {
    ref: forwardedRef
  }));
}
/**
 * `FlexBlock` is a primitive layout component that adaptively resizes content
 * within layout containers like `Flex`.
 *
 * ```jsx
 * import { Flex, FlexBlock } from '@wordpress/components';
 *
 * function Example() {
 *   return (
 *     <Flex>
 *       <FlexBlock>...</FlexBlock>
 *     </Flex>
 *   );
 * }
 * ```
 */


const FlexBlock = (0,_ui_context__WEBPACK_IMPORTED_MODULE_4__.contextConnect)(UnconnectedFlexBlock, 'FlexBlock');
/* harmony default export */ __webpack_exports__["default"] = (FlexBlock);
//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/flex/flex-block/hook.js":
/*!********************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/flex/flex-block/hook.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useFlexBlock": function() { return /* binding */ useFlexBlock; }
/* harmony export */ });
/* harmony import */ var _ui_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui/context */ "./node_modules/wordpress-components/build-module/ui/context/use-context-system.js");
/* harmony import */ var _flex_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flex-item */ "./node_modules/wordpress-components/build-module/flex/flex-item/hook.js");
/**
 * Internal dependencies
 */


function useFlexBlock(props) {
  const otherProps = (0,_ui_context__WEBPACK_IMPORTED_MODULE_0__.useContextSystem)(props, 'FlexBlock');
  const flexItemProps = (0,_flex_item__WEBPACK_IMPORTED_MODULE_1__.useFlexItem)({
    isBlock: true,
    ...otherProps
  });
  return flexItemProps;
}
//# sourceMappingURL=hook.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/flex/flex-item/component.js":
/*!************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/flex/flex-item/component.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlexItem": function() { return /* binding */ FlexItem; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui/context */ "./node_modules/wordpress-components/build-module/ui/context/context-connect.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../view */ "./node_modules/wordpress-components/build-module/view/component.js");
/* harmony import */ var _hook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hook */ "./node_modules/wordpress-components/build-module/flex/flex-item/hook.js");



/**
 * External dependencies
 */

/**
 * Internal dependencies
 */




function UnconnectedFlexItem(props, forwardedRef) {
  const flexItemProps = (0,_hook__WEBPACK_IMPORTED_MODULE_2__.useFlexItem)(props);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_view__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, flexItemProps, {
    ref: forwardedRef
  }));
}
/**
 * `FlexItem` is a primitive layout component that aligns content within layout
 * containers like `Flex`.
 *
 * ```jsx
 * import { Flex, FlexItem } from '@wordpress/components';
 *
 * function Example() {
 *   return (
 *     <Flex>
 *       <FlexItem>...</FlexItem>
 *     </Flex>
 *   );
 * }
 * ```
 */


const FlexItem = (0,_ui_context__WEBPACK_IMPORTED_MODULE_4__.contextConnect)(UnconnectedFlexItem, 'FlexItem');
/* harmony default export */ __webpack_exports__["default"] = (FlexItem);
//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/flex/flex-item/hook.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/flex/flex-item/hook.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useFlexItem": function() { return /* binding */ useFlexItem; }
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var _ui_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ui/context */ "./node_modules/wordpress-components/build-module/ui/context/use-context-system.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context */ "./node_modules/wordpress-components/build-module/flex/context.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles */ "./node_modules/wordpress-components/build-module/flex/styles.js");
/* harmony import */ var _utils_hooks_use_cx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/hooks/use-cx */ "./node_modules/wordpress-components/build-module/utils/hooks/use-cx.js");
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */





function useFlexItem(props) {
  const {
    className,
    display: displayProp,
    isBlock = false,
    ...otherProps
  } = (0,_ui_context__WEBPACK_IMPORTED_MODULE_0__.useContextSystem)(props, 'FlexItem');
  const sx = {};
  const contextDisplay = (0,_context__WEBPACK_IMPORTED_MODULE_1__.useFlexContext)().flexItemDisplay;
  sx.Base = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)({
    display: displayProp || contextDisplay
  },  false ? 0 : ";label:sx-Base;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9mbGV4LWl0ZW0vaG9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4QlciLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9mbGV4L2ZsZXgtaXRlbS9ob29rLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzLCBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyB1c2VDb250ZXh0U3lzdGVtLCBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uLy4uL3VpL2NvbnRleHQnO1xuaW1wb3J0IHsgdXNlRmxleENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuLi9zdHlsZXMnO1xuaW1wb3J0IHsgdXNlQ3ggfSBmcm9tICcuLi8uLi91dGlscy9ob29rcy91c2UtY3gnO1xuaW1wb3J0IHR5cGUgeyBGbGV4SXRlbVByb3BzIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmxleEl0ZW0oXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgRmxleEl0ZW1Qcm9wcywgJ2RpdicgPlxuKSB7XG5cdGNvbnN0IHtcblx0XHRjbGFzc05hbWUsXG5cdFx0ZGlzcGxheTogZGlzcGxheVByb3AsXG5cdFx0aXNCbG9jayA9IGZhbHNlLFxuXHRcdC4uLm90aGVyUHJvcHNcblx0fSA9IHVzZUNvbnRleHRTeXN0ZW0oIHByb3BzLCAnRmxleEl0ZW0nICk7XG5cblx0Y29uc3Qgc3g6IHtcblx0XHRCYXNlPzogU2VyaWFsaXplZFN0eWxlcztcblx0fSA9IHt9O1xuXG5cdGNvbnN0IGNvbnRleHREaXNwbGF5ID0gdXNlRmxleENvbnRleHQoKS5mbGV4SXRlbURpc3BsYXk7XG5cblx0c3guQmFzZSA9IGNzcygge1xuXHRcdGRpc3BsYXk6IGRpc3BsYXlQcm9wIHx8IGNvbnRleHREaXNwbGF5LFxuXHR9ICk7XG5cblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSBjeChcblx0XHRzdHlsZXMuSXRlbSxcblx0XHRzeC5CYXNlLFxuXHRcdGlzQmxvY2sgJiYgc3R5bGVzLmJsb2NrLFxuXHRcdGNsYXNzTmFtZVxuXHQpO1xuXG5cdHJldHVybiB7XG5cdFx0Li4ub3RoZXJQcm9wcyxcblx0XHRjbGFzc05hbWU6IGNsYXNzZXMsXG5cdH07XG59XG4iXX0= */");
  const cx = (0,_utils_hooks_use_cx__WEBPACK_IMPORTED_MODULE_3__.useCx)();
  const classes = cx(_styles__WEBPACK_IMPORTED_MODULE_4__.Item, sx.Base, isBlock && _styles__WEBPACK_IMPORTED_MODULE_4__.block, className);
  return { ...otherProps,
    className: classes
  };
}
//# sourceMappingURL=hook.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/flex/flex/component.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/flex/flex/component.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Flex": function() { return /* binding */ Flex; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ui/context */ "./node_modules/wordpress-components/build-module/ui/context/context-connect.js");
/* harmony import */ var _hook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hook */ "./node_modules/wordpress-components/build-module/flex/flex/hook.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../context */ "./node_modules/wordpress-components/build-module/flex/context.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../view */ "./node_modules/wordpress-components/build-module/view/component.js");



/**
 * External dependencies
 */

/**
 * Internal dependencies
 */





function UnconnectedFlex(props, forwardedRef) {
  const {
    children,
    isColumn,
    ...otherProps
  } = (0,_hook__WEBPACK_IMPORTED_MODULE_2__.useFlex)(props);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_context__WEBPACK_IMPORTED_MODULE_3__.FlexContext.Provider, {
    value: {
      flexItemDisplay: isColumn ? 'block' : undefined
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_view__WEBPACK_IMPORTED_MODULE_4__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, otherProps, {
    ref: forwardedRef
  }), children));
}
/**
 * `Flex` is a primitive layout component that adaptively aligns child content
 * horizontally or vertically. `Flex` powers components like `HStack` and
 * `VStack`.
 *
 * `Flex` is used with any of its two sub-components, `FlexItem` and
 * `FlexBlock`.
 *
 * ```jsx
 * import { Flex, FlexBlock, FlexItem } from '@wordpress/components';
 *
 * function Example() {
 *   return (
 *     <Flex>
 *       <FlexItem>
 *         <p>Code</p>
 *       </FlexItem>
 *       <FlexBlock>
 *         <p>Poetry</p>
 *       </FlexBlock>
 *     </Flex>
 *   );
 * }
 * ```
 */


const Flex = (0,_ui_context__WEBPACK_IMPORTED_MODULE_5__.contextConnect)(UnconnectedFlex, 'Flex');
/* harmony default export */ __webpack_exports__["default"] = (Flex);
//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/flex/flex/hook.js":
/*!**************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/flex/flex/hook.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useFlex": function() { return /* binding */ useFlex; }
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/deprecated */ "@wordpress/deprecated");
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ui/context */ "./node_modules/wordpress-components/build-module/ui/context/use-context-system.js");
/* harmony import */ var _ui_utils_use_responsive_value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ui/utils/use-responsive-value */ "./node_modules/wordpress-components/build-module/ui/utils/use-responsive-value.js");
/* harmony import */ var _ui_utils_space__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../ui/utils/space */ "./node_modules/wordpress-components/build-module/ui/utils/space.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles */ "./node_modules/wordpress-components/build-module/flex/styles.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils */ "./node_modules/wordpress-components/build-module/utils/hooks/use-cx.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils */ "./node_modules/wordpress-components/build-module/utils/rtl.js");
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */







function useDeprecatedProps(props) {
  const {
    isReversed,
    ...otherProps
  } = props;

  if (typeof isReversed !== 'undefined') {
    _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_1___default()('Flex isReversed', {
      alternative: 'Flex direction="row-reverse" or "column-reverse"',
      since: '5.9'
    });
    return { ...otherProps,
      direction: isReversed ? 'row-reverse' : 'row'
    };
  }

  return otherProps;
}

function useFlex(props) {
  const {
    align = 'center',
    className,
    direction: directionProp = 'row',
    expanded = true,
    gap = 2,
    justify = 'space-between',
    wrap = false,
    ...otherProps
  } = (0,_ui_context__WEBPACK_IMPORTED_MODULE_2__.useContextSystem)(useDeprecatedProps(props), 'Flex');
  const directionAsArray = Array.isArray(directionProp) ? directionProp : [directionProp];
  const direction = (0,_ui_utils_use_responsive_value__WEBPACK_IMPORTED_MODULE_3__.useResponsiveValue)(directionAsArray);
  const isColumn = typeof direction === 'string' && !!direction.includes('column');
  const isReverse = typeof direction === 'string' && direction.includes('reverse');
  const cx = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.useCx)();
  const rtlWatchResult = _utils__WEBPACK_IMPORTED_MODULE_5__.rtl.watch();
  const classes = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const sx = {};
    sx.Base = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_6__.css)({
      alignItems: isColumn ? 'normal' : align,
      flexDirection: direction,
      flexWrap: wrap ? 'wrap' : undefined,
      justifyContent: justify,
      height: isColumn && expanded ? '100%' : undefined,
      width: !isColumn && expanded ? '100%' : undefined,
      marginBottom: wrap ? `calc(${(0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_7__.space)(gap)} * -1)` : undefined
    },  false ? 0 : ";label:sx-Base;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9mbGV4L2hvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0VZIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9mbGV4L2hvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MsIFNlcmlhbGl6ZWRTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCBkZXByZWNhdGVkIGZyb20gJ0B3b3JkcHJlc3MvZGVwcmVjYXRlZCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0sIFdvcmRQcmVzc0NvbXBvbmVudFByb3BzIH0gZnJvbSAnLi4vLi4vdWkvY29udGV4dCc7XG5pbXBvcnQgeyB1c2VSZXNwb25zaXZlVmFsdWUgfSBmcm9tICcuLi8uLi91aS91dGlscy91c2UtcmVzcG9uc2l2ZS12YWx1ZSc7XG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3VpL3V0aWxzL3NwYWNlJztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuLi9zdHlsZXMnO1xuaW1wb3J0IHsgdXNlQ3gsIHJ0bCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgRmxleFByb3BzIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5mdW5jdGlvbiB1c2VEZXByZWNhdGVkUHJvcHMoXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgRmxleFByb3BzLCAnZGl2JyA+XG4pOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgRmxleFByb3BzLCAnZGl2JyA+IHtcblx0Y29uc3QgeyBpc1JldmVyc2VkLCAuLi5vdGhlclByb3BzIH0gPSBwcm9wcztcblxuXHRpZiAoIHR5cGVvZiBpc1JldmVyc2VkICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRkZXByZWNhdGVkKCAnRmxleCBpc1JldmVyc2VkJywge1xuXHRcdFx0YWx0ZXJuYXRpdmU6ICdGbGV4IGRpcmVjdGlvbj1cInJvdy1yZXZlcnNlXCIgb3IgXCJjb2x1bW4tcmV2ZXJzZVwiJyxcblx0XHRcdHNpbmNlOiAnNS45Jyxcblx0XHR9ICk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLm90aGVyUHJvcHMsXG5cdFx0XHRkaXJlY3Rpb246IGlzUmV2ZXJzZWQgPyAncm93LXJldmVyc2UnIDogJ3JvdycsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBvdGhlclByb3BzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmxleCggcHJvcHM6IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzPCBGbGV4UHJvcHMsICdkaXYnID4gKSB7XG5cdGNvbnN0IHtcblx0XHRhbGlnbiA9ICdjZW50ZXInLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRkaXJlY3Rpb246IGRpcmVjdGlvblByb3AgPSAncm93Jyxcblx0XHRleHBhbmRlZCA9IHRydWUsXG5cdFx0Z2FwID0gMixcblx0XHRqdXN0aWZ5ID0gJ3NwYWNlLWJldHdlZW4nLFxuXHRcdHdyYXAgPSBmYWxzZSxcblx0XHQuLi5vdGhlclByb3BzXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCB1c2VEZXByZWNhdGVkUHJvcHMoIHByb3BzICksICdGbGV4JyApO1xuXG5cdGNvbnN0IGRpcmVjdGlvbkFzQXJyYXkgPSBBcnJheS5pc0FycmF5KCBkaXJlY3Rpb25Qcm9wIClcblx0XHQ/IGRpcmVjdGlvblByb3Bcblx0XHQ6IFsgZGlyZWN0aW9uUHJvcCBdO1xuXHRjb25zdCBkaXJlY3Rpb24gPSB1c2VSZXNwb25zaXZlVmFsdWUoIGRpcmVjdGlvbkFzQXJyYXkgKTtcblxuXHRjb25zdCBpc0NvbHVtbiA9XG5cdFx0dHlwZW9mIGRpcmVjdGlvbiA9PT0gJ3N0cmluZycgJiYgISEgZGlyZWN0aW9uLmluY2x1ZGVzKCAnY29sdW1uJyApO1xuXHRjb25zdCBpc1JldmVyc2UgPVxuXHRcdHR5cGVvZiBkaXJlY3Rpb24gPT09ICdzdHJpbmcnICYmIGRpcmVjdGlvbi5pbmNsdWRlcyggJ3JldmVyc2UnICk7XG5cblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xuXHRjb25zdCBydGxXYXRjaFJlc3VsdCA9IHJ0bC53YXRjaCgpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XG5cdFx0Y29uc3Qgc3g6IHtcblx0XHRcdEJhc2U/OiBTZXJpYWxpemVkU3R5bGVzO1xuXHRcdFx0SXRlbXM/OiBTZXJpYWxpemVkU3R5bGVzO1xuXHRcdFx0V3JhcEl0ZW1zPzogU2VyaWFsaXplZFN0eWxlcztcblx0XHR9ID0ge307XG5cblx0XHRzeC5CYXNlID0gY3NzKCB7XG5cdFx0XHRhbGlnbkl0ZW1zOiBpc0NvbHVtbiA/ICdub3JtYWwnIDogYWxpZ24sXG5cdFx0XHRmbGV4RGlyZWN0aW9uOiBkaXJlY3Rpb24sXG5cdFx0XHRmbGV4V3JhcDogd3JhcCA/ICd3cmFwJyA6IHVuZGVmaW5lZCxcblx0XHRcdGp1c3RpZnlDb250ZW50OiBqdXN0aWZ5LFxuXHRcdFx0aGVpZ2h0OiBpc0NvbHVtbiAmJiBleHBhbmRlZCA/ICcxMDAlJyA6IHVuZGVmaW5lZCxcblx0XHRcdHdpZHRoOiAhIGlzQ29sdW1uICYmIGV4cGFuZGVkID8gJzEwMCUnIDogdW5kZWZpbmVkLFxuXHRcdFx0bWFyZ2luQm90dG9tOiB3cmFwID8gYGNhbGMoJHsgc3BhY2UoIGdhcCApIH0gKiAtMSlgIDogdW5kZWZpbmVkLFxuXHRcdH0gKTtcblxuXHRcdC8qKlxuXHRcdCAqIFdvcmthcm91bmQgdG8gb3B0aW1pemUgRE9NIHJlbmRlcmluZy5cblx0XHQgKiBXZSdsbCBlbmhhbmNlIGFsaWdubWVudCB3aXRoIG5haXZlIHBhcmVudCBmbGV4IGFzc3VtcHRpb25zLlxuXHRcdCAqXG5cdFx0ICogVHJhZGUtb2ZmOlxuXHRcdCAqIEZhciBsZXNzIERPTSBsZXNzLiBIb3dldmVyLCBVSSByZW5kZXJpbmcgaXMgbm90IGFzIHJlbGlhYmxlLlxuXHRcdCAqL1xuXHRcdHN4Lkl0ZW1zID0gY3NzYFxuXHRcdFx0PiAqICsgKjpub3QoIG1hcnF1ZWUgKSB7XG5cdFx0XHRcdG1hcmdpbi10b3A6ICR7IGlzQ29sdW1uID8gc3BhY2UoIGdhcCApIDogdW5kZWZpbmVkIH07XG5cdFx0XHRcdCR7IHJ0bCgge1xuXHRcdFx0XHRcdG1hcmdpbkxlZnQ6XG5cdFx0XHRcdFx0XHQhIGlzQ29sdW1uICYmICEgaXNSZXZlcnNlID8gc3BhY2UoIGdhcCApIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdG1hcmdpblJpZ2h0OlxuXHRcdFx0XHRcdFx0ISBpc0NvbHVtbiAmJiBpc1JldmVyc2UgPyBzcGFjZSggZ2FwICkgOiB1bmRlZmluZWQsXG5cdFx0XHRcdH0gKSgpIH1cblx0XHRcdH1cblx0XHRgO1xuXG5cdFx0c3guV3JhcEl0ZW1zID0gY3NzYFxuXHRcdFx0PiAqOm5vdCggbWFycXVlZSApIHtcblx0XHRcdFx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIGdhcCApIH07XG5cdFx0XHRcdCR7IHJ0bCgge1xuXHRcdFx0XHRcdG1hcmdpbkxlZnQ6XG5cdFx0XHRcdFx0XHQhIGlzQ29sdW1uICYmIGlzUmV2ZXJzZSA/IHNwYWNlKCBnYXAgKSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRtYXJnaW5SaWdodDpcblx0XHRcdFx0XHRcdCEgaXNDb2x1bW4gJiYgISBpc1JldmVyc2UgPyBzcGFjZSggZ2FwICkgOiB1bmRlZmluZWQsXG5cdFx0XHRcdH0gKSgpIH1cblx0XHRcdH1cblxuXHRcdFx0PiAqOmxhc3QtY2hpbGQ6bm90KCBtYXJxdWVlICkge1xuXHRcdFx0XHQkeyBydGwoIHtcblx0XHRcdFx0XHRtYXJnaW5MZWZ0OiAhIGlzQ29sdW1uICYmIGlzUmV2ZXJzZSA/IDAgOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0bWFyZ2luUmlnaHQ6ICEgaXNDb2x1bW4gJiYgISBpc1JldmVyc2UgPyAwIDogdW5kZWZpbmVkLFxuXHRcdFx0XHR9ICkoKSB9XG5cdFx0XHR9XG5cdFx0YDtcblxuXHRcdHJldHVybiBjeChcblx0XHRcdHN0eWxlcy5GbGV4LFxuXHRcdFx0c3guQmFzZSxcblx0XHRcdHdyYXAgPyBzeC5XcmFwSXRlbXMgOiBzeC5JdGVtcyxcblx0XHRcdGlzQ29sdW1uID8gc3R5bGVzLkl0ZW1zQ29sdW1uIDogc3R5bGVzLkl0ZW1zUm93LFxuXHRcdFx0Y2xhc3NOYW1lXG5cdFx0KTtcblx0XHQvLyBydGxXYXRjaFJlc3VsdCBpcyBuZWVkZWQgdG8gcmVmcmVzaCBzdHlsZXMgd2hlbiB0aGUgd3JpdGluZyBkaXJlY3Rpb24gY2hhbmdlc1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcblx0fSwgW1xuXHRcdGFsaWduLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjeCxcblx0XHRkaXJlY3Rpb24sXG5cdFx0ZXhwYW5kZWQsXG5cdFx0Z2FwLFxuXHRcdGlzQ29sdW1uLFxuXHRcdGlzUmV2ZXJzZSxcblx0XHRqdXN0aWZ5LFxuXHRcdHdyYXAsXG5cdFx0cnRsV2F0Y2hSZXN1bHQsXG5cdF0gKTtcblxuXHRyZXR1cm4geyAuLi5vdGhlclByb3BzLCBjbGFzc05hbWU6IGNsYXNzZXMsIGlzQ29sdW1uIH07XG59XG4iXX0= */");
    /**
     * Workaround to optimize DOM rendering.
     * We'll enhance alignment with naive parent flex assumptions.
     *
     * Trade-off:
     * Far less DOM less. However, UI rendering is not as reliable.
     */

    sx.Items = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_6__.css)(">*+*:not( marquee ){margin-top:", isColumn ? (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_7__.space)(gap) : undefined, ";", (0,_utils__WEBPACK_IMPORTED_MODULE_5__.rtl)({
      marginLeft: !isColumn && !isReverse ? (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_7__.space)(gap) : undefined,
      marginRight: !isColumn && isReverse ? (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_7__.space)(gap) : undefined
    })(), ";}" + ( false ? 0 : ";label:sx-Items;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9mbGV4L2hvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUZnQiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2ZsZXgvZmxleC9ob29rLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzLCBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgZGVwcmVjYXRlZCBmcm9tICdAd29yZHByZXNzL2RlcHJlY2F0ZWQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyB1c2VDb250ZXh0U3lzdGVtLCBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uLy4uL3VpL2NvbnRleHQnO1xuaW1wb3J0IHsgdXNlUmVzcG9uc2l2ZVZhbHVlIH0gZnJvbSAnLi4vLi4vdWkvdXRpbHMvdXNlLXJlc3BvbnNpdmUtdmFsdWUnO1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi8uLi91aS91dGlscy9zcGFjZSc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi4vc3R5bGVzJztcbmltcG9ydCB7IHVzZUN4LCBydGwgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IEZsZXhQcm9wcyB9IGZyb20gJy4uL3R5cGVzJztcblxuZnVuY3Rpb24gdXNlRGVwcmVjYXRlZFByb3BzKFxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IEZsZXhQcm9wcywgJ2RpdicgPlxuKTogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IEZsZXhQcm9wcywgJ2RpdicgPiB7XG5cdGNvbnN0IHsgaXNSZXZlcnNlZCwgLi4ub3RoZXJQcm9wcyB9ID0gcHJvcHM7XG5cblx0aWYgKCB0eXBlb2YgaXNSZXZlcnNlZCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0ZGVwcmVjYXRlZCggJ0ZsZXggaXNSZXZlcnNlZCcsIHtcblx0XHRcdGFsdGVybmF0aXZlOiAnRmxleCBkaXJlY3Rpb249XCJyb3ctcmV2ZXJzZVwiIG9yIFwiY29sdW1uLXJldmVyc2VcIicsXG5cdFx0XHRzaW5jZTogJzUuOScsXG5cdFx0fSApO1xuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5vdGhlclByb3BzLFxuXHRcdFx0ZGlyZWN0aW9uOiBpc1JldmVyc2VkID8gJ3Jvdy1yZXZlcnNlJyA6ICdyb3cnLFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gb3RoZXJQcm9wcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZsZXgoIHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgRmxleFByb3BzLCAnZGl2JyA+ICkge1xuXHRjb25zdCB7XG5cdFx0YWxpZ24gPSAnY2VudGVyJyxcblx0XHRjbGFzc05hbWUsXG5cdFx0ZGlyZWN0aW9uOiBkaXJlY3Rpb25Qcm9wID0gJ3JvdycsXG5cdFx0ZXhwYW5kZWQgPSB0cnVlLFxuXHRcdGdhcCA9IDIsXG5cdFx0anVzdGlmeSA9ICdzcGFjZS1iZXR3ZWVuJyxcblx0XHR3cmFwID0gZmFsc2UsXG5cdFx0Li4ub3RoZXJQcm9wc1xuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggdXNlRGVwcmVjYXRlZFByb3BzKCBwcm9wcyApLCAnRmxleCcgKTtcblxuXHRjb25zdCBkaXJlY3Rpb25Bc0FycmF5ID0gQXJyYXkuaXNBcnJheSggZGlyZWN0aW9uUHJvcCApXG5cdFx0PyBkaXJlY3Rpb25Qcm9wXG5cdFx0OiBbIGRpcmVjdGlvblByb3AgXTtcblx0Y29uc3QgZGlyZWN0aW9uID0gdXNlUmVzcG9uc2l2ZVZhbHVlKCBkaXJlY3Rpb25Bc0FycmF5ICk7XG5cblx0Y29uc3QgaXNDb2x1bW4gPVxuXHRcdHR5cGVvZiBkaXJlY3Rpb24gPT09ICdzdHJpbmcnICYmICEhIGRpcmVjdGlvbi5pbmNsdWRlcyggJ2NvbHVtbicgKTtcblx0Y29uc3QgaXNSZXZlcnNlID1cblx0XHR0eXBlb2YgZGlyZWN0aW9uID09PSAnc3RyaW5nJyAmJiBkaXJlY3Rpb24uaW5jbHVkZXMoICdyZXZlcnNlJyApO1xuXG5cdGNvbnN0IGN4ID0gdXNlQ3goKTtcblx0Y29uc3QgcnRsV2F0Y2hSZXN1bHQgPSBydGwud2F0Y2goKTtcblxuXHRjb25zdCBjbGFzc2VzID0gdXNlTWVtbyggKCkgPT4ge1xuXHRcdGNvbnN0IHN4OiB7XG5cdFx0XHRCYXNlPzogU2VyaWFsaXplZFN0eWxlcztcblx0XHRcdEl0ZW1zPzogU2VyaWFsaXplZFN0eWxlcztcblx0XHRcdFdyYXBJdGVtcz86IFNlcmlhbGl6ZWRTdHlsZXM7XG5cdFx0fSA9IHt9O1xuXG5cdFx0c3guQmFzZSA9IGNzcygge1xuXHRcdFx0YWxpZ25JdGVtczogaXNDb2x1bW4gPyAnbm9ybWFsJyA6IGFsaWduLFxuXHRcdFx0ZmxleERpcmVjdGlvbjogZGlyZWN0aW9uLFxuXHRcdFx0ZmxleFdyYXA6IHdyYXAgPyAnd3JhcCcgOiB1bmRlZmluZWQsXG5cdFx0XHRqdXN0aWZ5Q29udGVudDoganVzdGlmeSxcblx0XHRcdGhlaWdodDogaXNDb2x1bW4gJiYgZXhwYW5kZWQgPyAnMTAwJScgOiB1bmRlZmluZWQsXG5cdFx0XHR3aWR0aDogISBpc0NvbHVtbiAmJiBleHBhbmRlZCA/ICcxMDAlJyA6IHVuZGVmaW5lZCxcblx0XHRcdG1hcmdpbkJvdHRvbTogd3JhcCA/IGBjYWxjKCR7IHNwYWNlKCBnYXAgKSB9ICogLTEpYCA6IHVuZGVmaW5lZCxcblx0XHR9ICk7XG5cblx0XHQvKipcblx0XHQgKiBXb3JrYXJvdW5kIHRvIG9wdGltaXplIERPTSByZW5kZXJpbmcuXG5cdFx0ICogV2UnbGwgZW5oYW5jZSBhbGlnbm1lbnQgd2l0aCBuYWl2ZSBwYXJlbnQgZmxleCBhc3N1bXB0aW9ucy5cblx0XHQgKlxuXHRcdCAqIFRyYWRlLW9mZjpcblx0XHQgKiBGYXIgbGVzcyBET00gbGVzcy4gSG93ZXZlciwgVUkgcmVuZGVyaW5nIGlzIG5vdCBhcyByZWxpYWJsZS5cblx0XHQgKi9cblx0XHRzeC5JdGVtcyA9IGNzc2Bcblx0XHRcdD4gKiArICo6bm90KCBtYXJxdWVlICkge1xuXHRcdFx0XHRtYXJnaW4tdG9wOiAkeyBpc0NvbHVtbiA/IHNwYWNlKCBnYXAgKSA6IHVuZGVmaW5lZCB9O1xuXHRcdFx0XHQkeyBydGwoIHtcblx0XHRcdFx0XHRtYXJnaW5MZWZ0OlxuXHRcdFx0XHRcdFx0ISBpc0NvbHVtbiAmJiAhIGlzUmV2ZXJzZSA/IHNwYWNlKCBnYXAgKSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRtYXJnaW5SaWdodDpcblx0XHRcdFx0XHRcdCEgaXNDb2x1bW4gJiYgaXNSZXZlcnNlID8gc3BhY2UoIGdhcCApIDogdW5kZWZpbmVkLFxuXHRcdFx0XHR9ICkoKSB9XG5cdFx0XHR9XG5cdFx0YDtcblxuXHRcdHN4LldyYXBJdGVtcyA9IGNzc2Bcblx0XHRcdD4gKjpub3QoIG1hcnF1ZWUgKSB7XG5cdFx0XHRcdG1hcmdpbi1ib3R0b206ICR7IHNwYWNlKCBnYXAgKSB9O1xuXHRcdFx0XHQkeyBydGwoIHtcblx0XHRcdFx0XHRtYXJnaW5MZWZ0OlxuXHRcdFx0XHRcdFx0ISBpc0NvbHVtbiAmJiBpc1JldmVyc2UgPyBzcGFjZSggZ2FwICkgOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0bWFyZ2luUmlnaHQ6XG5cdFx0XHRcdFx0XHQhIGlzQ29sdW1uICYmICEgaXNSZXZlcnNlID8gc3BhY2UoIGdhcCApIDogdW5kZWZpbmVkLFxuXHRcdFx0XHR9ICkoKSB9XG5cdFx0XHR9XG5cblx0XHRcdD4gKjpsYXN0LWNoaWxkOm5vdCggbWFycXVlZSApIHtcblx0XHRcdFx0JHsgcnRsKCB7XG5cdFx0XHRcdFx0bWFyZ2luTGVmdDogISBpc0NvbHVtbiAmJiBpc1JldmVyc2UgPyAwIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdG1hcmdpblJpZ2h0OiAhIGlzQ29sdW1uICYmICEgaXNSZXZlcnNlID8gMCA6IHVuZGVmaW5lZCxcblx0XHRcdFx0fSApKCkgfVxuXHRcdFx0fVxuXHRcdGA7XG5cblx0XHRyZXR1cm4gY3goXG5cdFx0XHRzdHlsZXMuRmxleCxcblx0XHRcdHN4LkJhc2UsXG5cdFx0XHR3cmFwID8gc3guV3JhcEl0ZW1zIDogc3guSXRlbXMsXG5cdFx0XHRpc0NvbHVtbiA/IHN0eWxlcy5JdGVtc0NvbHVtbiA6IHN0eWxlcy5JdGVtc1Jvdyxcblx0XHRcdGNsYXNzTmFtZVxuXHRcdCk7XG5cdFx0Ly8gcnRsV2F0Y2hSZXN1bHQgaXMgbmVlZGVkIHRvIHJlZnJlc2ggc3R5bGVzIHdoZW4gdGhlIHdyaXRpbmcgZGlyZWN0aW9uIGNoYW5nZXNcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG5cdH0sIFtcblx0XHRhbGlnbixcblx0XHRjbGFzc05hbWUsXG5cdFx0Y3gsXG5cdFx0ZGlyZWN0aW9uLFxuXHRcdGV4cGFuZGVkLFxuXHRcdGdhcCxcblx0XHRpc0NvbHVtbixcblx0XHRpc1JldmVyc2UsXG5cdFx0anVzdGlmeSxcblx0XHR3cmFwLFxuXHRcdHJ0bFdhdGNoUmVzdWx0LFxuXHRdICk7XG5cblx0cmV0dXJuIHsgLi4ub3RoZXJQcm9wcywgY2xhc3NOYW1lOiBjbGFzc2VzLCBpc0NvbHVtbiB9O1xufVxuIl19 */");
    sx.WrapItems = /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_6__.css)(">*:not( marquee ){margin-bottom:", (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_7__.space)(gap), ";", (0,_utils__WEBPACK_IMPORTED_MODULE_5__.rtl)({
      marginLeft: !isColumn && isReverse ? (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_7__.space)(gap) : undefined,
      marginRight: !isColumn && !isReverse ? (0,_ui_utils_space__WEBPACK_IMPORTED_MODULE_7__.space)(gap) : undefined
    })(), ";}>*:last-child:not( marquee ){", (0,_utils__WEBPACK_IMPORTED_MODULE_5__.rtl)({
      marginLeft: !isColumn && isReverse ? 0 : undefined,
      marginRight: !isColumn && !isReverse ? 0 : undefined
    })(), ";}" + ( false ? 0 : ";label:sx-WrapItems;"),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9mbGV4L2hvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUdvQiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2ZsZXgvZmxleC9ob29rLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzLCBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgZGVwcmVjYXRlZCBmcm9tICdAd29yZHByZXNzL2RlcHJlY2F0ZWQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyB1c2VDb250ZXh0U3lzdGVtLCBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uLy4uL3VpL2NvbnRleHQnO1xuaW1wb3J0IHsgdXNlUmVzcG9uc2l2ZVZhbHVlIH0gZnJvbSAnLi4vLi4vdWkvdXRpbHMvdXNlLXJlc3BvbnNpdmUtdmFsdWUnO1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi8uLi91aS91dGlscy9zcGFjZSc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi4vc3R5bGVzJztcbmltcG9ydCB7IHVzZUN4LCBydGwgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgdHlwZSB7IEZsZXhQcm9wcyB9IGZyb20gJy4uL3R5cGVzJztcblxuZnVuY3Rpb24gdXNlRGVwcmVjYXRlZFByb3BzKFxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IEZsZXhQcm9wcywgJ2RpdicgPlxuKTogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IEZsZXhQcm9wcywgJ2RpdicgPiB7XG5cdGNvbnN0IHsgaXNSZXZlcnNlZCwgLi4ub3RoZXJQcm9wcyB9ID0gcHJvcHM7XG5cblx0aWYgKCB0eXBlb2YgaXNSZXZlcnNlZCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0ZGVwcmVjYXRlZCggJ0ZsZXggaXNSZXZlcnNlZCcsIHtcblx0XHRcdGFsdGVybmF0aXZlOiAnRmxleCBkaXJlY3Rpb249XCJyb3ctcmV2ZXJzZVwiIG9yIFwiY29sdW1uLXJldmVyc2VcIicsXG5cdFx0XHRzaW5jZTogJzUuOScsXG5cdFx0fSApO1xuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5vdGhlclByb3BzLFxuXHRcdFx0ZGlyZWN0aW9uOiBpc1JldmVyc2VkID8gJ3Jvdy1yZXZlcnNlJyA6ICdyb3cnLFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gb3RoZXJQcm9wcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZsZXgoIHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgRmxleFByb3BzLCAnZGl2JyA+ICkge1xuXHRjb25zdCB7XG5cdFx0YWxpZ24gPSAnY2VudGVyJyxcblx0XHRjbGFzc05hbWUsXG5cdFx0ZGlyZWN0aW9uOiBkaXJlY3Rpb25Qcm9wID0gJ3JvdycsXG5cdFx0ZXhwYW5kZWQgPSB0cnVlLFxuXHRcdGdhcCA9IDIsXG5cdFx0anVzdGlmeSA9ICdzcGFjZS1iZXR3ZWVuJyxcblx0XHR3cmFwID0gZmFsc2UsXG5cdFx0Li4ub3RoZXJQcm9wc1xuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggdXNlRGVwcmVjYXRlZFByb3BzKCBwcm9wcyApLCAnRmxleCcgKTtcblxuXHRjb25zdCBkaXJlY3Rpb25Bc0FycmF5ID0gQXJyYXkuaXNBcnJheSggZGlyZWN0aW9uUHJvcCApXG5cdFx0PyBkaXJlY3Rpb25Qcm9wXG5cdFx0OiBbIGRpcmVjdGlvblByb3AgXTtcblx0Y29uc3QgZGlyZWN0aW9uID0gdXNlUmVzcG9uc2l2ZVZhbHVlKCBkaXJlY3Rpb25Bc0FycmF5ICk7XG5cblx0Y29uc3QgaXNDb2x1bW4gPVxuXHRcdHR5cGVvZiBkaXJlY3Rpb24gPT09ICdzdHJpbmcnICYmICEhIGRpcmVjdGlvbi5pbmNsdWRlcyggJ2NvbHVtbicgKTtcblx0Y29uc3QgaXNSZXZlcnNlID1cblx0XHR0eXBlb2YgZGlyZWN0aW9uID09PSAnc3RyaW5nJyAmJiBkaXJlY3Rpb24uaW5jbHVkZXMoICdyZXZlcnNlJyApO1xuXG5cdGNvbnN0IGN4ID0gdXNlQ3goKTtcblx0Y29uc3QgcnRsV2F0Y2hSZXN1bHQgPSBydGwud2F0Y2goKTtcblxuXHRjb25zdCBjbGFzc2VzID0gdXNlTWVtbyggKCkgPT4ge1xuXHRcdGNvbnN0IHN4OiB7XG5cdFx0XHRCYXNlPzogU2VyaWFsaXplZFN0eWxlcztcblx0XHRcdEl0ZW1zPzogU2VyaWFsaXplZFN0eWxlcztcblx0XHRcdFdyYXBJdGVtcz86IFNlcmlhbGl6ZWRTdHlsZXM7XG5cdFx0fSA9IHt9O1xuXG5cdFx0c3guQmFzZSA9IGNzcygge1xuXHRcdFx0YWxpZ25JdGVtczogaXNDb2x1bW4gPyAnbm9ybWFsJyA6IGFsaWduLFxuXHRcdFx0ZmxleERpcmVjdGlvbjogZGlyZWN0aW9uLFxuXHRcdFx0ZmxleFdyYXA6IHdyYXAgPyAnd3JhcCcgOiB1bmRlZmluZWQsXG5cdFx0XHRqdXN0aWZ5Q29udGVudDoganVzdGlmeSxcblx0XHRcdGhlaWdodDogaXNDb2x1bW4gJiYgZXhwYW5kZWQgPyAnMTAwJScgOiB1bmRlZmluZWQsXG5cdFx0XHR3aWR0aDogISBpc0NvbHVtbiAmJiBleHBhbmRlZCA/ICcxMDAlJyA6IHVuZGVmaW5lZCxcblx0XHRcdG1hcmdpbkJvdHRvbTogd3JhcCA/IGBjYWxjKCR7IHNwYWNlKCBnYXAgKSB9ICogLTEpYCA6IHVuZGVmaW5lZCxcblx0XHR9ICk7XG5cblx0XHQvKipcblx0XHQgKiBXb3JrYXJvdW5kIHRvIG9wdGltaXplIERPTSByZW5kZXJpbmcuXG5cdFx0ICogV2UnbGwgZW5oYW5jZSBhbGlnbm1lbnQgd2l0aCBuYWl2ZSBwYXJlbnQgZmxleCBhc3N1bXB0aW9ucy5cblx0XHQgKlxuXHRcdCAqIFRyYWRlLW9mZjpcblx0XHQgKiBGYXIgbGVzcyBET00gbGVzcy4gSG93ZXZlciwgVUkgcmVuZGVyaW5nIGlzIG5vdCBhcyByZWxpYWJsZS5cblx0XHQgKi9cblx0XHRzeC5JdGVtcyA9IGNzc2Bcblx0XHRcdD4gKiArICo6bm90KCBtYXJxdWVlICkge1xuXHRcdFx0XHRtYXJnaW4tdG9wOiAkeyBpc0NvbHVtbiA/IHNwYWNlKCBnYXAgKSA6IHVuZGVmaW5lZCB9O1xuXHRcdFx0XHQkeyBydGwoIHtcblx0XHRcdFx0XHRtYXJnaW5MZWZ0OlxuXHRcdFx0XHRcdFx0ISBpc0NvbHVtbiAmJiAhIGlzUmV2ZXJzZSA/IHNwYWNlKCBnYXAgKSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRtYXJnaW5SaWdodDpcblx0XHRcdFx0XHRcdCEgaXNDb2x1bW4gJiYgaXNSZXZlcnNlID8gc3BhY2UoIGdhcCApIDogdW5kZWZpbmVkLFxuXHRcdFx0XHR9ICkoKSB9XG5cdFx0XHR9XG5cdFx0YDtcblxuXHRcdHN4LldyYXBJdGVtcyA9IGNzc2Bcblx0XHRcdD4gKjpub3QoIG1hcnF1ZWUgKSB7XG5cdFx0XHRcdG1hcmdpbi1ib3R0b206ICR7IHNwYWNlKCBnYXAgKSB9O1xuXHRcdFx0XHQkeyBydGwoIHtcblx0XHRcdFx0XHRtYXJnaW5MZWZ0OlxuXHRcdFx0XHRcdFx0ISBpc0NvbHVtbiAmJiBpc1JldmVyc2UgPyBzcGFjZSggZ2FwICkgOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0bWFyZ2luUmlnaHQ6XG5cdFx0XHRcdFx0XHQhIGlzQ29sdW1uICYmICEgaXNSZXZlcnNlID8gc3BhY2UoIGdhcCApIDogdW5kZWZpbmVkLFxuXHRcdFx0XHR9ICkoKSB9XG5cdFx0XHR9XG5cblx0XHRcdD4gKjpsYXN0LWNoaWxkOm5vdCggbWFycXVlZSApIHtcblx0XHRcdFx0JHsgcnRsKCB7XG5cdFx0XHRcdFx0bWFyZ2luTGVmdDogISBpc0NvbHVtbiAmJiBpc1JldmVyc2UgPyAwIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdG1hcmdpblJpZ2h0OiAhIGlzQ29sdW1uICYmICEgaXNSZXZlcnNlID8gMCA6IHVuZGVmaW5lZCxcblx0XHRcdFx0fSApKCkgfVxuXHRcdFx0fVxuXHRcdGA7XG5cblx0XHRyZXR1cm4gY3goXG5cdFx0XHRzdHlsZXMuRmxleCxcblx0XHRcdHN4LkJhc2UsXG5cdFx0XHR3cmFwID8gc3guV3JhcEl0ZW1zIDogc3guSXRlbXMsXG5cdFx0XHRpc0NvbHVtbiA/IHN0eWxlcy5JdGVtc0NvbHVtbiA6IHN0eWxlcy5JdGVtc1Jvdyxcblx0XHRcdGNsYXNzTmFtZVxuXHRcdCk7XG5cdFx0Ly8gcnRsV2F0Y2hSZXN1bHQgaXMgbmVlZGVkIHRvIHJlZnJlc2ggc3R5bGVzIHdoZW4gdGhlIHdyaXRpbmcgZGlyZWN0aW9uIGNoYW5nZXNcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG5cdH0sIFtcblx0XHRhbGlnbixcblx0XHRjbGFzc05hbWUsXG5cdFx0Y3gsXG5cdFx0ZGlyZWN0aW9uLFxuXHRcdGV4cGFuZGVkLFxuXHRcdGdhcCxcblx0XHRpc0NvbHVtbixcblx0XHRpc1JldmVyc2UsXG5cdFx0anVzdGlmeSxcblx0XHR3cmFwLFxuXHRcdHJ0bFdhdGNoUmVzdWx0LFxuXHRdICk7XG5cblx0cmV0dXJuIHsgLi4ub3RoZXJQcm9wcywgY2xhc3NOYW1lOiBjbGFzc2VzLCBpc0NvbHVtbiB9O1xufVxuIl19 */");
    return cx(_styles__WEBPACK_IMPORTED_MODULE_8__.Flex, sx.Base, wrap ? sx.WrapItems : sx.Items, isColumn ? _styles__WEBPACK_IMPORTED_MODULE_8__.ItemsColumn : _styles__WEBPACK_IMPORTED_MODULE_8__.ItemsRow, className); // rtlWatchResult is needed to refresh styles when the writing direction changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [align, className, cx, direction, expanded, gap, isColumn, isReverse, justify, wrap, rtlWatchResult]);
  return { ...otherProps,
    className: classes,
    isColumn
  };
}
//# sourceMappingURL=hook.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/flex/styles.js":
/*!***********************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/flex/styles.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Flex": function() { return /* binding */ Flex; },
/* harmony export */   "Item": function() { return /* binding */ Item; },
/* harmony export */   "ItemsColumn": function() { return /* binding */ ItemsColumn; },
/* harmony export */   "ItemsRow": function() { return /* binding */ ItemsRow; },
/* harmony export */   "block": function() { return /* binding */ block; }
/* harmony export */ });
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

/**
 * External dependencies
 */

const Flex =  false ? 0 : {
  name: "a57899-Flex",
  styles: "display:flex;label:Flex;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS3VCIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBGbGV4ID0gY3NzYFxuXHRkaXNwbGF5OiBmbGV4O1xuYDtcblxuZXhwb3J0IGNvbnN0IEl0ZW0gPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRtYXgtaGVpZ2h0OiAxMDAlO1xuXHRtYXgtd2lkdGg6IDEwMCU7XG5cdG1pbi1oZWlnaHQ6IDA7XG5cdG1pbi13aWR0aDogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBibG9jayA9IGNzc2Bcblx0ZmxleDogMTtcbmA7XG5cbi8qKlxuICogV29ya2Fyb3VuZCB0byBvcHRpbWl6ZSBET00gcmVuZGVyaW5nLlxuICogV2UnbGwgZW5oYW5jZSBhbGlnbm1lbnQgd2l0aCBuYWl2ZSBwYXJlbnQgZmxleCBhc3N1bXB0aW9ucy5cbiAqXG4gKiBUcmFkZS1vZmY6XG4gKiBGYXIgbGVzcyBET00gbGVzcy4gSG93ZXZlciwgVUkgcmVuZGVyaW5nIGlzIG5vdCBhcyByZWxpYWJsZS5cbiAqL1xuXG4vKipcbiAqIEltcHJvdmVzIHN0YWJpbGl0eSBvZiB3aWR0aC9oZWlnaHQgcmVuZGVyaW5nLlxuICogaHR0cHM6Ly9naXRodWIuY29tL0l0c0pvblEvZzIvcHVsbC8xNDlcbiAqL1xuZXhwb3J0IGNvbnN0IEl0ZW1zQ29sdW1uID0gY3NzYFxuXHQ+ICoge1xuXHRcdG1pbi1oZWlnaHQ6IDA7XG5cdH1cbmA7XG5cbmV4cG9ydCBjb25zdCBJdGVtc1JvdyA9IGNzc2Bcblx0PiAqIHtcblx0XHRtaW4td2lkdGg6IDA7XG5cdH1cbmA7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
const Item =  false ? 0 : {
  name: "14ac8g8-Item",
  styles: "display:block;max-height:100%;max-width:100%;min-height:0;min-width:0;label:Item;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU3VCIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBGbGV4ID0gY3NzYFxuXHRkaXNwbGF5OiBmbGV4O1xuYDtcblxuZXhwb3J0IGNvbnN0IEl0ZW0gPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRtYXgtaGVpZ2h0OiAxMDAlO1xuXHRtYXgtd2lkdGg6IDEwMCU7XG5cdG1pbi1oZWlnaHQ6IDA7XG5cdG1pbi13aWR0aDogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBibG9jayA9IGNzc2Bcblx0ZmxleDogMTtcbmA7XG5cbi8qKlxuICogV29ya2Fyb3VuZCB0byBvcHRpbWl6ZSBET00gcmVuZGVyaW5nLlxuICogV2UnbGwgZW5oYW5jZSBhbGlnbm1lbnQgd2l0aCBuYWl2ZSBwYXJlbnQgZmxleCBhc3N1bXB0aW9ucy5cbiAqXG4gKiBUcmFkZS1vZmY6XG4gKiBGYXIgbGVzcyBET00gbGVzcy4gSG93ZXZlciwgVUkgcmVuZGVyaW5nIGlzIG5vdCBhcyByZWxpYWJsZS5cbiAqL1xuXG4vKipcbiAqIEltcHJvdmVzIHN0YWJpbGl0eSBvZiB3aWR0aC9oZWlnaHQgcmVuZGVyaW5nLlxuICogaHR0cHM6Ly9naXRodWIuY29tL0l0c0pvblEvZzIvcHVsbC8xNDlcbiAqL1xuZXhwb3J0IGNvbnN0IEl0ZW1zQ29sdW1uID0gY3NzYFxuXHQ+ICoge1xuXHRcdG1pbi1oZWlnaHQ6IDA7XG5cdH1cbmA7XG5cbmV4cG9ydCBjb25zdCBJdGVtc1JvdyA9IGNzc2Bcblx0PiAqIHtcblx0XHRtaW4td2lkdGg6IDA7XG5cdH1cbmA7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
const block =  false ? 0 : {
  name: "1ya6i3g-block",
  styles: "flex:1;label:block;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJ3QiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2ZsZXgvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgRmxleCA9IGNzc2Bcblx0ZGlzcGxheTogZmxleDtcbmA7XG5cbmV4cG9ydCBjb25zdCBJdGVtID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0bWF4LWhlaWdodDogMTAwJTtcblx0bWF4LXdpZHRoOiAxMDAlO1xuXHRtaW4taGVpZ2h0OiAwO1xuXHRtaW4td2lkdGg6IDA7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGZsZXg6IDE7XG5gO1xuXG4vKipcbiAqIFdvcmthcm91bmQgdG8gb3B0aW1pemUgRE9NIHJlbmRlcmluZy5cbiAqIFdlJ2xsIGVuaGFuY2UgYWxpZ25tZW50IHdpdGggbmFpdmUgcGFyZW50IGZsZXggYXNzdW1wdGlvbnMuXG4gKlxuICogVHJhZGUtb2ZmOlxuICogRmFyIGxlc3MgRE9NIGxlc3MuIEhvd2V2ZXIsIFVJIHJlbmRlcmluZyBpcyBub3QgYXMgcmVsaWFibGUuXG4gKi9cblxuLyoqXG4gKiBJbXByb3ZlcyBzdGFiaWxpdHkgb2Ygd2lkdGgvaGVpZ2h0IHJlbmRlcmluZy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9JdHNKb25RL2cyL3B1bGwvMTQ5XG4gKi9cbmV4cG9ydCBjb25zdCBJdGVtc0NvbHVtbiA9IGNzc2Bcblx0PiAqIHtcblx0XHRtaW4taGVpZ2h0OiAwO1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgSXRlbXNSb3cgPSBjc3NgXG5cdD4gKiB7XG5cdFx0bWluLXdpZHRoOiAwO1xuXHR9XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
/**
 * Workaround to optimize DOM rendering.
 * We'll enhance alignment with naive parent flex assumptions.
 *
 * Trade-off:
 * Far less DOM less. However, UI rendering is not as reliable.
 */

/**
 * Improves stability of width/height rendering.
 * https://github.com/ItsJonQ/g2/pull/149
 */

const ItemsColumn =  false ? 0 : {
  name: "9k4k7f-ItemsColumn",
  styles: ">*{min-height:0;};label:ItemsColumn;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUM4QiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2ZsZXgvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgRmxleCA9IGNzc2Bcblx0ZGlzcGxheTogZmxleDtcbmA7XG5cbmV4cG9ydCBjb25zdCBJdGVtID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0bWF4LWhlaWdodDogMTAwJTtcblx0bWF4LXdpZHRoOiAxMDAlO1xuXHRtaW4taGVpZ2h0OiAwO1xuXHRtaW4td2lkdGg6IDA7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGZsZXg6IDE7XG5gO1xuXG4vKipcbiAqIFdvcmthcm91bmQgdG8gb3B0aW1pemUgRE9NIHJlbmRlcmluZy5cbiAqIFdlJ2xsIGVuaGFuY2UgYWxpZ25tZW50IHdpdGggbmFpdmUgcGFyZW50IGZsZXggYXNzdW1wdGlvbnMuXG4gKlxuICogVHJhZGUtb2ZmOlxuICogRmFyIGxlc3MgRE9NIGxlc3MuIEhvd2V2ZXIsIFVJIHJlbmRlcmluZyBpcyBub3QgYXMgcmVsaWFibGUuXG4gKi9cblxuLyoqXG4gKiBJbXByb3ZlcyBzdGFiaWxpdHkgb2Ygd2lkdGgvaGVpZ2h0IHJlbmRlcmluZy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9JdHNKb25RL2cyL3B1bGwvMTQ5XG4gKi9cbmV4cG9ydCBjb25zdCBJdGVtc0NvbHVtbiA9IGNzc2Bcblx0PiAqIHtcblx0XHRtaW4taGVpZ2h0OiAwO1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgSXRlbXNSb3cgPSBjc3NgXG5cdD4gKiB7XG5cdFx0bWluLXdpZHRoOiAwO1xuXHR9XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
const ItemsRow =  false ? 0 : {
  name: "1ozeagb-ItemsRow",
  styles: ">*{min-width:0;};label:ItemsRow;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUMyQiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2ZsZXgvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgRmxleCA9IGNzc2Bcblx0ZGlzcGxheTogZmxleDtcbmA7XG5cbmV4cG9ydCBjb25zdCBJdGVtID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0bWF4LWhlaWdodDogMTAwJTtcblx0bWF4LXdpZHRoOiAxMDAlO1xuXHRtaW4taGVpZ2h0OiAwO1xuXHRtaW4td2lkdGg6IDA7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGZsZXg6IDE7XG5gO1xuXG4vKipcbiAqIFdvcmthcm91bmQgdG8gb3B0aW1pemUgRE9NIHJlbmRlcmluZy5cbiAqIFdlJ2xsIGVuaGFuY2UgYWxpZ25tZW50IHdpdGggbmFpdmUgcGFyZW50IGZsZXggYXNzdW1wdGlvbnMuXG4gKlxuICogVHJhZGUtb2ZmOlxuICogRmFyIGxlc3MgRE9NIGxlc3MuIEhvd2V2ZXIsIFVJIHJlbmRlcmluZyBpcyBub3QgYXMgcmVsaWFibGUuXG4gKi9cblxuLyoqXG4gKiBJbXByb3ZlcyBzdGFiaWxpdHkgb2Ygd2lkdGgvaGVpZ2h0IHJlbmRlcmluZy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9JdHNKb25RL2cyL3B1bGwvMTQ5XG4gKi9cbmV4cG9ydCBjb25zdCBJdGVtc0NvbHVtbiA9IGNzc2Bcblx0PiAqIHtcblx0XHRtaW4taGVpZ2h0OiAwO1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgSXRlbXNSb3cgPSBjc3NgXG5cdD4gKiB7XG5cdFx0bWluLXdpZHRoOiAwO1xuXHR9XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
//# sourceMappingURL=styles.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/form-token-field/suggestions-list.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/form-token-field/suggestions-list.js ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SuggestionsList": function() { return /* binding */ SuggestionsList; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dom_scroll_into_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dom-scroll-into-view */ "./node_modules/dom-scroll-into-view/lib/index.js");
/* harmony import */ var dom_scroll_into_view__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dom_scroll_into_view__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);


/**
 * External dependencies
 */




/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */

const handleMouseDown = e => {
  // By preventing default here, we will not lose focus of <input> when clicking a suggestion.
  e.preventDefault();
};

function SuggestionsList(_ref) {
  let {
    selectedIndex,
    scrollIntoView,
    match,
    onHover,
    onSelect,
    suggestions = [],
    displayTransform,
    instanceId,
    __experimentalRenderItem
  } = _ref;
  const [scrollingIntoView, setScrollingIntoView] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const listRef = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.useRefEffect)(listNode => {
    // only have to worry about scrolling selected suggestion into view
    // when already expanded.
    let id;

    if (selectedIndex > -1 && scrollIntoView && listNode.children[selectedIndex]) {
      setScrollingIntoView(true);
      dom_scroll_into_view__WEBPACK_IMPORTED_MODULE_2___default()(listNode.children[selectedIndex], listNode, {
        onlyScrollIfNeeded: true
      });
      id = window.setTimeout(() => {
        setScrollingIntoView(false);
      }, 100);
    }

    return () => {
      if (id !== undefined) {
        window.clearTimeout(id);
      }
    };
  }, [selectedIndex, scrollIntoView]);

  const handleHover = suggestion => {
    return () => {
      if (!scrollingIntoView) {
        onHover === null || onHover === void 0 ? void 0 : onHover(suggestion);
      }
    };
  };

  const handleClick = suggestion => {
    return () => {
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(suggestion);
    };
  };

  const computeSuggestionMatch = suggestion => {
    const matchText = displayTransform(match).toLocaleLowerCase();

    if (matchText.length === 0) {
      return null;
    }

    const transformedSuggestion = displayTransform(suggestion);
    const indexOfMatch = transformedSuggestion.toLocaleLowerCase().indexOf(matchText);
    return {
      suggestionBeforeMatch: transformedSuggestion.substring(0, indexOfMatch),
      suggestionMatch: transformedSuggestion.substring(indexOfMatch, indexOfMatch + matchText.length),
      suggestionAfterMatch: transformedSuggestion.substring(indexOfMatch + matchText.length)
    };
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    ref: listRef,
    className: "components-form-token-field__suggestions-list",
    id: `components-form-token-suggestions-${instanceId}`,
    role: "listbox"
  }, (0,lodash__WEBPACK_IMPORTED_MODULE_1__.map)(suggestions, (suggestion, index) => {
    const matchText = computeSuggestionMatch(suggestion);
    const className = classnames__WEBPACK_IMPORTED_MODULE_3___default()('components-form-token-field__suggestion', {
      'is-selected': index === selectedIndex
    });
    let output;

    if (typeof __experimentalRenderItem === 'function') {
      output = __experimentalRenderItem({
        item: suggestion
      });
    } else if (matchText) {
      output = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        "aria-label": displayTransform(suggestion)
      }, matchText.suggestionBeforeMatch, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", {
        className: "components-form-token-field__suggestion-match"
      }, matchText.suggestionMatch), matchText.suggestionAfterMatch);
    } else {
      output = displayTransform(suggestion);
    }
    /* eslint-disable jsx-a11y/click-events-have-key-events */


    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      id: `components-form-token-suggestions-${instanceId}-${index}`,
      role: "option",
      className: className,
      key: typeof suggestion === 'object' && 'value' in suggestion ? suggestion === null || suggestion === void 0 ? void 0 : suggestion.value : displayTransform(suggestion),
      onMouseDown: handleMouseDown,
      onClick: handleClick(suggestion),
      onMouseEnter: handleHover(suggestion),
      "aria-selected": index === selectedIndex
    }, output);
    /* eslint-enable jsx-a11y/click-events-have-key-events */
  }));
}
/* harmony default export */ __webpack_exports__["default"] = (SuggestionsList);
//# sourceMappingURL=suggestions-list.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/form-token-field/token-input.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/form-token-field/token-input.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TokenInput": function() { return /* binding */ TokenInput; },
/* harmony export */   "UnForwardedTokenInput": function() { return /* binding */ UnForwardedTokenInput; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

function UnForwardedTokenInput(props, ref) {
  const {
    value,
    isExpanded,
    instanceId,
    selectedSuggestionIndex,
    className,
    onChange,
    ...restProps
  } = props;
  const size = value ? value.length + 1 : 0;

  const onChangeHandler = event => {
    if (onChange) {
      onChange({
        value: event.target.value
      });
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    id: `components-form-token-input-${instanceId}`,
    type: "text"
  }, restProps, {
    value: value || '',
    onChange: onChangeHandler,
    size: size,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, 'components-form-token-field__input'),
    autoComplete: "off",
    role: "combobox",
    "aria-expanded": isExpanded,
    "aria-autocomplete": "list",
    "aria-owns": isExpanded ? `components-form-token-suggestions-${instanceId}` : undefined,
    "aria-activedescendant": selectedSuggestionIndex !== -1 ? `components-form-token-suggestions-${instanceId}-${selectedSuggestionIndex}` : undefined,
    "aria-describedby": `components-form-token-suggestions-howto-${instanceId}`
  }));
}
const TokenInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(UnForwardedTokenInput);
/* harmony default export */ __webpack_exports__["default"] = (TokenInput);
//# sourceMappingURL=token-input.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/higher-order/with-focus-outside/index.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/higher-order/with-focus-outside/index.js ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);


//@ts-nocheck

/**
 * WordPress dependencies
 */


/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(WrappedComponent => props => {
  const [handleFocusOutside, setHandleFocusOutside] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const bindFocusOutsideHandler = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(node => setHandleFocusOutside(() => node !== null && node !== void 0 && node.handleFocusOutside ? node.handleFocusOutside.bind(node) : undefined), []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.__experimentalUseFocusOutside)(handleFocusOutside), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(WrappedComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: bindFocusOutsideHandler
  }, props)));
}, 'withFocusOutside'));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/icon/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/icon/index.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dashicon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dashicon */ "./node_modules/wordpress-components/build-module/dashicon/index.js");


/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



function Icon(_ref) {
  let {
    icon = null,
    size = 24,
    ...additionalProps
  } = _ref;

  if ('string' === typeof icon) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_dashicon__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      icon: icon
    }, additionalProps));
  }

  if ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(icon) && _dashicon__WEBPACK_IMPORTED_MODULE_3__["default"] === icon.type) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(icon, { ...additionalProps
    });
  }

  if ('function' === typeof icon) {
    if (icon.prototype instanceof _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(icon, {
        size,
        ...additionalProps
      });
    }

    return icon({
      size,
      ...additionalProps
    });
  }

  if (icon && (icon.type === 'svg' || icon.type === _wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.SVG)) {
    const appliedProps = {
      width: size,
      height: size,
      ...icon.props,
      ...additionalProps
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_2__.SVG, appliedProps);
  }

  if ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(icon)) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(icon, {
      // @ts-ignore Just forwarding the size prop along
      size,
      ...additionalProps
    });
  }

  return icon;
}

/* harmony default export */ __webpack_exports__["default"] = (Icon);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/popover/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/popover/index.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @floating-ui/react-dom */ "./node_modules/@floating-ui/core/dist/floating-ui.core.esm.development.js");
/* harmony import */ var _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @floating-ui/react-dom */ "./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.esm.js");
/* harmony import */ var _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @floating-ui/react-dom */ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.esm.development.js");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close.js");
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/deprecated */ "@wordpress/deprecated");
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../button */ "./node_modules/wordpress-components/build-module/button/index.js");
/* harmony import */ var _scroll_lock__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../scroll-lock */ "./node_modules/wordpress-components/build-module/scroll-lock/index.js");
/* harmony import */ var _slot_fill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../slot-fill */ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/use-slot.js");
/* harmony import */ var _slot_fill__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../slot-fill */ "./node_modules/wordpress-components/build-module/slot-fill/index.js");
/* harmony import */ var _animate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../animate */ "./node_modules/wordpress-components/build-module/animate/index.js");


// @ts-nocheck

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */





/**
 * Name of slot in which popover should fill.
 *
 * @type {string}
 */

const SLOT_NAME = 'Popover'; // An SVG displaying a triangle facing down, filled with a solid
// color and bordered in such a way to create an arrow-like effect.
// Keeping the SVG's viewbox squared simplify the arrow positioning
// calculations.

const ArrowTriangle = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__.SVG, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: `0 0 100 100`,
  className: "components-popover__triangle",
  role: "presentation"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__.Path, {
  className: "components-popover__triangle-bg",
  d: "M 0 0 L 50 50 L 100 0"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__.Path, {
  className: "components-popover__triangle-border",
  d: "M 0 0 L 50 50 L 100 0",
  vectorEffect: "non-scaling-stroke"
}));

const slotNameContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)();

const positionToPlacement = position => {
  const [x, y, z] = position.split(' ');

  if (['top', 'bottom'].includes(x)) {
    let suffix = '';

    if (!!z && z === 'left' || y === 'right') {
      suffix = '-start';
    } else if (!!z && z === 'right' || y === 'left') {
      suffix = '-end';
    }

    return x + suffix;
  }

  return y;
};

const placementToAnimationOrigin = placement => {
  const [a, b] = placement.split('-');
  let x, y;

  if (a === 'top' || a === 'bottom') {
    x = a === 'top' ? 'bottom' : 'top';
    y = 'middle';

    if (b === 'start') {
      y = 'left';
    } else if (b === 'end') {
      y = 'right';
    }
  }

  if (a === 'left' || a === 'right') {
    x = 'center';
    y = a === 'left' ? 'right' : 'left';

    if (b === 'start') {
      x = 'top';
    } else if (b === 'end') {
      x = 'bottom';
    }
  }

  return x + ' ' + y;
};

const Popover = (_ref, forwardedRef) => {
  let {
    range,
    animate = true,
    headerTitle,
    onClose,
    children,
    className,
    noArrow = true,
    isAlternate,
    position,
    placement: placementProp = 'bottom-start',
    offset,
    focusOnMount = 'firstElement',
    anchorRef,
    anchorRect,
    getAnchorRect,
    expandOnMobile,
    onFocusOutside,
    __unstableSlotName = SLOT_NAME,
    __unstableObserveElement,
    __unstableForcePosition = false,
    __unstableShift = false,
    ...contentProps
  } = _ref;

  if (range) {
    _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_4___default()('range prop in Popover component', {
      since: '6.1',
      version: '6.3'
    });
  }

  const arrowRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const anchorRefFallback = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const isMobileViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.useViewportMatch)('medium', '<');
  const isExpanded = expandOnMobile && isMobileViewport;
  const hasArrow = !isExpanded && !noArrow;
  const normalizedPlacementFromProps = position ? positionToPlacement(position) : placementProp;
  const ownerDocument = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var _documentToReturn;

    let documentToReturn;

    if (anchorRef !== null && anchorRef !== void 0 && anchorRef.top) {
      documentToReturn = anchorRef === null || anchorRef === void 0 ? void 0 : anchorRef.top.ownerDocument;
    } else if (anchorRef !== null && anchorRef !== void 0 && anchorRef.startContainer) {
      documentToReturn = anchorRef.startContainer.ownerDocument;
    } else if (anchorRef !== null && anchorRef !== void 0 && anchorRef.current) {
      documentToReturn = anchorRef.current.ownerDocument;
    } else if (anchorRef) {
      // This one should be deprecated.
      documentToReturn = anchorRef.ownerDocument;
    } else if (anchorRect && anchorRect !== null && anchorRect !== void 0 && anchorRect.ownerDocument) {
      documentToReturn = anchorRect.ownerDocument;
    } else if (getAnchorRect) {
      var _getAnchorRect;

      documentToReturn = (_getAnchorRect = getAnchorRect(anchorRefFallback.current)) === null || _getAnchorRect === void 0 ? void 0 : _getAnchorRect.ownerDocument;
    }

    return (_documentToReturn = documentToReturn) !== null && _documentToReturn !== void 0 ? _documentToReturn : document;
  }, [anchorRef, anchorRect, getAnchorRect]);
  /**
   * Offsets the position of the popover when the anchor is inside an iframe.
   */

  const frameOffset = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const {
      defaultView
    } = ownerDocument;
    const {
      frameElement
    } = defaultView;

    if (!frameElement || ownerDocument === document) {
      return undefined;
    }

    const iframeRect = frameElement.getBoundingClientRect();
    return {
      x: iframeRect.left,
      y: iframeRect.top
    };
  }, [ownerDocument]);
  const middleware = [frameOffset || offset ? (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_6__.offset)(_ref2 => {
    let {
      placement: currentPlacement
    } = _ref2;

    if (!frameOffset) {
      return offset;
    }

    const isTopBottomPlacement = currentPlacement.includes('top') || currentPlacement.includes('bottom'); // The main axis should represent the gap between the
    // floating element and the reference element. The cross
    // axis is always perpendicular to the main axis.

    const mainAxis = isTopBottomPlacement ? 'y' : 'x';
    const crossAxis = mainAxis === 'x' ? 'y' : 'x'; // When the popover is before the reference, subtract the offset,
    // of the main axis else add it.

    const hasBeforePlacement = currentPlacement.includes('top') || currentPlacement.includes('left');
    const mainAxisModifier = hasBeforePlacement ? -1 : 1;
    const normalizedOffset = offset ? offset : 0;
    return {
      mainAxis: normalizedOffset + frameOffset[mainAxis] * mainAxisModifier,
      crossAxis: frameOffset[crossAxis]
    };
  }) : undefined, __unstableForcePosition ? undefined : (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_6__.flip)(), __unstableForcePosition ? undefined : (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_6__.size)({
    apply(sizeProps) {
      const {
        height
      } = sizeProps;
      if (!refs.floating.current) return; // Reduce the height of the popover to the available space.

      Object.assign(refs.floating.current.firstChild.style, {
        maxHeight: `${height}px`,
        overflow: 'auto'
      });
    }

  }), __unstableShift ? (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_6__.shift)({
    crossAxis: true,
    limiter: (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_6__.limitShift)(),
    padding: 1 // Necessary to avoid flickering at the edge of the viewport.

  }) : undefined, hasArrow ? (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_7__.arrow)({
    element: arrowRef
  }) : undefined].filter(m => !!m);

  const slotName = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(slotNameContext) || __unstableSlotName;

  const slot = (0,_slot_fill__WEBPACK_IMPORTED_MODULE_8__["default"])(slotName);
  let onDialogClose;

  if (onClose || onFocusOutside) {
    onDialogClose = (type, event) => {
      // Ideally the popover should have just a single onClose prop and
      // not three props that potentially do the same thing.
      if (type === 'focus-outside' && onFocusOutside) {
        onFocusOutside(event);
      } else if (onClose) {
        onClose();
      }
    };
  }

  const [dialogRef, dialogProps] = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.__experimentalUseDialog)({
    focusOnMount,
    __unstableOnClose: onDialogClose,
    onClose: onDialogClose
  });
  const {
    // Positioning coordinates
    x,
    y,
    // Callback refs (not regular refs). This allows the position to be updated.
    // when either elements change.
    reference,
    floating,
    // Object with "regular" refs to both "reference" and "floating"
    refs,
    // Type of CSS position property to use (absolute or fixed)
    strategy,
    update,
    placement: computedPlacement,
    middlewareData: {
      arrow: arrowData = {}
    }
  } = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_7__.useFloating)({
    placement: normalizedPlacementFromProps,
    middleware
  }); // Update the `reference`'s ref.
  //
  // In floating-ui's terms:
  // - "reference" refers to the popover's anchor element.
  // - "floating" refers the floating popover's element.
  // A floating element can also be positioned relative to a virtual element,
  // instead of a real one. A virtual element is represented by an object
  // with the `getBoundingClientRect()` function (like real elements).
  // See https://floating-ui.com/docs/virtual-elements for more info.

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    let resultingReferenceRef;

    if (anchorRef !== null && anchorRef !== void 0 && anchorRef.top) {
      // Create a virtual element for the ref. The expectation is that
      // if anchorRef.top is defined, then anchorRef.bottom is defined too.
      resultingReferenceRef = {
        getBoundingClientRect() {
          const topRect = anchorRef.top.getBoundingClientRect();
          const bottomRect = anchorRef.bottom.getBoundingClientRect();
          return new window.DOMRect(topRect.x, topRect.y, topRect.width, bottomRect.bottom - topRect.top);
        }

      };
    } else if (anchorRef !== null && anchorRef !== void 0 && anchorRef.current) {
      // Standard React ref.
      resultingReferenceRef = anchorRef.current;
    } else if (anchorRef) {
      // If `anchorRef` holds directly the element's value (no `current` key)
      // This is a weird scenario and should be deprecated.
      resultingReferenceRef = anchorRef;
    } else if (anchorRect) {
      // Create a virtual element for the ref.
      resultingReferenceRef = {
        getBoundingClientRect() {
          return anchorRect;
        }

      };
    } else if (getAnchorRect) {
      // Create a virtual element for the ref.
      resultingReferenceRef = {
        getBoundingClientRect() {
          var _rect$x, _rect$y, _rect$width, _rect$height;

          const rect = getAnchorRect(anchorRefFallback.current);
          return new window.DOMRect((_rect$x = rect.x) !== null && _rect$x !== void 0 ? _rect$x : rect.left, (_rect$y = rect.y) !== null && _rect$y !== void 0 ? _rect$y : rect.top, (_rect$width = rect.width) !== null && _rect$width !== void 0 ? _rect$width : rect.right - rect.left, (_rect$height = rect.height) !== null && _rect$height !== void 0 ? _rect$height : rect.bottom - rect.top);
        }

      };
    } else if (anchorRefFallback.current) {
      // If no explicit ref is passed via props, fall back to
      // anchoring to the popover's parent node.
      resultingReferenceRef = anchorRefFallback.current.parentNode;
    }

    if (!resultingReferenceRef) {
      return;
    }

    reference(resultingReferenceRef);

    if (!refs.floating.current) {
      return;
    }

    return (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_9__.autoUpdate)(resultingReferenceRef, refs.floating.current, update);
  }, [anchorRef, anchorRect, getAnchorRect]); // This is only needed for a smooth transition when moving blocks.

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (!__unstableObserveElement) {
      return;
    }

    const observer = new window.MutationObserver(update);
    observer.observe(__unstableObserveElement, {
      attributes: true
    });
    return () => {
      observer.disconnect();
    };
  }, [__unstableObserveElement]); // If the reference element is in a different ownerDocument (e.g. iFrame),
  // we need to manually update the floating's position as the reference's owner
  // document scrolls.

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (ownerDocument === document) {
      return;
    }

    ownerDocument.addEventListener('scroll', update);
    return () => ownerDocument.removeEventListener('scroll', update);
  }, [ownerDocument]);
  /** @type {false | string} */

  const animateClassName = !!animate && (0,_animate__WEBPACK_IMPORTED_MODULE_10__.getAnimateClassName)({
    type: 'appear',
    origin: placementToAnimationOrigin(computedPlacement)
  });
  const mergedFloatingRef = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.useMergeRefs)([floating, dialogRef, forwardedRef]); // Disable reason: We care to capture the _bubbled_ events from inputs
  // within popover as inferring close intent.

  let content = // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('components-popover', className, animateClassName, {
      'is-expanded': isExpanded,
      'is-alternate': isAlternate
    })
  }, contentProps, {
    ref: mergedFloatingRef
  }, dialogProps, {
    tabIndex: "-1",
    style: isExpanded ? undefined : {
      position: strategy,
      left: Number.isNaN(x) ? 0 : x,
      top: Number.isNaN(y) ? 0 : y
    }
  }), isExpanded && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_scroll_lock__WEBPACK_IMPORTED_MODULE_11__["default"], null), isExpanded && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "components-popover__header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "components-popover__header-title"
  }, headerTitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_button__WEBPACK_IMPORTED_MODULE_12__["default"], {
    className: "components-popover__close",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"],
    onClick: onClose
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "components-popover__content"
  }, children), hasArrow && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    ref: arrowRef,
    className: ['components-popover__arrow', `is-${computedPlacement.split('-')[0]}`].join(' '),
    style: {
      left: Number.isFinite(arrowData === null || arrowData === void 0 ? void 0 : arrowData.x) ? `${arrowData.x}px` : '',
      top: Number.isFinite(arrowData === null || arrowData === void 0 ? void 0 : arrowData.y) ? `${arrowData.y}px` : ''
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ArrowTriangle, null)));

  if (slot.ref) {
    content = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_slot_fill__WEBPACK_IMPORTED_MODULE_14__.Fill, {
      name: slotName
    }, content);
  }

  if (anchorRef || anchorRect) {
    return content;
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    ref: anchorRefFallback
  }, content);
};

const PopoverContainer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(Popover);

function PopoverSlot(_ref3, ref) {
  let {
    name = SLOT_NAME
  } = _ref3;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_slot_fill__WEBPACK_IMPORTED_MODULE_14__.Slot, {
    bubblesVirtually: true,
    name: name,
    className: "popover-slot",
    ref: ref
  });
}

PopoverContainer.Slot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(PopoverSlot);
PopoverContainer.__unstableSlotNameProvider = slotNameContext.Provider;
/* harmony default export */ __webpack_exports__["default"] = (PopoverContainer);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/scroll-lock/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/scroll-lock/index.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollLock": function() { return /* binding */ ScrollLock; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

/*
 * Setting `overflow: hidden` on html and body elements resets body scroll in iOS.
 * Save scroll top so we can restore it after locking scroll.
 *
 * NOTE: It would be cleaner and possibly safer to find a localized solution such
 * as preventing default on certain touchmove events.
 */

let previousScrollTop = 0;

function setLocked(locked) {
  const scrollingElement = document.scrollingElement || document.body;

  if (locked) {
    previousScrollTop = scrollingElement.scrollTop;
  }

  const methodName = locked ? 'add' : 'remove';
  scrollingElement.classList[methodName]('lockscroll'); // Adding the class to the document element seems to be necessary in iOS.

  document.documentElement.classList[methodName]('lockscroll');

  if (!locked) {
    scrollingElement.scrollTop = previousScrollTop;
  }
}

let lockCounter = 0;
/**
 * ScrollLock is a content-free React component for declaratively preventing
 * scroll bleed from modal UI to the page body. This component applies a
 * `lockscroll` class to the `document.documentElement` and
 * `document.scrollingElement` elements to stop the body from scrolling. When it
 * is present, the lock is applied.
 *
 * ```jsx
 * import { ScrollLock, Button } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyScrollLock = () => {
 *   const [ isScrollLocked, setIsScrollLocked ] = useState( false );
 *
 *   const toggleLock = () => {
 *     setIsScrollLocked( ( locked ) => ! locked ) );
 *   };
 *
 *   return (
 *     <div>
 *       <Button variant="secondary" onClick={ toggleLock }>
 *         Toggle scroll lock
 *       </Button>
 *       { isScrollLocked && <ScrollLock /> }
 *       <p>
 *         Scroll locked:
 *         <strong>{ isScrollLocked ? 'Yes' : 'No' }</strong>
 *       </p>
 *     </div>
 *   );
 * };
 * ```
 */

function ScrollLock() {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (lockCounter === 0) {
      setLocked(true);
    }

    ++lockCounter;
    return () => {
      if (lockCounter === 1) {
        setLocked(false);
      }

      --lockCounter;
    };
  }, []);
  return null;
}
/* harmony default export */ __webpack_exports__["default"] = (ScrollLock);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/shortcut/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/shortcut/index.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Internal dependencies
 */
function Shortcut(props) {
  const {
    shortcut,
    className
  } = props;

  if (!shortcut) {
    return null;
  }

  let displayText;
  let ariaLabel;

  if (typeof shortcut === 'string') {
    displayText = shortcut;
  }

  if (shortcut !== null && typeof shortcut === 'object') {
    displayText = shortcut.display;
    ariaLabel = shortcut.ariaLabel;
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: className,
    "aria-label": ariaLabel
  }, displayText);
}

/* harmony default export */ __webpack_exports__["default"] = (Shortcut);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/fill.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/fill.js ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Fill; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _use_slot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-slot */ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/use-slot.js");
/* harmony import */ var _style_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../style-provider */ "./node_modules/wordpress-components/build-module/style-provider/index.js");

// @ts-nocheck

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */




function useForceUpdate() {
  const [, setState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const mounted = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  return () => {
    if (mounted.current) {
      setState({});
    }
  };
}

function Fill(_ref) {
  let {
    name,
    children
  } = _ref;
  const slot = (0,_use_slot__WEBPACK_IMPORTED_MODULE_1__["default"])(name);
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    rerender: useForceUpdate()
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // We register fills so we can keep track of their existance.
    // Some Slot implementations need to know if there're already fills
    // registered so they can choose to render themselves or not.
    slot.registerFill(ref);
    return () => {
      slot.unregisterFill(ref);
    };
  }, [slot.registerFill, slot.unregisterFill]);

  if (!slot.ref || !slot.ref.current) {
    return null;
  }

  if (typeof children === 'function') {
    children = children(slot.fillProps);
  } // When using a `Fill`, the `children` will be rendered in the document of the
  // `Slot`. This means that we need to wrap the `children` in a `StyleProvider`
  // to make sure we're referencing the right document/iframe (instead of the
  // context of the `Fill`'s parent).


  const wrappedChildren = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_style_provider__WEBPACK_IMPORTED_MODULE_2__["default"], {
    document: slot.ref.current.ownerDocument
  }, children);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createPortal)(wrappedChildren, slot.ref.current);
}
//# sourceMappingURL=fill.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/slot-fill-context.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/slot-fill-context.js ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_warning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/warning */ "@wordpress/warning");
/* harmony import */ var _wordpress_warning__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_warning__WEBPACK_IMPORTED_MODULE_1__);
// @ts-nocheck

/**
 * WordPress dependencies
 */


const SlotFillContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  slots: {},
  fills: {},
  registerSlot: () => {
    typeof process !== "undefined" && process.env && "development" !== "production" ? _wordpress_warning__WEBPACK_IMPORTED_MODULE_1___default()('Components must be wrapped within `SlotFillProvider`. ' + 'See https://developer.wordpress.org/block-editor/components/slot-fill/') : void 0;
  },
  updateSlot: () => {},
  unregisterSlot: () => {},
  registerFill: () => {},
  unregisterFill: () => {}
});
/* harmony default export */ __webpack_exports__["default"] = (SlotFillContext);
//# sourceMappingURL=slot-fill-context.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/slot-fill-provider.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/slot-fill-provider.js ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SlotFillProvider; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/is-shallow-equal */ "@wordpress/is-shallow-equal");
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _slot_fill_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slot-fill-context */ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/slot-fill-context.js");

// @ts-nocheck

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



function useSlotRegistry() {
  const [slots, setSlots] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [fills, setFills] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const registerSlot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((name, ref, fillProps) => {
    setSlots(prevSlots => {
      const slot = prevSlots[name] || {};
      return { ...prevSlots,
        [name]: { ...slot,
          ref: ref || slot.ref,
          fillProps: fillProps || slot.fillProps || {}
        }
      };
    });
  }, []);
  const unregisterSlot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((name, ref) => {
    setSlots(prevSlots => {
      const {
        [name]: slot,
        ...nextSlots
      } = prevSlots; // Make sure we're not unregistering a slot registered by another element
      // See https://github.com/WordPress/gutenberg/pull/19242#issuecomment-590295412

      if ((slot === null || slot === void 0 ? void 0 : slot.ref) === ref) {
        return nextSlots;
      }

      return prevSlots;
    });
  }, []);
  const updateSlot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((name, fillProps) => {
    const slot = slots[name];

    if (!slot) {
      return;
    }

    if (!_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_1___default()(slot.fillProps, fillProps)) {
      slot.fillProps = fillProps;
      const slotFills = fills[name];

      if (slotFills) {
        // Force update fills.
        slotFills.map(fill => fill.current.rerender());
      }
    }
  }, [slots, fills]);
  const registerFill = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((name, ref) => {
    setFills(prevFills => ({ ...prevFills,
      [name]: [...(prevFills[name] || []), ref]
    }));
  }, []);
  const unregisterFill = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((name, ref) => {
    setFills(prevFills => {
      if (prevFills[name]) {
        return { ...prevFills,
          [name]: prevFills[name].filter(fillRef => fillRef !== ref)
        };
      }

      return prevFills;
    });
  }, []); // Memoizing the return value so it can be directly passed to Provider value

  const registry = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    slots,
    fills,
    registerSlot,
    updateSlot,
    unregisterSlot,
    registerFill,
    unregisterFill
  }), [slots, fills, registerSlot, updateSlot, unregisterSlot, registerFill, unregisterFill]);
  return registry;
}

function SlotFillProvider(_ref) {
  let {
    children
  } = _ref;
  const registry = useSlotRegistry();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_slot_fill_context__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
    value: registry
  }, children);
}
//# sourceMappingURL=slot-fill-provider.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/slot.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/slot.js ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _slot_fill_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slot-fill-context */ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/slot-fill-context.js");


// @ts-nocheck

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



function Slot(_ref, forwardedRef) {
  let {
    name,
    fillProps = {},
    as: Component = 'div',
    ...props
  } = _ref;
  const registry = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_slot_fill_context__WEBPACK_IMPORTED_MODULE_3__["default"]);
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    registry.registerSlot(name, ref, fillProps);
    return () => {
      registry.unregisterSlot(name, ref);
    }; // We are not including fillProps in the deps because we don't want to
    // unregister and register the slot whenever fillProps change, which would
    // cause the fill to be re-mounted. We are only considering the initial value
    // of fillProps.
  }, [registry.registerSlot, registry.unregisterSlot, name]); // fillProps may be an update that interacts with the layout, so we
  // useLayoutEffect.

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    registry.updateSlot(name, fillProps);
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useMergeRefs)([forwardedRef, ref])
  }, props));
}

/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(Slot));
//# sourceMappingURL=slot.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/use-slot.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/use-slot.js ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ useSlot; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _slot_fill_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slot-fill-context */ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/slot-fill-context.js");
// @ts-nocheck

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */


function useSlot(name) {
  const registry = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_slot_fill_context__WEBPACK_IMPORTED_MODULE_1__["default"]);
  const slot = registry.slots[name] || {};
  const slotFills = registry.fills[name];
  const fills = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => slotFills || [], [slotFills]);
  const updateSlot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(fillProps => {
    registry.updateSlot(name, fillProps);
  }, [name, registry.updateSlot]);
  const unregisterSlot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(slotRef => {
    registry.unregisterSlot(name, slotRef);
  }, [name, registry.unregisterSlot]);
  const registerFill = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(fillRef => {
    registry.registerFill(name, fillRef);
  }, [name, registry.registerFill]);
  const unregisterFill = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(fillRef => {
    registry.unregisterFill(name, fillRef);
  }, [name, registry.unregisterFill]);
  return { ...slot,
    updateSlot,
    unregisterSlot,
    fills,
    registerFill,
    unregisterFill
  };
}
//# sourceMappingURL=use-slot.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/slot-fill/context.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/slot-fill/context.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SlotFillContext": function() { return /* binding */ SlotFillContext; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
// @ts-nocheck

/**
 * WordPress dependencies
 */

const SlotFillContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  registerSlot: () => {},
  unregisterSlot: () => {},
  registerFill: () => {},
  unregisterFill: () => {},
  getSlot: () => {},
  getFills: () => {},
  subscribe: () => {}
});
/* harmony default export */ __webpack_exports__["default"] = (SlotFillContext);
//# sourceMappingURL=context.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/slot-fill/fill.js":
/*!**************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/slot-fill/fill.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "./node_modules/wordpress-components/build-module/slot-fill/context.js");
/* harmony import */ var _use_slot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-slot */ "./node_modules/wordpress-components/build-module/slot-fill/use-slot.js");


// @ts-nocheck

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */




function FillComponent(_ref) {
  let {
    name,
    children,
    registerFill,
    unregisterFill
  } = _ref;
  const slot = (0,_use_slot__WEBPACK_IMPORTED_MODULE_2__["default"])(name);
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)({
    name,
    children
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    registerFill(name, ref.current);
    return () => unregisterFill(name, ref.current);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    ref.current.children = children;

    if (slot) {
      slot.forceUpdate();
    }
  }, [children]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (name === ref.current.name) {
      // Ignore initial effect.
      return;
    }

    unregisterFill(ref.current.name, ref.current);
    ref.current.name = name;
    registerFill(name, ref.current);
  }, [name]);

  if (!slot || !slot.node) {
    return null;
  } // If a function is passed as a child, provide it with the fillProps.


  if (typeof children === 'function') {
    children = children(slot.props.fillProps);
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createPortal)(children, slot.node);
}

const Fill = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_context__WEBPACK_IMPORTED_MODULE_3__["default"].Consumer, null, _ref2 => {
  let {
    registerFill,
    unregisterFill
  } = _ref2;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(FillComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    registerFill: registerFill,
    unregisterFill: unregisterFill
  }));
});

/* harmony default export */ __webpack_exports__["default"] = (Fill);
//# sourceMappingURL=fill.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/slot-fill/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/slot-fill/index.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fill": function() { return /* binding */ Fill; },
/* harmony export */   "Provider": function() { return /* binding */ Provider; },
/* harmony export */   "Slot": function() { return /* binding */ Slot; },
/* harmony export */   "createSlotFill": function() { return /* binding */ createSlotFill; },
/* harmony export */   "useSlot": function() { return /* reexport safe */ _bubbles_virtually_use_slot__WEBPACK_IMPORTED_MODULE_8__["default"]; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fill */ "./node_modules/wordpress-components/build-module/slot-fill/fill.js");
/* harmony import */ var _slot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./slot */ "./node_modules/wordpress-components/build-module/slot-fill/slot.js");
/* harmony import */ var _bubbles_virtually_fill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bubbles-virtually/fill */ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/fill.js");
/* harmony import */ var _bubbles_virtually_slot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bubbles-virtually/slot */ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/slot.js");
/* harmony import */ var _bubbles_virtually_slot_fill_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bubbles-virtually/slot-fill-provider */ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/slot-fill-provider.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./provider */ "./node_modules/wordpress-components/build-module/slot-fill/provider.js");
/* harmony import */ var _bubbles_virtually_use_slot__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./bubbles-virtually/use-slot */ "./node_modules/wordpress-components/build-module/slot-fill/bubbles-virtually/use-slot.js");


// @ts-nocheck

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */








function Fill(props) {
  // We're adding both Fills here so they can register themselves before
  // their respective slot has been registered. Only the Fill that has a slot
  // will render. The other one will return null.
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fill__WEBPACK_IMPORTED_MODULE_2__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_bubbles_virtually_fill__WEBPACK_IMPORTED_MODULE_3__["default"], props));
}
const Slot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((_ref, ref) => {
  let {
    bubblesVirtually,
    ...props
  } = _ref;

  if (bubblesVirtually) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_bubbles_virtually_slot__WEBPACK_IMPORTED_MODULE_4__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      ref: ref
    }));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_slot__WEBPACK_IMPORTED_MODULE_5__["default"], props);
});
function Provider(_ref2) {
  let {
    children,
    ...props
  } = _ref2;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_provider__WEBPACK_IMPORTED_MODULE_6__["default"], props, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_bubbles_virtually_slot_fill_provider__WEBPACK_IMPORTED_MODULE_7__["default"], null, children));
}
function createSlotFill(name) {
  const FillComponent = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Fill, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    name: name
  }, props));

  FillComponent.displayName = name + 'Fill';

  const SlotComponent = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Slot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    name: name
  }, props));

  SlotComponent.displayName = name + 'Slot';
  SlotComponent.__unstableName = name;
  return {
    Fill: FillComponent,
    Slot: SlotComponent
  };
}

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/slot-fill/provider.js":
/*!******************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/slot-fill/provider.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SlotFillProvider; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./node_modules/wordpress-components/build-module/slot-fill/context.js");

// @ts-nocheck

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */


class SlotFillProvider extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.registerSlot = this.registerSlot.bind(this);
    this.registerFill = this.registerFill.bind(this);
    this.unregisterSlot = this.unregisterSlot.bind(this);
    this.unregisterFill = this.unregisterFill.bind(this);
    this.getSlot = this.getSlot.bind(this);
    this.getFills = this.getFills.bind(this);
    this.hasFills = this.hasFills.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.slots = {};
    this.fills = {};
    this.listeners = [];
    this.contextValue = {
      registerSlot: this.registerSlot,
      unregisterSlot: this.unregisterSlot,
      registerFill: this.registerFill,
      unregisterFill: this.unregisterFill,
      getSlot: this.getSlot,
      getFills: this.getFills,
      hasFills: this.hasFills,
      subscribe: this.subscribe
    };
  }

  registerSlot(name, slot) {
    const previousSlot = this.slots[name];
    this.slots[name] = slot;
    this.triggerListeners(); // Sometimes the fills are registered after the initial render of slot
    // But before the registerSlot call, we need to rerender the slot.

    this.forceUpdateSlot(name); // If a new instance of a slot is being mounted while another with the
    // same name exists, force its update _after_ the new slot has been
    // assigned into the instance, such that its own rendering of children
    // will be empty (the new Slot will subsume all fills for this name).

    if (previousSlot) {
      previousSlot.forceUpdate();
    }
  }

  registerFill(name, instance) {
    this.fills[name] = [...(this.fills[name] || []), instance];
    this.forceUpdateSlot(name);
  }

  unregisterSlot(name, instance) {
    // If a previous instance of a Slot by this name unmounts, do nothing,
    // as the slot and its fills should only be removed for the current
    // known instance.
    if (this.slots[name] !== instance) {
      return;
    }

    delete this.slots[name];
    this.triggerListeners();
  }

  unregisterFill(name, instance) {
    var _this$fills$name$filt, _this$fills$name;

    this.fills[name] = (_this$fills$name$filt = (_this$fills$name = this.fills[name]) === null || _this$fills$name === void 0 ? void 0 : _this$fills$name.filter(fill => fill !== instance)) !== null && _this$fills$name$filt !== void 0 ? _this$fills$name$filt : [];
    this.forceUpdateSlot(name);
  }

  getSlot(name) {
    return this.slots[name];
  }

  getFills(name, slotInstance) {
    // Fills should only be returned for the current instance of the slot
    // in which they occupy.
    if (this.slots[name] !== slotInstance) {
      return [];
    }

    return this.fills[name];
  }

  hasFills(name) {
    return this.fills[name] && !!this.fills[name].length;
  }

  forceUpdateSlot(name) {
    const slot = this.getSlot(name);

    if (slot) {
      slot.forceUpdate();
    }
  }

  triggerListeners() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context__WEBPACK_IMPORTED_MODULE_1__["default"].Provider, {
      value: this.contextValue
    }, this.props.children);
  }

}
//# sourceMappingURL=provider.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/slot-fill/slot.js":
/*!**************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/slot-fill/slot.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context */ "./node_modules/wordpress-components/build-module/slot-fill/context.js");


// @ts-nocheck

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */


/**
 * Whether the argument is a function.
 *
 * @param {*} maybeFunc The argument to check.
 * @return {boolean} True if the argument is a function, false otherwise.
 */

function isFunction(maybeFunc) {
  return typeof maybeFunc === 'function';
}

class SlotComponent extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor() {
    super(...arguments);
    this.isUnmounted = false;
    this.bindNode = this.bindNode.bind(this);
  }

  componentDidMount() {
    const {
      registerSlot
    } = this.props;
    registerSlot(this.props.name, this);
  }

  componentWillUnmount() {
    const {
      unregisterSlot
    } = this.props;
    this.isUnmounted = true;
    unregisterSlot(this.props.name, this);
  }

  componentDidUpdate(prevProps) {
    const {
      name,
      unregisterSlot,
      registerSlot
    } = this.props;

    if (prevProps.name !== name) {
      unregisterSlot(prevProps.name);
      registerSlot(name, this);
    }
  }

  bindNode(node) {
    this.node = node;
  }

  forceUpdate() {
    if (this.isUnmounted) {
      return;
    }

    super.forceUpdate();
  }

  render() {
    var _getFills;

    const {
      children,
      name,
      fillProps = {},
      getFills
    } = this.props;
    const fills = ((_getFills = getFills(name, this)) !== null && _getFills !== void 0 ? _getFills : []).map(fill => {
      const fillChildren = isFunction(fill.children) ? fill.children(fillProps) : fill.children;
      return _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Children.map(fillChildren, (child, childIndex) => {
        if (!child || typeof child === 'string') {
          return child;
        }

        const childKey = child.key || childIndex;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(child, {
          key: childKey
        });
      });
    }).filter( // In some cases fills are rendered only when some conditions apply.
    // This ensures that we only use non-empty fills when rendering, i.e.,
    // it allows us to render wrappers only when the fills are actually present.
    element => !(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.isEmptyElement)(element));
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, isFunction(children) ? children(fills) : fills);
  }

}

const Slot = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_context__WEBPACK_IMPORTED_MODULE_2__["default"].Consumer, null, _ref => {
  let {
    registerSlot,
    unregisterSlot,
    getFills
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(SlotComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    registerSlot: registerSlot,
    unregisterSlot: unregisterSlot,
    getFills: getFills
  }));
});

/* harmony default export */ __webpack_exports__["default"] = (Slot);
//# sourceMappingURL=slot.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/slot-fill/use-slot.js":
/*!******************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/slot-fill/use-slot.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./node_modules/wordpress-components/build-module/slot-fill/context.js");
// @ts-nocheck

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */


/**
 * React hook returning the active slot given a name.
 *
 * @param {string} name Slot name.
 * @return {Object} Slot object.
 */

const useSlot = name => {
  const {
    getSlot,
    subscribe
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_1__["default"]);
  const [slot, setSlot] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(getSlot(name));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSlot(getSlot(name));
    const unsubscribe = subscribe(() => {
      setSlot(getSlot(name));
    });
    return unsubscribe;
  }, [name]);
  return slot;
};

/* harmony default export */ __webpack_exports__["default"] = (useSlot);
//# sourceMappingURL=use-slot.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/style-provider/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/style-provider/index.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleProvider": function() { return /* binding */ StyleProvider; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");


/**
 * External dependencies
 */




/**
 * Internal dependencies
 */

const uuidCache = new Set();
const memoizedCreateCacheWithContainer = memize__WEBPACK_IMPORTED_MODULE_2___default()(container => {
  // Emotion only accepts alphabetical and hyphenated keys so we just
  // strip the numbers from the UUID. It _should_ be fine.
  let key = uuid__WEBPACK_IMPORTED_MODULE_3__["default"]().replace(/[0-9]/g, '');

  while (uuidCache.has(key)) {
    key = uuid__WEBPACK_IMPORTED_MODULE_3__["default"]().replace(/[0-9]/g, '');
  }

  uuidCache.add(key);
  return (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_1__["default"])({
    container,
    key
  });
});
function StyleProvider(props) {
  const {
    children,
    document
  } = props;

  if (!document) {
    return null;
  }

  const cache = memoizedCreateCacheWithContainer(document.head);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_emotion_react__WEBPACK_IMPORTED_MODULE_4__.C, {
    value: cache
  }, children);
}
/* harmony default export */ __webpack_exports__["default"] = (StyleProvider);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/tooltip/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/tooltip/index.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TOOLTIP_DELAY": function() { return /* binding */ TOOLTIP_DELAY; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../popover */ "./node_modules/wordpress-components/build-module/popover/index.js");
/* harmony import */ var _shortcut__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shortcut */ "./node_modules/wordpress-components/build-module/shortcut/index.js");

// @ts-nocheck

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */



/**
 * Time over children to wait before showing tooltip
 *
 * @type {number}
 */

const TOOLTIP_DELAY = 700;
const eventCatcher = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "event-catcher"
});

const getDisabledElement = _ref => {
  let {
    eventHandlers,
    child,
    childrenWithPopover,
    mergedRefs
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "disabled-element-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(eventCatcher, eventHandlers), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
    children: childrenWithPopover,
    ref: mergedRefs
  })), { ...eventHandlers
  });
};

const getRegularElement = _ref2 => {
  let {
    child,
    eventHandlers,
    childrenWithPopover,
    mergedRefs
  } = _ref2;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, { ...eventHandlers,
    children: childrenWithPopover,
    ref: mergedRefs
  });
};

const addPopoverToGrandchildren = _ref3 => {
  let {
    anchorRef,
    grandchildren,
    isOver,
    offset,
    position,
    shortcut,
    text
  } = _ref3;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.concatChildren)(grandchildren, isOver && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_popover__WEBPACK_IMPORTED_MODULE_3__["default"], {
    focusOnMount: false,
    position: position,
    className: "components-tooltip",
    "aria-hidden": "true",
    animate: false,
    offset: offset,
    anchorRef: anchorRef,
    __unstableShift: true
  }, text, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shortcut__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "components-tooltip__shortcut",
    shortcut: shortcut
  })));
};

const emitToChild = (children, eventName, event) => {
  if (_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Children.count(children) !== 1) {
    return;
  }

  const child = _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Children.only(children); // If the underlying element is disabled, do not emit the event.

  if (child.props.disabled) {
    return;
  }

  if (typeof child.props[eventName] === 'function') {
    child.props[eventName](event);
  }
};

function Tooltip(props) {
  var _Children$toArray$;

  const {
    children,
    position = 'bottom middle',
    text,
    shortcut,
    delay = TOOLTIP_DELAY
  } = props;
  /**
   * Whether a mouse is currently pressed, used in determining whether
   * to handle a focus event as displaying the tooltip immediately.
   *
   * @type {boolean}
   */

  const [isMouseDown, setIsMouseDown] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isOver, setIsOver] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const delayedSetIsOver = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useDebounce)(setIsOver, delay); // Create a reference to the Tooltip's child, to be passed to the Popover
  // so that the Tooltip can be correctly positioned. Also, merge with the
  // existing ref for the first child, so that its ref is preserved.

  const childRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const existingChildRef = (_Children$toArray$ = _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children)[0]) === null || _Children$toArray$ === void 0 ? void 0 : _Children$toArray$.ref;
  const mergedChildRefs = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useMergeRefs)([childRef, existingChildRef]);

  const createMouseDown = event => {
    // In firefox, the mouse down event is also fired when the select
    // list is chosen.
    // Cancel further processing because re-rendering of child components
    // causes onChange to be triggered with the old value.
    // See https://github.com/WordPress/gutenberg/pull/42483
    if (event.target.tagName === 'OPTION') {
      return;
    } // Preserve original child callback behavior.


    emitToChild(children, 'onMouseDown', event); // On mouse down, the next `mouseup` should revert the value of the
    // instance property and remove its own event handler. The bind is
    // made on the document since the `mouseup` might not occur within
    // the bounds of the element.

    document.addEventListener('mouseup', cancelIsMouseDown);
    setIsMouseDown(true);
  };

  const createMouseUp = event => {
    // In firefox, the mouse up event is also fired when the select
    // list is chosen.
    // Cancel further processing because re-rendering of child components
    // causes onChange to be triggered with the old value.
    // See https://github.com/WordPress/gutenberg/pull/42483
    if (event.target.tagName === 'OPTION') {
      return;
    }

    emitToChild(children, 'onMouseUp', event);
    document.removeEventListener('mouseup', cancelIsMouseDown);
    setIsMouseDown(false);
  };

  const createMouseEvent = type => {
    if (type === 'mouseUp') return createMouseUp;
    if (type === 'mouseDown') return createMouseDown;
  };
  /**
   * Prebound `isInMouseDown` handler, created as a constant reference to
   * assure ability to remove in component unmount.
   *
   * @type {Function}
   */


  const cancelIsMouseDown = createMouseEvent('mouseUp');

  const createToggleIsOver = (eventName, isDelayed) => {
    return event => {
      // Preserve original child callback behavior.
      emitToChild(children, eventName, event); // Mouse events behave unreliably in React for disabled elements,
      // firing on mouseenter but not mouseleave.  Further, the default
      // behavior for disabled elements in some browsers is to ignore
      // mouse events. Don't bother trying to handle them.
      //
      // See: https://github.com/facebook/react/issues/4251

      if (event.currentTarget.disabled) {
        return;
      } // A focus event will occur as a result of a mouse click, but it
      // should be disambiguated between interacting with the button and
      // using an explicit focus shift as a cue to display the tooltip.


      if ('focus' === event.type && isMouseDown) {
        return;
      } // Needed in case unsetting is over while delayed set pending, i.e.
      // quickly blur/mouseleave before delayedSetIsOver is called.


      delayedSetIsOver.cancel();

      const _isOver = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.includes)(['focus', 'mouseenter'], event.type);

      if (_isOver === isOver) {
        return;
      }

      if (isDelayed) {
        delayedSetIsOver(_isOver);
      } else {
        setIsOver(_isOver);
      }
    };
  };

  const clearOnUnmount = () => {
    delayedSetIsOver.cancel();
    document.removeEventListener('mouseup', cancelIsMouseDown);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => clearOnUnmount, []);

  if (_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Children.count(children) !== 1) {
    if (true) {
      // eslint-disable-next-line no-console
      console.error('Tooltip should be called with only a single child element.');
    }

    return children;
  }

  const eventHandlers = {
    onMouseEnter: createToggleIsOver('onMouseEnter', true),
    onMouseLeave: createToggleIsOver('onMouseLeave'),
    onClick: createToggleIsOver('onClick'),
    onFocus: createToggleIsOver('onFocus'),
    onBlur: createToggleIsOver('onBlur'),
    onMouseDown: createMouseEvent('mouseDown')
  };
  const child = _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Children.only(children);
  const {
    children: grandchildren,
    disabled
  } = child.props;
  const getElementWithPopover = disabled ? getDisabledElement : getRegularElement;
  const popoverData = {
    anchorRef: childRef,
    isOver,
    offset: 4,
    position,
    shortcut,
    text
  };
  const childrenWithPopover = addPopoverToGrandchildren({
    grandchildren,
    ...popoverData
  });
  return getElementWithPopover({
    child,
    eventHandlers,
    childrenWithPopover,
    mergedRefs: mergedChildRefs
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Tooltip);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/ui/context/constants.js":
/*!********************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/ui/context/constants.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMPONENT_NAMESPACE": function() { return /* binding */ COMPONENT_NAMESPACE; },
/* harmony export */   "CONNECTED_NAMESPACE": function() { return /* binding */ CONNECTED_NAMESPACE; },
/* harmony export */   "CONNECT_STATIC_NAMESPACE": function() { return /* binding */ CONNECT_STATIC_NAMESPACE; },
/* harmony export */   "CONTEXT_COMPONENT_NAMESPACE": function() { return /* binding */ CONTEXT_COMPONENT_NAMESPACE; },
/* harmony export */   "REACT_TYPEOF_KEY": function() { return /* binding */ REACT_TYPEOF_KEY; }
/* harmony export */ });
const REACT_TYPEOF_KEY = '$$typeof';
const COMPONENT_NAMESPACE = 'data-wp-component';
const CONNECTED_NAMESPACE = 'data-wp-c16t';
const CONTEXT_COMPONENT_NAMESPACE = 'data-wp-c5tc8t';
/**
 * Special key where the connected namespaces are stored.
 * This is attached to Context connected components as a static property.
 */

const CONNECT_STATIC_NAMESPACE = '__contextSystemKey__';
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/ui/context/context-connect.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/ui/context/context-connect.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "contextConnect": function() { return /* binding */ contextConnect; },
/* harmony export */   "getConnectNamespace": function() { return /* binding */ getConnectNamespace; },
/* harmony export */   "hasConnectNamespace": function() { return /* binding */ hasConnectNamespace; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/warning */ "@wordpress/warning");
/* harmony import */ var _wordpress_warning__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_warning__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./node_modules/wordpress-components/build-module/ui/context/constants.js");
/* harmony import */ var _get_styled_class_name_from_key__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./get-styled-class-name-from-key */ "./node_modules/wordpress-components/build-module/ui/context/get-styled-class-name-from-key.js");
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */




/**
 * Forwards ref (React.ForwardRef) and "Connects" (or registers) a component
 * within the Context system under a specified namespace.
 *
 * This is an (experimental) evolution of the initial connect() HOC.
 * The hope is that we can improve render performance by removing functional
 * component wrappers.
 *
 * @param  Component The component to register into the Context system.
 * @param  namespace The namespace to register the component under.
 * @param  options
 * @return The connected WordPressComponent
 */
function contextConnect(Component, namespace) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const {
    memo: memoProp = false
  } = options;
  let WrappedComponent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(Component);

  if (memoProp) {
    // @ts-ignore
    WrappedComponent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(WrappedComponent);
  }

  if (typeof namespace === 'undefined') {
    typeof process !== "undefined" && process.env && "development" !== "production" ? _wordpress_warning__WEBPACK_IMPORTED_MODULE_2___default()('contextConnect: Please provide a namespace') : void 0;
  } // @ts-ignore internal property


  let mergedNamespace = WrappedComponent[_constants__WEBPACK_IMPORTED_MODULE_3__.CONNECT_STATIC_NAMESPACE] || [namespace];
  /**
   * Consolidate (merge) namespaces before attaching it to the WrappedComponent.
   */

  if (Array.isArray(namespace)) {
    mergedNamespace = [...mergedNamespace, ...namespace];
  }

  if (typeof namespace === 'string') {
    mergedNamespace = [...mergedNamespace, namespace];
  }

  WrappedComponent.displayName = namespace; // @ts-ignore internal property

  WrappedComponent[_constants__WEBPACK_IMPORTED_MODULE_3__.CONNECT_STATIC_NAMESPACE] = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.uniq)(mergedNamespace); // @ts-ignore WordPressComponent property

  WrappedComponent.selector = `.${(0,_get_styled_class_name_from_key__WEBPACK_IMPORTED_MODULE_4__.getStyledClassNameFromKey)(namespace)}`; // @ts-ignore

  return WrappedComponent;
}
/**
 * Attempts to retrieve the connected namespace from a component.
 *
 * @param  Component The component to retrieve a namespace from.
 * @return The connected namespaces.
 */

function getConnectNamespace(Component) {
  if (!Component) return [];
  let namespaces = []; // @ts-ignore internal property

  if (Component[_constants__WEBPACK_IMPORTED_MODULE_3__.CONNECT_STATIC_NAMESPACE]) {
    // @ts-ignore internal property
    namespaces = Component[_constants__WEBPACK_IMPORTED_MODULE_3__.CONNECT_STATIC_NAMESPACE];
  } // @ts-ignore


  if (Component.type && Component.type[_constants__WEBPACK_IMPORTED_MODULE_3__.CONNECT_STATIC_NAMESPACE]) {
    // @ts-ignore
    namespaces = Component.type[_constants__WEBPACK_IMPORTED_MODULE_3__.CONNECT_STATIC_NAMESPACE];
  }

  return namespaces;
}
/**
 * Checks to see if a component is connected within the Context system.
 *
 * @param  Component The component to retrieve a namespace from.
 * @param  match     The namespace to check.
 */

function hasConnectNamespace(Component, match) {
  if (!Component) return false;

  if (typeof match === 'string') {
    return getConnectNamespace(Component).includes(match);
  }

  if (Array.isArray(match)) {
    return match.some(result => getConnectNamespace(Component).includes(result));
  }

  return false;
}
//# sourceMappingURL=context-connect.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/ui/context/context-system-provider.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/ui/context/context-system-provider.js ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComponentsContext": function() { return /* binding */ ComponentsContext; },
/* harmony export */   "ContextSystemProvider": function() { return /* binding */ ContextSystemProvider; },
/* harmony export */   "useComponentsContext": function() { return /* binding */ useComponentsContext; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/warning */ "@wordpress/warning");
/* harmony import */ var _wordpress_warning__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_warning__WEBPACK_IMPORTED_MODULE_2__);


/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */



const ComponentsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)(
/** @type {Record<string, any>} */
{});
const useComponentsContext = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(ComponentsContext);
/**
 * Runs an effect only on update (i.e., ignores the first render)
 *
 * @param {import('react').EffectCallback} effect
 * @param {import('react').DependencyList} deps
 */

function useUpdateEffect(effect, deps) {
  const mounted = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
    return undefined;
  }, deps);
}
/**
 * Consolidates incoming ContextSystem values with a (potential) parent ContextSystem value.
 *
 * Note: This function will warn if it detects an un-memoized `value`
 *
 * @param {Object}              props
 * @param {Record<string, any>} props.value
 * @return {Record<string, any>} The consolidated value.
 */


function useContextSystemBridge(_ref) {
  let {
    value
  } = _ref;
  const parentContext = useComponentsContext();
  const valueRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
  useUpdateEffect(() => {
    if ( // Objects are equivalent.
    (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEqual)(valueRef.current, value) && // But not the same reference.
    valueRef.current !== value) {
      typeof process !== "undefined" && process.env && "development" !== "production" ? _wordpress_warning__WEBPACK_IMPORTED_MODULE_2___default()(`Please memoize your context: ${JSON.stringify(value)}`) : void 0;
    }
  }, [value]); // `parentContext` will always be memoized (i.e., the result of this hook itself)
  // or the default value from when the `ComponentsContext` was originally
  // initialized (which will never change, it's a static variable)
  // so this memoization will prevent `merge` and `cloneDeep` from rerunning unless
  // the references to `value` change OR the `parentContext` has an actual material change
  // (because again, it's guaranteed to be memoized or a static reference to the empty object
  // so we know that the only changes for `parentContext` are material ones... i.e., why we
  // don't have to warn in the `useUpdateEffect` hook above for `parentContext` and we only
  // need to bother with the `value`). The `useUpdateEffect` above will ensure that we are
  // correctly warning when the `value` isn't being properly memoized. All of that to say
  // that this should be super safe to assume that `useMemo` will only run on actual
  // changes to the two dependencies, therefore saving us calls to `merge` and `cloneDeep`!

  const config = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return (0,lodash__WEBPACK_IMPORTED_MODULE_1__.merge)((0,lodash__WEBPACK_IMPORTED_MODULE_1__.cloneDeep)(parentContext), value);
  }, [parentContext, value]);
  return config;
}
/**
 * A Provider component that can modify props for connected components within
 * the Context system.
 *
 * @example
 * ```jsx
 * <ContextSystemProvider value={{ Button: { size: 'small' }}}>
 *   <Button>...</Button>
 * </ContextSystemProvider>
 * ```
 *
 * @template {Record<string, any>} T
 * @param {Object}                    options
 * @param {import('react').ReactNode} options.children Children to render.
 * @param {T}                         options.value    Props to render into connected components.
 * @return {JSX.Element} A Provider wrapped component.
 */


const BaseContextSystemProvider = _ref2 => {
  let {
    children,
    value
  } = _ref2;
  const contextValue = useContextSystemBridge({
    value
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ComponentsContext.Provider, {
    value: contextValue
  }, children);
};

const ContextSystemProvider = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(BaseContextSystemProvider);
//# sourceMappingURL=context-system-provider.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/ui/context/get-styled-class-name-from-key.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/ui/context/get-styled-class-name-from-key.js ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStyledClassNameFromKey": function() { return /* binding */ getStyledClassNameFromKey; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External dependencies
 */


/**
 * Generates the connected component CSS className based on the namespace.
 *
 * @param  namespace The name of the connected component.
 * @return The generated CSS className.
 */

function getStyledClassName(namespace) {
  const kebab = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.kebabCase)(namespace);
  return `components-${kebab}`;
}

const getStyledClassNameFromKey = memize__WEBPACK_IMPORTED_MODULE_1___default()(getStyledClassName);
//# sourceMappingURL=get-styled-class-name-from-key.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/ui/context/use-context-system.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/ui/context/use-context-system.js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useContextSystem": function() { return /* binding */ useContextSystem; }
/* harmony export */ });
/* harmony import */ var _wordpress_warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/warning */ "@wordpress/warning");
/* harmony import */ var _wordpress_warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_system_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context-system-provider */ "./node_modules/wordpress-components/build-module/ui/context/context-system-provider.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/wordpress-components/build-module/ui/context/utils.js");
/* harmony import */ var _get_styled_class_name_from_key__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./get-styled-class-name-from-key */ "./node_modules/wordpress-components/build-module/ui/context/get-styled-class-name-from-key.js");
/* harmony import */ var _utils_hooks_use_cx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/hooks/use-cx */ "./node_modules/wordpress-components/build-module/utils/hooks/use-cx.js");
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */





/**
 * @template TProps
 * @typedef {TProps & { className: string }} ConnectedProps
 */

/**
 * Custom hook that derives registered props from the Context system.
 * These derived props are then consolidated with incoming component props.
 *
 * @template {{ className?: string }} P
 * @param {P}      props     Incoming props from the component.
 * @param {string} namespace The namespace to register and to derive context props from.
 * @return {ConnectedProps<P>} The connected props.
 */

function useContextSystem(props, namespace) {
  const contextSystemProps = (0,_context_system_provider__WEBPACK_IMPORTED_MODULE_1__.useComponentsContext)();

  if (typeof namespace === 'undefined') {
    typeof process !== "undefined" && process.env && "development" !== "production" ? _wordpress_warning__WEBPACK_IMPORTED_MODULE_0___default()('useContextSystem: Please provide a namespace') : void 0;
  }

  const contextProps = (contextSystemProps === null || contextSystemProps === void 0 ? void 0 : contextSystemProps[namespace]) || {};
  /* eslint-disable jsdoc/no-undefined-types */

  /** @type {ConnectedProps<P>} */
  // @ts-ignore We fill in the missing properties below

  const finalComponentProps = { ...(0,_utils__WEBPACK_IMPORTED_MODULE_2__.getConnectedNamespace)(),
    ...(0,_utils__WEBPACK_IMPORTED_MODULE_2__.getNamespace)(namespace)
  };
  /* eslint-enable jsdoc/no-undefined-types */

  const {
    _overrides: overrideProps,
    ...otherContextProps
  } = contextProps;
  const initialMergedProps = Object.entries(otherContextProps).length ? Object.assign({}, otherContextProps, props) : props;
  const cx = (0,_utils_hooks_use_cx__WEBPACK_IMPORTED_MODULE_3__.useCx)();
  const classes = cx((0,_get_styled_class_name_from_key__WEBPACK_IMPORTED_MODULE_4__.getStyledClassNameFromKey)(namespace), props.className); // Provides the ability to customize the render of the component.

  const rendered = typeof initialMergedProps.renderChildren === 'function' ? initialMergedProps.renderChildren(initialMergedProps) : initialMergedProps.children;

  for (const key in initialMergedProps) {
    // @ts-ignore filling in missing props
    finalComponentProps[key] = initialMergedProps[key];
  }

  for (const key in overrideProps) {
    // @ts-ignore filling in missing props
    finalComponentProps[key] = overrideProps[key];
  } // Setting an `undefined` explicitly can cause unintended overwrites
  // when a `cloneElement()` is involved.


  if (rendered !== undefined) {
    // @ts-ignore
    finalComponentProps.children = rendered;
  }

  finalComponentProps.className = classes;
  return finalComponentProps;
}
//# sourceMappingURL=use-context-system.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/ui/context/utils.js":
/*!****************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/ui/context/utils.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getConnectedNamespace": function() { return /* binding */ getConnectedNamespace; },
/* harmony export */   "getNamespace": function() { return /* binding */ getNamespace; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/wordpress-components/build-module/ui/context/constants.js");
/**
 * Internal dependencies
 */

/**
 * Creates a dedicated context namespace HTML attribute for components.
 * ns is short for "namespace"
 *
 * @example
 * ```jsx
 * <div {...ns('Container')} />
 * ```
 *
 * @param {string} componentName The name for the component.
 * @return {Record<string, any>} A props object with the namespaced HTML attribute.
 */

function getNamespace(componentName) {
  return {
    [_constants__WEBPACK_IMPORTED_MODULE_0__.COMPONENT_NAMESPACE]: componentName
  };
}
/**
 * Creates a dedicated connected context namespace HTML attribute for components.
 * ns is short for "namespace"
 *
 * @example
 * ```jsx
 * <div {...cns()} />
 * ```
 *
 * @return {Record<string, any>} A props object with the namespaced HTML attribute.
 */

function getConnectedNamespace() {
  return {
    [_constants__WEBPACK_IMPORTED_MODULE_0__.CONNECTED_NAMESPACE]: true
  };
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/ui/utils/space.js":
/*!**************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/ui/utils/space.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "space": function() { return /* binding */ space; }
/* harmony export */ });
/**
 * The argument value for the `space()` utility function.
 *
 * When this is a number or a numeric string, it will be interpreted as a
 * multiplier for the grid base value (4px). For example, `space( 2 )` will be 8px.
 *
 * Otherwise, it will be interpreted as a literal CSS length value. For example,
 * `space( 'auto' )` will be 'auto', and `space( '2px' )` will be 2px.
 */
const GRID_BASE = '4px';
/**
 * A function that handles numbers, numeric strings, and unit values.
 *
 * When given a number or a numeric string, it will return the grid-based
 * value as a factor of GRID_BASE, defined above.
 *
 * When given a unit value or one of the named CSS values like `auto`,
 * it will simply return the value back.
 *
 * @param  value A number, numeric string, or a unit value.
 */

function space(value) {
  var _window$CSS, _window$CSS$supports;

  if (typeof value === 'undefined') {
    return undefined;
  } // Handle empty strings, if it's the number 0 this still works.


  if (!value) {
    return '0';
  }

  const asInt = typeof value === 'number' ? value : Number(value); // Test if the input has a unit, was NaN, or was one of the named CSS values (like `auto`), in which case just use that value.

  if (typeof window !== 'undefined' && (_window$CSS = window.CSS) !== null && _window$CSS !== void 0 && (_window$CSS$supports = _window$CSS.supports) !== null && _window$CSS$supports !== void 0 && _window$CSS$supports.call(_window$CSS, 'margin', value.toString()) || Number.isNaN(asInt)) {
    return value.toString();
  }

  return `calc(${GRID_BASE} * ${value})`;
}
//# sourceMappingURL=space.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/ui/utils/use-responsive-value.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/ui/utils/use-responsive-value.js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useBreakpointIndex": function() { return /* binding */ useBreakpointIndex; },
/* harmony export */   "useResponsiveValue": function() { return /* binding */ useResponsiveValue; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

const breakpoints = ['40em', '52em', '64em'];
const useBreakpointIndex = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    defaultIndex = 0
  } = options;

  if (typeof defaultIndex !== 'number') {
    throw new TypeError(`Default breakpoint index should be a number. Got: ${defaultIndex}, ${typeof defaultIndex}`);
  } else if (defaultIndex < 0 || defaultIndex > breakpoints.length - 1) {
    throw new RangeError(`Default breakpoint index out of range. Theme has ${breakpoints.length} breakpoints, got index ${defaultIndex}`);
  }

  const [value, setValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultIndex);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const getIndex = () => breakpoints.filter(bp => {
      return typeof window !== 'undefined' ? window.matchMedia(`screen and (min-width: ${bp})`).matches : false;
    }).length;

    const onResize = () => {
      const newValue = getIndex();

      if (value !== newValue) {
        setValue(newValue);
      }
    };

    onResize();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize);
      }
    };
  }, [value]);
  return value;
};
function useResponsiveValue(values) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const index = useBreakpointIndex(options); // Allow calling the function with a "normal" value without having to check on the outside.

  if (!Array.isArray(values) && typeof values !== 'function') return values;
  const array = values || [];
  /* eslint-disable jsdoc/no-undefined-types */

  return (
    /** @type {T[]} */
    array[
    /* eslint-enable jsdoc/no-undefined-types */
    index >= array.length ? array.length - 1 : index]
  );
}
//# sourceMappingURL=use-responsive-value.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/utils/base-label.js":
/*!****************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/utils/base-label.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseLabelTypography": function() { return /* binding */ baseLabelTypography; }
/* harmony export */ });
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

/**
 * External dependencies
 */
 // This is a very low-level mixin which you shouldn't have to use directly.
// Try to use BaseControl's StyledLabel or BaseControl.VisualLabel if you can.

const baseLabelTypography =  false ? 0 : {
  name: "1awj7qe-baseLabelTypography",
  styles: "font-size:11px;font-weight:500;line-height:1.4;text-transform:uppercase;label:baseLabelTypography;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdXRpbHMvYmFzZS1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPc0MiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy91dGlscy9iYXNlLWxhYmVsLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vLyBUaGlzIGlzIGEgdmVyeSBsb3ctbGV2ZWwgbWl4aW4gd2hpY2ggeW91IHNob3VsZG4ndCBoYXZlIHRvIHVzZSBkaXJlY3RseS5cbi8vIFRyeSB0byB1c2UgQmFzZUNvbnRyb2wncyBTdHlsZWRMYWJlbCBvciBCYXNlQ29udHJvbC5WaXN1YWxMYWJlbCBpZiB5b3UgY2FuLlxuZXhwb3J0IGNvbnN0IGJhc2VMYWJlbFR5cG9ncmFwaHkgPSBjc3NgXG5cdGZvbnQtc2l6ZTogMTFweDtcblx0Zm9udC13ZWlnaHQ6IDUwMDtcblx0bGluZS1oZWlnaHQ6IDEuNDtcblx0dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbmA7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
//# sourceMappingURL=base-label.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/utils/box-sizing.js":
/*!****************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/utils/box-sizing.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boxSizingReset": function() { return /* binding */ boxSizingReset; }
/* harmony export */ });
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

/**
 * External dependencies
 */

const boxSizingReset =  false ? 0 : {
  name: "1pa5nhz-boxSizingReset",
  styles: "box-sizing:border-box;*,*::before,*::after{box-sizing:inherit;};label:boxSizingReset;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdXRpbHMvYm94LXNpemluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLaUMiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy91dGlscy9ib3gtc2l6aW5nLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgYm94U2l6aW5nUmVzZXQgPSBjc3NgXG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cblx0Kixcblx0Kjo6YmVmb3JlLFxuXHQqOjphZnRlciB7XG5cdFx0Ym94LXNpemluZzogaW5oZXJpdDtcblx0fVxuYDtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
//# sourceMappingURL=box-sizing.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/utils/colors-values.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/utils/colors-values.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COLORS": function() { return /* binding */ COLORS; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colors */ "./node_modules/wordpress-components/build-module/utils/colors.js");
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */


const BASE = {
  black: '#000',
  white: '#fff'
};
const G2 = {
  blue: {
    medium: {
      focus: '#007cba',
      focusDark: '#fff'
    }
  },
  gray: {
    900: '#1e1e1e',
    700: '#757575',
    // Meets 4.6:1 text contrast against white.
    600: '#949494',
    // Meets 3:1 UI or large text contrast against white.
    400: '#ccc',
    300: '#ddd',
    // Used for most borders.
    200: '#e0e0e0',
    // Used sparingly for light borders.
    100: '#f0f0f0' // Used for light gray backgrounds.

  },
  mediumGray: {
    text: '#757575'
  },
  lightGray: {
    ui: '#949494',
    secondary: '#ccc',
    tertiary: '#e7e8e9'
  }
};
const DARK_GRAY = {
  900: '#191e23',
  800: '#23282d',
  700: '#32373c',
  600: '#40464d',
  500: '#555d66',
  // Use this most of the time for dark items.
  400: '#606a73',
  300: '#6c7781',
  // Lightest gray that can be used for AA text contrast.
  200: '#7e8993',
  150: '#8d96a0',
  // Lightest gray that can be used for AA non-text contrast.
  100: '#8f98a1',
  placeholder: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(G2.gray[900], 0.62)
};
const DARK_OPACITY = {
  900: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#000510', 0.9),
  800: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#00000a', 0.85),
  700: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#06060b', 0.8),
  600: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#000913', 0.75),
  500: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#0a1829', 0.7),
  400: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#0a1829', 0.65),
  300: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#0e1c2e', 0.62),
  200: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#162435', 0.55),
  100: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#223443', 0.5),
  backgroundFill: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(DARK_GRAY[700], 0.7)
};
const DARK_OPACITY_LIGHT = {
  900: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#304455', 0.45),
  800: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#425863', 0.4),
  700: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#667886', 0.35),
  600: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#7b86a2', 0.3),
  500: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#9197a2', 0.25),
  400: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#95959c', 0.2),
  300: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#829493', 0.15),
  200: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#8b8b96', 0.1),
  100: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)('#747474', 0.05)
};
const LIGHT_GRAY = {
  900: '#a2aab2',
  800: '#b5bcc2',
  700: '#ccd0d4',
  600: '#d7dade',
  500: '#e2e4e7',
  // Good for "grayed" items and borders.
  400: '#e8eaeb',
  // Good for "readonly" input fields and special text selection.
  300: '#edeff0',
  200: '#f3f4f5',
  100: '#f8f9f9',
  placeholder: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(BASE.white, 0.65)
};
const LIGHT_OPACITY_LIGHT = {
  900: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(BASE.white, 0.5),
  800: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(BASE.white, 0.45),
  700: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(BASE.white, 0.4),
  600: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(BASE.white, 0.35),
  500: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(BASE.white, 0.3),
  400: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(BASE.white, 0.25),
  300: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(BASE.white, 0.2),
  200: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(BASE.white, 0.15),
  100: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(BASE.white, 0.1),
  backgroundFill: (0,_colors__WEBPACK_IMPORTED_MODULE_1__.rgba)(LIGHT_GRAY[300], 0.8)
}; // Additional colors.
// Some are from https://make.wordpress.org/design/handbook/foundations/colors/.

const BLUE = {
  wordpress: {
    700: '#00669b'
  },
  dark: {
    900: '#0071a1'
  },
  medium: {
    900: '#006589',
    800: '#00739c',
    700: '#007fac',
    600: '#008dbe',
    500: '#00a0d2',
    400: '#33b3db',
    300: '#66c6e4',
    200: '#bfe7f3',
    100: '#e5f5fa',
    highlight: '#b3e7fe',
    focus: '#007cba'
  }
};
const ALERT = {
  yellow: '#f0b849',
  red: '#d94f4f',
  green: '#4ab866'
};
const ADMIN = {
  theme: `var( --wp-admin-theme-color, ${BLUE.wordpress[700]})`,
  themeDark10: `var( --wp-admin-theme-color-darker-10, ${BLUE.medium.focus})`
}; // Namespaced values for raw colors hex codes.

const UI = {
  theme: ADMIN.theme,
  background: BASE.white,
  backgroundDisabled: LIGHT_GRAY[200],
  border: G2.gray[700],
  borderHover: G2.gray[700],
  borderFocus: ADMIN.themeDark10,
  borderDisabled: G2.gray[400],
  borderLight: G2.gray[300],
  label: DARK_GRAY[500],
  textDisabled: DARK_GRAY[150],
  textDark: BASE.white,
  textLight: BASE.black
}; // Using Object.assign instead of { ...spread } syntax helps TypeScript
// to extract the correct type defs here.

const COLORS = Object.assign({}, BASE, {
  darkGray: DARK_GRAY,
  darkOpacity: DARK_OPACITY,
  darkOpacityLight: DARK_OPACITY_LIGHT,
  mediumGray: G2.mediumGray,

  /**
   * The main gray color object (since Apr 16, 2022).
   *
   * We are in the process of simplifying the colors in this file,
   * please prefer this `gray` object in the meantime.
   */
  gray: G2.gray,
  lightGray: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.merge)({}, LIGHT_GRAY, G2.lightGray),
  lightGrayLight: LIGHT_OPACITY_LIGHT,
  blue: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.merge)({}, BLUE, G2.blue),
  alert: ALERT,
  admin: ADMIN,
  ui: UI
});
/* harmony default export */ __webpack_exports__["default"] = (COLORS);
//# sourceMappingURL=colors-values.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/utils/colors.js":
/*!************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/utils/colors.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rgba": function() { return /* binding */ rgba; }
/* harmony export */ });
/* harmony import */ var colord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! colord */ "./node_modules/colord/index.mjs");
/* harmony import */ var colord_plugins_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! colord/plugins/names */ "./node_modules/colord/plugins/names.mjs");
/**
 * External dependencies
 */


(0,colord__WEBPACK_IMPORTED_MODULE_0__.extend)([colord_plugins_names__WEBPACK_IMPORTED_MODULE_1__["default"]]);
/**
 * Generating a CSS compliant rgba() color value.
 *
 * @param {string} hexValue The hex value to convert to rgba().
 * @param {number} alpha    The alpha value for opacity.
 * @return {string} The converted rgba() color value.
 *
 * @example
 * rgba( '#000000', 0.5 )
 * // rgba(0, 0, 0, 0.5)
 */

function rgba() {
  let hexValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return (0,colord__WEBPACK_IMPORTED_MODULE_0__.colord)(hexValue).alpha(alpha).toRgbString();
}
//# sourceMappingURL=colors.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/utils/font-values.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/utils/font-values.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  'default.fontFamily': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
  'default.fontSize': '13px',
  'helpText.fontSize': '12px',
  mobileTextMinFontSize: '16px'
});
//# sourceMappingURL=font-values.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/utils/font.js":
/*!**********************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/utils/font.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "font": function() { return /* binding */ font; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _font_values__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./font-values */ "./node_modules/wordpress-components/build-module/utils/font-values.js");
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */


/**
 *
 * @param {keyof FONT} value Path of value from `FONT`
 * @return {string} Font rule value
 */

function font(value) {
  return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.get)(_font_values__WEBPACK_IMPORTED_MODULE_1__["default"], value, '');
}
//# sourceMappingURL=font.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/utils/hooks/use-controlled-value.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/utils/hooks/use-controlled-value.js ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useControlledValue": function() { return /* binding */ useControlledValue; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Simplified and improved implementation of useControlledState.
 *
 * @param  props
 * @param  props.defaultValue
 * @param  props.value
 * @param  props.onChange
 * @return The controlled value and the value setter.
 */
function useControlledValue(_ref) {
  let {
    defaultValue,
    onChange,
    value: valueProp
  } = _ref;
  const hasValue = typeof valueProp !== 'undefined';
  const initialValue = hasValue ? valueProp : defaultValue;
  const [state, setState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);
  const value = hasValue ? valueProp : state;
  let setValue;

  if (hasValue && typeof onChange === 'function') {
    setValue = onChange;
  } else if (!hasValue && typeof onChange === 'function') {
    setValue = nextValue => {
      onChange(nextValue);
      setState(nextValue);
    };
  } else {
    setValue = setState;
  }

  return [value, setValue];
}
//# sourceMappingURL=use-controlled-value.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/utils/hooks/use-cx.js":
/*!******************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/utils/hooks/use-cx.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useCx": function() { return /* binding */ useCx; }
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/css */ "./node_modules/@emotion/css/dist/emotion-css.esm.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External dependencies
 */

 // eslint-disable-next-line no-restricted-imports


/**
 * WordPress dependencies
 */



const isSerializedStyles = o => typeof o !== 'undefined' && o !== null && ['name', 'styles'].every(p => typeof o[p] !== 'undefined');
/**
 * Retrieve a `cx` function that knows how to handle `SerializedStyles`
 * returned by the `@emotion/react` `css` function in addition to what
 * `cx` normally knows how to handle. It also hooks into the Emotion
 * Cache, allowing `css` calls to work inside iframes.
 *
 * @example
 * import { css } from '@emotion/react';
 *
 * const styles = css`
 * 	color: red
 * `;
 *
 * function RedText( { className, ...props } ) {
 * 	const cx = useCx();
 *
 * 	const classes = cx(styles, className);
 *
 * 	return <span className={classes} {...props} />;
 * }
 */


const useCx = () => {
  const cache = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__._)();
  const cx = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function () {
    if (cache === null) {
      throw new Error('The `useCx` hook should be only used within a valid Emotion Cache Context');
    }

    for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
      classNames[_key] = arguments[_key];
    }

    return (0,_emotion_css__WEBPACK_IMPORTED_MODULE_1__.cx)(...classNames.map(arg => {
      if (isSerializedStyles(arg)) {
        (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_0__.insertStyles)(cache, arg, false);
        return `${cache.key}-${arg.name}`;
      }

      return arg;
    }));
  }, [cache]);
  return cx;
};
//# sourceMappingURL=use-cx.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/utils/rtl.js":
/*!*********************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/utils/rtl.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertLTRToRTL": function() { return /* binding */ convertLTRToRTL; },
/* harmony export */   "rtl": function() { return /* binding */ rtl; }
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */


const LOWER_LEFT_REGEXP = new RegExp(/-left/g);
const LOWER_RIGHT_REGEXP = new RegExp(/-right/g);
const UPPER_LEFT_REGEXP = new RegExp(/Left/g);
const UPPER_RIGHT_REGEXP = new RegExp(/Right/g);
/**
 * Flips a CSS property from left <-> right.
 *
 * @param {string} key The CSS property name.
 *
 * @return {string} The flipped CSS property name, if applicable.
 */

function getConvertedKey(key) {
  if (key === 'left') {
    return 'right';
  }

  if (key === 'right') {
    return 'left';
  }

  if (LOWER_LEFT_REGEXP.test(key)) {
    return key.replace(LOWER_LEFT_REGEXP, '-right');
  }

  if (LOWER_RIGHT_REGEXP.test(key)) {
    return key.replace(LOWER_RIGHT_REGEXP, '-left');
  }

  if (UPPER_LEFT_REGEXP.test(key)) {
    return key.replace(UPPER_LEFT_REGEXP, 'Right');
  }

  if (UPPER_RIGHT_REGEXP.test(key)) {
    return key.replace(UPPER_RIGHT_REGEXP, 'Left');
  }

  return key;
}
/**
 * An incredibly basic ltr -> rtl converter for style properties
 *
 * @param {import('react').CSSProperties} ltrStyles
 *
 * @return {import('react').CSSProperties} Converted ltr -> rtl styles
 */


const convertLTRToRTL = function () {
  let ltrStyles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.mapKeys)(ltrStyles, (_value, key) => getConvertedKey(key));
};
/**
 * A higher-order function that create an incredibly basic ltr -> rtl style converter for CSS objects.
 *
 * @param {import('react').CSSProperties} ltrStyles   Ltr styles. Converts and renders from ltr -> rtl styles, if applicable.
 * @param {import('react').CSSProperties} [rtlStyles] Rtl styles. Renders if provided.
 *
 * @return {() => import('@emotion/react').SerializedStyles} A function to output CSS styles for Emotion's renderer
 */

function rtl() {
  let ltrStyles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let rtlStyles = arguments.length > 1 ? arguments[1] : undefined;
  return () => {
    if (rtlStyles) {
      // @ts-ignore: `css` types are wrong, it can accept an object: https://emotion.sh/docs/object-styles#with-css
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.isRTL)() ? /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)(rtlStyles,  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdXRpbHMvcnRsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBFb0IiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy91dGlscy9ydGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBtYXBLZXlzIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGlzUlRMIH0gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcblxuY29uc3QgTE9XRVJfTEVGVF9SRUdFWFAgPSBuZXcgUmVnRXhwKCAvLWxlZnQvZyApO1xuY29uc3QgTE9XRVJfUklHSFRfUkVHRVhQID0gbmV3IFJlZ0V4cCggLy1yaWdodC9nICk7XG5jb25zdCBVUFBFUl9MRUZUX1JFR0VYUCA9IG5ldyBSZWdFeHAoIC9MZWZ0L2cgKTtcbmNvbnN0IFVQUEVSX1JJR0hUX1JFR0VYUCA9IG5ldyBSZWdFeHAoIC9SaWdodC9nICk7XG5cbi8qKlxuICogRmxpcHMgYSBDU1MgcHJvcGVydHkgZnJvbSBsZWZ0IDwtPiByaWdodC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBDU1MgcHJvcGVydHkgbmFtZS5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmbGlwcGVkIENTUyBwcm9wZXJ0eSBuYW1lLCBpZiBhcHBsaWNhYmxlLlxuICovXG5mdW5jdGlvbiBnZXRDb252ZXJ0ZWRLZXkoIGtleSApIHtcblx0aWYgKCBrZXkgPT09ICdsZWZ0JyApIHtcblx0XHRyZXR1cm4gJ3JpZ2h0Jztcblx0fVxuXG5cdGlmICgga2V5ID09PSAncmlnaHQnICkge1xuXHRcdHJldHVybiAnbGVmdCc7XG5cdH1cblxuXHRpZiAoIExPV0VSX0xFRlRfUkVHRVhQLnRlc3QoIGtleSApICkge1xuXHRcdHJldHVybiBrZXkucmVwbGFjZSggTE9XRVJfTEVGVF9SRUdFWFAsICctcmlnaHQnICk7XG5cdH1cblxuXHRpZiAoIExPV0VSX1JJR0hUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIExPV0VSX1JJR0hUX1JFR0VYUCwgJy1sZWZ0JyApO1xuXHR9XG5cblx0aWYgKCBVUFBFUl9MRUZUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIFVQUEVSX0xFRlRfUkVHRVhQLCAnUmlnaHQnICk7XG5cdH1cblxuXHRpZiAoIFVQUEVSX1JJR0hUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIFVQUEVSX1JJR0hUX1JFR0VYUCwgJ0xlZnQnICk7XG5cdH1cblxuXHRyZXR1cm4ga2V5O1xufVxuXG4vKipcbiAqIEFuIGluY3JlZGlibHkgYmFzaWMgbHRyIC0+IHJ0bCBjb252ZXJ0ZXIgZm9yIHN0eWxlIHByb3BlcnRpZXNcbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgncmVhY3QnKS5DU1NQcm9wZXJ0aWVzfSBsdHJTdHlsZXNcbiAqXG4gKiBAcmV0dXJuIHtpbXBvcnQoJ3JlYWN0JykuQ1NTUHJvcGVydGllc30gQ29udmVydGVkIGx0ciAtPiBydGwgc3R5bGVzXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0TFRSVG9SVEwgPSAoIGx0clN0eWxlcyA9IHt9ICkgPT4ge1xuXHRyZXR1cm4gbWFwS2V5cyggbHRyU3R5bGVzLCAoIF92YWx1ZSwga2V5ICkgPT4gZ2V0Q29udmVydGVkS2V5KCBrZXkgKSApO1xufTtcblxuLyoqXG4gKiBBIGhpZ2hlci1vcmRlciBmdW5jdGlvbiB0aGF0IGNyZWF0ZSBhbiBpbmNyZWRpYmx5IGJhc2ljIGx0ciAtPiBydGwgc3R5bGUgY29udmVydGVyIGZvciBDU1Mgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgncmVhY3QnKS5DU1NQcm9wZXJ0aWVzfSBsdHJTdHlsZXMgICBMdHIgc3R5bGVzLiBDb252ZXJ0cyBhbmQgcmVuZGVycyBmcm9tIGx0ciAtPiBydGwgc3R5bGVzLCBpZiBhcHBsaWNhYmxlLlxuICogQHBhcmFtIHtpbXBvcnQoJ3JlYWN0JykuQ1NTUHJvcGVydGllc30gW3J0bFN0eWxlc10gUnRsIHN0eWxlcy4gUmVuZGVycyBpZiBwcm92aWRlZC5cbiAqXG4gKiBAcmV0dXJuIHsoKSA9PiBpbXBvcnQoJ0BlbW90aW9uL3JlYWN0JykuU2VyaWFsaXplZFN0eWxlc30gQSBmdW5jdGlvbiB0byBvdXRwdXQgQ1NTIHN0eWxlcyBmb3IgRW1vdGlvbidzIHJlbmRlcmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydGwoIGx0clN0eWxlcyA9IHt9LCBydGxTdHlsZXMgKSB7XG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKCBydGxTdHlsZXMgKSB7XG5cdFx0XHQvLyBAdHMtaWdub3JlOiBgY3NzYCB0eXBlcyBhcmUgd3JvbmcsIGl0IGNhbiBhY2NlcHQgYW4gb2JqZWN0OiBodHRwczovL2Vtb3Rpb24uc2gvZG9jcy9vYmplY3Qtc3R5bGVzI3dpdGgtY3NzXG5cdFx0XHRyZXR1cm4gaXNSVEwoKSA/IGNzcyggcnRsU3R5bGVzICkgOiBjc3MoIGx0clN0eWxlcyApO1xuXHRcdH1cblxuXHRcdC8vIEB0cy1pZ25vcmU6IGBjc3NgIHR5cGVzIGFyZSB3cm9uZywgaXQgY2FuIGFjY2VwdCBhbiBvYmplY3Q6IGh0dHBzOi8vZW1vdGlvbi5zaC9kb2NzL29iamVjdC1zdHlsZXMjd2l0aC1jc3Ncblx0XHRyZXR1cm4gaXNSVEwoKSA/IGNzcyggY29udmVydExUUlRvUlRMKCBsdHJTdHlsZXMgKSApIDogY3NzKCBsdHJTdHlsZXMgKTtcblx0fTtcbn1cblxuLyoqXG4gKiBDYWxsIHRoaXMgaW4gdGhlIGB1c2VNZW1vYCBkZXBlbmRlbmN5IGFycmF5IHRvIGVuc3VyZSB0aGF0IHN1YnNlcXVlbnQgcmVuZGVycyB3aWxsXG4gKiBjYXVzZSBydGwgc3R5bGVzIHRvIHVwZGF0ZSBiYXNlZCBvbiB0aGUgYGlzUlRMYCByZXR1cm4gdmFsdWUgZXZlbiBpZiBhbGwgb3RoZXIgZGVwZW5kZW5jaWVzXG4gKiByZW1haW4gdGhlIHNhbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHN0eWxlcyA9IHVzZU1lbW8oICgpID0+IHtcbiAqICAgcmV0dXJuIGNzc2BcbiAqICAgICAkeyBydGwoIHsgbWFyZ2luUmlnaHQ6ICcxMHB4JyB9ICkgfVxuICogICBgO1xuICogfSwgWyBydGwud2F0Y2goKSBdICk7XG4gKi9cbnJ0bC53YXRjaCA9ICgpID0+IGlzUlRMKCk7XG4iXX0= */") : /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)(ltrStyles,  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdXRpbHMvcnRsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBFdUMiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy91dGlscy9ydGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBtYXBLZXlzIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGlzUlRMIH0gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcblxuY29uc3QgTE9XRVJfTEVGVF9SRUdFWFAgPSBuZXcgUmVnRXhwKCAvLWxlZnQvZyApO1xuY29uc3QgTE9XRVJfUklHSFRfUkVHRVhQID0gbmV3IFJlZ0V4cCggLy1yaWdodC9nICk7XG5jb25zdCBVUFBFUl9MRUZUX1JFR0VYUCA9IG5ldyBSZWdFeHAoIC9MZWZ0L2cgKTtcbmNvbnN0IFVQUEVSX1JJR0hUX1JFR0VYUCA9IG5ldyBSZWdFeHAoIC9SaWdodC9nICk7XG5cbi8qKlxuICogRmxpcHMgYSBDU1MgcHJvcGVydHkgZnJvbSBsZWZ0IDwtPiByaWdodC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBDU1MgcHJvcGVydHkgbmFtZS5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmbGlwcGVkIENTUyBwcm9wZXJ0eSBuYW1lLCBpZiBhcHBsaWNhYmxlLlxuICovXG5mdW5jdGlvbiBnZXRDb252ZXJ0ZWRLZXkoIGtleSApIHtcblx0aWYgKCBrZXkgPT09ICdsZWZ0JyApIHtcblx0XHRyZXR1cm4gJ3JpZ2h0Jztcblx0fVxuXG5cdGlmICgga2V5ID09PSAncmlnaHQnICkge1xuXHRcdHJldHVybiAnbGVmdCc7XG5cdH1cblxuXHRpZiAoIExPV0VSX0xFRlRfUkVHRVhQLnRlc3QoIGtleSApICkge1xuXHRcdHJldHVybiBrZXkucmVwbGFjZSggTE9XRVJfTEVGVF9SRUdFWFAsICctcmlnaHQnICk7XG5cdH1cblxuXHRpZiAoIExPV0VSX1JJR0hUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIExPV0VSX1JJR0hUX1JFR0VYUCwgJy1sZWZ0JyApO1xuXHR9XG5cblx0aWYgKCBVUFBFUl9MRUZUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIFVQUEVSX0xFRlRfUkVHRVhQLCAnUmlnaHQnICk7XG5cdH1cblxuXHRpZiAoIFVQUEVSX1JJR0hUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIFVQUEVSX1JJR0hUX1JFR0VYUCwgJ0xlZnQnICk7XG5cdH1cblxuXHRyZXR1cm4ga2V5O1xufVxuXG4vKipcbiAqIEFuIGluY3JlZGlibHkgYmFzaWMgbHRyIC0+IHJ0bCBjb252ZXJ0ZXIgZm9yIHN0eWxlIHByb3BlcnRpZXNcbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgncmVhY3QnKS5DU1NQcm9wZXJ0aWVzfSBsdHJTdHlsZXNcbiAqXG4gKiBAcmV0dXJuIHtpbXBvcnQoJ3JlYWN0JykuQ1NTUHJvcGVydGllc30gQ29udmVydGVkIGx0ciAtPiBydGwgc3R5bGVzXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0TFRSVG9SVEwgPSAoIGx0clN0eWxlcyA9IHt9ICkgPT4ge1xuXHRyZXR1cm4gbWFwS2V5cyggbHRyU3R5bGVzLCAoIF92YWx1ZSwga2V5ICkgPT4gZ2V0Q29udmVydGVkS2V5KCBrZXkgKSApO1xufTtcblxuLyoqXG4gKiBBIGhpZ2hlci1vcmRlciBmdW5jdGlvbiB0aGF0IGNyZWF0ZSBhbiBpbmNyZWRpYmx5IGJhc2ljIGx0ciAtPiBydGwgc3R5bGUgY29udmVydGVyIGZvciBDU1Mgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgncmVhY3QnKS5DU1NQcm9wZXJ0aWVzfSBsdHJTdHlsZXMgICBMdHIgc3R5bGVzLiBDb252ZXJ0cyBhbmQgcmVuZGVycyBmcm9tIGx0ciAtPiBydGwgc3R5bGVzLCBpZiBhcHBsaWNhYmxlLlxuICogQHBhcmFtIHtpbXBvcnQoJ3JlYWN0JykuQ1NTUHJvcGVydGllc30gW3J0bFN0eWxlc10gUnRsIHN0eWxlcy4gUmVuZGVycyBpZiBwcm92aWRlZC5cbiAqXG4gKiBAcmV0dXJuIHsoKSA9PiBpbXBvcnQoJ0BlbW90aW9uL3JlYWN0JykuU2VyaWFsaXplZFN0eWxlc30gQSBmdW5jdGlvbiB0byBvdXRwdXQgQ1NTIHN0eWxlcyBmb3IgRW1vdGlvbidzIHJlbmRlcmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydGwoIGx0clN0eWxlcyA9IHt9LCBydGxTdHlsZXMgKSB7XG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKCBydGxTdHlsZXMgKSB7XG5cdFx0XHQvLyBAdHMtaWdub3JlOiBgY3NzYCB0eXBlcyBhcmUgd3JvbmcsIGl0IGNhbiBhY2NlcHQgYW4gb2JqZWN0OiBodHRwczovL2Vtb3Rpb24uc2gvZG9jcy9vYmplY3Qtc3R5bGVzI3dpdGgtY3NzXG5cdFx0XHRyZXR1cm4gaXNSVEwoKSA/IGNzcyggcnRsU3R5bGVzICkgOiBjc3MoIGx0clN0eWxlcyApO1xuXHRcdH1cblxuXHRcdC8vIEB0cy1pZ25vcmU6IGBjc3NgIHR5cGVzIGFyZSB3cm9uZywgaXQgY2FuIGFjY2VwdCBhbiBvYmplY3Q6IGh0dHBzOi8vZW1vdGlvbi5zaC9kb2NzL29iamVjdC1zdHlsZXMjd2l0aC1jc3Ncblx0XHRyZXR1cm4gaXNSVEwoKSA/IGNzcyggY29udmVydExUUlRvUlRMKCBsdHJTdHlsZXMgKSApIDogY3NzKCBsdHJTdHlsZXMgKTtcblx0fTtcbn1cblxuLyoqXG4gKiBDYWxsIHRoaXMgaW4gdGhlIGB1c2VNZW1vYCBkZXBlbmRlbmN5IGFycmF5IHRvIGVuc3VyZSB0aGF0IHN1YnNlcXVlbnQgcmVuZGVycyB3aWxsXG4gKiBjYXVzZSBydGwgc3R5bGVzIHRvIHVwZGF0ZSBiYXNlZCBvbiB0aGUgYGlzUlRMYCByZXR1cm4gdmFsdWUgZXZlbiBpZiBhbGwgb3RoZXIgZGVwZW5kZW5jaWVzXG4gKiByZW1haW4gdGhlIHNhbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHN0eWxlcyA9IHVzZU1lbW8oICgpID0+IHtcbiAqICAgcmV0dXJuIGNzc2BcbiAqICAgICAkeyBydGwoIHsgbWFyZ2luUmlnaHQ6ICcxMHB4JyB9ICkgfVxuICogICBgO1xuICogfSwgWyBydGwud2F0Y2goKSBdICk7XG4gKi9cbnJ0bC53YXRjaCA9ICgpID0+IGlzUlRMKCk7XG4iXX0= */");
    } // @ts-ignore: `css` types are wrong, it can accept an object: https://emotion.sh/docs/object-styles#with-css


    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.isRTL)() ? /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)(convertLTRToRTL(ltrStyles),  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdXRpbHMvcnRsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThFbUIiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy91dGlscy9ydGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBtYXBLZXlzIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGlzUlRMIH0gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcblxuY29uc3QgTE9XRVJfTEVGVF9SRUdFWFAgPSBuZXcgUmVnRXhwKCAvLWxlZnQvZyApO1xuY29uc3QgTE9XRVJfUklHSFRfUkVHRVhQID0gbmV3IFJlZ0V4cCggLy1yaWdodC9nICk7XG5jb25zdCBVUFBFUl9MRUZUX1JFR0VYUCA9IG5ldyBSZWdFeHAoIC9MZWZ0L2cgKTtcbmNvbnN0IFVQUEVSX1JJR0hUX1JFR0VYUCA9IG5ldyBSZWdFeHAoIC9SaWdodC9nICk7XG5cbi8qKlxuICogRmxpcHMgYSBDU1MgcHJvcGVydHkgZnJvbSBsZWZ0IDwtPiByaWdodC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBDU1MgcHJvcGVydHkgbmFtZS5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmbGlwcGVkIENTUyBwcm9wZXJ0eSBuYW1lLCBpZiBhcHBsaWNhYmxlLlxuICovXG5mdW5jdGlvbiBnZXRDb252ZXJ0ZWRLZXkoIGtleSApIHtcblx0aWYgKCBrZXkgPT09ICdsZWZ0JyApIHtcblx0XHRyZXR1cm4gJ3JpZ2h0Jztcblx0fVxuXG5cdGlmICgga2V5ID09PSAncmlnaHQnICkge1xuXHRcdHJldHVybiAnbGVmdCc7XG5cdH1cblxuXHRpZiAoIExPV0VSX0xFRlRfUkVHRVhQLnRlc3QoIGtleSApICkge1xuXHRcdHJldHVybiBrZXkucmVwbGFjZSggTE9XRVJfTEVGVF9SRUdFWFAsICctcmlnaHQnICk7XG5cdH1cblxuXHRpZiAoIExPV0VSX1JJR0hUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIExPV0VSX1JJR0hUX1JFR0VYUCwgJy1sZWZ0JyApO1xuXHR9XG5cblx0aWYgKCBVUFBFUl9MRUZUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIFVQUEVSX0xFRlRfUkVHRVhQLCAnUmlnaHQnICk7XG5cdH1cblxuXHRpZiAoIFVQUEVSX1JJR0hUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIFVQUEVSX1JJR0hUX1JFR0VYUCwgJ0xlZnQnICk7XG5cdH1cblxuXHRyZXR1cm4ga2V5O1xufVxuXG4vKipcbiAqIEFuIGluY3JlZGlibHkgYmFzaWMgbHRyIC0+IHJ0bCBjb252ZXJ0ZXIgZm9yIHN0eWxlIHByb3BlcnRpZXNcbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgncmVhY3QnKS5DU1NQcm9wZXJ0aWVzfSBsdHJTdHlsZXNcbiAqXG4gKiBAcmV0dXJuIHtpbXBvcnQoJ3JlYWN0JykuQ1NTUHJvcGVydGllc30gQ29udmVydGVkIGx0ciAtPiBydGwgc3R5bGVzXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0TFRSVG9SVEwgPSAoIGx0clN0eWxlcyA9IHt9ICkgPT4ge1xuXHRyZXR1cm4gbWFwS2V5cyggbHRyU3R5bGVzLCAoIF92YWx1ZSwga2V5ICkgPT4gZ2V0Q29udmVydGVkS2V5KCBrZXkgKSApO1xufTtcblxuLyoqXG4gKiBBIGhpZ2hlci1vcmRlciBmdW5jdGlvbiB0aGF0IGNyZWF0ZSBhbiBpbmNyZWRpYmx5IGJhc2ljIGx0ciAtPiBydGwgc3R5bGUgY29udmVydGVyIGZvciBDU1Mgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgncmVhY3QnKS5DU1NQcm9wZXJ0aWVzfSBsdHJTdHlsZXMgICBMdHIgc3R5bGVzLiBDb252ZXJ0cyBhbmQgcmVuZGVycyBmcm9tIGx0ciAtPiBydGwgc3R5bGVzLCBpZiBhcHBsaWNhYmxlLlxuICogQHBhcmFtIHtpbXBvcnQoJ3JlYWN0JykuQ1NTUHJvcGVydGllc30gW3J0bFN0eWxlc10gUnRsIHN0eWxlcy4gUmVuZGVycyBpZiBwcm92aWRlZC5cbiAqXG4gKiBAcmV0dXJuIHsoKSA9PiBpbXBvcnQoJ0BlbW90aW9uL3JlYWN0JykuU2VyaWFsaXplZFN0eWxlc30gQSBmdW5jdGlvbiB0byBvdXRwdXQgQ1NTIHN0eWxlcyBmb3IgRW1vdGlvbidzIHJlbmRlcmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydGwoIGx0clN0eWxlcyA9IHt9LCBydGxTdHlsZXMgKSB7XG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKCBydGxTdHlsZXMgKSB7XG5cdFx0XHQvLyBAdHMtaWdub3JlOiBgY3NzYCB0eXBlcyBhcmUgd3JvbmcsIGl0IGNhbiBhY2NlcHQgYW4gb2JqZWN0OiBodHRwczovL2Vtb3Rpb24uc2gvZG9jcy9vYmplY3Qtc3R5bGVzI3dpdGgtY3NzXG5cdFx0XHRyZXR1cm4gaXNSVEwoKSA/IGNzcyggcnRsU3R5bGVzICkgOiBjc3MoIGx0clN0eWxlcyApO1xuXHRcdH1cblxuXHRcdC8vIEB0cy1pZ25vcmU6IGBjc3NgIHR5cGVzIGFyZSB3cm9uZywgaXQgY2FuIGFjY2VwdCBhbiBvYmplY3Q6IGh0dHBzOi8vZW1vdGlvbi5zaC9kb2NzL29iamVjdC1zdHlsZXMjd2l0aC1jc3Ncblx0XHRyZXR1cm4gaXNSVEwoKSA/IGNzcyggY29udmVydExUUlRvUlRMKCBsdHJTdHlsZXMgKSApIDogY3NzKCBsdHJTdHlsZXMgKTtcblx0fTtcbn1cblxuLyoqXG4gKiBDYWxsIHRoaXMgaW4gdGhlIGB1c2VNZW1vYCBkZXBlbmRlbmN5IGFycmF5IHRvIGVuc3VyZSB0aGF0IHN1YnNlcXVlbnQgcmVuZGVycyB3aWxsXG4gKiBjYXVzZSBydGwgc3R5bGVzIHRvIHVwZGF0ZSBiYXNlZCBvbiB0aGUgYGlzUlRMYCByZXR1cm4gdmFsdWUgZXZlbiBpZiBhbGwgb3RoZXIgZGVwZW5kZW5jaWVzXG4gKiByZW1haW4gdGhlIHNhbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHN0eWxlcyA9IHVzZU1lbW8oICgpID0+IHtcbiAqICAgcmV0dXJuIGNzc2BcbiAqICAgICAkeyBydGwoIHsgbWFyZ2luUmlnaHQ6ICcxMHB4JyB9ICkgfVxuICogICBgO1xuICogfSwgWyBydGwud2F0Y2goKSBdICk7XG4gKi9cbnJ0bC53YXRjaCA9ICgpID0+IGlzUlRMKCk7XG4iXX0= */") : /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)(ltrStyles,  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdXRpbHMvcnRsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThFeUQiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy91dGlscy9ydGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBtYXBLZXlzIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGlzUlRMIH0gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcblxuY29uc3QgTE9XRVJfTEVGVF9SRUdFWFAgPSBuZXcgUmVnRXhwKCAvLWxlZnQvZyApO1xuY29uc3QgTE9XRVJfUklHSFRfUkVHRVhQID0gbmV3IFJlZ0V4cCggLy1yaWdodC9nICk7XG5jb25zdCBVUFBFUl9MRUZUX1JFR0VYUCA9IG5ldyBSZWdFeHAoIC9MZWZ0L2cgKTtcbmNvbnN0IFVQUEVSX1JJR0hUX1JFR0VYUCA9IG5ldyBSZWdFeHAoIC9SaWdodC9nICk7XG5cbi8qKlxuICogRmxpcHMgYSBDU1MgcHJvcGVydHkgZnJvbSBsZWZ0IDwtPiByaWdodC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBDU1MgcHJvcGVydHkgbmFtZS5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmbGlwcGVkIENTUyBwcm9wZXJ0eSBuYW1lLCBpZiBhcHBsaWNhYmxlLlxuICovXG5mdW5jdGlvbiBnZXRDb252ZXJ0ZWRLZXkoIGtleSApIHtcblx0aWYgKCBrZXkgPT09ICdsZWZ0JyApIHtcblx0XHRyZXR1cm4gJ3JpZ2h0Jztcblx0fVxuXG5cdGlmICgga2V5ID09PSAncmlnaHQnICkge1xuXHRcdHJldHVybiAnbGVmdCc7XG5cdH1cblxuXHRpZiAoIExPV0VSX0xFRlRfUkVHRVhQLnRlc3QoIGtleSApICkge1xuXHRcdHJldHVybiBrZXkucmVwbGFjZSggTE9XRVJfTEVGVF9SRUdFWFAsICctcmlnaHQnICk7XG5cdH1cblxuXHRpZiAoIExPV0VSX1JJR0hUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIExPV0VSX1JJR0hUX1JFR0VYUCwgJy1sZWZ0JyApO1xuXHR9XG5cblx0aWYgKCBVUFBFUl9MRUZUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIFVQUEVSX0xFRlRfUkVHRVhQLCAnUmlnaHQnICk7XG5cdH1cblxuXHRpZiAoIFVQUEVSX1JJR0hUX1JFR0VYUC50ZXN0KCBrZXkgKSApIHtcblx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoIFVQUEVSX1JJR0hUX1JFR0VYUCwgJ0xlZnQnICk7XG5cdH1cblxuXHRyZXR1cm4ga2V5O1xufVxuXG4vKipcbiAqIEFuIGluY3JlZGlibHkgYmFzaWMgbHRyIC0+IHJ0bCBjb252ZXJ0ZXIgZm9yIHN0eWxlIHByb3BlcnRpZXNcbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgncmVhY3QnKS5DU1NQcm9wZXJ0aWVzfSBsdHJTdHlsZXNcbiAqXG4gKiBAcmV0dXJuIHtpbXBvcnQoJ3JlYWN0JykuQ1NTUHJvcGVydGllc30gQ29udmVydGVkIGx0ciAtPiBydGwgc3R5bGVzXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0TFRSVG9SVEwgPSAoIGx0clN0eWxlcyA9IHt9ICkgPT4ge1xuXHRyZXR1cm4gbWFwS2V5cyggbHRyU3R5bGVzLCAoIF92YWx1ZSwga2V5ICkgPT4gZ2V0Q29udmVydGVkS2V5KCBrZXkgKSApO1xufTtcblxuLyoqXG4gKiBBIGhpZ2hlci1vcmRlciBmdW5jdGlvbiB0aGF0IGNyZWF0ZSBhbiBpbmNyZWRpYmx5IGJhc2ljIGx0ciAtPiBydGwgc3R5bGUgY29udmVydGVyIGZvciBDU1Mgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgncmVhY3QnKS5DU1NQcm9wZXJ0aWVzfSBsdHJTdHlsZXMgICBMdHIgc3R5bGVzLiBDb252ZXJ0cyBhbmQgcmVuZGVycyBmcm9tIGx0ciAtPiBydGwgc3R5bGVzLCBpZiBhcHBsaWNhYmxlLlxuICogQHBhcmFtIHtpbXBvcnQoJ3JlYWN0JykuQ1NTUHJvcGVydGllc30gW3J0bFN0eWxlc10gUnRsIHN0eWxlcy4gUmVuZGVycyBpZiBwcm92aWRlZC5cbiAqXG4gKiBAcmV0dXJuIHsoKSA9PiBpbXBvcnQoJ0BlbW90aW9uL3JlYWN0JykuU2VyaWFsaXplZFN0eWxlc30gQSBmdW5jdGlvbiB0byBvdXRwdXQgQ1NTIHN0eWxlcyBmb3IgRW1vdGlvbidzIHJlbmRlcmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydGwoIGx0clN0eWxlcyA9IHt9LCBydGxTdHlsZXMgKSB7XG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKCBydGxTdHlsZXMgKSB7XG5cdFx0XHQvLyBAdHMtaWdub3JlOiBgY3NzYCB0eXBlcyBhcmUgd3JvbmcsIGl0IGNhbiBhY2NlcHQgYW4gb2JqZWN0OiBodHRwczovL2Vtb3Rpb24uc2gvZG9jcy9vYmplY3Qtc3R5bGVzI3dpdGgtY3NzXG5cdFx0XHRyZXR1cm4gaXNSVEwoKSA/IGNzcyggcnRsU3R5bGVzICkgOiBjc3MoIGx0clN0eWxlcyApO1xuXHRcdH1cblxuXHRcdC8vIEB0cy1pZ25vcmU6IGBjc3NgIHR5cGVzIGFyZSB3cm9uZywgaXQgY2FuIGFjY2VwdCBhbiBvYmplY3Q6IGh0dHBzOi8vZW1vdGlvbi5zaC9kb2NzL29iamVjdC1zdHlsZXMjd2l0aC1jc3Ncblx0XHRyZXR1cm4gaXNSVEwoKSA/IGNzcyggY29udmVydExUUlRvUlRMKCBsdHJTdHlsZXMgKSApIDogY3NzKCBsdHJTdHlsZXMgKTtcblx0fTtcbn1cblxuLyoqXG4gKiBDYWxsIHRoaXMgaW4gdGhlIGB1c2VNZW1vYCBkZXBlbmRlbmN5IGFycmF5IHRvIGVuc3VyZSB0aGF0IHN1YnNlcXVlbnQgcmVuZGVycyB3aWxsXG4gKiBjYXVzZSBydGwgc3R5bGVzIHRvIHVwZGF0ZSBiYXNlZCBvbiB0aGUgYGlzUlRMYCByZXR1cm4gdmFsdWUgZXZlbiBpZiBhbGwgb3RoZXIgZGVwZW5kZW5jaWVzXG4gKiByZW1haW4gdGhlIHNhbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHN0eWxlcyA9IHVzZU1lbW8oICgpID0+IHtcbiAqICAgcmV0dXJuIGNzc2BcbiAqICAgICAkeyBydGwoIHsgbWFyZ2luUmlnaHQ6ICcxMHB4JyB9ICkgfVxuICogICBgO1xuICogfSwgWyBydGwud2F0Y2goKSBdICk7XG4gKi9cbnJ0bC53YXRjaCA9ICgpID0+IGlzUlRMKCk7XG4iXX0= */");
  };
}
/**
 * Call this in the `useMemo` dependency array to ensure that subsequent renders will
 * cause rtl styles to update based on the `isRTL` return value even if all other dependencies
 * remain the same.
 *
 * @example
 * const styles = useMemo( () => {
 *   return css`
 *     ${ rtl( { marginRight: '10px' } ) }
 *   `;
 * }, [ rtl.watch() ] );
 */

rtl.watch = () => (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.isRTL)();
//# sourceMappingURL=rtl.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/view/component.js":
/*!**************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/view/component.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled/base */ "./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js");


/**
 * External dependencies
 */

/**
 * `View` is a core component that renders everything in the library.
 * It is the principle component in the entire library.
 *
 * @example
 * ```jsx
 * import { View } from `@wordpress/components`;
 *
 * function Example() {
 * 	return (
 * 		<View>
 * 			 Code is Poetry
 * 		</View>
 * 	);
 * }
 * ```
 *
 * @type {import('../ui/context').WordPressComponent<'div', { children?: import('react').ReactNode }, true>}
 */
// @ts-ignore
const View = (0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__["default"])("div",  false ? 0 : {
  target: "em57xhy0",
  label: "View"
})( false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdmlldy9jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJ1QiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3ZpZXcvY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuXG4vKipcbiAqIGBWaWV3YCBpcyBhIGNvcmUgY29tcG9uZW50IHRoYXQgcmVuZGVycyBldmVyeXRoaW5nIGluIHRoZSBsaWJyYXJ5LlxuICogSXQgaXMgdGhlIHByaW5jaXBsZSBjb21wb25lbnQgaW4gdGhlIGVudGlyZSBsaWJyYXJ5LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc3hcbiAqIGltcG9ydCB7IFZpZXcgfSBmcm9tIGBAd29yZHByZXNzL2NvbXBvbmVudHNgO1xuICpcbiAqIGZ1bmN0aW9uIEV4YW1wbGUoKSB7XG4gKiBcdHJldHVybiAoXG4gKiBcdFx0PFZpZXc+XG4gKiBcdFx0XHQgQ29kZSBpcyBQb2V0cnlcbiAqIFx0XHQ8L1ZpZXc+XG4gKiBcdCk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAdHlwZSB7aW1wb3J0KCcuLi91aS9jb250ZXh0JykuV29yZFByZXNzQ29tcG9uZW50PCdkaXYnLCB7IGNoaWxkcmVuPzogaW1wb3J0KCdyZWFjdCcpLlJlYWN0Tm9kZSB9LCB0cnVlPn1cbiAqL1xuLy8gQHRzLWlnbm9yZVxuY29uc3QgVmlldyA9IHN0eWxlZC5kaXZgYDtcblZpZXcuc2VsZWN0b3IgPSAnLmNvbXBvbmVudHMtdmlldyc7XG5WaWV3LmRpc3BsYXlOYW1lID0gJ1ZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuIl19 */");

View.selector = '.components-view';
View.displayName = 'View';
/* harmony default export */ __webpack_exports__["default"] = (View);
//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/visually-hidden/component.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/visually-hidden/component.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VisuallyHidden": function() { return /* binding */ VisuallyHidden; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/context */ "./node_modules/wordpress-components/build-module/ui/context/use-context-system.js");
/* harmony import */ var _ui_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/context */ "./node_modules/wordpress-components/build-module/ui/context/context-connect.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles */ "./node_modules/wordpress-components/build-module/visually-hidden/styles.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view */ "./node_modules/wordpress-components/build-module/view/component.js");



/**
 * External dependencies
 */

/**
 * Internal dependencies
 */




function UnconnectedVisuallyHidden(props, forwardedRef) {
  const {
    style: styleProp,
    ...contextProps
  } = (0,_ui_context__WEBPACK_IMPORTED_MODULE_2__.useContextSystem)(props, 'VisuallyHidden');
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_view__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: forwardedRef
  }, contextProps, {
    style: { ..._styles__WEBPACK_IMPORTED_MODULE_4__.visuallyHidden,
      ...(styleProp || {})
    }
  }));
}
/**
 * `VisuallyHidden` is a component used to render text intended to be visually
 * hidden, but will show for alternate devices, for example a screen reader.
 *
 * ```jsx
 * import { VisuallyHidden } from `@wordpress/components`;
 *
 * function Example() {
 *   return (
 *     <VisuallyHidden>
 *       <label>Code is Poetry</label>
 *     </VisuallyHidden>
 *   );
 * }
 * ```
 */


const VisuallyHidden = (0,_ui_context__WEBPACK_IMPORTED_MODULE_5__.contextConnect)(UnconnectedVisuallyHidden, 'VisuallyHidden');
/* harmony default export */ __webpack_exports__["default"] = (VisuallyHidden);
//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/wordpress-components/build-module/visually-hidden/styles.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/wordpress-components/build-module/visually-hidden/styles.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "visuallyHidden": function() { return /* binding */ visuallyHidden; }
/* harmony export */ });
/**
 * External dependencies
 */
const visuallyHidden = {
  border: 0,
  clip: 'rect(1px, 1px, 1px, 1px)',
  WebkitClipPath: 'inset( 50% )',
  clipPath: 'inset( 50% )',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px',
  wordWrap: 'normal'
};
//# sourceMappingURL=styles.js.map

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@woocommerce/block-data":
/*!**************************************!*\
  !*** external ["wc","wcBlocksData"] ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wc"]["wcBlocksData"];

/***/ }),

/***/ "@woocommerce/settings":
/*!************************************!*\
  !*** external ["wc","wcSettings"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wc"]["wcSettings"];

/***/ }),

/***/ "@wordpress/a11y":
/*!******************************!*\
  !*** external ["wp","a11y"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["a11y"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/deprecated":
/*!************************************!*\
  !*** external ["wp","deprecated"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["deprecated"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/html-entities":
/*!**************************************!*\
  !*** external ["wp","htmlEntities"] ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["htmlEntities"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/is-shallow-equal":
/*!****************************************!*\
  !*** external ["wp","isShallowEqual"] ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["isShallowEqual"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "@wordpress/warning":
/*!*********************************!*\
  !*** external ["wp","warning"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["warning"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@floating-ui/core/dist/floating-ui.core.esm.development.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@floating-ui/core/dist/floating-ui.core.esm.development.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrow": function() { return /* binding */ arrow; },
/* harmony export */   "autoPlacement": function() { return /* binding */ autoPlacement; },
/* harmony export */   "computePosition": function() { return /* binding */ computePosition; },
/* harmony export */   "detectOverflow": function() { return /* binding */ detectOverflow; },
/* harmony export */   "flip": function() { return /* binding */ flip; },
/* harmony export */   "hide": function() { return /* binding */ hide; },
/* harmony export */   "inline": function() { return /* binding */ inline; },
/* harmony export */   "limitShift": function() { return /* binding */ limitShift; },
/* harmony export */   "offset": function() { return /* binding */ offset; },
/* harmony export */   "rectToClientRect": function() { return /* binding */ rectToClientRect; },
/* harmony export */   "shift": function() { return /* binding */ shift; },
/* harmony export */   "size": function() { return /* binding */ size; }
/* harmony export */ });
function getSide(placement) {
  return placement.split('-')[0];
}

function getAlignment(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'x' : 'y';
}

function getLengthFromAxis(axis) {
  return axis === 'y' ? 'height' : 'width';
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  const commonAlign = reference[length] / 2 - floating[length] / 2;
  const side = getSide(placement);
  const isVertical = mainAxis === 'x';
  let coords;

  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;

    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;

    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }

  switch (getAlignment(placement)) {
    case 'start':
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;

    case 'end':
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }

  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain positioning strategy.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */

const computePosition = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));

  {
    if (platform == null) {
      console.error(['Floating UI: `platform` property was not passed to config. If you', 'want to use Floating UI on the web, install @floating-ui/dom', 'instead of the /core package. Otherwise, you can create your own', '`platform`: https://floating-ui.com/docs/platform'].join(' '));
    }

    if (middleware.filter(_ref => {
      let {
        name
      } = _ref;
      return name === 'autoPlacement' || name === 'flip';
    }).length > 1) {
      throw new Error(['Floating UI: duplicate `flip` and/or `autoPlacement`', 'middleware detected. This will lead to an infinite loop. Ensure only', 'one of either has been passed to the `middleware` array.'].join(' '));
    }
  }

  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let _debug_loop_count_ = 0;

  for (let i = 0; i < middleware.length; i++) {
    {
      _debug_loop_count_++;

      if (_debug_loop_count_ > 100) {
        throw new Error(['Floating UI: The middleware lifecycle appears to be', 'running in an infinite loop. This is usually caused by a `reset`', 'continually being returned without a break condition.'].join(' '));
      }
    }

    const {
      name,
      fn
    } = middleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = { ...middlewareData,
      [name]: { ...middlewareData[name],
        ...data
      }
    };

    if (reset) {
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }

        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }

        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }

      i = -1;
      continue;
    }
  }

  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}

function getSideObjectFromPadding(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}

function rectToClientRect(rect) {
  return { ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(middlewareArguments, options) {
  var _await$platform$isEle;

  if (options === void 0) {
    options = {};
  }

  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = middlewareArguments;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = options;
  const paddingObject = getSideObjectFromPadding(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: elementContext === 'floating' ? { ...rects.floating,
      x,
      y
    } : rects.reference,
    offsetParent: await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating)),
    strategy
  }) : rects[elementContext]); // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  return {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
}

const min = Math.min;
const max = Math.max;

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}

/**
 * Positions an inner element of the floating element such that it is centered
 * to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = options => ({
  name: 'arrow',
  options,

  async fn(middlewareArguments) {
    // Since `element` is required, we don't Partial<> the type
    const {
      element,
      padding = 0
    } = options != null ? options : {};
    const {
      x,
      y,
      placement,
      rects,
      platform
    } = middlewareArguments;

    if (element == null) {
      {
        console.warn('Floating UI: No `element` was passed to the `arrow` middleware.');
      }

      return {};
    }

    const paddingObject = getSideObjectFromPadding(padding);
    const coords = {
      x,
      y
    };
    const axis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const minProp = axis === 'y' ? 'top' : 'left';
    const maxProp = axis === 'y' ? 'bottom' : 'right';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    const clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    const centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside of the floating element's bounds

    const min = paddingObject[minProp];
    const max = clientSize - arrowDimensions[length] - paddingObject[maxProp];
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = within(min, center, max);
    return {
      data: {
        [axis]: offset,
        centerOffset: center - offset
      }
    };
  }

});

const hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, matched => hash$1[matched]);
}

function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }

  const alignment = getAlignment(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  let mainAlignmentSide = mainAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';

  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }

  return {
    main: mainAlignmentSide,
    cross: getOppositePlacement(mainAlignmentSide)
  };
}

const hash = {
  start: 'end',
  end: 'start'
};
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, matched => hash[matched]);
}

const sides = ['top', 'right', 'bottom', 'left'];
const allPlacements = /*#__PURE__*/sides.reduce((acc, side) => acc.concat(side, side + "-start", side + "-end"), []);

function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => getAlignment(placement) === alignment), ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment)] : allowedPlacements.filter(placement => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter(placement => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }

    return true;
  });
}

/**
 * Automatically chooses the `placement` which has the most space available.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = function (options) {
  if (options === void 0) {
    options = {};
  }

  return {
    name: 'autoPlacement',
    options,

    async fn(middlewareArguments) {
      var _middlewareData$autoP, _middlewareData$autoP2, _middlewareData$autoP3, _middlewareData$autoP4, _placementsSortedByLe;

      const {
        x,
        y,
        rects,
        middlewareData,
        placement,
        platform,
        elements
      } = middlewareArguments;
      const {
        alignment = null,
        allowedPlacements = allPlacements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = options;
      const placements = getPlacementList(alignment, autoAlignment, allowedPlacements);
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const currentIndex = (_middlewareData$autoP = (_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.index) != null ? _middlewareData$autoP : 0;
      const currentPlacement = placements[currentIndex];

      if (currentPlacement == null) {
        return {};
      }

      const {
        main,
        cross
      } = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))); // Make `computeCoords` start from the right place

      if (placement !== currentPlacement) {
        return {
          x,
          y,
          reset: {
            placement: placements[0]
          }
        };
      }

      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[main], overflow[cross]];
      const allOverflows = [...((_middlewareData$autoP3 = (_middlewareData$autoP4 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP4.overflows) != null ? _middlewareData$autoP3 : []), {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements[currentIndex + 1]; // There are more placements to check

      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }

      const placementsSortedByLeastOverflow = allOverflows.slice().sort((a, b) => a.overflows[0] - b.overflows[0]);
      const placementThatFitsOnAllSides = (_placementsSortedByLe = placementsSortedByLeastOverflow.find(_ref => {
        let {
          overflows
        } = _ref;
        return overflows.every(overflow => overflow <= 0);
      })) == null ? void 0 : _placementsSortedByLe.placement;
      const resetPlacement = placementThatFitsOnAllSides != null ? placementThatFitsOnAllSides : placementsSortedByLeastOverflow[0].placement;

      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }

      return {};
    }

  };
};

function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}

/**
 * Changes the placement of the floating element to one that will fit if the
 * initially specified `placement` does not.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }

  return {
    name: 'flip',
    options,

    async fn(middlewareArguments) {
      var _middlewareData$flip;

      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        flipAlignment = true,
        ...detectOverflowOptions
      } = options;
      const side = getSide(placement);
      const isBasePlacement = side === initialPlacement;
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];

      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }

      if (checkCrossAxis) {
        const {
          main,
          cross
        } = getAlignmentSides(placement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));
        overflows.push(overflow[main], overflow[cross]);
      }

      overflowsData = [...overflowsData, {
        placement,
        overflows
      }]; // One or more sides is overflowing

      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip$, _middlewareData$flip2;

        const nextIndex = ((_middlewareData$flip$ = (_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) != null ? _middlewareData$flip$ : 0) + 1;
        const nextPlacement = placements[nextIndex];

        if (nextPlacement) {
          // Try next placement and re-run the lifecycle
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        let resetPlacement = 'bottom';

        switch (fallbackStrategy) {
          case 'bestFit':
            {
              var _overflowsData$map$so;

              const placement = (_overflowsData$map$so = overflowsData.map(d => [d, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0].placement;

              if (placement) {
                resetPlacement = placement;
              }

              break;
            }

          case 'initialPlacement':
            resetPlacement = initialPlacement;
            break;
        }

        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }

      return {};
    }

  };
};

function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}

function isAnySideFullyClipped(overflow) {
  return sides.some(side => overflow[side] >= 0);
}

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = function (_temp) {
  let {
    strategy = 'referenceHidden',
    ...detectOverflowOptions
  } = _temp === void 0 ? {} : _temp;
  return {
    name: 'hide',

    async fn(middlewareArguments) {
      const {
        rects
      } = middlewareArguments;

      switch (strategy) {
        case 'referenceHidden':
          {
            const overflow = await detectOverflow(middlewareArguments, { ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }

        case 'escaped':
          {
            const overflow = await detectOverflow(middlewareArguments, { ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }

        default:
          {
            return {};
          }
      }
    }

  };
};

function convertValueToCoords(placement, rects, value, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }

  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getMainAxisFromPlacement(placement) === 'x';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = typeof value === 'function' ? value({ ...rects,
    placement
  }) : value; // eslint-disable-next-line prefer-const

  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };

  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }

  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
/**
 * Displaces the floating element from its reference element.
 * @see https://floating-ui.com/docs/offset
 */

const offset = function (value) {
  if (value === void 0) {
    value = 0;
  }

  return {
    name: 'offset',
    options: value,

    async fn(middlewareArguments) {
      const {
        x,
        y,
        placement,
        rects,
        platform,
        elements
      } = middlewareArguments;
      const diffCoords = convertValueToCoords(placement, rects, value, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }

  };
};

function getCrossAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/**
 * Shifts the floating element in order to keep it in view when it will overflow
 * a clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
  if (options === void 0) {
    options = {};
  }

  return {
    name: 'shift',
    options,

    async fn(middlewareArguments) {
      const {
        x,
        y,
        placement
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = options;
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const mainAxis = getMainAxisFromPlacement(getSide(placement));
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];

      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = within(min, mainAxisCoord, max);
      }

      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = within(min, crossAxisCoord, max);
      }

      const limitedCoords = limiter.fn({ ...middlewareArguments,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return { ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }

  };
};

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = function (options) {
  if (options === void 0) {
    options = {};
  }

  return {
    options,

    fn(middlewareArguments) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = middlewareArguments;
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = options;
      const coords = {
        x,
        y
      };
      const mainAxis = getMainAxisFromPlacement(placement);
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = typeof offset === 'function' ? offset({ ...rects,
        placement
      }) : offset;
      const computedOffset = typeof rawOffset === 'number' ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };

      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;

        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }

      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2, _middlewareData$offse3, _middlewareData$offse4;

        const len = mainAxis === 'y' ? 'width' : 'height';
        const isOriginSide = ['top', 'left'].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? (_middlewareData$offse = (_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) != null ? _middlewareData$offse : 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : (_middlewareData$offse3 = (_middlewareData$offse4 = middlewareData.offset) == null ? void 0 : _middlewareData$offse4[crossAxis]) != null ? _middlewareData$offse3 : 0) - (isOriginSide ? computedOffset.crossAxis : 0);

        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }

      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }

  };
};

/**
 * Provides data to change the size of the floating element. For instance,
 * prevent it from overflowing its clipping boundary or match the width of the
 * reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = function (options) {
  if (options === void 0) {
    options = {};
  }

  return {
    name: 'size',
    options,

    async fn(middlewareArguments) {
      const {
        placement,
        rects,
        platform,
        elements
      } = middlewareArguments;
      const {
        apply,
        ...detectOverflowOptions
      } = options;
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      let heightSide;
      let widthSide;

      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }

      const xMin = max(overflow.left, 0);
      const xMax = max(overflow.right, 0);
      const yMin = max(overflow.top, 0);
      const yMax = max(overflow.bottom, 0);
      const dimensions = {
        height: rects.floating.height - (['left', 'right'].includes(placement) ? 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom)) : overflow[heightSide]),
        width: rects.floating.width - (['top', 'bottom'].includes(placement) ? 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right)) : overflow[widthSide])
      };
      const prevDimensions = await platform.getDimensions(elements.floating);
      apply == null ? void 0 : apply({ ...dimensions,
        ...rects
      });
      const nextDimensions = await platform.getDimensions(elements.floating);

      if (prevDimensions.width !== nextDimensions.width || prevDimensions.height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }

      return {};
    }

  };
};

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = function (options) {
  if (options === void 0) {
    options = {};
  }

  return {
    name: 'inline',
    options,

    async fn(middlewareArguments) {
      var _await$platform$getCl;

      const {
        placement,
        elements,
        rects,
        platform,
        strategy
      } = middlewareArguments; // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
      // ClientRect's bounds, despite the event listener being triggered. A
      // padding of 2 seems to handle this issue.

      const {
        padding = 2,
        x,
        y
      } = options;
      const fallback = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
        rect: rects.reference,
        offsetParent: await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating)),
        strategy
      }) : rects.reference);
      const clientRects = (_await$platform$getCl = await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) != null ? _await$platform$getCl : [];
      const paddingObject = getSideObjectFromPadding(padding);

      function getBoundingClientRect() {
        // There are two rects and they are disjoined
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          var _clientRects$find;

          // Find the first rect in which the point is fully inside
          return (_clientRects$find = clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom)) != null ? _clientRects$find : fallback;
        } // There are 2 or more connected rects


        if (clientRects.length >= 2) {
          if (getMainAxisFromPlacement(placement) === 'x') {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === 'top';
            const top = firstRect.top;
            const bottom = lastRect.bottom;
            const left = isTop ? firstRect.left : lastRect.left;
            const right = isTop ? firstRect.right : lastRect.right;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }

          const isLeftSide = getSide(placement) === 'left';
          const maxRight = max(...clientRects.map(rect => rect.right));
          const minLeft = min(...clientRects.map(rect => rect.left));
          const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }

        return fallback;
      }

      const resetRects = await platform.getElementRects({
        reference: {
          getBoundingClientRect
        },
        floating: elements.floating,
        strategy
      });

      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }

      return {};
    }

  };
};




/***/ }),

/***/ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.esm.development.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@floating-ui/dom/dist/floating-ui.dom.esm.development.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrow": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.arrow; },
/* harmony export */   "autoPlacement": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.autoPlacement; },
/* harmony export */   "autoUpdate": function() { return /* binding */ autoUpdate; },
/* harmony export */   "computePosition": function() { return /* binding */ computePosition; },
/* harmony export */   "detectOverflow": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.detectOverflow; },
/* harmony export */   "flip": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.flip; },
/* harmony export */   "getOverflowAncestors": function() { return /* binding */ getOverflowAncestors; },
/* harmony export */   "hide": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.hide; },
/* harmony export */   "inline": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.inline; },
/* harmony export */   "limitShift": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.limitShift; },
/* harmony export */   "offset": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.offset; },
/* harmony export */   "shift": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.shift; },
/* harmony export */   "size": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.size; }
/* harmony export */ });
/* harmony import */ var _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/core */ "./node_modules/@floating-ui/core/dist/floating-ui.core.esm.development.js");



function isWindow(value) {
  return value && value.document && value.location && value.alert && value.setInterval;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (!isWindow(node)) {
    const ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}

function getNodeName(node) {
  return isWindow(node) ? '' : node ? (node.nodeName || '').toLowerCase() : '';
}

function isHTMLElement(value) {
  return value instanceof getWindow(value).HTMLElement;
}
function isElement(value) {
  return value instanceof getWindow(value).Element;
}
function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function isShadowRoot(node) {
  // Browsers without `ShadowRoot` support
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  const {
    overflow,
    overflowX,
    overflowY
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  // TODO: Try and use feature detection here instead
  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
  const css = getComputedStyle$1(element); // This is non-exhaustive but covers the most common CSS properties that
  // create a containing block.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

  return css.transform !== 'none' || css.perspective !== 'none' || // @ts-ignore (TS 4.1 compat)
  css.contain === 'paint' || ['transform', 'perspective'].includes(css.willChange) || isFirefox && css.willChange === 'filter' || isFirefox && (css.filter ? css.filter !== 'none' : false);
}
function isLayoutViewport() {
  // Not Safari
  return !/^((?!chrome|android).)*safari/i.test(navigator.userAgent); // Feature detection for this fails in various ways
  // • Always-visible scrollbar or not
  // • Width of <html>, etc.
  // const vV = win.visualViewport;
  // return vV ? Math.abs(win.innerWidth / vV.scale - vV.width) < 0.5 : true;
}

const min = Math.min;
const max = Math.max;
const round = Math.round;

function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  var _win$visualViewport$o, _win$visualViewport, _win$visualViewport$o2, _win$visualViewport2;

  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  const clientRect = element.getBoundingClientRect();
  let scaleX = 1;
  let scaleY = 1;

  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  const win = isElement(element) ? getWindow(element) : window;
  const addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  const x = (clientRect.left + (addVisualOffsets ? (_win$visualViewport$o = (_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) != null ? _win$visualViewport$o : 0 : 0)) / scaleX;
  const y = (clientRect.top + (addVisualOffsets ? (_win$visualViewport$o2 = (_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) != null ? _win$visualViewport$o2 : 0 : 0)) / scaleY;
  const width = clientRect.width / scaleX;
  const height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}

function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

function isScaled(element) {
  const rect = getBoundingClientRect(element);
  return round(rect.width) !== element.offsetWidth || round(rect.height) !== element.offsetHeight;
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(element, // @ts-ignore - checked above (TS 4.1 compat)
  isOffsetParentAnElement && isScaled(offsetParent), strategy === 'fixed');
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // @ts-ignore
    node.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    node.parentNode || ( // DOM Element detected
    isShadowRoot(node) ? node.host : null) || // ShadowRoot detected
    getDocumentElement(node) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
}

function getContainingBlock(element) {
  let currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && !['html', 'body'].includes(getNodeName(currentNode))) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  const window = getWindow(element);
  let offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getDimensions(element) {
  if (isHTMLElement(element)) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }

  const rect = getBoundingClientRect(element);
  return {
    width: rect.width,
    height: rect.height
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);

  if (offsetParent === documentElement) {
    return rect;
  }

  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } // This doesn't appear to be need to be negated.
    // else if (documentElement) {
    //   offsets.x = getWindowScrollBarX(documentElement);
    // }

  }

  return { ...rect,
    x: rect.x - scroll.scrollLeft + offsets.x,
    y: rect.y - scroll.scrollTop + offsets.y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const layoutViewport = isLayoutViewport();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width,
    height,
    x,
    y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  const width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  const height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;

  if (getComputedStyle$1(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width,
    height,
    x,
    y
  };
}

function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);

  if (['html', 'body', '#document'].includes(getNodeName(parentNode))) {
    // @ts-ignore assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }

  return getNearestOverflowAncestor(parentNode);
}

function getOverflowAncestors(node, list) {
  var _node$ownerDocument;

  if (list === void 0) {
    list = [];
  }

  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow(scrollableAncestor);
  const target = isBody ? [win].concat(win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []) : scrollableAncestor;
  const updatedList = list.concat(target);
  return isBody ? updatedList : // @ts-ignore: isBody tells us target will be an HTMLElement here
  updatedList.concat(getOverflowAncestors(target));
}

function contains(parent, child) {
  const rootNode = child == null ? void 0 : child.getRootNode == null ? void 0 : child.getRootNode(); // First, attempt with faster native method

  if (parent != null && parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
    let next = child;

    do {
      // use `===` replace node.isSameNode()
      if (next && parent === next) {
        return true;
      } // @ts-ignore: need a better way to handle this...


      next = next.parentNode || next.host;
    } while (next);
  }

  return false;
}

function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, false, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  return {
    top,
    left,
    x: left,
    y: top,
    right: left + element.clientWidth,
    bottom: top + element.clientHeight,
    width: element.clientWidth,
    height: element.clientHeight
  };
}

function getClientRectFromClippingAncestor(element, clippingParent, strategy) {
  if (clippingParent === 'viewport') {
    return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(getViewportRect(element, strategy));
  }

  if (isElement(clippingParent)) {
    return getInnerBoundingClientRect(clippingParent, strategy);
  }

  return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(getDocumentRect(getDocumentElement(element)));
} // A "clipping ancestor" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingAncestors(element) {
  const clippingAncestors = getOverflowAncestors(element);
  const canEscapeClipping = ['absolute', 'fixed'].includes(getComputedStyle$1(element).position);
  const clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // @ts-ignore isElement check ensures we return Array<Element>


  return clippingAncestors.filter(clippingAncestors => isElement(clippingAncestors) && contains(clippingAncestors, clipperElement) && getNodeName(clippingAncestors) !== 'body');
} // Gets the maximum area that the element is visible in due to any number of
// clipping ancestors


function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const mainClippingAncestors = boundary === 'clippingAncestors' ? getClippingAncestors(element) : [].concat(boundary);
  const clippingAncestors = [...mainClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

const platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getElementRects: _ref => {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    return {
      reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
      floating: { ...getDimensions(floating),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: element => Array.from(element.getClientRects()),
  isRTL: element => getComputedStyle$1(element).direction === 'rtl'
};

/**
 * Automatically updates the position of the floating element when necessary.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }

  const {
    ancestorScroll: _ancestorScroll = true,
    ancestorResize: _ancestorResize = true,
    elementResize: _elementResize = true,
    animationFrame = false
  } = options;
  let cleanedUp = false;
  const ancestorScroll = _ancestorScroll && !animationFrame;
  const ancestorResize = _ancestorResize && !animationFrame;
  const elementResize = _elementResize && !animationFrame;
  const ancestors = ancestorScroll || ancestorResize ? [...(isElement(reference) ? getOverflowAncestors(reference) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  let observer = null;

  if (elementResize) {
    observer = new ResizeObserver(update);
    isElement(reference) && observer.observe(reference);
    observer.observe(floating);
  }

  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;

  if (animationFrame) {
    frameLoop();
  }

  function frameLoop() {
    if (cleanedUp) {
      return;
    }

    const nextRefRect = getBoundingClientRect(reference);

    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }

    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }

  return () => {
    var _observer;

    cleanedUp = true;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    (_observer = observer) == null ? void 0 : _observer.disconnect();
    observer = null;

    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
 */

const computePosition = (reference, floating, options) => (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.computePosition)(reference, floating, {
  platform,
  ...options
});




/***/ }),

/***/ "./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.esm.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrow": function() { return /* binding */ arrow; },
/* harmony export */   "autoPlacement": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.autoPlacement; },
/* harmony export */   "autoUpdate": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.autoUpdate; },
/* harmony export */   "computePosition": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.computePosition; },
/* harmony export */   "detectOverflow": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.detectOverflow; },
/* harmony export */   "flip": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.flip; },
/* harmony export */   "getOverflowAncestors": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.getOverflowAncestors; },
/* harmony export */   "hide": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.hide; },
/* harmony export */   "inline": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.inline; },
/* harmony export */   "limitShift": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.limitShift; },
/* harmony export */   "offset": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.offset; },
/* harmony export */   "shift": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.shift; },
/* harmony export */   "size": function() { return /* reexport safe */ _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.size; },
/* harmony export */   "useFloating": function() { return /* binding */ useFloating; }
/* harmony export */ });
/* harmony import */ var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/dom */ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.esm.development.js");
/* harmony import */ var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @floating-ui/dom */ "./node_modules/@floating-ui/core/dist/floating-ui.core.esm.development.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");





var index = typeof document !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_1__.useEffect;

// Fork of `fast-deep-equal` that only does the comparisons we need and compares
// functions
// @ts-nocheck
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a === 'function' && a.toString() === b.toString()) {
    return true;
  }

  let length, i, keys;

  if (a && b && typeof a == 'object') {
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    keys = Object.keys(a);
    length = keys.length;

    if (length !== Object.keys(b).length) {
      return false;
    }

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }

    for (i = length; i-- !== 0;) {
      const key = keys[i];

      if (key === '_owner' && a.$$typeof) {
        continue;
      }

      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return a !== a && b !== b;
}

function useFloating(_temp) {
  let {
    middleware,
    placement = 'bottom',
    strategy = 'absolute'
  } = _temp === void 0 ? {} : _temp;
  const reference = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const floating = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    // Setting these to `null` will allow the consumer to determine if
    // `computePosition()` has run yet
    x: null,
    y: null,
    strategy,
    placement,
    middlewareData: {}
  });
  const [latestMiddleware, setLatestMiddleware] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(middleware);

  if (!deepEqual(latestMiddleware == null ? void 0 : latestMiddleware.map(_ref => {
    let {
      options
    } = _ref;
    return options;
  }), middleware == null ? void 0 : middleware.map(_ref2 => {
    let {
      options
    } = _ref2;
    return options;
  }))) {
    setLatestMiddleware(middleware);
  }

  const isMountedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(true);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const update = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (!reference.current || !floating.current) {
      return;
    }

    (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_0__.computePosition)(reference.current, floating.current, {
      middleware: latestMiddleware,
      placement,
      strategy
    }).then(data => {
      if (isMountedRef.current) {
        (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.flushSync)(() => {
          setData(data);
        });
      }
    });
  }, [latestMiddleware, placement, strategy]);
  index(update, [update]);
  const setReference = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(node => {
    reference.current = node;
    update();
  }, [update]);
  const setFloating = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(node => {
    floating.current = node;
    update();
  }, [update]);
  const refs = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    reference,
    floating
  }), []);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({ ...data,
    update,
    refs,
    reference: setReference,
    floating: setFloating
  }), [data, update, refs, setReference, setFloating]);
}
const arrow = options => {
  const {
    element,
    padding
  } = options;

  function isRef(value) {
    return Object.prototype.hasOwnProperty.call(value, 'current');
  }

  return {
    name: 'arrow',
    options,

    fn(args) {
      if (isRef(element)) {
        if (element.current != null) {
          return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.arrow)({
            element: element.current,
            padding
          }).fn(args);
        }

        return {};
      } else if (element) {
        return (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.arrow)({
          element,
          padding
        }).fn(args);
      }

      return {};
    }

  };
};




/***/ }),

/***/ "./node_modules/colord/index.mjs":
/*!***************************************!*\
  !*** ./node_modules/colord/index.mjs ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Colord": function() { return /* binding */ j; },
/* harmony export */   "colord": function() { return /* binding */ w; },
/* harmony export */   "extend": function() { return /* binding */ k; },
/* harmony export */   "getFormat": function() { return /* binding */ I; },
/* harmony export */   "random": function() { return /* binding */ E; }
/* harmony export */ });
var r={grad:.9,turn:360,rad:360/(2*Math.PI)},t=function(r){return"string"==typeof r?r.length>0:"number"==typeof r},n=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=Math.pow(10,t)),Math.round(n*r)/n+0},e=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=1),r>n?n:r>t?r:t},u=function(r){return(r=isFinite(r)?r%360:0)>0?r:r+360},a=function(r){return{r:e(r.r,0,255),g:e(r.g,0,255),b:e(r.b,0,255),a:e(r.a)}},o=function(r){return{r:n(r.r),g:n(r.g),b:n(r.b),a:n(r.a,3)}},i=/^#([0-9a-f]{3,8})$/i,s=function(r){var t=r.toString(16);return t.length<2?"0"+t:t},h=function(r){var t=r.r,n=r.g,e=r.b,u=r.a,a=Math.max(t,n,e),o=a-Math.min(t,n,e),i=o?a===t?(n-e)/o:a===n?2+(e-t)/o:4+(t-n)/o:0;return{h:60*(i<0?i+6:i),s:a?o/a*100:0,v:a/255*100,a:u}},b=function(r){var t=r.h,n=r.s,e=r.v,u=r.a;t=t/360*6,n/=100,e/=100;var a=Math.floor(t),o=e*(1-n),i=e*(1-(t-a)*n),s=e*(1-(1-t+a)*n),h=a%6;return{r:255*[e,i,o,o,s,e][h],g:255*[s,e,e,i,o,o][h],b:255*[o,o,s,e,e,i][h],a:u}},g=function(r){return{h:u(r.h),s:e(r.s,0,100),l:e(r.l,0,100),a:e(r.a)}},d=function(r){return{h:n(r.h),s:n(r.s),l:n(r.l),a:n(r.a,3)}},f=function(r){return b((n=(t=r).s,{h:t.h,s:(n*=((e=t.l)<50?e:100-e)/100)>0?2*n/(e+n)*100:0,v:e+n,a:t.a}));var t,n,e},c=function(r){return{h:(t=h(r)).h,s:(u=(200-(n=t.s))*(e=t.v)/100)>0&&u<200?n*e/100/(u<=100?u:200-u)*100:0,l:u/2,a:t.a};var t,n,e,u},l=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,p=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,v=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,m=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,y={string:[[function(r){var t=i.exec(r);return t?(r=t[1]).length<=4?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:4===r.length?n(parseInt(r[3]+r[3],16)/255,2):1}:6===r.length||8===r.length?{r:parseInt(r.substr(0,2),16),g:parseInt(r.substr(2,2),16),b:parseInt(r.substr(4,2),16),a:8===r.length?n(parseInt(r.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(r){var t=v.exec(r)||m.exec(r);return t?t[2]!==t[4]||t[4]!==t[6]?null:a({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:void 0===t[7]?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(t){var n=l.exec(t)||p.exec(t);if(!n)return null;var e,u,a=g({h:(e=n[1],u=n[2],void 0===u&&(u="deg"),Number(e)*(r[u]||1)),s:Number(n[3]),l:Number(n[4]),a:void 0===n[5]?1:Number(n[5])/(n[6]?100:1)});return f(a)},"hsl"]],object:[[function(r){var n=r.r,e=r.g,u=r.b,o=r.a,i=void 0===o?1:o;return t(n)&&t(e)&&t(u)?a({r:Number(n),g:Number(e),b:Number(u),a:Number(i)}):null},"rgb"],[function(r){var n=r.h,e=r.s,u=r.l,a=r.a,o=void 0===a?1:a;if(!t(n)||!t(e)||!t(u))return null;var i=g({h:Number(n),s:Number(e),l:Number(u),a:Number(o)});return f(i)},"hsl"],[function(r){var n=r.h,a=r.s,o=r.v,i=r.a,s=void 0===i?1:i;if(!t(n)||!t(a)||!t(o))return null;var h=function(r){return{h:u(r.h),s:e(r.s,0,100),v:e(r.v,0,100),a:e(r.a)}}({h:Number(n),s:Number(a),v:Number(o),a:Number(s)});return b(h)},"hsv"]]},N=function(r,t){for(var n=0;n<t.length;n++){var e=t[n][0](r);if(e)return[e,t[n][1]]}return[null,void 0]},x=function(r){return"string"==typeof r?N(r.trim(),y.string):"object"==typeof r&&null!==r?N(r,y.object):[null,void 0]},I=function(r){return x(r)[1]},M=function(r,t){var n=c(r);return{h:n.h,s:e(n.s+100*t,0,100),l:n.l,a:n.a}},H=function(r){return(299*r.r+587*r.g+114*r.b)/1e3/255},$=function(r,t){var n=c(r);return{h:n.h,s:n.s,l:e(n.l+100*t,0,100),a:n.a}},j=function(){function r(r){this.parsed=x(r)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return r.prototype.isValid=function(){return null!==this.parsed},r.prototype.brightness=function(){return n(H(this.rgba),2)},r.prototype.isDark=function(){return H(this.rgba)<.5},r.prototype.isLight=function(){return H(this.rgba)>=.5},r.prototype.toHex=function(){return r=o(this.rgba),t=r.r,e=r.g,u=r.b,i=(a=r.a)<1?s(n(255*a)):"","#"+s(t)+s(e)+s(u)+i;var r,t,e,u,a,i},r.prototype.toRgb=function(){return o(this.rgba)},r.prototype.toRgbString=function(){return r=o(this.rgba),t=r.r,n=r.g,e=r.b,(u=r.a)<1?"rgba("+t+", "+n+", "+e+", "+u+")":"rgb("+t+", "+n+", "+e+")";var r,t,n,e,u},r.prototype.toHsl=function(){return d(c(this.rgba))},r.prototype.toHslString=function(){return r=d(c(this.rgba)),t=r.h,n=r.s,e=r.l,(u=r.a)<1?"hsla("+t+", "+n+"%, "+e+"%, "+u+")":"hsl("+t+", "+n+"%, "+e+"%)";var r,t,n,e,u},r.prototype.toHsv=function(){return r=h(this.rgba),{h:n(r.h),s:n(r.s),v:n(r.v),a:n(r.a,3)};var r},r.prototype.invert=function(){return w({r:255-(r=this.rgba).r,g:255-r.g,b:255-r.b,a:r.a});var r},r.prototype.saturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,r))},r.prototype.desaturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,-r))},r.prototype.grayscale=function(){return w(M(this.rgba,-1))},r.prototype.lighten=function(r){return void 0===r&&(r=.1),w($(this.rgba,r))},r.prototype.darken=function(r){return void 0===r&&(r=.1),w($(this.rgba,-r))},r.prototype.rotate=function(r){return void 0===r&&(r=15),this.hue(this.hue()+r)},r.prototype.alpha=function(r){return"number"==typeof r?w({r:(t=this.rgba).r,g:t.g,b:t.b,a:r}):n(this.rgba.a,3);var t},r.prototype.hue=function(r){var t=c(this.rgba);return"number"==typeof r?w({h:r,s:t.s,l:t.l,a:t.a}):n(t.h)},r.prototype.isEqual=function(r){return this.toHex()===w(r).toHex()},r}(),w=function(r){return r instanceof j?r:new j(r)},S=[],k=function(r){r.forEach(function(r){S.indexOf(r)<0&&(r(j,y),S.push(r))})},E=function(){return new j({r:255*Math.random(),g:255*Math.random(),b:255*Math.random()})};


/***/ }),

/***/ "./node_modules/colord/plugins/names.mjs":
/*!***********************************************!*\
  !*** ./node_modules/colord/plugins/names.mjs ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(e,f){var a={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},r={};for(var d in a)r[a[d]]=d;var l={};e.prototype.toName=function(f){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var d,i,n=r[this.toHex()];if(n)return n;if(null==f?void 0:f.closest){var o=this.toRgb(),t=1/0,b="black";if(!l.length)for(var c in a)l[c]=new e(a[c]).toRgb();for(var g in a){var u=(d=o,i=l[g],Math.pow(d.r-i.r,2)+Math.pow(d.g-i.g,2)+Math.pow(d.b-i.b,2));u<t&&(t=u,b=g)}return b}};f.string.push([function(f){var r=f.toLowerCase(),d="transparent"===r?"#0000":a[r];return d?new e(d).toRgb():null},"name"])}


/***/ }),

/***/ "./node_modules/stylis/src/Enum.js":
/*!*****************************************!*\
  !*** ./node_modules/stylis/src/Enum.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHARSET": function() { return /* binding */ CHARSET; },
/* harmony export */   "COMMENT": function() { return /* binding */ COMMENT; },
/* harmony export */   "COUNTER_STYLE": function() { return /* binding */ COUNTER_STYLE; },
/* harmony export */   "DECLARATION": function() { return /* binding */ DECLARATION; },
/* harmony export */   "DOCUMENT": function() { return /* binding */ DOCUMENT; },
/* harmony export */   "FONT_FACE": function() { return /* binding */ FONT_FACE; },
/* harmony export */   "FONT_FEATURE_VALUES": function() { return /* binding */ FONT_FEATURE_VALUES; },
/* harmony export */   "IMPORT": function() { return /* binding */ IMPORT; },
/* harmony export */   "KEYFRAMES": function() { return /* binding */ KEYFRAMES; },
/* harmony export */   "MEDIA": function() { return /* binding */ MEDIA; },
/* harmony export */   "MOZ": function() { return /* binding */ MOZ; },
/* harmony export */   "MS": function() { return /* binding */ MS; },
/* harmony export */   "NAMESPACE": function() { return /* binding */ NAMESPACE; },
/* harmony export */   "PAGE": function() { return /* binding */ PAGE; },
/* harmony export */   "RULESET": function() { return /* binding */ RULESET; },
/* harmony export */   "SUPPORTS": function() { return /* binding */ SUPPORTS; },
/* harmony export */   "VIEWPORT": function() { return /* binding */ VIEWPORT; },
/* harmony export */   "WEBKIT": function() { return /* binding */ WEBKIT; }
/* harmony export */ });
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'


/***/ }),

/***/ "./node_modules/stylis/src/Middleware.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Middleware.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleware": function() { return /* binding */ middleware; },
/* harmony export */   "namespace": function() { return /* binding */ namespace; },
/* harmony export */   "prefixer": function() { return /* binding */ prefixer; },
/* harmony export */   "rulesheet": function() { return /* binding */ rulesheet; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var _Serializer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Serializer.js */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var _Prefixer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Prefixer.js */ "./node_modules/stylis/src/Prefixer.js");






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: element.return = (0,_Prefixer_js__WEBPACK_IMPORTED_MODULE_2__.prefix)(element.value, element.length)
					break
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES:
					return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {value: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(element.value, '@', '@' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT)})], callback)
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
					if (element.length)
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)(element.props, function (value) {
							switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(read-\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]})], callback)
								// :placeholder
								case '::placeholder':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'input-$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'input-$1')]})
									], callback)
							}

							return ''
						})
			}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
			element.props = element.props.map(function (value) {
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.tokenize)(value), function (value, index, children) {
					switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 0)) {
						// \f
						case 12:
							return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, 1, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(children[index], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) > 1 ? '' : value
								case index = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}


/***/ }),

/***/ "./node_modules/stylis/src/Parser.js":
/*!*******************************************!*\
  !*** ./node_modules/stylis/src/Parser.js ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "comment": function() { return /* binding */ comment; },
/* harmony export */   "compile": function() { return /* binding */ compile; },
/* harmony export */   "declaration": function() { return /* binding */ declaration; },
/* harmony export */   "parse": function() { return /* binding */ parse; },
/* harmony export */   "ruleset": function() { return /* binding */ ruleset; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.dealloc)(parse('', null, null, null, [''], value = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.alloc)(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)()) {
			// (
			case 40:
				if (previous != 108 && characters.charCodeAt(length - 1) == 58) {
					if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.whitespace)(previous)
				break
			// \
			case 92:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.escaping)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)() - 1, 7)
				continue
			// /
			case 47:
				switch ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)()) {
					case 42: case 47:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(comment((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.commenter)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)(), (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)()), root, parent), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset:
						if (property > 0 && ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - length))
							(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule) {
									// d m s
									case 100: case 109: case 115:
										parse(value, reference, reference, rule && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters), property = previous
			default:
				if (variable < 1)
					if (character == 123)
						--variable
					else if (character == 125 && variable++ == 0 && (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.prev)() == 125)
						continue

				switch (characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)() === 45)
							characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)())

						atrule = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)(), offset = length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(type = characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.identifier)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)())), character++
						break
					// -
					case 45:
						if (previous === 45 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, post + 1, post = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(j = points[i])), z = value; x < size; ++x)
			if (z = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.trim)(j > 0 ? rule[x] + ' ' + y : (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(y, /&\f/g, rule[x])))
				props[k++] = z

	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, offset === 0 ? _Enum_js__WEBPACK_IMPORTED_MODULE_2__.RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.COMMENT, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.char)()), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.DECLARATION, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 0, length), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length + 1, -1), length)
}


/***/ }),

/***/ "./node_modules/stylis/src/Prefixer.js":
/*!*********************************************!*\
  !*** ./node_modules/stylis/src/Prefixer.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefix": function() { return /* binding */ prefix; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {string} value
 * @param {number} length
 * @return {string}
 */
function prefix (value, length) {
	switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.hash)(value, length)) {
		// color-adjust
		case 5103:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// flex, flex-direction
		case 6828: case 4268:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// order
		case 6165:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-' + value + value
		// align-items
		case 5187:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(\w+).+(:[^]+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-$1$2' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-item-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/, '') + value
		// align-content
		case 4675:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-line-pack' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /align-content|flex-|-self/, '') + value
		// flex-shrink
		case 5548:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-grow', '') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /([^-])(transform)/g, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2') + value
		// cursor
		case 6187:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(zoom-|grab)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), /(image-set)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(image-set\([^]*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(flex-)?(.*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-pack:$3' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+)-inline(.+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 1 - length > 6)
				switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2-$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, 'stretch') ? prefix((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'stretch', 'fill-available'), length) + value : value
				}
			break
		// position: sticky
		case 4949:
			// (s)ticky?
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1) !== 115)
				break
		// display: (flex|inline-flex)
		case 6444:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 3 - (~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, '!important') && 10))) {
				// stic(k)y
				case 107:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT) + value
				// (inline-)?fl(e)x
				case 101:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + '$2box$3') + value
			}
			break
		// writing-mode
		case 5936:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
			}

			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
	}

	return value
}


/***/ }),

/***/ "./node_modules/stylis/src/Serializer.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Serializer.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serialize": function() { return /* binding */ serialize; },
/* harmony export */   "stringify": function() { return /* binding */ stringify; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = ''
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children)

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.IMPORT: case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: return element.return = element.return || element.value
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.COMMENT: return ''
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET: element.value = element.props.join(',')
	}

	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}


/***/ }),

/***/ "./node_modules/stylis/src/Tokenizer.js":
/*!**********************************************!*\
  !*** ./node_modules/stylis/src/Tokenizer.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alloc": function() { return /* binding */ alloc; },
/* harmony export */   "caret": function() { return /* binding */ caret; },
/* harmony export */   "char": function() { return /* binding */ char; },
/* harmony export */   "character": function() { return /* binding */ character; },
/* harmony export */   "characters": function() { return /* binding */ characters; },
/* harmony export */   "column": function() { return /* binding */ column; },
/* harmony export */   "commenter": function() { return /* binding */ commenter; },
/* harmony export */   "copy": function() { return /* binding */ copy; },
/* harmony export */   "dealloc": function() { return /* binding */ dealloc; },
/* harmony export */   "delimit": function() { return /* binding */ delimit; },
/* harmony export */   "delimiter": function() { return /* binding */ delimiter; },
/* harmony export */   "escaping": function() { return /* binding */ escaping; },
/* harmony export */   "identifier": function() { return /* binding */ identifier; },
/* harmony export */   "length": function() { return /* binding */ length; },
/* harmony export */   "line": function() { return /* binding */ line; },
/* harmony export */   "next": function() { return /* binding */ next; },
/* harmony export */   "node": function() { return /* binding */ node; },
/* harmony export */   "peek": function() { return /* binding */ peek; },
/* harmony export */   "position": function() { return /* binding */ position; },
/* harmony export */   "prev": function() { return /* binding */ prev; },
/* harmony export */   "slice": function() { return /* binding */ slice; },
/* harmony export */   "token": function() { return /* binding */ token; },
/* harmony export */   "tokenize": function() { return /* binding */ tokenize; },
/* harmony export */   "tokenizer": function() { return /* binding */ tokenizer; },
/* harmony export */   "whitespace": function() { return /* binding */ whitespace; }
/* harmony export */ });
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");


var line = 1
var column = 1
var length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.assign)(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, --position) : 0

	if (column--, character === 10)
		column = 1, line--

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.trim)(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(identifier(position - 1), children)
				break
			case 2: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(delimit(character), children)
				break
			default: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(character), children)
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character)
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}


/***/ }),

/***/ "./node_modules/stylis/src/Utility.js":
/*!********************************************!*\
  !*** ./node_modules/stylis/src/Utility.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": function() { return /* binding */ abs; },
/* harmony export */   "append": function() { return /* binding */ append; },
/* harmony export */   "assign": function() { return /* binding */ assign; },
/* harmony export */   "charat": function() { return /* binding */ charat; },
/* harmony export */   "combine": function() { return /* binding */ combine; },
/* harmony export */   "from": function() { return /* binding */ from; },
/* harmony export */   "hash": function() { return /* binding */ hash; },
/* harmony export */   "indexof": function() { return /* binding */ indexof; },
/* harmony export */   "match": function() { return /* binding */ match; },
/* harmony export */   "replace": function() { return /* binding */ replace; },
/* harmony export */   "sizeof": function() { return /* binding */ sizeof; },
/* harmony export */   "strlen": function() { return /* binding */ strlen; },
/* harmony export */   "substr": function() { return /* binding */ substr; },
/* harmony export */   "trim": function() { return /* binding */ trim; }
/* harmony export */ });
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3)
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}


/***/ }),

/***/ "./src/city-field/block.json":
/*!***********************************!*\
  !*** ./src/city-field/block.json ***!
  \***********************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"name":"yalidine/city-field","title":"City field","description":"Allow customers to select a field.","category":"woocommerce","parent":["woocommerce/checkout-shipping-address-block","woocommerce/checkout-billing-address-block"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!*********************************!*\
  !*** ./src/city-field/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/city-field/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/city-field/block.json");
/**
 * External dependencies
 */

/**
* Internal dependencies
*/



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__.Edit,
  save: _edit__WEBPACK_IMPORTED_MODULE_1__.Save
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map