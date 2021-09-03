const text = (name, storyObj, config, preferredValue) => {
	if (typeof config === 'string' || config == null) {
		// Config wasn't set, or was omitted, causing the preferredValue to be the last value. Reassignment dipsy-doodle.
		preferredValue = config;
		config = {};
	}

	// If there is no `args` object on the storyObj object
	if (!storyObj.args) {
		storyObj.args = {};
	}

	// If there is no `defaultProps` object on the Config object
	if (!config.defaultProps) {
		config.defaultProps = {};
	}

	storyObj.args[name] = preferredValue != null ? preferredValue : config.defaultProps[name];
};

export default text;
export {text};
