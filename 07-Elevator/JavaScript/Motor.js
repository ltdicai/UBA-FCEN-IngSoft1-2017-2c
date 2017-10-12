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

Motor = function () {
    this.state = Motor.STOPPED;
};

Motor.MOTOR_IS_MOVING = "El motor se esta moviendo";

Motor.STOPPED = 1;
Motor.MOVING_CLOCKWISE = 2;
Motor.MOVING_COUNTER_CLOCKWISE = 3;

Motor.prototype.stop = function () {
    this.state = Motor.STOPPED;
};

Motor.prototype.moveClockwise = function () {
    this.assertIsNotMoving();

    this.state = Motor.MOVING_CLOCKWISE;
};

Motor.prototype.moveCounterClockwise = function () {
    this.assertIsNotMoving();

    this.state = Motor.MOVING_COUNTER_CLOCKWISE;
};

Motor.prototype.isMovingCounterClockwise = function () {
    return this.state==Motor.MOVING_COUNTER_CLOCKWISE;
};

Motor.prototype.isMovingClockwise = function () {
    return this.state==Motor.MOVING_CLOCKWISE;
};

Motor.prototype.isStopped = function () {
    return this.state==Motor.STOPPED;
};

Motor.prototype.isMoving = function () {
    return !this.isStopped();
};

Motor.prototype.assertIsNotMoving = function () {
    if(this.isMoving()) throw new Error(Motor.MOTOR_IS_MOVING);
};
