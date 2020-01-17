function loadStories () {
	stories.keys().forEach((filename) => stories(filename));
}

export default loadStories;
export {loadStories};
export * from './propTables.js';
export * from './nullify.js';
export * from './emptify.js';
export * as addons from './addons/index.js';
