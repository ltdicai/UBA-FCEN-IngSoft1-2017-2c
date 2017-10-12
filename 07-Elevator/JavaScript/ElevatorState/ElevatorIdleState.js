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
require ('./ElevatorState.js');

ElevatorIdleState = function (context){
    ElevatorState.call(this, context);
};

ElevatorIdleState.prototype = Object.create(ElevatorState.prototype);


//Elevator state
ElevatorIdleState.prototype.isIdle = function () {
    return true;
};

ElevatorIdleState.prototype.isWorking = function () {
    return false;
};


ElevatorIdleState.prototype.beIdle = function () {};

// Buttons
ElevatorIdleState.prototype.closeCabinDoor = function () {};

ElevatorIdleState.prototype.goUpPushedFromFloor = function (aFloorNumber) {
    this.context.state = new ElevatorWorkingState(this.context);
    this.context.goUpPushedFromFloorWhenIdle();
};

ElevatorIdleState.prototype.cabinDoorOpened = function () {};

