import Notification from '../notification/notification'

export default abstract class EntityAbstract {
    protected notification: Notification

    protected constructor() {
        this.notification = new Notification()
    }
}
