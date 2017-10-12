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

require ('./Object.js');
require ('./CabinDoorState.js');

CabinDoorCloseState = function (context) {
    CabinDoorState.call(this, context);
};

CabinDoorCloseState.prototype = Object.create(CabinDoorState.prototype);

CabinDoorCloseState.prototype.isOpened = function () {
    return false;
};

CabinDoorCloseState.prototype.isOpening = function () {
    return false;
};

CabinDoorCloseState.prototype.isClosing = function () {
    return false;
};

CabinDoorCloseState.prototype.isClosed = function () {
    return true;
};

CabinDoorCloseState.prototype.startClosing = function () {
};

CabinDoorCloseState.prototype.startOpening = function () {
	this.context.state = new CabinDoorOpeningState(this.context);
};

//Sensors
CabinDoorCloseState.prototype.closed = function () {
	throw new Error(CabinDoor.SENSOR_DESINCRONIZED);
};
