<p align="center">
  <img src="skaler.png" alt="skaler" width="150" />
</p>

<p align="center">
  <a href="https://npmjs.org/package/skaler">
    <img src="https://badgen.now.sh/npm/v/skaler" alt="version" />
  </a>
  <a href="https://unpkg.com/skaler">
    <img src="http://img.badgesize.io/https://unpkg.com/skaler/dist/skaler.mjs?compression=gzip" alt="gzip size" />
  </a>
  <a href="https://github.com/terkelg/skaler/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/skaler.svg" alt="license" />
  </a>
  <a href="https://github.com/terkelg/skaler/blob/master/package.json">
    <img src="https://img.shields.io/badge/dependencies-none-ff69b4.svg" alt="dependencies" />
  </a>
</p>

<p align="center"><b>A 329B client-side image resizer</b></p>

Skaler is a simple and small tool to scale images client-side.
It's ideal when all you want to do is to scale user submitted images before uploading to your server.

Save storage space, bandwidth and reduce server load by scaling images client side before uploading.

**~~lack of~~ Features**
- Tiny
- Vanilla JS
- Zero Dependencies


## Install

```
$ npm install skaler
```

This module exposes two module definitions:

* **ES Module**: `dist/skaler.mjs`
* **UMD**: `dist/skaler.umd.js`

Include skaler:
```js
// ES6
import skaler from 'skaler'

// CJS
const skaler = require('skaler');
```

The script can also be directly included from [unpkg.com](https://unpkg.com):
```html
<script src="https://unpkg.com/skaler"></script>
```


## Usage

```js
import skaler from 'skaler';

/**
 * Assume 'input' is the value coming from an input field:
 * <input type="file" accept="image/*" id="input" >
 */

const input = document.getElementById('#input').files[0];

const file = await skaler(input, { scale: 0.5 });
// ~> resized image as a File object - half the size

const file = await skaler(input, { width: 300 });
// ~> resized image as a File object - 300px width

const file = await skaler(input, { width: 300, height: 500 });
// ~> resized image as a File object - stretched to 300x500px

```


## API

### skaler(file, options={})
Returns: `File` <_Promise_>

Reutnrs promise that resolves to the resized [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object.

> **Note**:The new files has an updated ` last modified time` property.

#### file
Type: `File`

[`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object to be resized.
This is what input elements of type `file` returns.

> **Note**: The file is expected to be of type image.

#### options.scale
Type: `number`<br>

Scale based on relative percentage. Example:
```js
let file = await skaler(input, { scale: 0.5 });
// ~> output is half the size of the orignal
```
> **Note**: The `width` and `height` options are ignored if `scale` is provided.

#### options.width
Type: `number`<br>

Scale to a specific width. The file keeps it aspect ratio.
```js
let file = await skaler(input, { width: 200 });
// ~> output is 200px width
```

> **Note**: The image can become stretched if both `width` and `height` are provided at the same time.

#### options.height
Type: `number`<br>

Scale to a specific height. The file keeps it aspect ratio.
```js
let file = await skaler(input, { width: 200 });
// ~> output is 200px width
```

> **Note**: The image can become stretched if both `width` and `height` are provided at the same time.

### options.name
Type: `string`<br>

Rename file during resizing. Defaults to the name of the input [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File).

### options.type
Type: `String`<br>

A `string` representing the `MIME` type of the content that will be put into the file. Defaults to a value of the input [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File).


## Future

I'd plan to optimize for even better performacne and smaller code using `offscreenCanvas` and `workers` in the future as browser support gets better. I also considered `createImageBitmap()` but it's currently not supported in Safari.


## License

MIT © [Terkel Gjervig](https://terkel.com)
