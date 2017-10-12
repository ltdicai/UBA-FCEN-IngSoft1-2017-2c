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

CabinDoorClosingState = function (context) {
    CabinDoorState.call(this, context);
};

CabinDoorClosingState.prototype = Object.create(CabinDoorState.prototype);

CabinDoorClosingState.prototype.isOpened = function () {
    return false;
};

CabinDoorClosingState.prototype.isOpening = function () {
    return false;
};

CabinDoorClosingState.prototype.isClosing = function () {
    return true;
};

CabinDoorClosingState.prototype.isClosed = function () {
    return false;
};

CabinDoorClosingState.prototype.startOpening = function () {
	this.context.state = new CabinDoorOpeningState(this.context);
};

CabinDoorClosingState.prototype.startClosing = function () {
};

//Sensor events
CabinDoorClosingState.prototype.closed = function () {
    this.context.state = new CabinDoorCloseState(this.context);
};

