class Dropdown {

    constructor(target, options) {
        this.target = target;
        this.options = options;

        this.init();
    }

    init() {
        this._bindEvents();
    }

    _bindEvents() {
        let that = this;
        this.target.addEventListener("click", function() {
            that._setContent(that.target);
        });
    }

    _getCustom(options) {
        for (let key in options) {
            if (options.hasOwnProperty(key) && key === '_addCustom') {
                let content = this._addCustom(this.options[key].content);
                return content;
            }
        }
        return '';
    }

    _getListItem(content) {
        let listItem = document.createElement("li");
        listItem.classList.add("dd-menu__listItem");
        listItem.appendChild(content);
        return listItem;
    }

    _getList(options) {
        let list;
        if (typeof this.options === 'object') {
            list = document.createElement("ul");
            list.classList.add("dd-menu__list");
            for(let key in this.options) {
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

    _addLink(label, link) {
        if (typeof label === 'string' && typeof link === 'string') {
            let content = document.createElement("a");
            content.classList.add("dd-menu__listContent");
            content.setAttribute("href", link);
            content.innerHTML = label;
            return content;
        } else {
            console.error('_addLink type error');
        }
    }

    _addBtn(label, callback) {
        if (typeof label === 'string' && typeof callback === 'function') {
            let content = document.createElement("button");
            content.classList.add("dd-menu__listContent");
            content.innerHTML = label;
            return content;
        } else {
            console.error('_addBtn type error');
        }
    }

    _addLabel(label) {
        if (typeof label === 'string') {
            let content = document.createElement("span");
            content.classList.add("dd-menu__listContent");
            content.innerHTML = label;
            return content;
        } else {
            console.error('_addLabel type error');
        }
    }

    _addCustom(content) {
        if (typeof content === 'string') {
            let customContent = document.createElement("div");
            customContent.classList.add("dd-menu__custom");
            customContent.innerHTML = content;
            return customContent;
        } else {
            console.error('_addCustom type error');
        }
    }

    _getContent() {
        let menu = document.createElement("div");
        menu.classList.add("dd-menu");
        let menuWrapper = document.createElement("div");
        menuWrapper.classList.add("dd-menu__content");

        menu.appendChild(menuWrapper);
        if (typeof this._getCustom(this.options) === "object") {
            menuWrapper.appendChild(this._getCustom(this.options));
        } else {}

        if (typeof this._getList(this.options) === "object") {
            menuWrapper.appendChild(this._getList(this.options));
        } else {}

        return menu;
    }

    _setContent(item) {
        item.appendChild(this._getContent());
    }

    _removeContent(item) {
        let lastItem = item.lastElementChild;
        item.removeChild(lastItem);
    }

}

let plop = new Dropdown(document.querySelector('[data-dropdown]'), {
    '_addLink': {
        label : 'mon lien',
        link : 'http://okokfsfd'
    },
    '_addBtn': {
        label : 'mon bouton',
        callback : function() {
            console.log("fonction");
        }
    },
    '_addLabel': {
        label : 'mon label'
    },
    '_addCustom': {
        content : 'super contenu custom'
    }
});
