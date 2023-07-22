import NotificationError from './notification-error'

export type NotificationProps = {
    message: string
    context: string
}

export default class Notification {
    private notifications: NotificationProps[] = []

    add(notification: NotificationProps) {
        this.notifications.push(notification)
    }

    messagesStr(context?: string) {
        return this.notifications
            .filter((e) => (context ? e.context === context : true))
            .map((e) => `${e.context}: ${e.message}`)
            .join(', ')
    }

    hasNotifications(context?: string) {
        return (
            this.notifications.filter((n) =>
                context ? n.context === context : true
            ).length > 0
        )
    }

    throwNotificationErrorIfHasNotifications(context?: string) {
        if (this.hasNotifications(context)) {
            throw new NotificationError(this.notifications)
        }
    }
}
