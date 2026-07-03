/* global FocusEvent, MutationObserver, cancelAnimationFrame, requestAnimationFrame */

import {useEffect} from 'react';

/**
 * Creates a Storybook decorator that bridges
 * [storybook-addon-pseudo-states](https://www.npmjs.com/package/storybook-addon-pseudo-states) to Enact's
 * focus model.
 *
 * The addon only toggles CSS pseudo-classes; it cannot drive Enact's focus visuals, which are gated by
 * Spotlight input-mode (`.spotlight-input-*` on `#storybook-root`) and, for components like
 * `TooltipDecorator`, by React state that only real focus/hover events set. The decorator observes the
 * forcing class the addon applies to `<body>` (`pseudo-focus-all` / `pseudo-hover-all` ) and mirrors it
 * with genuine Enact focus on the story's own spottable element:
 *
 *   - `.focus()` sets `document.activeElement`, so CSS `:focus` styling applies, and `spotlight-input-key`
 *     is added so Enact's input-mode-gated focus rules are eligible.
 *   - a bubbling `focusin` is dispatched so React's delegated `onFocus` runs even when the preview iframe
 *     does not hold system focus (as when the pseudo-state is toggled from the addon toolbar), which is
 *     what makes state-driven UI such as tooltips appear and stay shown.
 *
 * @param   {Object}   [config]                  Configuration options.
 * @param   {String}   [config.ignoreSelector='[class*="_Header_"]']  CSS selector matching the sampler's
 *   chrome (e.g. a Panel `Header`, or Agate's `Panels controls`) whose spottable elements should be
 *   skipped, so the story's own control is focused instead. Themes differ here, which is why it is
 *   configurable. Pass a falsy value to disable chrome-skipping entirely.
 *
 * @returns {Function}                            A Storybook decorator.
 * @memberof storybook-utils/decorators
 * @public
 */
const createPseudoStateFocusBridge = ({ignoreSelector = '[class*="_Header_"]'} = {}) => {
	const PseudoStateFocusBridge = (story) => {
		useEffect(() => {
			const root = document.getElementById('storybook-root');
			if (!root) return;

			const isForced = () => /pseudo-(focus|hover|active)/.test(document.body.className);
			// Skip the sampler chrome and target the story's own control.
			const findSpottable = () => [...root.querySelectorAll('.spottable')].find((el) => (ignoreSelector ? !el.closest(ignoreSelector) : true));

			let rafId = null;
			let target = null;
			let wasForced = false;

			const forceFocus = (tries = 0) => {
				const spottable = findSpottable();
				if (spottable) {
					target = spottable;
					root.classList.add('spotlight-input-key');
					spottable.focus();
					spottable.dispatchEvent(new FocusEvent('focusin', {bubbles: true}));
				} else if (tries < 10) {
					rafId = requestAnimationFrame(() => forceFocus(tries + 1));
				}
			};

			const clearFocus = () => {
				const el = target || findSpottable();
				if (el) {
					el.blur();
					el.dispatchEvent(new FocusEvent('focusout', {bubbles: true}));
				}
				target = null;
			};

			const sync = () => {
				if (rafId) cancelAnimationFrame(rafId);
				const forced = isForced();
				if (forced) {
					forceFocus();
				} else if (wasForced) {
					clearFocus();
				}
				wasForced = forced;
			};

			const observer = new MutationObserver(sync);
			observer.observe(document.body, {attributes: true, attributeFilter: ['class']});
			sync();

			return () => {
				observer.disconnect();
				if (rafId) cancelAnimationFrame(rafId);
			};
		}, []);

		return story();
	};

	return PseudoStateFocusBridge;
};

export default createPseudoStateFocusBridge;
export {createPseudoStateFocusBridge};
