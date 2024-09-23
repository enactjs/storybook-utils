import {configureActions as addonConfigureActions} from '@storybook/addon-actions';

const configureActions = opts => {
	return addonConfigureActions({
		// TODO: Set the limit of 200 as a workaround.
		// We hope storybook to fix the action log to be sorted as the latest on the top.
		// Limit the number of items logged into the actions panel
		limit: 200,
		...opts
	});
};

export default configureActions;
export {configureActions};
