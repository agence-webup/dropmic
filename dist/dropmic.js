"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dropmic = function () {
    function Dropmic(target, options) {
        _classCallCheck(this, Dropmic);

        this.target = target;
        this.options = options;

        this.init();
    }

    _createClass(Dropmic, [{
        key: "init",
        value: function init() {
            this._bindEvents();
        }
    }, {
        key: "_bindEvents",
        value: function _bindEvents() {
            var self = this;
            // Show menu
            this.target.addEventListener("click", function () {
                if (!self.target.lastElementChild.classList.contains("dropmic-menu")) {
                    self._setContent(self.target);
                }
            });
            // Remove menu
            document.addEventListener("click", function (event) {
                if (!(event.target.parentNode === self.target)) {
                    if (self.target.lastElementChild.classList.contains("dropmic-menu")) {
                        self._removeContent(self.target);
                    }
                }
            });
        }
    }, {
        key: "_getCustom",
        value: function _getCustom(options) {
            for (var key in options) {
                if (options.hasOwnProperty(key) && key === '_addCustom') {
                    var content = this._addCustom(this.options[key].content);
                    return content;
                }
            }
            return '';
        }
    }, {
        key: "_getListItem",
        value: function _getListItem(content) {
            var listItem = document.createElement("li");
            listItem.classList.add("dropmic-menu__listItem");
            listItem.appendChild(content);
            return listItem;
        }
    }, {
        key: "_getList",
        value: function _getList(options) {
            var list = void 0;
            if (_typeof(this.options) === 'object') {
                list = document.createElement("ul");
                list.classList.add("dropmic-menu__list");
                for (var key in this.options) {
                    if (this.options.hasOwnProperty(key)) {
                        switch (key) {
                            case '_addLink':
                                list.appendChild(this._getListItem(this._addLink(this.options[key].label, this.options[key].link)));
                                break;
                            case '_addBtn':
                                list.appendChild(this._getListItem(this._addBtn(this.options[key].label, this.options[key].callback)));
                                break;
                            case '_addLabel':
                                list.appendChild(this._getListItem(this._addLabel(this.options[key].label)));
                                break;
                            default:
                        }
                    }
                }
            } else {
                console.error('options type error');
            }
            return list;
        }
    }, {
        key: "_addLink",
        value: function _addLink(label, link) {
            if (typeof label === 'string' && typeof link === 'string') {
                var content = document.createElement("a");
                content.classList.add("dropmic-menu__listContent");
                content.setAttribute("href", link);
                content.innerHTML = label;
                return content;
            } else {
                console.error('_addLink type error');
            }
        }
    }, {
        key: "_addBtn",
        value: function _addBtn(label, callback) {
            if (typeof label === 'string' && typeof callback === 'function') {
                var content = document.createElement("button");
                content.classList.add("dropmic-menu__listContent");
                content.innerHTML = label;
                return content;
            } else {
                console.error('_addBtn type error');
            }
        }
    }, {
        key: "_addLabel",
        value: function _addLabel(label) {
            if (typeof label === 'string') {
                var content = document.createElement("span");
                content.classList.add("dropmic-menu__listContent");
                content.innerHTML = label;
                return content;
            } else {
                console.error('_addLabel type error');
            }
        }
    }, {
        key: "_addCustom",
        value: function _addCustom(content) {
            if (typeof content === 'string') {
                var customContent = document.createElement("div");
                customContent.classList.add("dropmic-menu__custom");
                customContent.innerHTML = content;
                return customContent;
            } else {
                console.error('_addCustom type error');
            }
        }
    }, {
        key: "_getContent",
        value: function _getContent() {
            var menu = document.createElement("div");
            menu.classList.add("dropmic-menu");
            var menuWrapper = document.createElement("div");
            menuWrapper.classList.add("dropmic-menu__content");

            menu.appendChild(menuWrapper);
            if (_typeof(this._getCustom(this.options)) === "object") {
                menuWrapper.appendChild(this._getCustom(this.options));
            } else {}

            if (_typeof(this._getList(this.options)) === "object") {
                menuWrapper.appendChild(this._getList(this.options));
            } else {}

            return menu;
        }
    }, {
        key: "_setContent",
        value: function _setContent(item) {
            item.appendChild(this._getContent());
        }
    }, {
        key: "_removeContent",
        value: function _removeContent(item) {
            var lastItem = item.lastElementChild;
            item.removeChild(lastItem);
        }
    }]);

    return Dropmic;
}();

var plop = new Dropmic(document.querySelector('[data-dropmic]'), {
    '_addLink': {
        label: 'mon lien',
        link: 'http://okokfsfd'
    },
    '_addBtn': {
        label: 'mon bouton',
        callback: function callback() {
            console.log("fonction");
        }
    },
    '_addLabel': {
        label: 'mon label'
    },
    '_addCustom': {
        content: 'super contenu custom'
    }
});