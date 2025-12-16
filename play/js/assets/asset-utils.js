export function normalizeModules(modules) {
  return Object.fromEntries(
    Object.entries(modules).map(([path, value]) => {
      const name = path
        .split('/')
        .pop()          // bg1.jpg
        .replace(/\.\w+$/, ''); // bg1
      return [name, value];
    })
  );
}