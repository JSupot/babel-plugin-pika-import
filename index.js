
module.exports = function ({ types: t }) {

  function transCamel(_str, symbol) {
    const str = _str[0].toLowerCase() + _str.substr(1);
    return str.replace(/([A-Z])/g, $1 => `${symbol}${$1.toLowerCase()}`);
  }

  function buildImportDeclaration(specifier, source, specifierType) {
    const specifierList = [];

    if (specifier) {
      if (specifierType === 'default') {
        specifierList.push(
          t.importDefaultSpecifier(specifier.imported)
        );
      } else {
        specifierList.push(
          t.importSpecifier(specifier.imported)
        );
      }
    }

    return t.importDeclaration(
      specifierList,
      t.stringLiteral(source)
    );

  }

  return {
    visitor: {
      ImportDeclaration(path, { opts }) {
        const { node } = path;
        const { source, specifiers } = node;

        if (source.value !== 'antd') {
          return;
        }

        if (t.isImportDefaultSpecifier(specifiers[0])) {
          return;
        }

        var outputNodes = [];

        specifiers.forEach(specifier => {
          outputNodes.push(
            buildImportDeclaration(specifier, `antd/es/${transCamel(specifier.imported.name, '-')}`, 'default')
          );

          outputNodes.push(
            buildImportDeclaration(null, `antd/es/${transCamel(specifier.imported.name, '-')}/style/css.js`)
          );

        });

        path.replaceWithMultiple(outputNodes);

      }

    }
  };
}