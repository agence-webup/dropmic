"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dropdown = function () {
    function Dropdown(target, options) {
        _classCallCheck(this, Dropdown);

        this.target = target;
        this.options = options;
    }

    _createClass(Dropdown, [{
        key: "setContent",
        value: function setContent(content) {
            console.log(content);
        }
    }, {
        key: "addLink",
        value: function addLink(label, link) {}
    }, {
        key: "addBtn",
        value: function addBtn(label, callback) {}
    }]);

    return Dropdown;
}();