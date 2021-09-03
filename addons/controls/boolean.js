const boolean = (name, storyObj, config, preferredValue) => {
	if (typeof config === 'string' || config == null) {
		// Config wasn't set, or was omitted, causing the preferredValue to be the last value. Reassignment dipsy-doodle.
		preferredValue = config;
		config = {};
	}

	// If there is no `args` object on the storyObj object
	if (!storyObj.args) {
		storyObj.args = {};
	}

	// If there is no `defaultProps` object on the config object
	if (!config.defaultProps) {
		config.defaultProps = {};
	}

	// Set false for default boolean props that are not defined.
	const defaultValue = config.defaultProps[name] != null ? config.defaultProps[name] : false;

	storyObj.args[name] = preferredValue != null ? preferredValue : defaultValue;
};

export default boolean;
export {boolean};
