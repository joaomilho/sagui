import { readFileSync, writeFileSync } from 'fs';


export function isInstalled (packageJSONPath) {
  const packageJSON = read(packageJSONPath);
  return !!Object.keys(packageJSON.devDependencies || {})
                 .find(key => key === 'sagui');
}


export function update (packageJSONPath) {
  const packageJSON = read(packageJSONPath);
  Object.assign(packageJSON.scripts, defaultScripts);
  write(packageJSONPath, packageJSON);
}


function read (packageJSONPath) {
  const blob = readFileSync(packageJSONPath);
  return JSON.parse(blob);
}


function write (packageJSONPath, packageJSON) {
  writeFileSync(packageJSONPath,
                JSON.stringify(packageJSON, null, 2));
}


const defaultScripts = {
  'sagui:test': 'sagui test',
  'sagui:develop': 'sagui develop',
  'sagui:build': 'sagui build',
  'sagui:dist': 'sagui dist'
};