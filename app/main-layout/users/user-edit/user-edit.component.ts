import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

@Component({
  selector: 'app-user-edit',
  template: `
    <div class="user-edit">
      <h2>{{ isNew ? 'Create New User' : 'Edit User' }}</h2>
      <form (ngSubmit)="saveUser()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="user.name" name="name" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput type="email" [(ngModel)]="user.email" name="email" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Role</mat-label>
          <mat-select [(ngModel)]="user.role" name="role" required>
            <mat-option value="Admin">Admin</mat-option>
            <mat-option value="User">User</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="actions">
          <button mat-button type="button" (click)="goBack()">Cancel</button>
          <button mat-raised-button color="primary" type="submit">Save</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .user-edit {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }
    .actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  `]
})
export class UserEditComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    role: 'User',
    createdAt: new Date()
  };
  isNew = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isNew = false;
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const user = users.find((u: User) => u.id === +id);
        if (user) {
          this.user = { ...user, createdAt: new Date(user.createdAt) };
        }
      }
    }
  }

  saveUser() {
    const storedUsers = localStorage.getItem('users');
    let users: User[] = [];
    
    if (storedUsers) {
      users = JSON.parse(storedUsers);
    }

    if (this.isNew) {
      this.user.id = users.length + 1;
      users.push(this.user);
    } else {
      const index = users.findIndex(u => u.id === this.user.id);
      if (index !== -1) {
        users[index] = this.user;
      }
    }

    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['/users']);
  }

  goBack() {
    this.router.navigate(['/users']);
  }
} 