"[" @punctuation.bracket
"]" @punctuation.bracket
(section_heading "General" @keyword)
(section_heading type: _ @keyword)
(section_word) @entity.name.class
(keyword_name) @keyword
(setting_name) @property
"=" @operator
(string_literal) @string
(comment) @comment
(xml_function "xml" @function.builtin)
(xml_function "(" @punctuation.bracket)
(xml_function ")" @punctuation.bracket)
