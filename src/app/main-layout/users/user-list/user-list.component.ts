import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleDataService } from '../../../core/services/data/module.data.service';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-user-list',
  template: `
    <div class="container">
      <div class="header">
        <h1>Users</h1>
        <button *appGrant="'Users'; action: grants['create']" mat-raised-button color="primary" (click)="createUser()">
          <mat-icon>add</mat-icon>
          Create New User
        </button>
      </div>

      <div class="users-grid">
        <mat-card *ngFor="let user of users" class="user-card">
          <mat-card-header>
            <mat-card-title>{{ user.username }}</mat-card-title>
            <mat-card-subtitle>{{ user.role }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ user.email }}</p>
            <p class="status" [ngClass]="user.status ? user.status.toLowerCase() : ''">{{ user.status }}</p>
            <p class="date">Created: {{ user.createdAt | date }}</p>
            <p class="date">Last Updated: {{ user.updatedAt | date }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button *appGrant="'Users'; action: grants['view']" mat-icon-button color="primary" (click)="viewUser(user)" matTooltip="View Details">
              <mat-icon>visibility</mat-icon>
            </button>
            <button *appGrant="'Users'; action: grants['update']" mat-icon-button color="primary" (click)="editUser(user)" matTooltip="Edit User">
              <mat-icon>edit</mat-icon>
            </button>
            <button *appGrant="'Users'; action: grants['delete']" mat-icon-button color="warn" (click)="deleteUser(user)" matTooltip="Delete User">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .user-card {
      height: 100%;
    }
    .status {
      font-weight: bold;
      margin: 8px 0;
    }
    .active {
      color: #4caf50;
    }
    .inactive {
      color: #f44336;
    }
    .pending {
      color: #ff9800;
    }
    .date {
      color: #666;
      font-size: 0.9em;
      margin: 4px 0;
    }
    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  grants: {[key:string]: string} = {
    view: 'Users.GetUsers',
    create: 'Users.CreateUsers',
    update: 'Users.UpdateUsers',
    delete: 'Users.DeleteUsers'
  }

  constructor(
    private router: Router,
    private moduleDataService:ModuleDataService
  ) {}

  ngOnInit() {
   this.users =  this.moduleDataService.getData('users');
  }

  createUser() {
    this.router.navigate(['/users/new']);
  }

  viewUser(user: User) {
    this.router.navigate(['/users', user.id]);
  }

  editUser(user: User) {
    this.router.navigate(['/users', user.id, 'edit']);
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const updatedUsers = users.filter((u: User) => u.id !== user.id);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        this.users =  this.moduleDataService.getData('users');
      }
    }
  }
} 