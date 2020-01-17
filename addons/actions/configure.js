import {addonConfigureActions} from '@storybook/addon-knobs';

function configureActions(opts) {
	return addonConfigureActions({
		// Limit the number of items logged into the actions panel
		limit: 10,
		...opts
	});
}

export default configureActions;
export {configureActions};

