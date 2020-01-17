export default class Dropmic {

    constructor(target, options) {
        this.target = target;
        this.btn = target.querySelector('[data-dropmic-btn]');
        this.container = null;
        this.showClass = "dropmic--show";

        this.defaults = {
            onOpen: null,
            onClose: null,
            beforeClose: null,
            beforeClose: null
        };

        this.options = this.extendObject({}, this.defaults, options);

        this.list = null;
        this.custom = null;

        this.initialized = false;

        this.init();

    }

    init() {
        this._bindEvents();
    }

    _findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    _stringToDom (htmlString) {
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    _bindEvents() {
        // Show menu
        this.btn.addEventListener("click", (event) => {
            event.preventDefault();
            if (!this.target.classList.contains(this.showClass)) {
                this.open();
            } else {
                this.close();
            }
        });

        // Close menu when mouthclick outside menu
        document.addEventListener("click", (event) => {
            if (!(this._findAncestor(event.target, 'dropmic') === this.target)) {
                if (this.target.classList.contains(this.showClass)) {
                    this.close.call(this);
                }
            }
        });

        // Close menu with escape key
        this.target.addEventListener("keydown", (event) => {
            if (event.keyCode === 27) {
                this.close();
                this.btn.focus();
            }
        });


        this.target.addEventListener("keydown", (event) => {
            if (this.target.classList.contains(this.showClass)) {
                // Tab navigation
                let elementList = this.target.querySelectorAll(".dropmic-menu__listContent");
                let elementLast = elementList.length - 1;
                if (event.keyCode === 9 && document.activeElement === elementList[elementLast]) {
                    event.preventDefault();
                    elementList[0].focus();
                }

                // Arrow Up/Down navigation
                if (event.keyCode === 38 || event.keyCode === 40) {
                    event.preventDefault();
                    let currentItemIndex = this._getCurrentItemIndex(elementList, document.activeElement);
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

    _getCurrentItemIndex(list, element) {
        for (var i = 0; i < list.length; i++) {
            if (element === list[i]) {
                return i;
            }
        }
        return undefined;
    }

    _getPreviousItemIndex(list, currentItemIndex) {
        if (currentItemIndex > 0) {
            return currentItemIndex - 1;
        } else {
            return list.length - 1;
        }
    }

    _getNextItemIndex(list, currentItemIndex) {
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
    _isInitialized() {
        if (this.initialized === false) {
            this._constructDropdown();
            this.initialized = true;
        }
    }

    // Construct dropdown struture
    _constructDropdown() {
        this.container = this._stringToDom(`<div class="dropmic-menu" aria-hidden="true"></div>`)
        this.target.appendChild(this.container);
    }

    // Construct list if it doesn't exist
    _constructList() {
        if (this.list === null) {
            this.list = this._stringToDom(`<ul class="dropmic-menu__list" role="menu"></ul>`)
            this.container.appendChild(this.list);
        }
        return this.list;
    }

    // Construct a list item
    _constructItem(content) {
        let item = this._stringToDom(`<li class="dropmic-menu__listItem" role="menuitem"></li>`)
        item.appendChild(content);
        return item;
    }

    // Construct custom content
    _constructCustom(content) {
        if (this.custom === null) {
            this.custom = this._stringToDom(`<div class="dropmic-menu__custom">${content}</div>`)
            this.container.appendChild(this.custom);
        } else {
            this.custom.innerHTML = content;
        }
    }

    /**
    * Callback methods
    */

    _onOpen() {
        if(this.options.onOpen) {
            this.options.onOpen();
        }
    }

    _onClose() {
        if(this.options.onClose) {
            this.options.onClose();
        }
    }

    _beforeOpen() {
        if(this.options.beforeOpen) {
            this.options.beforeOpen();
        }
    }

    _beforeClose() {
        if(this.options.beforeClose) {
            this.options.beforeClose();
        }
    }

    /**
    * Helpers
    */

    extendObject() {
        for (let i = 1; i < arguments.length; i++) {
            for (let key in arguments[i]) {
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
    addLink(label, url) {
        this._isInitialized();
        let link = this._stringToDom(`<a class="dropmic-menu__listContent" href="${url}" tabindex="-1">${label}</a>`)
        this._constructList().appendChild(this._constructItem(link));
    }

    // Add a button
    addBtn(label, callback) {
        this._isInitialized();
        if (!(typeof callback === "function")) {
            console.warning('callback is not a function');
            return;
        }
        let btn = this._stringToDom(`<button class="dropmic-menu__listContent" tabindex="-1"></button>`)
        btn.innerHTML = label;
        this._constructList().appendChild(this._constructItem(btn));
        btn.addEventListener('click', function(event) {
            callback(event);
        });
        return btn;
    }

    // Add only a text in a span
    addLabel(text) {
        this._isInitialized();
        let label = this._stringToDom(`<span class="dropmic-menu__listContent">${text}</span>`)
        this._constructList().appendChild(this._constructItem(label));
    }

    // Add custom content (not in list), just have fun
    setCustomContent(content) {
        this._isInitialized();
        this._constructCustom(content);
    }

    // Update target button content

    updateTargetBtn(content) {
        this.btn.innerHTML = content;
    }

    // Open dropdown
    open() {
        this._beforeOpen();
        this.target.classList.add(this.showClass);
        this.target.querySelector("[aria-hidden]").setAttribute("aria-hidden", "false");
        let listItems = this.target.querySelectorAll(".dropmic-menu__listContent");
        [].forEach.call(listItems, (el) => {
            el.setAttribute("tabindex", "0");
        })
        this._onOpen();
    }

    // Close dropdown
    close() {
        this._beforeClose();
        this.target.classList.remove(this.showClass);
        this.target.querySelector("[aria-hidden]").setAttribute("aria-hidden", "true");
        let listItems = this.target.querySelectorAll(".dropmic-menu__listContent");
        [].forEach.call(listItems, (el) => {
            el.setAttribute("tabindex", "-1");
        })
        this._onClose();
    }
}
