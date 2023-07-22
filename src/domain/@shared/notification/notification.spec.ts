import Notification from './notification'
import NotificationError from './notification-error'

describe('Notification Unit Tests', () => {
    it('should create notifications', () => {
        const notification = new Notification()

        notification.add({ message: 'Test 1', context: 'foo' })
        notification.add({ message: 'Test 2', context: 'bar' })
        notification.add({ message: 'Test 3', context: 'foo' })

        const notificationMessagesStr = notification.messagesStr()
        const notificationMessagesFooStr = notification.messagesStr('foo')
        const notificationMessagesBarStr = notification.messagesStr('bar')

        expect(notificationMessagesStr).toBe(
            'foo: Test 1, bar: Test 2, foo: Test 3'
        )
        expect(notificationMessagesFooStr).toBe('foo: Test 1, foo: Test 3')
        expect(notificationMessagesBarStr).toBe('bar: Test 2')
    })

    it('should throw NotificationError when there are notifications', () => {
        const notification = new Notification()

        notification.add({ message: 'Test 1', context: 'foo' })
        notification.add({ message: 'Test 2', context: 'bar' })
        notification.add({ message: 'Test 3', context: 'foo' })

        expect(() =>
            notification.throwNotificationErrorIfHasNotifications()
        ).toThrow(NotificationError)
    })
})
