#
# Developed by 10Pines SRL
# License: 
# This work is licensed under the 
# Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
# To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ 
# or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, 
# California, 94041, USA.
#  
import unittest
import time

class CustomerBook:
    
    CUSTOMER_NAME_CAN_NOT_BE_EMPTY = 'Customer name can not be empty'
    CUSTOMER_ALREADY_EXIST = 'Customer already exists'
    INVALID_CUSTOMER_NAME = 'Invalid customer name'
    
    def __init__(self):
        self.customerNames = set()
    
    def addCustomerNamed(self,name):
        #El motivo por el cual se hacen estas verificaciones y se levanta esta excepcion es por motivos del
        #ejercicio - Hernan.
        if not name:
            raise ValueError(self.__class__.CUSTOMER_NAME_CAN_NOT_BE_EMPTY)
        if self.includesCustomerNamed(name):
            raise ValueError(self.__class__.CUSTOMER_ALREADY_EXIST)
        
        self.customerNames.add(name)
        
    def isEmpty(self):
        return self.numberOfCustomers()==0
    
    def numberOfCustomers(self):
        return len(self.customerNames)
    
    def includesCustomerNamed(self,name): 
        return name in self.customerNames
    
    def removeCustomerNamed(self,name):
        #Esta validacion mucho sentido no tiene, pero esta puesta por motivos del ejericion - Hernan
        if not self.includesCustomerNamed(name):
            raise KeyError(self.__class__.INVALID_CUSTOMER_NAME)
        
        self.customerNames.remove(name)

    

class IdionTest(unittest.TestCase):
    def testAddingCustomerShouldNotTakeMoreThan50Milliseconds(self):
        customerBook = CustomerBook()

        self.assertActionShouldNotTakeMoreThanXMilliseconds(
            lambda:customerBook.addCustomerNamed('John Lennon'),
            50
        )

    def testRemovingCustomerShouldNotTakeMoreThan100Milliseconds(self):
        customerBook = CustomerBook()
        paulMcCartney = 'Paul McCartney'
        
        customerBook.addCustomerNamed(paulMcCartney)

        self.assertActionShouldNotTakeMoreThanXMilliseconds(
            lambda:customerBook.removeCustomerNamed(paulMcCartney),
            100
        )

    def testCanNotAddACustomerWithEmptyName(self):
        customerBook = CustomerBook()

        self.assertRaisesAndCheckWithException(
            lambda:customerBook.addCustomerNamed(''),
            ValueError,
            lambda exception:[
                self.assertEquals(exception.message,CustomerBook.CUSTOMER_NAME_CAN_NOT_BE_EMPTY),
                self.assertTrue(customerBook.isEmpty())
            ]
        )

    def testCanNotRemoveNotAddedCustomer(self):
        customerBook = CustomerBook()
        customerBook.addCustomerNamed('Paul McCartney')

        self.assertRaisesAndCheckWithException(
            lambda:customerBook.removeCustomerNamed('John Lennon'),
            KeyError,
            lambda exception:[
                self.assertEquals(exception.message,CustomerBook.INVALID_CUSTOMER_NAME),
                self.assertTrue(customerBook.numberOfCustomers()==1),
                self.assertTrue(customerBook.includesCustomerNamed('Paul McCartney')),
            ]
        )

    def millisecondsElapsed(self,action):
        timeBeforeRunning = time.time()
        action()
        timeAfterRunning = time.time()
        return (timeAfterRunning-timeBeforeRunning)*1000

    def assertRaisesAndCheckWithException(self,action,exception,assertOnException):
        with self.assertRaises(exception) as contextManager:
            action()
            self.fail()
        assertOnException(contextManager.exception)

    def assertActionShouldNotTakeMoreThanXMilliseconds(self,action,maxMilliseconds):
        self.assertLess(self.millisecondsElapsed(action),maxMilliseconds)
      
if __name__ == "__main__":
    unittest.main()


