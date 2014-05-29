
## shakescript [![NPM version]()]

(A shakespearean take on Javascript)

This is a  compile-to-JS language, which uses shakespearean language. It's based off of dogescript by Zach Bruggeman. Wow. 

A note posted in the original readme:

And yes, I am very aware I went about a very, er, *non-conventional*, way of parsing a language, and is probably riddled with bugs and edge-cases. However, this is dogescript, so anything goes!




### Installation

`npm install -g shakescript`

### Usage

#### Command Line

`shakescript` without a file launches a REPL.

`shakescript location/to/shakescript.sjs` pipes the result to stdout. Use a command like `shakescript shakescript.sjs > compiled.js` to save to a file.

Options:

* `--beautify` - Runs the code through a beautifier.
* `--true-doge` - Implements "true doge" mode, which splits lines by 3 spaces, instead of by newlines. This stays behind a flag until the spacing it exports is identical to non-true-doge mode.

#### Javascript

`shakescript(file, beauty, trueDoge)`
* `file` - A string of Dogescript.
* `beauty` - A boolean, set to true if you want the output to be ran through a beautifier.
* `trueDoge` - A boolean, set to true if you want to enable true-doge mode.
