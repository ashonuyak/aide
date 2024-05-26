import tippy, { type Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';

export default function tooltip(node: Element, options: Partial<Props>) {
	const tooltip = tippy(node, { arrow: false, ...options });

	return {
		update(options: Partial<Props>) {
			tooltip.setProps(options);
		},
		destroy() {
			tooltip.destroy();
		}
	};
}
