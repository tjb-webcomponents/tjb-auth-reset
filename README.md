# tjb-auth-reset

Webcomponents reset form field to reset with given credentials

## Example

https://tjb-webcomponents.github.io/tjb-auth-reset/

## Add to project

You might want to use a Polyfill for WebComponent:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-lite.js"></script>
```

### Include via HTML

Include it:

```html
<script
  src="https://tjb-webcomponents.github.io/tjb-auth-reset/tjb-auth-reset.min.js"
  type="module"
></script>
```

### Include via JavaScript

```JavaScript
import 'https://tjb-webcomponents.github.io/tjb-auth-reset/tjb-auth-reset.min.js'
```

### Include via NPM

Console:

```bash
npm i -S tjb-auth-reset
```

Then in your code:

```JavaScript
import 'tjb-auth-reset';
```

## Useage

```html
<tjb-input></tjb-input>
```

### Attributes

Example:

```html
<tjb-auth-reset
  postbody="{ 'lol': 'rofl' }"
  posturl="/your/api/url"
  mailurl="https://jsonplaceholder.typicode.com/users"
>
  <input
    class="btn btn--cta btn--fs"
    value="SEND"
    type="submit"
    slot="submit"
  />
</tjb-auth-reset>
```

All attributes:

| attribute | example                                              | body                     | description                                                                                                                                                        |
| --------- | ---------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| postbody  | postbody="{ 'foo': 'bar' }"                          | -                        | JSON Object that will be added to the remote reset POSt call.                                                                                                      |
| mailurl   | mailurl="https://jsonplaceholder.typicode.com/users" | { email }                | `URL` that will be called with a `POST` call and an email as `application/json` body. Used to check if email exists/is valid and to send the password reset key to |
| posturl   | posturl="https://jsonplaceholder.typicode.com/users" | { email, password, key } | `URL` that will be called with a `POST` call and new credentials as `application/json` body                                                                        |

### Methods

| method  | example    | description                        |
| ------- | ---------- | ---------------------------------- |
| error   | .error()   | Sets the widget in an error state  |
| success | .success() | Sets the widget in a success state |

### Events

| name     | details                                  | description                                                                                        |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| redirect | - href (@String) <br> - target (@string) | triggered when user clicks on links. For instance `register` link or `forgor` password link.       |
| success  | - resp (@Object)                         | when the reset call returned a success message                                                     |
| error    | - resp (@Object)                         | when the reset call returned an error message                                                      |
| sendmail | - body (@Object)                         | triggered on sendmail request. Hold the body of the potential request (email)                      |
| reset    | - body (@Object)                         | triggered on password reset request. Hold the body of the potential request (email, password, key) |

You can listen to events like so: `tjbreset.addEventListener('reset/success', (e) => { /* do stuff */ })`.

## Styling

Default public values:

```css
:host {
  --reset-color-info: grey;

  /* input */
  --reset-input-color-error: #fa354c;
  --reset-input-color-success: limegreen;
  --reset-input-padding: 10px;
  --reset-input-margin: 0 0 30px 0;
  --reset-input-width: 100%;
  --reset-input-border: 1px solid transparent;
  --reset-input-border-bottom: 1px solid lightgrey;
  --reset-input-border-radius: 0;
  --reset-input-font-size: 1rem;
  --reset-input-info-color: grey;
  --reset-input-info-font-size: 0.8rem;
  --reset-input-label-margin: 0 0 5px 0;

  background: #fff;
  display: block;
  max-width: 350px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  padding: 55px 40px 10px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}
```

These can be overwritten easily by targetting the element. Example:

```css
tjb-auth-reset {
  --reset-input-border: 1px solid lightgrey;
}
```

# Enjoy

[![Typewriter Gif](https://tjb-webcomponents.github.io/html-template-string/typewriter.gif)](http://thibaultjanbeyer.com/)
