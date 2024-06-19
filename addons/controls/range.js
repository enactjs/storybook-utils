/*
 * `range` is used for `range` type control, but instead a `config` object is passed in to
 * determine the default value and possibly other future things!
 *
 * The config object has a `defaultProps` key which has keys that correlate to the `name` argument.
 *
 * Arguments:
 * * name - control/property name string
 * * storyObj - story object that this control would be attached with
 * * config - config object with at least a `defaultProps` key containing a map of props and their default values
 * * opts - range-specific control options (opts from the standard Controls docs)
 * * preferredValue - (optional) a sample-specific initially selected value
 * * otherOpts - (optional) options specifying argTypes excluding the `control` and `table` keys
 */

const range = (name, storyObj, config, opts, preferredValue, otherOpts) => {
	if (typeof opts === 'number') {
		// opts was omitted, causing the preferredValue to be the last value. Reassignment dipsy-doodle.
		preferredValue = opts;
		opts = {};
	}
	if (typeof config === 'number' || typeof config === 'string' || config == null) {
		// Config wasn't set, or was omitted, causing the preferredValue to be the last value. Reassignment dipsy-doodle.
		preferredValue = config;
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
	let defaultProps = config.defaultProps;
	if (!defaultProps) {
		defaultProps = {};
	}

	// If there is no `otherOpts` object
	if (!otherOpts) {
		otherOpts = {};
	}

	storyObj.args[name] = preferredValue != null ? preferredValue : defaultProps[name];
	storyObj.argTypes[name] = {
		control: {
			type: 'range',
			...opts
		},
		table: {
			category: config.groupId
		},
		...otherOpts
	};
};

export default range;
export {range};
