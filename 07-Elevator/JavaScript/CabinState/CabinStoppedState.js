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
require ('./CabinState.js');

CabinStoppedState = function (context) {
    CabinState.call(this, context);
};

CabinStoppedState.prototype = Object.create(CabinState.prototype);


CabinStoppedState.prototype.isStopped = function () {
    return true;
};

CabinStoppedState.prototype.isMoving = function () {
    return false;
};

CabinStoppedState.prototype.isWaitingForPeople = function () {
	return false;
};

CabinStoppedState.prototype.move = function () {
	this.context.state = new CabinMovingState(this.context);
}

CabinStoppedState.prototype.beStopped = function () {
};

CabinStoppedState.prototype.waitForPeople = function () {
	this.context.state = new CabinWaitingState(this.context);
};

//Door - Sensor events
CabinStoppedState.prototype.doorClosed = function () {
	this.context.state = new CabinMovingState(this.context);
};

CabinStoppedState.prototype.onFloor = function (aFloorNumber) {
	throw new Error(Cabin.SENSOR_DESINCRONIZED);
};

//Actions
CabinStoppedState.prototype.openDoor = function () {
	this.context.openDoorWhenStopped();
};

CabinStoppedState.prototype.closeDoor = function () {
	this.context.closeDoorWhenStopped();
};


