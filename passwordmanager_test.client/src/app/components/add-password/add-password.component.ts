import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.component.html',
  styleUrls: ['./add-password.component.css']
})
export class AddPasswordComponent {
  passwordForm: FormGroup;
  typeWarning: string = '';
  passwordWarning: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.passwordForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      type: ['site', Validators.required]
    });

    this.passwordForm.valueChanges.subscribe(() => {
      this.updateTypeWarning(this.passwordForm.get('type')?.value);
      this.updatePasswordWarning();
    });

    this.passwordForm.get('type')?.valueChanges.subscribe((type) => {
      this.setEmailValidation(type);
    });
  }

  private setEmailValidation(type: string) {
    const nameControl = this.passwordForm.get('name');
    if (type === 'email') {
      nameControl?.setValidators([Validators.required, Validators.email]);
    } else {
      nameControl?.setValidators([Validators.required]);
    }
    nameControl?.updateValueAndValidity();
  }

  private updateTypeWarning(type: string) {
    if (!this.passwordForm.valid) {
      if (type === 'email') {
        this.typeWarning = 'Введите правильный адрес электронной почты.';
      } else {
        this.typeWarning = 'Введите правильное наименование сайта.';
      }
    } else {
      this.typeWarning = '';
    }
  }

  private updatePasswordWarning() {
    const passwordControl = this.passwordForm.get('password');
    if (passwordControl && passwordControl.invalid && passwordControl.touched) {
      this.passwordWarning = 'Пароль должен содержать не менее 8 символов.';
    } else {
      this.passwordWarning = '';
    }
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const passwords = JSON.parse(localStorage.getItem('passwords') || '[]');
      const existing = passwords.find((p: any) => p.name === this.passwordForm.value.name);

      if (existing) {
        this.messageService.sendMessage('Такая запись уже существует', false);
        return;
      }

      const newPassword = {
        ...this.passwordForm.value,
        dateCreated: new Date()
      };

      passwords.push(newPassword);
      localStorage.setItem('passwords', JSON.stringify(passwords));
      this.messageService.sendMessage('Запись добавлена', true);
      this.router.navigate(['/']);
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
