import {action as addonAction} from '@storybook/addon-actions';

function action(eventName, include = ['type']) {
	const handler = addonAction(eventName);
	return ev => {
		// Ducktyping for React synthetic event to extract the specified members to improve
		// serialization perf
		if (ev && ev.nativeEvent) {
			ev = Object.keys(ev)
				.filter(key => include.includes(key))
				.reduce((acc, key) => {
					acc[key] = ev[key];

					return acc;
				}, {});
		}

		handler(ev);
	};
}

export default action;
export {action};
