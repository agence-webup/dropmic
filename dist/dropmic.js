(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Dropmic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dropmicClassShow = "dropmic--show";

var Dropmic = function () {
    function Dropmic(target, options) {
        _classCallCheck(this, Dropmic);

        this.target = target;
        this.btn = target.querySelector('[data-dropmic-btn]');
        this.container = null;

        this.defaults = _defineProperty({
            onOpen: null,
            onClose: null,
            beforeClose: null
        }, "beforeClose", null);

        this.options = this.extendObject({}, this.defaults, options);

        this.list = null;
        this.custom = null;

        this.initialized = false;

        this.init();
    }

    _createClass(Dropmic, [{
        key: "init",
        value: function init() {
            this._bindEvents();
        }
    }, {
        key: "_findAncestor",
        value: function _findAncestor(el, cls) {
            while ((el = el.parentElement) && !el.classList.contains(cls)) {}
            return el;
        }
    }, {
        key: "_bindEvents",
        value: function _bindEvents() {
            var self = this;
            // Show menu
            this.btn.addEventListener("click", function (event) {
                event.preventDefault();
                if (!self.target.classList.contains(dropmicClassShow)) {
                    self.open();
                } else {
                    self.close();
                }
            });

            // Close menu when mouthclick outside menu
            document.addEventListener("click", function (event) {
                if (!(self._findAncestor(event.target, 'dropmic') === self.target)) {
                    if (self.target.classList.contains(dropmicClassShow)) {
                        self.close.call(self);
                    }
                }
            });

            // Close menu with escape key
            this.target.addEventListener("keydown", function (event) {
                if (event.keyCode === 27) {
                    self.close();
                    self.btn.focus();
                }
            });

            this.target.addEventListener("keydown", function (event) {
                if (self.target.classList.contains(dropmicClassShow)) {
                    // Tab navigation
                    var elementList = self.target.querySelectorAll(".dropmic-menu__listContent");
                    var elementLast = elementList.length - 1;
                    if (event.keyCode === 9 && document.activeElement === elementList[elementLast]) {
                        event.preventDefault();
                        elementList[0].focus();
                    }

                    // Arrow Up/Down navigation
                    if (event.keyCode === 38 || event.keyCode === 40) {
                        event.preventDefault();
                        var currentItemIndex = self._getCurrentItemIndex(elementList, document.activeElement);
                        if (currentItemIndex === undefined) {
                            elementList[0].focus();
                        } else {
                            if (event.keyCode === 38) {
                                elementList[self._getPreviousItemIndex(elementList, currentItemIndex)].focus();
                            } else {
                                elementList[self._getNextItemIndex(elementList, currentItemIndex)].focus();
                            }
                        }
                    }
                }
            });
        }

        // Navigation function

    }, {
        key: "_getCurrentItemIndex",
        value: function _getCurrentItemIndex(list, element) {
            for (var i = 0; i < list.length; i++) {
                if (element === list[i]) {
                    return i;
                }
            }
            return undefined;
        }
    }, {
        key: "_getPreviousItemIndex",
        value: function _getPreviousItemIndex(list, currentItemIndex) {
            if (currentItemIndex > 0) {
                return currentItemIndex - 1;
            } else {
                return list.length - 1;
            }
        }
    }, {
        key: "_getNextItemIndex",
        value: function _getNextItemIndex(list, currentItemIndex) {
            if (currentItemIndex === list.length - 1) {
                return 0;
            } else {
                return currentItemIndex + 1;
            }
        }
        /**
        * Constructors
        */

        // Initialize dropdown if you want to generate it with JS

    }, {
        key: "_isInitialized",
        value: function _isInitialized() {
            if (this.initialized === false) {
                this._constructDropdown();
                this.initialized = true;
            }
        }

        // Construct dropdown struture

    }, {
        key: "_constructDropdown",
        value: function _constructDropdown() {
            this.container = document.createElement("div");
            this.container.classList.add("dropmic-menu");
            this.container.setAttribute("aria-hidden", "true");
            this.target.appendChild(this.container);
        }

        // Construct list if it doesn't exist

    }, {
        key: "_constructList",
        value: function _constructList() {
            if (this.list === null) {
                this.list = document.createElement("ul");
                this.list.classList.add("dropmic-menu__list");
                this.list.setAttribute("role", "menu");
                this.container.appendChild(this.list);
            }
            return this.list;
        }

        // Construct a list item

    }, {
        key: "_constructItem",
        value: function _constructItem(content) {
            var listItem = document.createElement("li");
            listItem.classList.add("dropmic-menu__listItem");
            this.list.setAttribute("role", "menuitem");
            listItem.appendChild(content);
            return listItem;
        }

        // Construct custom content

    }, {
        key: "_constructCustom",
        value: function _constructCustom(content) {
            if (this.custom === null) {
                this.custom = document.createElement("div");
                this.custom.classList.add("dropmic-menu__custom");
                this.custom.innerHTML = content;
                this.container.appendChild(this.custom);
            } else {
                this.custom.innerHTML = content;
            }
        }

        /**
        * Callback methods
        */

    }, {
        key: "_onOpen",
        value: function _onOpen() {
            if (this.options.onOpen) {
                this.options.onOpen();
            }
        }
    }, {
        key: "_onClose",
        value: function _onClose() {
            if (this.options.onClose) {
                this.options.onClose();
            }
        }
    }, {
        key: "_beforeOpen",
        value: function _beforeOpen() {
            if (this.options.beforeOpen) {
                this.options.beforeOpen();
            }
        }
    }, {
        key: "_beforeClose",
        value: function _beforeClose() {
            if (this.options.beforeClose) {
                this.options.beforeClose();
            }
        }

        /**
        * Helpers
        */

    }, {
        key: "extendObject",
        value: function extendObject() {
            for (var i = 1; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        arguments[0][key] = arguments[i][key];
                    }
                }
            }
            return arguments[0];
        }

        /**
        * Public methods to generate menu
        */

        // Add a link

    }, {
        key: "addLink",
        value: function addLink(label, url) {
            this._isInitialized();
            var link = document.createElement("a");
            link.classList.add("dropmic-menu__listContent");
            link.setAttribute("href", url);
            link.setAttribute("tabindex", "-1");
            link.innerHTML = label;
            this._constructList().appendChild(this._constructItem(link));
        }

        // Add a button

    }, {
        key: "addBtn",
        value: function addBtn(label, callback) {
            this._isInitialized();
            if (!(typeof callback === "function")) {
                console.warning('callback is not a function');
                return;
            }

            var btn = document.createElement("button");
            btn.classList.add("dropmic-menu__listContent");
            btn.setAttribute("tabindex", "-1");
            btn.innerHTML = label;
            this._constructList().appendChild(this._constructItem(btn));
            btn.addEventListener('click', function (event) {
                callback(event);
            });
            return btn;
        }

        // Add only a text in a span

    }, {
        key: "addLabel",
        value: function addLabel(text) {
            this._isInitialized();
            var label = document.createElement("span");
            label.classList.add("dropmic-menu__listContent");
            label.innerHTML = text;
            this._constructList().appendChild(this._constructItem(label));
        }

        // Add custom content (not in list), just have fun

    }, {
        key: "setCustomContent",
        value: function setCustomContent(content) {
            this._isInitialized();
            this._constructCustom(content);
        }

        // Update target button content

    }, {
        key: "updateTargetBtn",
        value: function updateTargetBtn(content) {
            this.btn.innerHTML = content;
        }

        // Open dropdown

    }, {
        key: "open",
        value: function open() {
            this._beforeOpen();
            this.target.classList.add(dropmicClassShow);
            this.target.querySelector("[aria-hidden]").setAttribute("aria-hidden", "false");
            var listItems = this.target.querySelectorAll(".dropmic-menu__listContent");
            [].forEach.call(listItems, function (el) {
                el.setAttribute("tabindex", "0");
            });
            this._onOpen();
        }

        // Close dropdown

    }, {
        key: "close",
        value: function close() {
            this._beforeClose();
            this.target.classList.remove(dropmicClassShow);
            this.target.querySelector("[aria-hidden]").setAttribute("aria-hidden", "true");
            var listItems = this.target.querySelectorAll(".dropmic-menu__listContent");
            [].forEach.call(listItems, function (el) {
                el.setAttribute("tabindex", "-1");
            });
            this._onClose();
        }
    }]);

    return Dropmic;
}();

module.exports = Dropmic;

},{}]},{},[1])(1)
});