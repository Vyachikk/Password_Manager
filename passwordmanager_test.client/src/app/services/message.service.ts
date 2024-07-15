import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<string>('');
  private isSuccessSubject = new BehaviorSubject<boolean>(true);

  message$ = this.messageSubject.asObservable();
  isSuccess$ = this.isSuccessSubject.asObservable();

  sendMessage(message: string, isSuccess: boolean) {
    this.messageSubject.next(message);
    this.isSuccessSubject.next(isSuccess);
  }
}
