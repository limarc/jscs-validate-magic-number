var Checker = require('jscs/lib/checker');
var expect = require('chai').expect;

describe('rules/validate-magic-number', function() {
    var checker;

    beforeEach(function() {
        checker = new Checker();
        checker.registerDefaultRules();
        checker.configure({
            plugins: ['./jscs-plugin'],
            validateMagicNumber: true
        });
    });

    it('should report on an uppercase start of a comment', function() {

    });
});
