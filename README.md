Synapsian.js
============

The Synapscript reimplemented with [Web Components]. Created mostly as a
toy project of sorts for experimenting with the aforementioned technology.

This script allows one to insert into webpages fragments of the
[Synapsian language] with the use of the following notation:

![Notation](https://github.com/Solitai7e/Synapsian.js/raw/master/notation.png)


## Usage ##

Copy the files `synapsian.js`, `synapsian.css` and `synapsian.ttf` to
any directory on your webserver (they must all be in the same directory).

Then, to enable Synapsian support for a page, modify your HTML as follows:
```html
<head>
    <!-- ... -->
    <script src="path/to/synapsian.js"></script>
    <!-- ... -->
</head>
```

Assuming the above steps were performed correctly, tags such as
the following should now appear as their equivalent Synapsian:
```html
<syn->G,SbAN,SnNN,ScNN,SZNN;G,TWNN,TCNN</syn->
<syn->G,TWNN,TCNN;B,FbAN;B,FINN</syn->
```
*Note that phrasing content tags such as `<i>` and `<s>`
 currently do not function within those custom elements.*

[Demo](https://solitai7e.github.io/Synapsian.js/)


[Web Components]: https://developer.mozilla.org/en-US/docs/Web/Web_Components
[Synapsian language]: https://systemspace.github.io/Synapsian/
