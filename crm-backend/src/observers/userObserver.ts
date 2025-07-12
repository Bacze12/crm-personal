// Observer para eventos de usuario
export type UserEvent = 'created' | 'updated' | 'deleted';

export type UserEventListener = (event: UserEvent, user: any) => void;

export class UserObserver {
  private listeners: UserEventListener[] = [];

  subscribe(listener: UserEventListener) {
    this.listeners.push(listener);
  }

  notify(event: UserEvent, user: any) {
    for (const listener of this.listeners) {
      listener(event, user);
    }
  }
}
