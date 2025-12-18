/**
 * Strips the file path and file extension from each key.
 * Watch out for collisions, as files with the same name and extension will overwrite eachother.
 * @param {object} modules 
 * @returns {object}
 */
export function normalizeModules(modules) {
  return Object.fromEntries(
    Object.entries(modules).map(([path, value]) => {
      const name = path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '');
      return [name, value];
    })
  );
}