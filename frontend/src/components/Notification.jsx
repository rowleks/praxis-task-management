import { useNotification } from '../context/NotificationContext'

export function Notification() {
  const { notification, clearNotification } = useNotification()

  if (!notification) {
    return null
  }

  return (
    <div className={`notification notification-${notification.type}`}>
      <span>{notification.message}</span>
      <button className="btn-close" onClick={clearNotification}>
        &times;
      </button>
    </div>
  )
}
