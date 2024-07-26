import {configureActions as addonConfigureActions} from '@storybook/addon-actions';

const configureActions = opts => {
	return addonConfigureActions({
		// TODO: Set to limit of 200 is a workaround. We need to update event display to sort in latest order.
		// Limit the number of items logged into the actions panel
		limit: 200,
		...opts
	});
};

export default configureActions;
export {configureActions};
