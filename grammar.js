module.exports = grammar({
  name: "omnetpp_ini",

  // automatically handle horizontal whitespace
  extras: ($) => [/[ \t]/],

  rules: {
    source_file: ($) => repeat(choice($._statement, $.comment, /\r?\n/)),

    _statement: ($) =>
      seq(
        choice($.section_heading, $.include_directive, $.setting),
        optional($.comment),
        choice(/\r?\n/, "\0"),
      ),

    comment: ($) => /#.*/,

    section_heading: ($) =>
      choice(
        seq("[", "General", "]"),
        seq(
          "[",
          choice("Config", "config"),
          /[ \t]+/,
          field("name", $.section_identifier),
          "]",
        ),
      ),

    section_identifier: ($) => /[^\]\n\r]+/,

    include_directive: ($) =>
      seq("include", /[ \t]+/, field("path", $.include_path)),

    include_path: ($) => choice(/[^\s#"]+/, $.string_literal),

    setting: ($) =>
      seq(
        field("name", choice($.keyword_name, $.setting_name)),
        "=",
        field("value", optional($.setting_value)),
      ),

    keyword_name: ($) =>
      choice(
        "network",
        "extends",
        "description",
        "fallback-to",
        "experiment",
        "measurement",
        "replication",
        "repeat",
        "seed-set",
        "sim-time-limit",
        "cpu-time-limit",
        "real-time-limit",
        "warmup-period",
        "simtime-resolution",
        "simtime-scale", // deprecated
        "warnings",
        "debug-on-errors",
        "print-undisposed",
        "parameter-mutability-check",
        "debugger-attach-on-startup",
        "debugger-attach-on-error",
        "debugger-attach-command",
        "debugger-attach-wait-time",
        "check-signals",
        "debug-statistics-recording",
        "result-dir",
        "record-eventlog",
        "eventlog-file",
        "fingerprint",
        "record-scalar-results",
        "output-scalar-file",
        "output-scalar-file-append",
        "output-scalar-precision",
        "scalar-recording",
        "bin-recording",
        "param-recording",
        "record-vector-results",
        "output-vector-file",
        "output-vector-file-append",
        "output-vector-precision",
        "vector-recording",
        "vector-record-empty",
        "vector-record-eventnumbers",
        "vector-recording-intervals",
        "output-vectors-memory-limit",
        "vector-buffer",
        "parallel-simulation",
        "parsim-num-partitions",
        "partition-id",
        "image-path",
        "fname-append-host",
        "ned-path",
        "ned-package-exclusions",
        "total-stack",
        "scheduler-class",
        "parsim-communications-class",
        "parsim-synchronization-class",
        "eventlogmanager-class",
        "outputvectormanager-class",
        "outputscalarmanager-class",
        "snapshotmanager-class",
        "futureeventset-class",
        "fingerprintcalculator-class",
        "rng-class",
        "num-rngs",
        "load-libs",
        "configuration-class",
        "user-interface",
      ),

    // do not allow to start with [ in order to avoid confusions with section headings
    setting_name: ($) => /[a-zA-Z0-9_.*-]+[a-zA-Z0-9_.*\[\]-]*/,

    setting_value: ($) =>
      repeat1(
        choice(
          $.xml_function,
          /[^#\n\\"()]+/,  
          "(",             
          ")",             
          /\\[ \t]*(\r?\n)?/,
          $.string_literal,
        ),
      ),
    xml_function: ($) =>
      seq(
        "xml",
        repeat(/[ \t]+/), 
        "(",
        optional(
          seq(
            repeat(choice(/[ \t]+/, /\\[ \t]*\r?\n/)),
            field("xml_content", $.string_literal),
          ),
        ),
        repeat(choice(/[ \t]+/, /\\[ \t]*\r?\n/)),
        ")",
      ),

    string_literal: ($) => /"[^"\\]*(?:\\[\s\S][^"\\]*)*"/,
  },
});
