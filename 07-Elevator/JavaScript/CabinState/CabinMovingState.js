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

CabinMovingState = function (context) {
    CabinState.call(this, context);
};

CabinMovingState.prototype = Object.create(CabinState.prototype);

// Cabin state
CabinMovingState.prototype.isStopped = function () {
    return false;
};

CabinMovingState.prototype.isMoving = function () {
    return true;
};

CabinMovingState.prototype.isWaitingForPeople = function () {
	return false;
};

// Cabin state change
CabinMovingState.prototype.move = function () {
}

CabinMovingState.prototype.beStopped = function () {
	this.context.state = new CabinStoppedState(this.context);
};

CabinMovingState.prototype.waitForPeople = function () {
	this.context.state = new CabinWaitingState(this.context);
};

CabinMovingState.prototype.onFloor = function (aFloorNumber) {
};

//Actions
CabinMovingState.prototype.openDoor = function () {
	this.context.openDoorWhenMoving();
};

CabinMovingState.prototype.closeDoor = function () {
	this.context.closeDoorWhenMoving();
};


