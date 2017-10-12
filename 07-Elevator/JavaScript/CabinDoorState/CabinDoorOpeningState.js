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

require ('./CabinDoorState.js');

CabinDoorOpeningState = function (context) {
    CabinDoorState.call(this, context);
};

CabinDoorOpeningState.prototype = Object.create(CabinDoorState.prototype);

CabinDoorOpeningState.prototype.isOpened = function () {
    return false;
};

CabinDoorOpeningState.prototype.isOpening = function () {
    return true;
};

CabinDoorOpeningState.prototype.isClosing = function () {
    return false;
};

CabinDoorOpeningState.prototype.isClosed = function () {
    return false;
};

CabinDoorOpeningState.prototype.startOpening = function () {
};

CabinDoorOpeningState.prototype.startClosing = function () {
    //this.context.state = new CabinDoorClosingState(this.context);
};

CabinDoorOpeningState.prototype.opened = function () {
    this.context.state = new CabinDoorOpenState(this.context);
};

//Sensors
CabinDoorOpeningState.prototype.closed = function () {
	throw new Error(CabinDoor.SENSOR_DESINCRONIZED);
};
