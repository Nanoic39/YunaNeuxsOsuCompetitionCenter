import type {
  MessageApiInjection,
  DialogApiInjection,
  NotificationApiInjection,
  LoadingBarApiInjection,
} from "naive-ui";

declare global {
  interface Window {
    $message: MessageApiInjection;
    $dialog: DialogApiInjection;
    $notification: NotificationApiInjection;
    $loadingBar: LoadingBarApiInjection;
  }
}

export {};
