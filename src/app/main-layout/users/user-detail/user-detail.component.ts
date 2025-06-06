import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessService } from '../../../core/services/access.service';

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
  selector: 'app-user-detail',
  template: `
    <div class="container">
      <div class="header">
        <h1>User Details</h1>
        <div class="actions">
          <button *appGrant="'Users'; action: grants['update']" mat-raised-button color="primary" (click)="editUser()" matTooltip="Edit User">
            <mat-icon>edit</mat-icon>
            Edit User
          </button>
          <button mat-raised-button (click)="goBack()" matTooltip="Back to List">
            <mat-icon>arrow_back</mat-icon>
            Back to List
          </button>
        </div>
      </div>

      <mat-card class="user-card">
        <mat-card-content>
          <div class="detail-row">
            <span class="label">Username:</span>
            <span class="value">{{ user.username }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Email:</span>
            <span class="value">{{ user.email }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Role:</span>
            <span class="value">{{ user.role }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Status:</span>
            <span class="value" [ngClass]="user.status.toLowerCase()">{{ user.status }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Created:</span>
            <span class="value">{{ user.createdAt | date }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Last Updated:</span>
            <span class="value">{{ user.updatedAt | date }}</span>
          </div>
        </mat-card-content>
      </mat-card>
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
    .actions {
      display: flex;
      gap: 10px;
    }
    .user-card {
      max-width: 800px;
      margin: 0 auto;
    }
    .detail-row {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .label {
      flex: 0 0 150px;
      font-weight: bold;
      color: #666;
    }
    .value {
      flex: 1;
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
  `]
})
export class UserDetailComponent implements OnInit {
  user: User = {
    id: 0,
    username: '',
    email: '',
    role: '',
    status: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  grants: {[key:string]: string} = {
    update: 'Users.UpdateUsers'
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accessService: AccessService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const user = users.find((u: User) => u.id === +id);
        if (user) {
          this.user = {
            ...user,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt || user.createdAt)
          };
        }
      }
    }
  }

  editUser() {
    this.router.navigate(['/users', this.user.id, 'edit']);
  }

  goBack() {
    this.router.navigate(['/users']);
  }
} 