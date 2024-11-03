import { useNotifications } from '@toolpad/core';
import {
  errorNotificationOptions,
  successNotificationOptions,
} from '../../config';
interface PromiseWithNotificationOptions<T> {
  successMsg: string;
  errorMsg: string;
  onSuccess?: (result: T) => void;
}

export const usePromiseWithNotification = () => {
  const notifications = useNotifications();
  return {
    execute: async <T = void>(
      promise: Promise<T>,
      options: PromiseWithNotificationOptions<T>
    ) => {
      const { successMsg, errorMsg, onSuccess } = options;
      try {
        const result = await promise;
        notifications.show(successMsg, successNotificationOptions);
        if (onSuccess) onSuccess(result);
      } catch (error) {
        notifications.show(errorMsg, errorNotificationOptions);
        console.error(error);
      }
    },
    close: notifications.close,
  };
};

