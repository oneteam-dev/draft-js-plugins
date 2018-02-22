const fs = require('fs');
const path = require('path');

const [scope, version] = process.argv.slice(2);
const packageJson = require( // eslint-disable-line import/no-dynamic-require
  path.resolve(process.cwd(), 'package.json')
);

fs.writeFileSync(
  path.resolve(process.cwd(), 'package.json'),
  JSON.stringify(
    Object.assign({}, packageJson, {
      name: `@${scope}/${packageJson.name}`,
      version,
    }),
    null,
    2
  )
);

console.log(`Successfully ${packageJson.name} package.json updated.`);
