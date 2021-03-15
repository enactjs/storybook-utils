import {button as buttonKnob} from '@storybook/addon-knobs';
import nullify from '../../nullify';

/* eslint-disable no-shadow */
/*
 * `button` is used just like the standard `button` knob, but instead a `Config` object is passed
 * in to determine the default value and possibly other future things! Values are automatically
 * nullified if they're blank (empty strings).
 *
 * The config object has a `defaultProps` key which is an object with keys that correlate to the
 * `name` argument.
 *
 * Arguments:
 * * knob/property name string
 * * Config object with at least a `defaultProps` key containing a map of props and their default values
 * * (Optional) a sample-specific initially selected value
 */

const button = (name, callback, Config, preferredValue) => {
	if (typeof Config === 'string' || Config == null) {
		// Config wasn't set, or was omitted, causing the preferredValue to be the last value. Reassignment dipsy-doodle.
		preferredValue = Config;
		Config = {};
	}

	// If there is no `defaultProps` object on the Config object
	if (!Config.defaultProps) {
		Config.defaultProps = {};
	}

	// If there's no group ID but there is a display name, use that for the group ID
	if (Config.displayName && !Config.groupId) {
		Config.groupId = Config.displayName;
	}

	return nullify(buttonKnob(name, callback, preferredValue || Config.defaultProps[name], Config.groupId));
};

export default button;
export {button};
