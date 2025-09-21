// utils/toast.js
import { toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define custom shake transition
const Shake = cssTransition({
  enter: 'toast-shake',
  exit: 'toast-shake',
  duration: 500,
});

/**
 * Reusable toast notification
 * @param {'success' | 'error' | 'info' | 'warn'} type
 * @param {string} message
 */
export const notify = (type = 'info', message = '') => {
  toast[type](message, {
    transition: Shake,
    position: 'top-right',
    autoClose: 3000, // auto close after 3s
    hideProgressBar: false,
    closeOnClick: true, // allow close by clicking
    pauseOnHover: true, // pause timer when hovered
    draggable: true, // allow drag-to-close
    closeButton: true, // show close (X) button
  });
};
