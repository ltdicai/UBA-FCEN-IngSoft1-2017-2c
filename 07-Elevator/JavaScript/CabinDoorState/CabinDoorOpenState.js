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
require ('./CabinDoorClosingState.js');

CabinDoorOpenState = function (context) {
    CabinDoorState.call(this, context);
};

CabinDoorOpenState.prototype.isOpened = function () {
    return true;
};

CabinDoorOpenState.prototype.isOpening = function () {
    return false;
};

CabinDoorOpenState.prototype.isClosing = function () {
    return false;
};

CabinDoorOpenState.prototype.isClosed = function () {
    return false;
};

CabinDoorOpenState.prototype.startOpening = function () {
};

CabinDoorOpenState.prototype.startClosing = function () {
    this.context.state = new CabinDoorClosingState(this.context);
};

//Sensors
CabinDoorOpenState.prototype.closed = function () {
	throw new Error(CabinDoor.SENSOR_DESINCRONIZED);
};
