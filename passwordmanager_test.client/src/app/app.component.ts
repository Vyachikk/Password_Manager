import { Component, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Password Manager';
  message = '';
  isSuccess = true;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.message$.subscribe(message => {
      this.message = message;
      this.showNotification();
    });

    this.messageService.isSuccess$.subscribe(isSuccess => {
      this.isSuccess = isSuccess;
    });
  }

  showNotification() {
    const notificationElement = document.querySelector('.notification');
    if (notificationElement) {
      notificationElement.classList.add('show');
      setTimeout(() => {
        notificationElement.classList.remove('show');
      }, 2000);
    }
  }
}
