/**
 * Color Mixin.
 *
 * @author Alain Pitiot
 * @version 3.0.0b11
 * @copyright (c) 2018 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */


import { Color } from './Color';


/**
 * <p>This mixin implement color and contrast changes for visual stimuli</p>
 * 
 * @name module:util.ColorMixin
 * @mixin
 */
export let ColorMixin = (superclass) => class extends superclass {
	constructor(args) {
		super(args);
	}


	/**
	 * Setter for Color attribute.
	 * 
	 * @name module:core.ColorMixin#setColor
	 * @function
	 * @public
	 * @param {string|number|Array.<number>} color - the new color
	 * @param {boolean} [log= false] - whether or not to log
	 */
	setColor(color, log) {
		this._setAttribute('color', color, log);

		this._needUpdate = true;
	};


	/**
	 * Setter for Contrast attribute.
	 * 
	 * @name module:core.ColorMixin#setContrast
	 * @function
	 * @public
	 * @param {number} contrast - the new contrast (must be between 0 and 1)
	 * @param {boolean} [log= false] - whether or not to log
	 */
	setContrast(contrast, log) {
		this._setAttribute('contrast', contrast, log);

		this._needUpdate = true;
	}


	/**
	 * Adjust the contrast of the color and convert it to [-1, 1] RGB
	 * 
	 * @name module:core.ColorMixin#getContrastedColor
	 * @function
	 * @public
	 * @param {string|number|Array.<number>} color - the color
	 * @param {number} contrast - the contrast (must be between 0 and 1)
	 */
	getContrastedColor(color, contrast) {
		let rgb = color.rgb.map(c => (c * 2.0 - 1.0) * contrast);
		return new Color(rgb, Color.COLOR_SPACE.RGB);
	}

}