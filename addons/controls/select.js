import nullify from '../../nullify';

/* eslint-disable no-shadow */
/*
 * `select` is used for `select` type control, but instead a `config` object is passed in to
 * determine the default value and possibly other future things!
 *
 * The config object has a `defaultProps` key which is an object with keys that correlate to the
 * `name` argument.
 *
 * Arguments:
 * * name - control/property name string
 * * storyObj - story object that this control would be attached with
 * * items - collection of selectable values, array or object/hash
 * * config - config object with at least a `defaultProps` key containing a map of props and their default values
 * * selectedValue - (optional) a sample-specific initially selected value
 */

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
		return (key || ' ') + (config.defaultProps[name] === label && key ? defaultString : '');
	};

	if (items instanceof Array) {
		// An array of items
		items.forEach(item => {
			labels[defaultAppender(item)] = nullify(item);
		});
	} else {
		// Items is an object
		for (const item in items) {
			labels[defaultAppender(item, items[item])] = nullify(items[item]);
		}
	}

	storyObj.args[name] = defaultAppender(selectedValue != null ? selectedValue : config.defaultProps[name]);
	storyObj.argTypes[name] = {
		options: Object.keys(labels),
		mapping: labels,
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
