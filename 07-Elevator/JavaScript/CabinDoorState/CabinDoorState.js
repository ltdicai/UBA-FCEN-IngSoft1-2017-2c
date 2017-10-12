/*
 * Developed by 10Pines SRL
 * License: 
 * This work is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ 
 * or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, 
 * California, 94041, USA.
 *  
 */

require ('../Object.js');

CabinDoorState = function (context) {
	this.context = context;
};

require ('./CabinDoorOpenState.js');
require ('./CabinDoorCloseState.js');
require ('./CabinDoorOpeningState.js');
require ('./CabinDoorClosingState.js');

//State
CabinDoorState.prototype.isOpened = function () {
    this.shouldBeImplementedBySubclass();
};

CabinDoorState.prototype.isOpening = function () {
    this.shouldBeImplementedBySubclass();
};

CabinDoorState.prototype.isClosing = function () {
    this.shouldBeImplementedBySubclass();
};

CabinDoorState.prototype.isClosed = function () {
    this.shouldBeImplementedBySubclass();
};

CabinDoorState.prototype.startOpening = function () {
    this.shouldBeImplementedBySubclass();
};

CabinDoorState.prototype.startClosing = function () {
    this.shouldBeImplementedBySubclass();
};

//Sensor events
CabinDoorState.prototype.closed = function () {
    this.shouldBeImplementedBySubclass();
};

CabinDoorState.prototype.opened = function () {
    this.shouldBeImplementedBySubclass();
};
