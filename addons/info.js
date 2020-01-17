import {withInfo as addonWithInfo} from '@storybook/addon-info';

// Fix for @storybook/addon-info which always needs at least an empty object for defaultProps.
Component.defaultProps = {};

function withInfo({styles = {}, ...opts} = {}) {
	// Custom styling to ensure content fits well and potential scrollbars aren't under the
	// overlay close button
	styles = {
		info: {
			overflow: 'hidden',
			padding: '25px 0px 0px 0px'
		},
		infoPage: {
			overflow: 'auto',
			height: '100%',
			padding: '0px 20px'
		},
		infoBody: {
			marginTop: '0px'
		},
		children: {
			// backgroundColor: 'purple',  // For easier debugging
			width: '100%',
			height: '100%'
		},
		...styles
	};
	return addonWithInfo({
		propTables: null, // Disable all propTables
		...styles,
		...opts
	});
}

export default withInfo;
export {withInfo};
