from unittest import TestCase

from tree_sitter import Language, Parser
import tree_sitter_omnetpp_ini


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            Parser(Language(tree_sitter_omnetpp_ini.language()))
        except Exception:
            self.fail("Error loading OMNeT++ INI grammar")
