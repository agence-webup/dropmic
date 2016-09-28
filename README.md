# dropmic

## Introduction

**dropmic** is a lightweight dropdown plugin written in pure javascript

- No dependencies required
- No extra files to download
- Fully customizable via CSS
- Simple API

## Documentation

### Installation

Method   | Procedure
-------- | ---------
Bower    | _coming soon_
NPM      | _coming soon_
Download | [Download zip](https://github.com/agence-webup/dropmic/archive/master.zip)

Then dropmic have some css you will have to add (feel free to custom it for a better integration in your UI):

```
<link rel="stylesheet" href="dist/dropmic.css">
```

Finally just link the dropmic's code at the end of your document:

```
<script src="dist/dropmic.js"></script>
```

### Use

#### Create de base layout for your button
1. Add `data-dropmic-btn` attribute to your button
2. Create a span with a `dropmic` css class
3. Add a `data-dropmic-direction` attribute to the span (default behavior: `bottom-right`):

  - `data-dropmic-direction="top-left"`
  - `data-dropmic-direction="top-right"`
  - `data-dropmic-direction="bottom-left"`
  - `data-dropmic-direction="bottom-right"`

4. You can also add a `data-dropmic` attribute to you span for target it.

Example:
```
<span class="dropmic" data-dropmic="42"
data-dropmic-direction="bottom-right">
  <button data-dropmic-btn>click me</button>
</span>
```

#### Instanciate your new dropdown
```
var dropmic = new Dropmic(document.querySelector('[data-dropmic="42"]'));
```

#### Add content
You can create the content by yourself or use the API.
  - Use this template (`<div class="dropmic-menu">` is needed, otherwise you can completely customize the content)

  ```
  <span class="dropmic" data-dropmic="42" data-dropmic-direction="bottom-right">
      <button data-dropmic-btn>click me</button>
      <div class="dropmic-menu">
          <div class="dropmic-menu__custom">Custom content</div>
          <ul class="dropmic-menu__list">
              <li class="dropmic-menu__listItem">
                  <a class="dropmic-menu__listContent" href="http://example.com">label link</a>
              </li>
              <li class="dropmic-menu__listItem">
                  <button class="dropmic-menu__listContent">label button</button>
              </li>
          </ul>
      </div>
  </span>
  ```
  - You can use the API to generate content and open or close your dropdown with JS :

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

## Roadmap
- [x] Add open and close public method in the API
- [ ] Instanciate severals dropmic with one initialization command
- [ ] Permit to update a list item value
- [ ] Permit to update button content with dropdown is open

## Licence
Released under the [MIT LICENSE](http://opensource.org/licenses/MIT)
Developed by [Robin Parisi](https://github.com/robinparisi/) and [Théotix](https://github.com/theotix/)
