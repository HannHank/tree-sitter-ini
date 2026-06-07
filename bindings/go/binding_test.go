package tree_sitter_omnetpp_ini_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_omnetpp_ini "github.com/hannhank/tree-sitter-ini/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_omnetpp_ini.Language())
	if language == nil {
		t.Errorf("Error loading OMNeT++ INI grammar")
	}
}
