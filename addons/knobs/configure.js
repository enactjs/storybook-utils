import {withKnobs as addonWithKnobs} from '@storybook/addon-knobs';

function withKnobs(opts) {
	return addonWithKnobs({
		timestamps: true, // Doesn't emit events while user is typing.
		...opts
	});
}

export default withKnobs;
export {withKnobs};
