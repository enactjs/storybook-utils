const select = (name, storyObj, items, config, selectedValue) => {
	const defaultString = ' (Default)';
	const labels = {};

	if (typeof config === 'string' || config == null) {
		// Config wasn't set, or was omitted, causing the selectedValue to be the last value. Reassignment dipsy-doodle.
		selectedValue = config;
		config = {};
	}

	// If there is no `args` object on the storyObj object
	if (!storyObj.args) {
		storyObj.args = {};
	}

	// If there is no `argTypes` object on the storyObj object
	if (!storyObj.argTypes) {
		storyObj.argTypes = {};
	}

	// If there's no group ID but there is a display name, use that for the group ID
	if (config.displayName && !config.groupId) {
		config.groupId = config.displayName;
	}

	// If there is no `defaultProps` object on the config object
	if (!config.defaultProps) {
		config.defaultProps = {};
	}

	const defaultAppender = (key, label = key) => {
		return (key || ' ') + (config.defaultProps[name] === label ? defaultString : '');
	};

	if (items instanceof Array) {
		// An array of items
		items.forEach(item => {
			labels[defaultAppender(item)] = item;
		});
	} else {
		// Items is an object
		for (const item in items) {
			labels[defaultAppender(item, items[item])] = items[item];
		}
	}

	storyObj.args[name] = selectedValue != null ? selectedValue : config.defaultProps[name];
	storyObj.argTypes[name] = {
		options: labels,
		control: {
			type: 'select'
		},
		table: {
			category: config.groupId
		}
	};
};

export default select;
export {select};
