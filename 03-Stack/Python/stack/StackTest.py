#
# Developed by 10Pines SRL
# License: 
# This work is licensed under the 
# Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
# To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ 
# or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, 
# California, 94041, USA.
#  
# Solved using Python 2.7.6
#

import unittest

class Stack:
    STACK_EMPTY_DESCRIPTION = 'Stack is empty'

    def __init__(self):
        self.current = StackEmptyState()
    
    def push(self, anObject):
        return self.current.push(self, anObject)
    
    def pop(self):
        return self.current.pop(self)
    
    def top(self):
        return self.current.top(self)
    
    def isEmpty(self):
        return self.current.isEmpty(self)
    
    def size(self):
        return self.current.size(self)

class StackState(object):
    def push(self, context, anObject):
        context.current = StackNonEmptyState(anObject, self)

    def pop(self, context):
        raise NotImplementedError

    def top(self, context):
        raise NotImplementedError

    def isEmpty(self, context):
        raise NotImplementedError

    def size(self, context):
        raise NotImplementedError

class StackEmptyState(StackState):
    def push(self, context, anObject):
        context.current = StackNonEmptyState(anObject, self)

    def pop(self, context):
        raise Exception(Stack.STACK_EMPTY_DESCRIPTION)

    def top(self, context):
        raise Exception(Stack.STACK_EMPTY_DESCRIPTION)

    def isEmpty(self, context):
        return True

    def size(self, context):
        return 0

class StackNonEmptyState(StackState):
    def __init__(self, item, previousState):
        self.item = item
        self.previousState = previousState

    def pop(self, context):
        context.current = self.previousState
        return self.item

    def top(self, context):
        return self.item

    def isEmpty(self, context):
        return False

    def size(self, context):
        return 1 + self.previousState.size(context)

class StackTest(unittest.TestCase):
    
    def testStackShouldBeEmptyWhenCreated(self):
        stack = Stack()
        
        self.assertTrue(stack.isEmpty())

    def testPushAddElementsToTheStack(self):
        stack = Stack()
        stack.push('something')
        
        self.assertFalse(stack.isEmpty())

    def testPopRemovesElementsFromTheStack(self):
        stack = Stack()
        stack.push("Something")
        stack.pop()
        
        self.assertTrue(stack.isEmpty())
    
    def testPopReturnsLastPushedObject(self):
        stack = Stack()
        pushedObject = "Something"
        stack.push(pushedObject)
        self.assertEquals(pushedObject, stack.pop())
    
    def testStackBehavesLIFO(self):
        firstPushed = "First"
        secondPushed = "Second"
        stack = Stack()
        stack.push(firstPushed)
        stack.push(secondPushed)
        
        self.assertEquals(secondPushed,stack.pop())
        self.assertEquals(firstPushed,stack.pop())
        self.assertTrue(stack.isEmpty())
    
    def testTopReturnsLastPushedObject(self):
        stack = Stack()
        pushedObject = "Something"

        stack.push(pushedObject)

        self.assertEquals(pushedObject, stack.top())

    def testTopDoesNotRemoveObjectFromStack(self):
        stack = Stack()
        pushedObject = "Something"

        stack.push(pushedObject)

        self.assertEquals( 1,stack.size()) 
        stack.top()
        self.assertEquals( 1,stack.size())

    def testCanNotPopWhenThereAreNoObjectsInTheStack(self):
        stack = Stack()
        
        try:
            stack.pop()
            self.fail()
        except Exception as stackIsEmpty:
            self.assertEquals(Stack.STACK_EMPTY_DESCRIPTION,stackIsEmpty.message)
        
    def testCanNotTopWhenThereAreNoObjectsInTheStack(self):
        stack = Stack()

        try:
            stack.top()
            self.fail()
        except Exception as stackIsEmpty:
            self.assertEquals(Stack.STACK_EMPTY_DESCRIPTION,stackIsEmpty.message)
    
if __name__ == "__main__":
    unittest.main()
