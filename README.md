# dropmic

## Introduction

**dropmic** is a lightweight dropdown plugin written in pure javascript

- No dependencies required
- No extra files to download
- Fully customizable via CSS
- Simple API

## Documentation

### Installation

Method                     | Procedure
-------------------------- | ---------
Bower                      | bower install dropmic --save
NPM                        | npm install dropmic
Yarn (obsolete since npm5) | yarn add dropmic
Download                   | [Download zip](https://github.com/agence-webup/dropmic/archive/master.zip)

Then dropmic have some css you will have to add (feel free to custom it for a better integration in your UI):

```
<link rel="stylesheet" href="dist/dropmic.css">
```

Finally just link the dropmic's code at the end of your document:

```
<script src="dist/dropmic.js"></script>
```

### Use

#### Create the base layout for your button
1. Add `data-dropmic-btn` attribute to your button
2. Create a div with a `dropmic` css class
3. Add a `data-dropmic-direction` attribute to the div (default behavior: `bottom-right`):

  - `data-dropmic-direction="top-left"`
  - `data-dropmic-direction="top-right"`
  - `data-dropmic-direction="top-middle"`
  - `data-dropmic-direction="bottom-left"`
  - `data-dropmic-direction="bottom-right"`
  - `data-dropmic-direction="bottom-middle"`

4. You can also add a `data-dropmic` attribute to you div for target it.

Example:
```
<div class="dropmic" data-dropmic="42"
data-dropmic-direction="bottom-right">
  <button data-dropmic-btn>click me</button>
</div>
```

#### Instantiate your new dropdown
```
var dropmic = new Dropmic(document.querySelector('[data-dropmic="42"]'));
```

#### Add content
  You can create the content by yourself or use the API (cf. below)

  Use this template (`<div class="dropmic-menu">` is needed, otherwise you can completely customize his content)

  ```
  <div class="dropmic" data-dropmic="42" data-dropmic-direction="bottom-right" role="navigation">
      <button data-dropmic-btn>click me</button>
      <div class="dropmic-menu" aria-hidden="true">
          <div class="dropmic-menu__custom">Custom content</div>
          <ul class="dropmic-menu__list" role="menu">
              <li class="dropmic-menu__listItem" role="menuitem">
                  <a class="dropmic-menu__listContent" href="http://example.com" tabindex="-1">label link</a>
              </li>
              <li class="dropmic-menu__listItem" role="menuitem">
                  <button class="dropmic-menu__listContent" tabindex="-1">label button</button>
              </li>
          </ul>
      </div>
  </div>
  ```

## API

You can use the API to generate content and open or close your dropdown with JS:

  Name                      | Parameter type(s)       | Description
  ------------------------- | ----------------------- | ----------
  addLink(label, url)       | string or int, string   | Add a link
  addBtn(label, callback)   | string or int, function | Add a button
  addLabel(label)           | string or int           | Add a text label
  setCustomContent(content) | string                  | Set a custom content
  open()                    |                         | Open your dropdown
  close()                   |                         | Close your dropdown

  Example:
  ```
dropmic.setCustomContent("toto custom");
dropmic.addLink('link label', 'http://example.com');
dropmic.addBtn('close dropdown', function() {
    dropmic.close();
});
dropmic.addLabel('text label');
  ```

## Options

  Name        | Type     | Description
------------- | -------- | -----------------------------------------
  onOpen      | function | Callback to execute when dropmic is open
  onClose     | function | Callback to execute when dropmic is closed
  beforeOpen  | function | Callback to execute before opening dropmic
  beforeClose | function | Callback to execute before closing dropmic

## Roadmap
- [x] Add open and close public method in the API
- [x] Add top-middle and bottom-middle direction
- [x] A11y friendly (with keyboard navigation)
- [ ] Instantiate severals dropmic with one initialization command
- [ ] Permit to update a list item value
- [ ] Permit to update button content with dropdown is open

## Licence
Released under the [MIT LICENSE](http://opensource.org/licenses/MIT)
Developed by [Robin Parisi](https://github.com/robinparisi/) and [Théotix](https://github.com/theotix/)
