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

CabinWaitingState = function (context) {
    CabinState.call(this, context);
};

CabinWaitingState.prototype = Object.create(CabinState.prototype);

//Cabin state

CabinWaitingState.prototype.isStopped = function () {
    return true;
};

CabinWaitingState.prototype.isMoving = function () {
    return false;
};

CabinWaitingState.prototype.isWaitingForPeople = function () {
	return true;
};

//Cabin state change
CabinWaitingState.prototype.move = function () {
	this.context.state = new CabinMovingState(this.context);
}

CabinWaitingState.prototype.beStopped = function () {
	this.context.state = new CabinStoppedState(this.context);
};

CabinWaitingState.prototype.waitForPeople = function () {
};

CabinWaitingState.prototype.waitForPeopleTimedOut = function () {
	this.context.state = new CabinStoppedState(this.context);
};

CabinWaitingState.prototype.beStopped = function () {
	this.context.state = new CabinStoppedState(this.context);
}

CabinWaitingState.prototype.onFloor = function (aFloorNumber) {
	throw new Error(Cabin.SENSOR_DESINCRONIZED);
};

//Actions
CabinWaitingState.prototype.openDoor = function () {
	this.context.openDoorWhenWaiting();
};

CabinWaitingState.prototype.closeDoor = function () {
	this.context.closeDoorWhenWaiting();
};


