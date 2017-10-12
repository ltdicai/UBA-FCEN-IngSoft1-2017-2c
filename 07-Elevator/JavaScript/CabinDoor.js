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
require ('./Motor.js');

CabinDoor = function (cabin) {
    this.cabin = cabin;
    this.motor = new Motor();
    this.state = new CabinDoorOpenState(this);
};

CabinDoor.SENSOR_DESINCRONIZED = "Sensor de puerta desincronizado";

//State
CabinDoor.prototype.isOpened = function () {
    return this.state.isOpened();
};

CabinDoor.prototype.isOpening = function () {
    return this.state.isOpening();
};

CabinDoor.prototype.isClosing = function () {
    return this.state.isClosing();
};

CabinDoor.prototype.isClosed = function () {
    return this.state.isClosed();
};

//Actions
CabinDoor.prototype.startClosing = function () {
    this.cabin.assertMotorIsNotMoving();
    this.state.startClosing();
    this.motor.moveClockwise();
};

CabinDoor.prototype.startOpening = function () {
    this.cabin.assertMotorIsNotMoving();
    this.state.startOpening();
    this.motor.moveCounterClockwise();
};

//Sensor events
CabinDoor.prototype.closed = function () {
    this.state.closed();
};

CabinDoor.prototype.opened = function () {
    this.state.opened();
};

//Button events
CabinDoor.prototype.open = function () {
    this.state.startOpening();
};

CabinDoor.prototype.close = function () {
    this.state.startClosing();
};
