/**
 * Toast Component
 * Displays a temporary notiifcation message that automatically disappears after 5 seconds.
 */

import { useEffect } from 'react';
import '../../styles/Toast.css';

const Toast = ({ message, onClose }) => {
  // Set up auto-dismiss timer when component mounts
  useEffect(() => {
    // Create a timer to automatically close toast after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    // Cleanup function to clear timer if component unmounts
    return () => clearTimeout(timer);
  }, [onClose]); // Re-run effect if onClose function changes
  // Render toast with provided message
  return (
    <div className="toast">
      {message}
    </div>
  );
};

export default Toast; 