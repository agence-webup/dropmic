const dropmicClassShow = "dropmic--show";
class Dropmic {

    constructor(target, options) {
        this.target = target;
        this.btn = target.querySelector('[data-dropmic-btn]');
        this.container = null;

        this.options = options;
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

    _bindEvents() {
        let self = this;
        // Show menu
        this.btn.addEventListener("click", function(event) {
            event.preventDefault();
            if (!self.target.classList.contains(dropmicClassShow)) {
                self.open();
            } else {
                self.close();
            }
        });

        // Close menu when mouthclick outside menu
        document.addEventListener("click", function(event) {
            if (!(self._findAncestor(event.target, 'dropmic') === self.target)) {
                if (self.target.classList.contains(dropmicClassShow)) {
                    self.close.call(self);
                }
            }
        });

        // Close menu with escape key
        this.target.addEventListener("keydown", function(event) {
            if(event.key === "Escape") {
                self.close();
                self.btn.focus();
            }
        });

        // Loop dropdown item with Tab key
        this.target.addEventListener("keydown", function(event) {
            if(event.key === "Tab") {
                if (self.target.classList.contains(dropmicClassShow)) {
                    let elementList = self.target.querySelectorAll(".dropmic-menu__listContent");
                    let elementLast = elementList.length - 1;
                    if(document.activeElement === elementList[elementLast]) {
                        event.preventDefault();
                        elementList[0].focus();
                    }
                }
            }
        });
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
        this.container = document.createElement("div");
        this.container.classList.add("dropmic-menu");
        this.container.setAttribute("aria-hidden", "true");
        this.target.appendChild(this.container);
    }

    // Construct list if it doesn't exist
    _constructList() {
        if (this.list === null) {
            this.list = document.createElement("ul");
            this.list.classList.add("dropmic-menu__list");
            this.list.setAttribute("role", "menu")
            this.container.appendChild(this.list);
        }
        return this.list;
    }

    // Construct a list item
    _constructItem(content) {
        let listItem = document.createElement("li");
        listItem.classList.add("dropmic-menu__listItem");
        this.list.setAttribute("role", "menuitem")
        listItem.appendChild(content);
        return listItem;
    }

    // Construct custom content
    _constructCustom(content) {
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
    addLink(label, url) {
        this._isInitialized();
        let link = document.createElement("a");
        link.classList.add("dropmic-menu__listContent");
        link.setAttribute("href", url);
        link.setAttribute("tabindex", "-1");
        link.innerHTML = label;
        this._constructList().appendChild(this._constructItem(link));
    }

    // Add a button
    addBtn(label, callback) {
        this._isInitialized();
        if (!(typeof callback === "function")) {
            console.warning('callback is not a function');
            return;
        }

        let btn = document.createElement("button");
        btn.classList.add("dropmic-menu__listContent");
        btn.setAttribute("tabindex", "-1");
        btn.innerHTML = label;
        this._constructList().appendChild(this._constructItem(btn));
        btn.addEventListener('click', function() {
            callback();
        });
        return btn;
    }

    // Add only a text in a span
    addLabel(text) {
        this._isInitialized();
        let label = document.createElement("span");
        label.classList.add("dropmic-menu__listContent");
        label.innerHTML = text;
        this._constructList().appendChild(this._constructItem(label));
    }

    // Add custom content (not in list), just have fun
    setCustomContent(content) {
        this._isInitialized();
        this._constructCustom(content);
    }

    // Open dropdown
    open() {
        this.target.classList.add(dropmicClassShow);
        this.target.querySelector("[aria-hidden]").setAttribute("aria-hidden", "false");
        let listItems = this.target.querySelectorAll(".dropmic-menu__listContent");
        [].forEach.call(listItems, (el) => {
            el.setAttribute("tabindex", "0");
        })
    }

    // Close dropdown
    close() {
        this.target.classList.remove(dropmicClassShow);
        this.target.querySelector("[aria-hidden]").setAttribute("aria-hidden", "true");
        let listItems = this.target.querySelectorAll(".dropmic-menu__listContent");
        [].forEach.call(listItems, (el) => {
            el.setAttribute("tabindex", "-1");
        })
    }
}
