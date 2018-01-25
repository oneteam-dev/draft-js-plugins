const fs = require('fs');
const packageJson = require('../package.json');
const { _: arg } = require('minimist')(process.argv.slice(2));

fs.writeFileSync(
  './package.json',
  JSON.stringify(
    Object.assign({}, packageJson, {
      name: `@sugarshin/${packageJson.name}`,
      version: arg[0],
    }),
    null,
    2
  )
);

console.log('Successfully package.json updated.');
