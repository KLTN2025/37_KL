/* app/components/Notification.tsx */
import styles from "./notification.module.css";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification = ({ message, onClose }: NotificationProps) => {
  return (
    <div className={styles.notification}>
      {message}
      <button onClick={onClose}>✕</button>
    </div>
  );
};

export default Notification;