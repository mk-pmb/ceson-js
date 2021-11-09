
CESON: Commented ECMAScript Object Notation
===========================================

(Spec version: 1.1)

Yet another JSON derivative.
For comparison with others, see [README](../README.md).

CESON is mostly like [JSON][json-spec], but:

  * It will always be a strict subset of ECMAScript version 3.
  * Definition of whitespace and acceptable line endings is inherited from
    the ECMAScript spec, to avoid problems with Unicode line terminators.
    * For increased compatibility, outside of values, CESON parsers should
      ignore characters that are whitespace in JSON but not in ECMAScript.
    * CESON defines "simplespace" as any combination of `\t \r\n`
      (U+0009, U+0020, U+000D, U+000A).
    * A "blank line" is a line that consists entirely of an optional BOM
      (only valid if it's the first line of input) and optional simplespace.
  * More definitions:
    * "Line text" is the minimal continuous substring of a line that precludes
      it from being a blank line.
      (Everything except first line BOM, leading and trailing simplespace.)
      Blank lines don't have line text.
    * To "ignore" parts of the input text means to pretend it had not been
      there in the first place.
      * Ignoring can cause adjacent simplespace to no longer be part of
        line text.
      * Ignoring can cause a line to effectively become a blank line.
      * Ignoring is defined in regards to the data payload representation.
        Parsers may of course collect any kind of auxiliary information about
        their encounters, and may report that auxiliary information separately.
    * A "container head" is any bracket character that, in JSON, could mark
      the start of a data container. (At time of writing: `[` and `{`)
      A "container tail" is any bracket character that, in JSON, could mark
      the end of a data container. (At time of writing: `]` and `}`)
    * A "basic letter" is any letter from the "Basic Latin" Unicode block
      (`A`..`Z`, `a`..`z`).
    * A "decimal digit" is any digit from the "Basic Latin" Unicode block
      (`0`..`9`).
    * A "raw identifier" is a basic letter, followed by any combination
      of basic letters, decimal digits, and/or `_` (U+005F low line).
  * Line comments and block comments work as in ECMAScript, but with some
    restrictions for easier parsing.
    * CESON-valid comments must be ignored.
    * In lines where a comment starts, line text in front of that line's
      first comment is restricted to any combination of simplespace, commas,
      container heads, and container tails.
    * The end of each block comment can be followed by optional simplespace,
      after which it must be followed by either:
      * end of line (comment is the last part of line text), or
      * start of another block comment, or
      * any combination of simplespace, commas, and container tails.
  * You can continue a string in a new line by adding its parts with the plus
    operator (`+`).
    * The plus sign has to be on the same line as one of the string parts.
    * The plus sign is allowed only at the start or end or on both sides of
      line text. (Read: not in the middle.)
    * String continuation does not impose any implicit limits about blank
      lines or comments. (Read: Expect comments between parts of strings.)
    * Although string concatenation in object keys is invalid (not valid in
      ES3), parsers may optionally support it.
  * Commas at the end of data containers, inside them:
    * The last value in a container may be followed by optional simplespace
      and a comma, if that comma is the last part of line text.
      This comma has no effect on the data in the container.
      (Some old MSIE version used to add an additional `undefined` slot
      to arrays that had a trailing comma after their last value.)
    * For all other cases of commas at the end of data containers, their
      validity and effect is inherited from ECMAScript.
  * Wrapper code compatibility (JSONP, CommonJS, AMD, ESM):
    * Only in the first line of input, in this order:
      1.  Parsers may optionally check early whether the line is a blank line,
          and if so, skip the next rules, because they won't match anyway.
      1.  If line text starts with the word `export`,
          followed by at least one simplespace, then a raw identifier, and
          then another simplespace, parsers may optionally ignore this part.
      1.  A "data start marker" is any of both characters
          `(` (U+0028 left parenthesis) and `=` (U+003D equals sign).
          If line text starts with a basic letter
          and contains at least one data start marker,
          line text is ignored from its start up to and including the first
          data start marker.
    * Only in the last non-blank line of input: Any combination of
      `)` (U+0029 right parenthesis) and/or `;` (U+003B semicolon)
      at the end of line text is ignored.



Variant: CESON light
--------------------

  * No block comments.
  * String continuation's plus sign is allowed only at the end of line text.















  [json-spec]: http://www.json.org/
