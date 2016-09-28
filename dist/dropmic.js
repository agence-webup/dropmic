"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dropmicClassShow = "dropmic--show";

var Dropmic = function () {
    function Dropmic(target, options) {
        _classCallCheck(this, Dropmic);

        this.target = target;
        this.btn = target.querySelector('[data-dropmic-btn]');
        this.container = null;

        this.options = options;
        this.list = null;
        this.custom = null;

        this.init();
    }

    _createClass(Dropmic, [{
        key: "init",
        value: function init() {
            this._constructDropdown();
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
                if (!self.target.classList.contains(dropmicClassShow)) {
                    self.open();
                } else {
                    self.close();
                }
            });

            // Remove menu
            document.addEventListener("click", function (event) {
                if (!(self._findAncestor(event.target, 'dropmic') === self.target)) {
                    if (self.target.classList.contains(dropmicClassShow)) {
                        self.close.call(self);
                    }
                }
            });
        }

        /**
         * Constructors
         */

        // Construct dropdown struture

    }, {
        key: "_constructDropdown",
        value: function _constructDropdown() {
            this.container = document.createElement("div");
            this.container.classList.add("dropmic-menu");
            this.target.appendChild(this.container);
        }

        // Construct list if it doesn't exist

    }, {
        key: "_constructList",
        value: function _constructList() {
            if (this.list === null) {
                this.list = document.createElement("ul");
                this.list.classList.add("dropmic-menu__list");
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
         * Public methodes to generate menu
         */

        // Add a link

    }, {
        key: "addLink",
        value: function addLink(label, url) {
            var link = document.createElement("a");
            link.classList.add("dropmic-menu__listContent");
            link.setAttribute("href", url);
            link.innerHTML = label;
            this._constructList().appendChild(this._constructItem(link));
        }

        // Add a button

    }, {
        key: "addBtn",
        value: function addBtn(label, callback) {
            if (!(typeof callback === "function")) {
                console.warning('callback is not a function');
                return;
            }

            var btn = document.createElement("button");
            btn.classList.add("dropmic-menu__listContent");
            btn.innerHTML = label;
            this._constructList().appendChild(this._constructItem(btn));
            btn.addEventListener('click', function () {
                callback();
            });
            return btn;
        }

        // Add only a text in a span

    }, {
        key: "addLabel",
        value: function addLabel(text) {
            var label = document.createElement("span");
            label.classList.add("dropmic-menu__listContent");
            label.innerHTML = text;
            this._constructList().appendChild(this._constructItem(label));
        }

        // Add custom content (not in list), just have fun

    }, {
        key: "setCustom",
        value: function setCustom(content) {
            this._constructCustom(content);
        }

        // Open dropdown

    }, {
        key: "open",
        value: function open() {
            this.target.classList.add(dropmicClassShow);
        }

        // Close dropdown

    }, {
        key: "close",
        value: function close() {
            this.target.classList.remove(dropmicClassShow);
        }
    }]);

    return Dropmic;
}();