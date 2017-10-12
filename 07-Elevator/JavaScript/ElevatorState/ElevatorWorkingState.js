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
require ('./ElevatorState.js');

ElevatorWorkingState = function (context){
    ElevatorState.call(this, context);
};

ElevatorWorkingState.prototype = Object.create(ElevatorState.prototype);

//Elevator state
ElevatorWorkingState.prototype.isIdle = function () {
    return false;
};

ElevatorWorkingState.prototype.isWorking = function () {
    return true;
};

ElevatorWorkingState.prototype.beIdle = function () {
    this.context.state = new ElevatorIdleState(this.context);
};

// Buttons
ElevatorWorkingState.prototype.closeCabinDoor = function () {
    this.context.closeCabinDoorWhenWorking();
};

ElevatorWorkingState.prototype.cabinReachedTargetFloor = function () {};

ElevatorWorkingState.prototype.goUpPushedFromFloor = function (aFloorNumber) {
	this.context.state = new ElevatorWorkingQueueState(this.context);
};

// Sensors
ElevatorWorkingState.prototype.cabinDoorOpened = function () {
    this.beIdle();
};



