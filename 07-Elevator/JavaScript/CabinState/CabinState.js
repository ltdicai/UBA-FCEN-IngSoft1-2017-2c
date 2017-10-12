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

CabinState = function (context) {
	this.context = context;
};

require ('./CabinMovingState.js');
require ('./CabinStoppedState.js');
require ('./CabinWaitingState.js');


CabinState.prototype.isStopped = function () {
    this.shouldBeImplementedBySubclass();
};

CabinState.prototype.isMoving = function () {
    this.shouldBeImplementedBySubclass();
};

CabinState.prototype.isWaitingForPeople = function () {
	this.shouldBeImplementedBySubclass();
};

CabinState.prototype.move = function () {
	this.shouldBeImplementedBySubclass();
}

CabinState.prototype.beStopped = function () {
	this.shouldBeImplementedBySubclass();
};

CabinState.prototype.waitForPeople = function () {
	this.shouldBeImplementedBySubclass();
};

CabinState.prototype.waitForPeopleTimedOut = function () {
	this.shouldBeImplementedBySubclass();
};

CabinState.prototype.onFloor = function (aFloorNumber) {
	this.shouldBeImplementedBySubclass();
};

//Door - Sensor events
CabinState.prototype.doorClosed = function () {
	this.shouldBeImplementedBySubclass();
};

//Actions
CabinState.prototype.openDoor = function () {
	this.shouldBeImplementedBySubclass();
};

CabinState.prototype.closeDoor = function () {
	this.shouldBeImplementedBySubclass();
};

