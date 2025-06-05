import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  template: `
    <div class="access-denied">
      <mat-icon class="icon">lock</mat-icon>
      <h2>Access Denied</h2>
      <p *ngIf="moduleName">You don't have permission to access {{ moduleName }}.</p>
      <p *ngIf="customMessage">{{ customMessage }}</p>
      <p *ngIf="!moduleName && !customMessage">You don't have permission to access this resource.</p>
      <button mat-raised-button color="primary" routerLink="/">Go to Dashboard</button>
    </div>
  `,
  styles: [`
    .access-denied {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      padding: 20px;
      text-align: center;
    }
    .icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      color: #f44336;
      margin-bottom: 16px;
    }
    h2 {
      margin: 0 0 8px;
      color: #f44336;
    }
    p {
      margin: 0 0 24px;
      color: #666;
    }
  `]
})
export class AccessDeniedComponent {
  @Input() moduleName?: string;
  @Input() customMessage?: string;
} 