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
require ('./CabinDoor.js');
require ('./Motor.js');
require ('./CabinState/CabinStoppedState.js');

Cabin = function (elevator) {
    this.elevator = elevator;
    this.door = new CabinDoor(this);
    this.motor = new Motor();
    this._currentFloorNumber = 0;
    this.state = new CabinStoppedState(this);
};

Cabin.SENSOR_DESINCRONIZED = "Sensor de Cabina desincronizado";

Cabin.prototype.currentFloorNumber = function () {
    return this._currentFloorNumber;
};

//Cabin State
Cabin.prototype.isStopped = function () {
    return this.state.isStopped();
};

Cabin.prototype.isMoving = function () {
    return this.state.isMoving();
};

Cabin.prototype.isWaitingForPeople = function () {
    return this.state.isWaitingForPeople();
};

//Cabin Actions
Cabin.prototype.stop = function () {
    this.state.beStopped();
    this.motor.stop();
};

Cabin.prototype.waitForPeople = function () {
    this.state.waitForPeople();
};

//Cabin events
Cabin.prototype.waitForPeopleTimedOut = function () {
    this.state.waitForPeopleTimedOut();
    this.closeDoor();
};

Cabin.prototype.onFloor= function (aFloorNumber) {
    if (aFloorNumber !== this._currentFloorNumber + 1) {
        throw new Error(Cabin.SENSOR_DESINCRONIZED);
    }
    this.state.onFloor(aFloorNumber);
    this._currentFloorNumber = aFloorNumber;
};

//Door state
Cabin.prototype.isDoorOpened = function () {
    return this.door.isOpened();
};

Cabin.prototype.isDoorOpening = function () {
    return this.door.isOpening();
};

Cabin.prototype.isDoorClosing = function () {
    return this.door.isClosing();
};

Cabin.prototype.isDoorClosed = function () {
    return this.door.isClosed();
};

//Door - Sensor events
Cabin.prototype.doorClosed = function () {
    this.door.closed();
    this.state.move();
};

Cabin.prototype.doorOpened = function () {
    this.door.opened();
    this.state.waitForPeople();
};

//Door - Button events
Cabin.prototype.openDoor = function () {
    this.state.openDoor();
};

Cabin.prototype.closeDoor = function () {
    this.state.closeDoor();
};

Cabin.prototype.assertMotorIsNotMoving = function () {
    this.motor.assertIsNotMoving();
};

Cabin.prototype.openDoorWhenStopped = function () {
    this.door.open();
}

Cabin.prototype.openDoorWhenMoving = function () {
    // Do nothing
}

Cabin.prototype.closeDoorWhenStopped = function () {
    this.door.close();
}

Cabin.prototype.closeDoorWhenMoving = function () {
    // Do nothing
}

Cabin.prototype.closeDoorWhenWaiting = function () {
    this.door.close();
}

