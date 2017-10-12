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

ElevatorState = function (context){
	this.context = context;
};

require ('./ElevatorIdleState.js');
require ('./ElevatorWorkingState.js');
require ('./ElevatorWorkingQueueState.js');

//Elevator state
ElevatorState.prototype.isIdle = function () {
    this.shouldBeImplementedBySubclass();
};

ElevatorState.prototype.isWorking = function () {
    this.shouldBeImplementedBySubclass();
};

ElevatorState.prototype.goUpPushedFromFloor = function (aFloorNumber) {
    this.shouldBeImplementedBySubclass();
};

ElevatorState.prototype.cabinReachedTargetFloor = function () {
    this.shouldBeImplementedBySubclass();
};

ElevatorState.prototype.beIdle = function () {
    this.shouldBeImplementedBySubclass();
};

// Buttons
ElevatorState.prototype.closeCabinDoor = function () {
    this.shouldBeImplementedBySubclass();
};

//Sensor
ElevatorState.prototype.cabinDoorClosed = function () {
    this.shouldBeImplementedBySubclass();
};

ElevatorState.prototype.cabinDoorOpened = function () {
    this.shouldBeImplementedBySubclass();
};
