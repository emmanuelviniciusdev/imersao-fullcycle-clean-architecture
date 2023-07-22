import { NotificationProps } from './notification'

export default class NotificationError extends Error {
    constructor(notifications: NotificationProps[]) {
        const notificationsMessagesStr = notifications
            .map((n) => `${n.context}: ${n.message}`)
            .join(', ')

        super(notificationsMessagesStr)
    }
}
