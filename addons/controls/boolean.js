/* eslint-disable no-shadow */
/*
 * `boolean` is used for `boolean` type control, but instead a `config` object is passed
 * in to determine the default value and possibly other future things!
 *
 * The config object has a `defaultProps` key which is an object with keys that correlate to the
 * `name` argument.
 *
 * Arguments:
 * * name - control/property name string
 * * storyObj - story object that this control would be attached with
 * * config - config object with at least a `defaultProps` key containing a map of props and their default values
 * * preferredValue - (optional) a sample-specific initially selected value
 */

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

	// If there is no `argTypes` object on the storyObj object
	if (!storyObj.argTypes) {
		storyObj.argTypes = {};
	}

	// If there is no `defaultProps` object on the config object
	if (!config.defaultProps) {
		config.defaultProps = {};
	}

	// If there's no group ID but there is a display name, use that for the group ID
	if (config.displayName && !config.groupId) {
		config.groupId = config.displayName;
	}

	// Set false for default boolean props that are not defined.
	const defaultValue = config.defaultProps[name] != null ? config.defaultProps[name] : false;

	storyObj.args[name] = preferredValue != null ? preferredValue : defaultValue;
	storyObj.argTypes[name] = {
		control: {
			type: 'boolean'
		},
		table: {
			category: config.groupId
		}
	};
};

export default boolean;
export {boolean};
