const dropmicClassShow = "dropmic--show";
class Dropmic {

    constructor(target, options) {
        this.target = target;
        this.btn = target.querySelector('[data-dropmic-btn]');

        this.options = options;
        this.list = null;
        this.custom = null;

        this.container = null;

        this.init();
    }

    init() {
        this._constructDropdown();
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
            if (!self.target.classList.contains(dropmicClassShow)) {
                self.open();
            } else {
                self.close();
            }
        });

        // Remove menu
        document.addEventListener("click", function(event) {
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

    // Construct list if it doesn't exist
    _constructList() {
        if (this.list === null) {
            this.list = document.createElement("ul");
            this.list.classList.add("dropmic-menu__list");
            this.container.appendChild(this.list);

        }
        return this.list;
    }

    // Construct a list item
    _constructItem(content) {
        let listItem = document.createElement("li");
        listItem.classList.add("dropmic-menu__listItem");
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
        let link = document.createElement("a");
        link.classList.add("dropmic-menu__listContent");
        link.setAttribute("href", url);
        link.innerHTML = label;
        this._constructList().appendChild(this._constructItem(link));
    }

    // Add a button
    addBtn(label, callback) {
        if (!(typeof callback === "function")) {
            console.warning('callback is not a function');
            return;
        }

        let btn = document.createElement("button");
        btn.classList.add("dropmic-menu__listContent");
        btn.innerHTML = label;
        this._constructList().appendChild(this._constructItem(btn));
        btn.addEventListener('click', function() {
            callback();
        });
        return btn;
    }

    // Add only a text in a span
    addLabel(text) {
        let label = document.createElement("span");
        label.classList.add("dropmic-menu__listContent");
        label.innerHTML = text;
        this._constructList().appendChild(this._constructItem(label));
    }

    // Add custom content (not in list), just have fun
    setCustom(content) {
        this._constructCustom(content);
    }

    /**
     * Content factory
     */

    _constructDropdown() {
        this.container = document.createElement("div");
        this.container.classList.add("dropmic-menu");
        this.target.appendChild(this.container);
    }

    /**
     * Dropdown state
     */

    open() {
        this.target.classList.add(dropmicClassShow);
    }

    close() {
        this.target.classList.remove(dropmicClassShow);
    }
}
