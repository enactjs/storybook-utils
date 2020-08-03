function loadStories(stories) {
	return () => stories.keys().forEach(filename => stories(filename));
}

export default loadStories;
export {loadStories};
export * from './propTables';
export * from './nullify';
export * from './emptify';
export * as addons from './addons';
