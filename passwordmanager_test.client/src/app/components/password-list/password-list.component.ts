import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit {
  passwords: any[] = [];
  originalPasswords: any[];
  searchTerm: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadPasswords();
  }

  loadPasswords() {
    const storedPasswords = localStorage.getItem('passwords');
    if (storedPasswords) {
      this.passwords = JSON.parse(storedPasswords);
      this.passwords.forEach(password => password.show = false);
      this.passwords.sort((a, b) => {
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      });
    }
  }


  search() {
    const term = this.searchTerm.toLowerCase();

    if (!this.originalPasswords) {
      this.originalPasswords = [...this.passwords];
    }

    this.passwords = this.originalPasswords.filter(password =>
      password.name.toLowerCase().includes(term)
    );

    if (term === '') {
      this.passwords = [...this.originalPasswords];
    }
  }

  togglePasswordVisibility(password: any) {
    password.show = !password.show;
  }

  navigateToAdd() {
    this.router.navigate(['/add-password']);
  }
}
