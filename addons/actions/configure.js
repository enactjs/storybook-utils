import {configureActions as addonConfigureActions} from '@storybook/addon-actions';

const configureActions = opts => {
	return addonConfigureActions({
		...opts
	});
};

export default configureActions;
export {configureActions};
