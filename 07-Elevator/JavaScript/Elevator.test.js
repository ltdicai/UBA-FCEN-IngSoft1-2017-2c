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
//var assert = chai.assert;

// Descomentar linea siguiente para correr en Plunker
///*
require ('./Elevator.js');

var assert = require('assert');
// Descomentar linea siguiente para correr en Plunker
//*/


assert.isTrue = function (aBoolean) {
    return assert.ok(aBoolean);
};

assert.isFalse = function (aBoolean) {
    return assert.isTrue (!aBoolean);
};

assert.fail = function() {
    assert.isTrue(false);
};

suite('ElevatorTest',function() {
    setup(function () {
    });


    test("01ElevatorStartsIdleWithDoorOpenOnFloorZero", function() {
        var elevator = new Elevator();

        assert.isTrue(elevator.isIdle());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorOpened());
        assert.deepEqual(0,elevator.cabinFloorNumber());
    });

	
    test("02CabinDoorStartsClosingWhenElevatorGetsCalled", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);

        assert.isFalse(elevator.isIdle());
        assert.isTrue(elevator.isWorking());

        assert.isTrue(elevator.isCabinStopped());
        assert.isFalse(elevator.isCabinMoving());

        assert.isFalse(elevator.isCabinDoorOpened());
        assert.isFalse(elevator.isCabinDoorOpening());
        assert.isTrue(elevator.isCabinDoorClosing());
        assert.isFalse(elevator.isCabinDoorClosed());

    });

	
    test("03CabinStartsMovingWhenDoorGetsClosed", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();

        assert.isFalse(elevator.isIdle());
        assert.isTrue(elevator.isWorking());

        assert.isFalse(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinMoving());

        assert.isFalse(elevator.isCabinDoorOpened());
        assert.isFalse(elevator.isCabinDoorOpening());
        assert.isFalse(elevator.isCabinDoorClosing());
        assert.isTrue(elevator.isCabinDoorClosed());

    });

	
    test("04CabinStopsAndStartsOpeningDoorWhenGetsToDestination", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        elevator.cabinOnFloor(1);
        
        assert.isFalse(elevator.isIdle());
        assert.isTrue(elevator.isWorking());

        assert.isTrue(elevator.isCabinStopped());
        assert.isFalse(elevator.isCabinMoving());

        assert.isFalse(elevator.isCabinDoorOpened());
        assert.isTrue(elevator.isCabinDoorOpening());
        assert.isFalse(elevator.isCabinDoorClosing());
        assert.isFalse(elevator.isCabinDoorClosed());

        assert.deepEqual(1,elevator.cabinFloorNumber());
    });

	
    test("05ElevatorGetsIdleWhenDoorGetOpened", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        elevator.cabinOnFloor(1);
        elevator.cabinDoorOpened();

        assert.isTrue(elevator.isIdle());
        assert.isFalse(elevator.isWorking());

        assert.isTrue(elevator.isCabinStopped());
        assert.isFalse(elevator.isCabinMoving());

        assert.isTrue(elevator.isCabinDoorOpened());
        assert.isFalse(elevator.isCabinDoorOpening());
        assert.isFalse(elevator.isCabinDoorClosing());
        assert.isFalse(elevator.isCabinDoorClosed());

        assert.deepEqual(1,elevator.cabinFloorNumber());
    });

    // STOP HERE!

    test("06DoorKeepsOpenedWhenOpeningIsRequested", function() {
        var elevator = new Elevator();

        assert.isTrue(elevator.isCabinDoorOpened());

        elevator.openCabinDoor();

        assert.isTrue(elevator.isCabinDoorOpened());
    });

	
    test("07DoorMustBeOpenedWhenCabinIsStoppedAndClosingDoors", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorClosing());

        elevator.openCabinDoor();
        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorOpening());
    });

	
    test("08CanNotOpenDoorWhenCabinIsMoving", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinMoving());
        assert.isTrue(elevator.isCabinDoorClosed());

        elevator.openCabinDoor();
        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinMoving());
        assert.isTrue(elevator.isCabinDoorClosed());
    });

	
    test("09DoorKeepsOpeneingWhenItIsOpeneing", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        elevator.cabinOnFloor(1);

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorOpening());

        elevator.openCabinDoor();
        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorOpening());
    });

    // STOP HERE!!
    test("10RequestToGoUpAreEnqueueWhenRequestedWhenCabinIsMoving", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        elevator.cabinOnFloor(1);
        elevator.goUpPushedFromFloor(2);
        elevator.cabinDoorOpened();

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinWaitingForPeople());
        assert.isTrue(elevator.isCabinDoorOpened());
    });

	
    test("11CabinDoorStartClosingAfterWaitingForPeople", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        elevator.cabinOnFloor(1);
        elevator.goUpPushedFromFloor(2);
        elevator.cabinDoorOpened();
        elevator.waitForPeopleTimedOut();

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorClosing());
    });

	
    test("12StopsWaitingForPeopleIfCloseDoorIsPressed", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        elevator.cabinOnFloor(1);
        elevator.goUpPushedFromFloor(2);
        elevator.cabinDoorOpened();

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinWaitingForPeople());
        assert.isTrue(elevator.isCabinDoorOpened());

        elevator.closeCabinDoor();

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorClosing());
    });

	
    test("13CloseDoorDoesNothingIfIdle", function() {
        var elevator = new Elevator();

        elevator.closeCabinDoor();

        assert.isTrue(elevator.isIdle());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorOpened());
    });

	
    test("14CloseDoorDoesNothingWhenCabinIsMoving", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinMoving());
        assert.isTrue(elevator.isCabinDoorClosed());

        elevator.closeCabinDoor();

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinMoving());
        assert.isTrue(elevator.isCabinDoorClosed());
    });

	
    test("15CloseDoorDoesNothingWhenOpeningTheDoorToWaitForPeople", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        elevator.cabinOnFloor(1);

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorOpening());

        elevator.closeCabinDoor();

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorOpening());
    });

    // STOP HERE!!


    test("16ElevatorHasToEnterEmergencyIfStoppedAndOtherFloorSensorTurnsOn", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        elevator.cabinOnFloor(1);
        try {
            elevator.cabinOnFloor(0);
            assert.fail();
        } catch (elevatorEmergency) {
            assert.deepEqual (Cabin.SENSOR_DESINCRONIZED,elevatorEmergency.message);
        }
    });

	
    test("17ElevatorHasToEnterEmergencyIfFalling", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(2);
        elevator.cabinDoorClosed();
        elevator.cabinOnFloor(1);
        try {
            elevator.cabinOnFloor(0);
            assert.fail();
        } catch (elevatorEmergency) {
            assert.deepEqual (Cabin.SENSOR_DESINCRONIZED,elevatorEmergency.message);
        }
    });

	
    test("18ElevatorHasToEnterEmergencyIfJumpsFloors", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(3);
        elevator.cabinDoorClosed();
        try {
            elevator.cabinOnFloor(3);
            assert.fail();
        } catch (elevatorEmergency) {
            assert.deepEqual (Cabin.SENSOR_DESINCRONIZED,elevatorEmergency.message);
        }
    });

	
    test("19ElevatorHasToEnterEmergencyIfDoorClosesAutomatically", function() {
        var elevator = new Elevator();

        try {
            elevator.cabinDoorClosed();
            assert.fail();
        } catch (elevatorEmergency) {
            assert.deepEqual (CabinDoor.SENSOR_DESINCRONIZED,elevatorEmergency.message);
        }
    });

	
    test("20ElevatorHasToEnterEmergencyIfDoorClosedSensorTurnsOnWhenClosed", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        try {
            elevator.cabinDoorClosed();
            assert.fail();
        } catch (elevatorEmergency) {
            assert.deepEqual (CabinDoor.SENSOR_DESINCRONIZED,elevatorEmergency.message);
        }
    });

	
    test("21ElevatorHasToEnterEmergencyIfDoorClosesWhenOpening", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        elevator.cabinOnFloor(1);
        try {
            elevator.cabinDoorClosed();
            assert.fail();
        } catch (elevatorEmergency) {
            assert.deepEqual (CabinDoor.SENSOR_DESINCRONIZED,elevatorEmergency.message);
        }
    });

    // STOP HERE!!
    // More tests here to verify bad sensor function


    test("22CabinHasToStopOnTheFloorsOnItsWay", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        elevator.goUpPushedFromFloor(2);
        elevator.cabinOnFloor(1);

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorOpening());
    });

	
    test("23ElevatorCompletesAllTheRequests", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(1);
        elevator.cabinDoorClosed();
        elevator.goUpPushedFromFloor(2);
        elevator.cabinOnFloor(1);
        elevator.cabinDoorOpened();
        elevator.waitForPeopleTimedOut();
        elevator.cabinDoorClosed();
        elevator.cabinOnFloor(2);

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorOpening());
    });

	
    test("24CabinHasToStopOnFloorsOnItsWayNoMatterHowTheyWellCalled", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(2);
        elevator.cabinDoorClosed();
        elevator.goUpPushedFromFloor(1);
        elevator.cabinOnFloor(1);

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorOpening());
    });

	
    test("25CabinHasToStopAndWaitForPeopleOnFloorsOnItsWayNoMatterHowTheyWellCalled", function() {
        var elevator = new Elevator();

        elevator.goUpPushedFromFloor(2);
        elevator.cabinDoorClosed();
        elevator.goUpPushedFromFloor(1);
        elevator.cabinOnFloor(1);
        elevator.cabinDoorOpened();
        elevator.waitForPeopleTimedOut();

        assert.isTrue(elevator.isWorking());
        assert.isTrue(elevator.isCabinStopped());
        assert.isTrue(elevator.isCabinDoorClosing());
    });
});

