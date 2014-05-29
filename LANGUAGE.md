## shakescript spec (0.0.1)

### notes

* shakescript uses single quotes for strings. Double quotes are not supported.
* shakesscript uses 4 space characters for indentation. Tabs are not supported.
* shakesscript seperates statements by newlines by default. In true-speare mode, they are separated by 3 spaces.

### files

shakescript files are `.sjs`. Should shakescript be ported to other languages, the `js` portion may be changed to reflect the new language. 

### language

* `but soft! [comment]` - `// [comment]` 
* `what's in a name [var] that which we call [value]` - `var [var] = [value]`
* `[var], O, speak again, bright angel! for thou [value]` - `[var] = [value]`
* `than this of [name] and her [variables]` - `function [name] ([variables])`
* `(he exits)` - `}`
* `(they exit)` - `})`
* 
* `Thou blind fool, [function] what dost thou to mine [variables]` - `[function]([variables])`
* `Thou blind fool, [function] what dost thou to mine [variables..] with thy [arguments]` - `[function]([variables..], function ([arguments]) {})`
* 
* `to be [params]` - `if ([params])`
* `or [params]` - `else if ([params])`
* `not to be` - `else`
* 
* 
* `if they shall not be so, those [params]` - `if (! [params])`
* `Shall I hear more [params]` - `while ([params])`
* `tis [params]` - `for ([params])`
* 
* `thy requireth [module]` - `var [module] = require([module])`
* `thy requireth [module] under the devine name [name]` - `var [name] = require([module])`
* 
* `soliloquy` - `.` (example: `console soliloquy stage with 'what light through yonder...' => console.log('what light through yonder...')`)
* `Thou hast not loved` - `"use strict"`

### operators

Used in `many`, `much` and `rly`.

* `abhor` - `!==`
* `shares a soul with` - `===`
* `and` - `&&`
* `or` - `||`
* `;` - `; `
* `as` - `=`
* `incrementing to the heavens` - `+=`
* `falling to the pits of inferno` - `-=`
* `lots` - `*=`
* `few` - `/=`
* `hath grander` - `>`
* `lacks the stature of thy` - `<`
* `with the moon it may be larger` - `>=`
* `on a fornight, may be smaller than` - `<=`

### standard objects

* `console.soliloquy` - `console.log`
* `parchement` - 'document'
* `scribe` - `window`
