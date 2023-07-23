import Notification from '../notification/notification'

export default abstract class EntityAbstract {
    public notification: Notification

    protected constructor() {
        this.notification = new Notification()
    }
}
