
CESON: Commented ECMAScript Object Notation
===========================================
Yet another JSON derivative.
For comparison with others, see [README](../README.md).

CESON is mostly like [JSON][json-spec], but:

  * It will always be a strict subset of ECMAScript.
  * Definition of whitespace and acceptable line endings is inherited from
    the ECMAScript spec, to avoid problems with Unicode line terminators.
    * For increased compatibility, outside of values, CESON parsers should
      ignore characters that are whitespace in JSON but not in ECMAScript.
    * CESON defines "simplespace" as any combination of `\t \r\n`
      (U+0009, U+0020, U+000D, U+000A).
    * A "blank line" is a line that consists entirely of an optional BOM
      (only valid if it's the first line) and optional simplespace.
  * More definitions:
    * "Line text" is the minimal continuous substring of a line that precludes
      it from being a blank line. (Everything except first line BOM, leading
      and trailing simplespace.) Blank lines don't have line text.
    * A "container head" is any bracket character that, in JSON, could mark
      the start of a data container. (At time of writing: `[` and `{`)
      A "container tail" is any bracket character that, in JSON, could mark
      the end of a data container. (At time of writing: `]` and `}`)
  * Line comments and block comments work as in ECMAScript, but with some
    restrictions for easier parsing.
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
      lines or comments, or about what kinds of strings can be concatenated.
      (Read: Expect comments between parts of strings, even in object keys.)
  * Commas at the end of data containers, inside them:
    * The last value in a container may be followed by optional simplespace
      and a comma, if that comma is the last part of line text.
      This comma has no effect on the data in the container.
      (Some old MSIE version used to add an additional `undefined` slot
      to arrays that had a trailing comma after their last value.)
    * For all other cases of commas at the end of data containers, their
      validity and effect is inherited from ECMAScript.



Variant: CESON light
--------------------

  * No block comments.
  * String continuation's plus sign is allowed only at the end of line text.















  [json-spec]: http://www.json.org/
