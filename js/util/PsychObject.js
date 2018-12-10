/** @module util */
/**
 * Core Object.
 *
 * @author Alain Pitiot
 * @version 3.0.0b11
 * @copyright (c) 2018 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */


import { EventEmitter } from './EventEmitter';


/**
 * <p>PsychoObject is the base class for all PsychoJS objects.
 * It is responsible for handling attributes.</p>
 * 
 * @class
 * @extends EventEmitter
 * @param {PsychoJS} psychoJS - the PsychoJS instance
 * @param {string} name - the name of the object (mostly useful for debugging)
 */
export class PsychObject extends EventEmitter {
	constructor(psychoJS, name) {
		super();

		this._psychoJS = psychoJS;

		// name:
		if (typeof name === 'undefined')
			name = this.constructor.name;
		this._addAttribute('name', name);
	}


	/**
	 * Get the PsychoJS instance.
	 * 
	 * @public
	 * @return {PsychoJS} the PsychoJS instance
	 */
	get psychoJS() { return this._psychoJS; }


	/**
	 * Setter for the PsychoJS attribute.
	 * 
	 * @public
	 * @param {PsychoJS} psychoJS - the PsychoJS instance
	 */
	set psychoJS(psychoJS) {
		this._psychoJS = psychoJS;
	}


	/**
	 * Set the value of an attribute.
	 * 
	 * @private
	 * @param {string} attributeName - the name of the attribute
	 * @param {object} attributeValue - the value of the attribute
 	 * @param {boolean} [log= false] - whether of not to log
 	 * @param {string} [operation] - the binary operation such that the new value of the attribute is the result of the application of the operation to the current value of the attribute and attributeValue
 	 * @param {boolean} [stealth= false] - whether or not to call the potential attribute setters when setting the value of this attribute
	 */
	_setAttribute(attributeName, attributeValue, log = false, operation = undefined, stealth = false) {
		let response = { origin: 'PsychObject.setAttribute', context: 'when setting the attribute of an object' };

		if (typeof attributeName == 'undefined')
			throw { ...response, error: 'the attribute name cannot be undefined' };
		if (typeof attributeValue == 'undefined') {
			this._psychoJS.logger.warn('setting the value of attribute: ' + attributeName + ' in PsychObject: ' + this._name + ' as: undefined');
		}

		// (*) apply operation to old and new values:
		if (typeof operation !== 'undefined' && this.hasOwnProperty('_' + attributeName)) {
			let oldValue = this['_' + attributeName];

			// operations can only be applied to numbers and array of numbers (which can be empty):
			if (typeof attributeValue == 'number' || (Array.isArray(attributeValue) && (attributeValue.length == 0 || typeof attributeValue[0] == 'number'))) {

				// value is an array:
				if (Array.isArray(attributeValue)) {
					// old value is also an array
					if (Array.isArray(oldValue)) {
						if (attributeValue.length != oldValue.length)
							throw { ...response, error: 'old and new value should have the same size when they are both arrays' };

						switch (operation) {
							case '':
								// no change to value;
								break;
							case '+':
								attributeValue = attributeValue.map((v, i) => oldValue[i] + v);
								break;
							case '*':
								attributeValue = attributeValue.map((v, i) => oldValue[i] * v);
								break;
							case '-':
								attributeValue = attributeValue.map((v, i) => oldValue[i] - v);
								break;
							case '/':
								attributeValue = attributeValue.map((v, i) => oldValue[i] / v);
								break;
							case '**':
								attributeValue = attributeValue.map((v, i) => oldValue[i] ** v);
								break;
							case '%':
								attributeValue = attributeValue.map((v, i) => oldValue[i] % v);
								break;
							default:
								throw { ...response, error: 'unsupported operation: ' + operation + ' when setting: ' + attributeName + ' in: ' + this.name };
						}

					} else
					// old value is a scalar
					{
						switch (operation) {
							case '':
								// no change to value;
								break;
							case '+':
								attributeValue = attributeValue.map(v => oldValue + v);
								break;
							case '*':
								attributeValue = attributeValue.map(v => oldValue * v);
								break;
							case '-':
								attributeValue = attributeValue.map(v => oldValue - v);
								break;
							case '/':
								attributeValue = attributeValue.map(v => oldValue / v);
								break;
							case '**':
								attributeValue = attributeValue.map(v => oldValue ** v);
								break;
							case '%':
								attributeValue = attributeValue.map(v => oldValue % v);
								break;
							default:
								throw { ...response, error: 'unsupported value: ' + JSON.stringify(attributeValue) + ' for operation: ' + operation + ' when setting: ' + attributeName + ' in: ' + this.name };
						}
					}
				} else
				// value is a scalar
				{
					// old value is an array
					if (Array.isArray(oldValue)) {
						switch (operation) {
							case '':
								attributeValue = oldValue.map(v => attributeValue);
								break;
							case '+':
								attributeValue = oldValue.map(v => v + attributeValue);
								break;
							case '*':
								attributeValue = oldValue.map(v => v * attributeValue);
								break;
							case '-':
								attributeValue = oldValue.map(v => v - attributeValue);
								break;
							case '/':
								attributeValue = oldValue.map(v => v / attributeValue);
								break;
							case '**':
								attributeValue = oldValue.map(v => v ** attributeValue);
								break;
							case '%':
								attributeValue = oldValue.map(v => v % attributeValue);
								break;
							default:
								throw { ...response, error: 'unsupported operation: ' + operation + ' when setting: ' + attributeName + ' in: ' + this.name };
						}

					} else
					// old value is a scalar
					{
						switch (operation) {
							case '':
								// no change to value;
								break;
							case '+':
								attributeValue = oldValue + attributeValue;
								break;
							case '*':
								attributeValue = oldValue * attributeValue;
								break;
							case '-':
								attributeValue = oldValue - attributeValue;
								break;
							case '/':
								attributeValue = oldValue / attributeValue;
								break;
							case '**':
								attributeValue = oldValue ** attributeValue;
								break;
							case '%':
								attributeValue = oldValue % attributeValue;
								break;
							default:
								throw { ...response, error: 'unsupported value: ' + JSON.stringify(attributeValue) + ' for operation: ' + operation + ' when setting: ' + attributeName + ' in: ' + this.name };
						}
					}
				}

			} else
				throw { ...response, error: 'operation: ' + operation + ' is invalid for old value: ' + JSON.stringify(oldValue) + ' and new value: ' + JSON.stringify(attributeValue) };
		}


		// (*) log if appropriate:
		if (!stealth && (log || this._autoLog) && (typeof this.win !== 'undefined')) {
			var message = this.name + ": " + attributeName + " = " + JSON.stringify(attributeValue);
			//this.win.logOnFlip(message, psychoJS.logging.EXP, this);
		}


		// (*) set the value of the attribute:
		if (stealth)
			this['_' + attributeName] = attributeValue;
		else
			this[attributeName] = attributeValue;
	}


