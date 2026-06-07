"[" @punctuation.bracket
"]" @punctuation.bracket
(section_heading "Config" @keyword)
(section_heading "config" @keyword)
(section_heading "General" @keyword)
(section_identifier) @type
(keyword_name) @keyword
(setting_name) @property
"=" @operator
(string_literal) @string
(comment) @comment
(xml_function "xml" @function.builtin)
(xml_function "(" @punctuation.bracket)
(xml_function ")" @punctuation.bracket)
