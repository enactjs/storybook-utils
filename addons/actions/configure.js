import {configureActions as addonConfigureActions} from '@storybook/addon-actions';

const configureActions = opts => {
	return addonConfigureActions({
		depth:100,
		// Limit the number of items logged into the actions panel
		limit: 10,
		...opts
	});
};

export default configureActions;
export {configureActions};