	/**
	 * Add attributes to this instance (e.g. define setters and getters) and affect values to them.
	 * 
	 * <p>Note: (a) If the object already has a set<attributeName> method, we do not redefine it,
	 * and the setter for this attribute calls that method instead of _setAttribute.</p>
	 * <p>      (b) _addAttributes is typically called in the constructor of an object, after
	 * the call to super (see module:visual.ImageStim for an illustration).</p>
	 *
 	 * @private
	 * @param {Object} cls - the class object of the subclass of PsychoObject whose attributes we will set
	 * @param {...*} [args] - the values for the attributes (this also determines which attributes will be set)
	 *
	 */
	_addAttributes(cls, ...args) {
		// (*) look for the line in the subclass constructor where addAttributes is called
		// and extract its arguments:
		let callLine = cls.toString().match(/this.*\._addAttributes\(.*\;/)[0];
		let startIndex = callLine.indexOf('._addAttributes(') + 16;
		let endIndex = callLine.indexOf(');');
		let callArgs = callLine.substr(startIndex, endIndex - startIndex).split(',').map((s) => s.trim());


		// (*) add (argument name, argument value) pairs to the attribute map:
		let attributeMap = new Map();
		for (var i = 1; i < callArgs.length; ++i)
			attributeMap.set(callArgs[i], args[i - 1]);

		// (*) set the value, define the get/set<attributeName> properties and define the getter and setter:
		for (let [name, value] of attributeMap.entries())
			this._addAttribute(name, value);
	}


	/**
	 * Add an attribute to this instance (e.g. define setters and getters) and affect a value to it.
	 * 
 	 * @private
	 * @param {string} name - the name of the attribute
	 * @param {object} value - the value of the attribute
	 */
	_addAttribute(name, value) {
		let getPropertyName = 'get' + name[0].toUpperCase() + name.substr(1);
		if (typeof this[getPropertyName] === 'undefined')
			this[getPropertyName] = () => this['_' + name];

		let setPropertyName = 'set' + name[0].toUpperCase() + name.substr(1);
		if (typeof this[setPropertyName] === 'undefined')
			this[setPropertyName] = (value, log = false) => {
				this._setAttribute(name, value, log);
			};

		Object.defineProperty(this, name, {
			configurable: true,
			get() { return this[getPropertyName](); /* return this['_' + name];*/ },
			set(value) { this[setPropertyName](value); }
		});

		//this['_' + name] = value;
		this[name] = value;
	}

}