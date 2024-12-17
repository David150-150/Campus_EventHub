import { toast } from 'react-toastify';

export default function Notification({ message, type }) {
  if (message) {
    if (type === 'error') {
      toast.error(message);
    } else if (type === 'success') {
      toast.success(message);
    }
  }
  return null;
} 