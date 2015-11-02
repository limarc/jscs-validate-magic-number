var assert = require('assert');
module.exports = function() {};

module.exports.prototype = {
    configure: function(options) {
        assert(
            options === true,
            this.getOptionName() + ' option requires a true value or should be removed'
        );
    },

    getOptionName: function() {
        return 'validateMagicNumber';
    },

    check: function(file, errors) {
        var allow = ['setTimout', 'setInterval'],
            allowNotOperator = ['%'];

        file.iterateNodesByType(['BinaryExpression'], function(node) {
            var isMemberExpression = false,
                errorPosition = false,
                allowProperty = ['indexOf', 'length'];

            if (allowNotOperator.indexOf(node.operator) !== -1) {
                return;
            }

            ['left', 'right'].forEach(function(p) {
                    var position = node[p];

                    if (['Literal', 'UnaryExpression'].indexOf(position.type) !== -1) {
                        var value = position.value,
                            isCost = findConst(node);

                        if (position.type === 'UnaryExpression' && typeof position.argument.value === 'number') {
                            value = parseFloat(position.operator + position.argument.value);
                        }

                        if (typeof value === 'number' && value !== 0 && !isCost) {
                            errorPosition = {
                                value: value,
                                loc: position.loc
                            };
                        }
                    }

                    if (position.type === 'MemberExpression') {
                        if (allowProperty.indexOf(position.property.name) !== -1) {
                            isMemberExpression = true;
                        }
                    }

                    if (position.type === 'CallExpression') {
                        var propertyName = position.callee.property ? position.callee.property.name : position.callee.name;

                        if (allowProperty.indexOf(propertyName) !== -1) {
                            isMemberExpression = true;
                        }
                    }
                });

            if (!isMemberExpression && errorPosition) {
                errors.add('Use constant instead of ' + errorPosition.value, errorPosition.loc.start);
            }
        });

        file.iterateNodesByType(['CallExpression'], function(node) {
            if (allow.indexOf(node.callee.name) !== -1) {
                node.arguments.forEach(function(arg) {
                    if (arg.type === 'Literal' && typeof arg.value === 'number') {
                        errors.add('Use constant instead of ' + arg.value, arg.loc.start);
                    }
                });
            }
        });

        function findConst(node) {
            if (!node.parentNode || typeof node.kind !== 'undefined' && node.kind !== 'const') {
                return false;
            }

            if (node.type === 'VariableDeclaration' && node.kind === 'const') {
                return true;
            }

            return findConst(node.parentNode);
        }
    }
};
