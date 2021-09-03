import {configureActions as addonConfigureActions} from '@storybook/addon-actions';

function configureActions (opts) {
	return addonConfigureActions({
		// Limit the number of items logged into the actions panel
		limit: 10,
		...opts
	});
}

export default configureActions;
export {configureActions};
