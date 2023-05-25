import CodeMirror from "codemirror";

CodeMirror.defineMode("regex", function () {
    var regexp = /\/(?:(\\.)|[^\/\n])+\/[gimy]*/;
    var wordRegex = /[^\W\d]+/;

    return {
        startState: function () {
            return {
                inString: false
            };
        },
        token: function (stream, state) {
            if (stream.match(regexp)) {
                return "regex";
            }
            if (stream.match(wordRegex)) {
                return null;
            }
            stream.next();
            return null;
        }
    };
});

CodeMirror.defineMIME("text/x-regex", "regex");