module.exports = function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.find(j.CallExpression, {
    callee: {
      object: {
        name: 'goog'
      },
      property: {
        name: 'isNull'
      }
    }
  }).replaceWith(p =>
    j.binaryExpression('===', p.node.arguments[0], j.literal(null))
  );

  return root.toSource();
}
