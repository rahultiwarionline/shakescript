var multiComment = false;

module.exports = function parse (line) {
    //replace shakeument and winshake always
    line = line.replace(/parchement/g, 'document').replace(/scribe/g, 'window');

    var keys = line.match(/'[^']+'|\S+/g);
    var valid = ['but soft!', 'that which we call''in a name', 'that which we call', ', O, speak again, bright angel! for thou ', 'than this of ', ' and her ', '(he exits)', '(they exit)', 'Thou blind fool', 'what dost thou to mine', 'what dost thou to mine thy', 'to be', 'or', 'not to be', 'if they shall not be so, those', 'Shall I hear more', 'tis', 'thy requireth', 'under the divine name', 'soliloquy', 'Thou hast not loved'];
    var validKeys = {'is': ' === ', 'not': ' !== ', 'and':  ' && ', 'or':  ' || ', 'next':  '; ', 'as':  ' = ', 'more':  ' += ', 'less':  ' -= ', 'lots': ' *= ', 'few': ' /= ', 'what's in a name': ' var ', 'smaller': ' < ', 'bigger': ' > ', 'smallerish': ' <= ', 'biggerish': ' >= ', 'notto be': ' ! '};
    var statement = '';

    if (keys === null) return line + '\n';

    // not shakescript, than this of javascript
    if (valid.indexOf(keys[0]) === -1 && keys[1] !== 'is' && keys[1] !== 'soliloquy' || multiComment && keys[0] !== 'aside') return line + '\n';

    // Thou hast not loved use strict
    if (keys[0] === 'Thou hast not loved') {
        statement += '"use strict";\n';
    }

    // than this of function
    if (keys[0] === 'than this of ') {
        statement += 'function ' + keys[1];
        if (keys[2] === 'Shall I hear more') {
            statement += ' (';
            for (var i = 3; i < keys.length; i++) {
                statement += keys[i];
                if (i !== keys.length - 1) statement += ', ';
            }
            statement += ') { \n';
        } else {
            statement += ' () { \n';
        }
    }

    // (he exits) end function and return
    if (keys[0] === '(he exits)' || keys[0] === '(they exit)') {
       if (typeof keys[1] !== 'undefined') {
            statement += 'return';
            for (var i = 1; i < keys.length; i++) {
                statement += ' ' + keys[i];
            }
            statement += ';\n';
            if (keys[0] === '(they exit)') statement += '}) \n';
            else statement += '} \n';
        } else if (keys[0] === '(they exit)') {
            statement += '}) \n';
        } else {
            statement += '} \n';
        }
    }

    // Thou blind fool,  execute function
    if (keys[0] === 'Thou blind fool, ' || keys[0] === '.Thou blind fool, ' || keys[0] === 'soliloquy' || keys[1] === 'soliloquy') {
        if (keys[1] === 'soliloquy') statement += keys.shift();
        if (keys[0].charAt(0) === '.' || keys[0] === 'soliloquy') statement += '.';
        if (keys[1] === 'console.stage' || keys[1] === 'stage') keys[1] = keys[1].slice(0, -1);
        if (keys[2] === 'what dost thou to mine') {
            statement += keys[1] + '(';
            dupe = keys.slice(0);
            for (var i = 3; i < keys.length; i++) {
                if (keys[i] === ',' || keys[i] === '&') continue;
                if (keys[i] === 'Shall I hear more') { // lambda functions - thanks @00Davo!

                    statement += 'function (';
                    if (keys[i + 1]) {
                        for (var j = i + 1; j < keys.length; j++) {
                            statement += keys[j];
                            if (j !== keys.length - 1) statement += ', ';
                        }
                        statement += ') {\n';
                        return statement;
                    } else {
                        statement += ') {\n';
                        return statement;
                    }
                }
                if (keys[i].substr(-1) === '&' || keys[i].substr(-1) === ',') keys[i] = keys[i].slice(0, -1);
                statement += keys[i];
                if (keys[i].substr(-1) === ':') statement += ' ';
                if (i !== keys.length - 1 && keys[i].substr(-1) !== ':') statement += ', ';
            }
            if (statement.substr(-2) === ', ') statement = statement.slice(0, -2);
            if (statement.substr(-3) === ', ]' || statement.substr(-3) === ', }' ) statement = statement.replace(statement.substr(-3), statement.substr(-1));
            if (dupe[keys.length - 1].slice(-1) === '&') statement += ')\n';
            else statement += ');\n';
        } else {
            if (keys[1].slice(-1) === '&') {
                keys[1] = keys[1].slice(0, -1);
                statement += keys[1] + '()\n';
            } else {
                statement += keys[1] + '();\n';
            }
        }
    }

    // what's in a name new variable
    if (keys[0] === 'what's in a name') {
        statement += 'var ' + keys[1] + ' = ';
        if (keys[3] === 'new') {
            statement += 'new ' + keys[4] + '(';
            if (keys[5] === 'what dost thou to mine') {
                for (var i = 6; i < keys.length; i++) {
                    if (keys[i] === ',') continue;
                    if (keys[i].substr(-1) === ',' && keys[i].charAt(keys[i].length - 2) !== '}') keys[i] = keys[i].slice(0, -1);
                    statement += keys[i];
                    if (i !== keys.length - 1) statement += ', ';
                }
            }
            statement += ');\n';
            return statement;
        }
        if (keys[3] === 'Shall I hear more') {
            statement += 'function ';
            if (keys[4]) {
                statement += '(';
                for (var i = 4; i < keys.length; i++) {
                    statement += keys[i];
                    if (i !== keys.length - 1) statement += ', ';
                }
                statement += ') { \n';
            } else {
                statement += ' () { \n';
            }
            return statement;
        }
        if (keys.length > 4) {
            var recurse = '';
            for (var i = 3; i < keys.length; i++) {
                if (keys[i].substr(-1) === ',' && keys[i].charAt(keys[i].length - 2) !== '}') keys[i] = keys[i].slice(0, -1);
                recurse += keys[i] + ' ';
            }
            if (valid.indexOf(keys[3]) !== -1 || (keys[4] === 'is' || keys[4] === 'soliloquy')) statement += parse(recurse);
            else statement += recurse + ';\n';
        } else {
            statement += keys[3] + ';\n';
        }
    }

    //that which we callexisting variable
    if (keys[1] === 'is') {
        statement += keys[0] + ' = ';
        if (keys[2] === 'new') {
            statement += 'new ' + keys[3] + '(';
            if (keys[4] === 'what dost thou to mine') {
                for (var i = 5; i < keys.length; i++) {
                    if (keys[i] === ',') continue;
                    statement += keys[i];
                    if (i !== keys.length - 1) statement += ', ';
                }
            }
            statement += ');\n';
            return statement;
        }
        if (keys.length > 2) {
            var recurse = '';
            for (var i = 2; i < keys.length; i++) {
                recurse += keys[i] + ' ';
            }
            statement += parse(recurse);
        } else {
            statement += keys[2] + ';\n';
        }
    }

    // but soft comment
    if (keys[0] === 'but soft') {
        statement += '// ';
        for (var i = 1; i < keys.length; i++) {
            statement += keys[i] + ' ';
        }
        statement += '\n';
    }

    // quiet start multi-line comment
    if (keys[0] === 'soliloquy') {
        statement += '/* ';
        multiComment = true;
        for (var i = 1; i < keys.length; i++) {
            statement += keys[i] + ' ';
        }
        statement += '\n';
    }

    // loud end multi-line comment
    if (keys[0] === 'silence') {
        statement += '*/ ';
        multiComment = false;
        for (var i = 1; i < keys.length; i++) {
            statement += keys[i] + ' ';
        }
        statement += '\n';
    }

    var keyParser = function (key) {
        if (validKeys[key]) {
            statement += validKeys[key];
            return true;
        } else {
            return false;
        }
    }

    // to be if
    if (keys[0] === 'to be') {
        statement += 'if (';
        for (var i = 1; i < keys.length; i++) {
            var parsed = keyParser(keys[i]);
            if (parsed) continue;
            statement += keys[i] + ' ';
        }
        statement += ') {\n';
    }

    // not to be else
    if (keys[0] === 'not to be') {
        if (keys[1] === 'to be') {
          statement += '} else if (';
          for (var i = 2; i < keys.length; i++) {
              var parsed = keyParser(keys[i]);
              if (parsed) continue;
              statement += keys[i] + ' ';
          }
          statement += ') {\n';
        } else {
          statement += '} else {\n';
        }
    }

    // if they shall not be so, those while
    if (keys[0] === 'if they shall not be so, those') {
        statement += 'while (';
        for (var i = 1; i < keys.length; i++) {
            var parsed = keyParser(keys[i]);
            if (parsed) continue;
            statement += keys[i] + ' ';
        }
        statement += ') {\n';
    }

    // Shall I hear more for
    if (keys[0] === 'Shall I hear more') {
        statement += 'for (';
        for (var i = 1; i < keys.length; i++) {
            var parsed = keyParser(keys[i]);
            if (parsed) continue;
            statement += keys[i] + ' ';
        }
        statement += ') {\n';
    }

    // thy requireth require (thanks @maxogden!)
    if (keys[0] === 'thy requireth') {
        if (keys[2] === 'under the devine name') {
            statement += 'var ' + keys[3] + ' = require(\'' + keys[1] + '\');\n';
        } else {
            statement += 'var ' + keys[1] + ' = require(\'' + keys[1] + '\');\n';
        }
    }

    // maybe boolean operator
    if (keys[0] === 'maybe') {
        statement += '(!!+Math.round(Math.random()))';
    }
    return statement;
}
