import XCTest
import SwiftTreeSitter
import TreeSitterOmnetppIni

final class TreeSitterOmnetppIniTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_omnetpp_ini())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading OMNeT++ INI grammar")
    }
}
