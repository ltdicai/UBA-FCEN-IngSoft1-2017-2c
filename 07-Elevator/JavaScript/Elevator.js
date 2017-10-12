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
require ('./Cabin.js');
require ('./ElevatorState/ElevatorIdleState.js');

Elevator = function (){
    this.cabin = new Cabin(this);
    this.floorsToGo = [];
    this.state = new ElevatorIdleState(this);
};


//Elevator state
Elevator.prototype.isIdle = function () {
    return this.state.isIdle(this);
};

Elevator.prototype.isWorking = function () {
    return this.state.isWorking(this);
};

//Door state
Elevator.prototype.isCabinDoorOpened = function () {
    return this.cabin.isDoorOpened();
};

Elevator.prototype.isCabinDoorOpening = function () {
    return this.cabin.isDoorOpening();
};

Elevator.prototype.isCabinDoorClosed = function () {
    return this.cabin.isDoorClosed();
};

Elevator.prototype.isCabinDoorClosing = function () {
    return this.cabin.isDoorClosing();
};

//Cabin state
Elevator.prototype.cabinFloorNumber = function () {
    return this.cabin.currentFloorNumber();
};

Elevator.prototype.isCabinStopped = function () {
    return this.cabin.isStopped();
};

Elevator.prototype.isCabinMoving = function () {
    return this.cabin.isMoving();
};

Elevator.prototype.isCabinWaitingForPeople = function () {
    return this.cabin.isWaitingForPeople();
};

//Button Events
Elevator.prototype.goUpPushedFromFloor = function (aFloorNumber) {
    this.floorsToGo.push(aFloorNumber);
    this.floorsToGo.sort();
    this.state.goUpPushedFromFloor(aFloorNumber);    
};

Elevator.prototype.goUpPushedFromFloorWhenIdle = function () {
    this.closeCabinDoor();
};

Elevator.prototype.openCabinDoor = function () {
    this.cabin.openDoor();
};

Elevator.prototype.closeCabinDoor = function () {
    this.state.closeCabinDoor();
};

Elevator.prototype.closeCabinDoorWhenWorking = function () {
    this.cabin.closeDoor();
};

//Sensor Events
Elevator.prototype.cabinOnFloor = function (aFloorNumber) {
    this.cabin.onFloor(aFloorNumber);
    if (this.hasToStopOnCurrentFloor()) {
        this.reachedFloorToStop();
    }
};

Elevator.prototype.cabinDoorClosed = function () {
    this.cabin.doorClosed();
};

Elevator.prototype.cabinDoorOpened = function () {
    this.state.cabinDoorOpened();
    this.cabin.doorOpened();
};

Elevator.prototype.hasFloorsToGo = function () {
    return this.floorsToGo.length!=0;
};

Elevator.prototype.waitForPeopleTimedOut = function () {
    this.cabin.waitForPeopleTimedOut();
};

//Floors queue
//Esta implementación es muy sencilla y asume que siempre se esta yendo para arriba
Elevator.prototype.hasToStopOnCurrentFloor = function () {
    return this.floorsToGo[0] === this.cabin.currentFloorNumber();
};

Elevator.prototype.reachedFloorToStop = function () {
    this.floorsToGo.splice(0,1);
    this.state.cabinReachedTargetFloor();
    this.cabin.stop();
    this.openCabinDoor();
};

