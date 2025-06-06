import { Component } from '@angular/core';

interface Settings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  timezone: string;
}

@Component({
  selector: 'app-settings',
  template: `
    <div class="container">
      <h1>Settings</h1>
      
      <mat-card>
        <mat-card-content>
          <form (ngSubmit)="saveSettings()" #settingsForm="ngForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Theme</mat-label>
              <mat-select [(ngModel)]="settings.theme" name="theme" required>
                <mat-option value="light">Light</mat-option>
                <mat-option value="dark">Dark</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Language</mat-label>
              <mat-select [(ngModel)]="settings.language" name="language" required>
                <mat-option value="en">English</mat-option>
                <mat-option value="es">Spanish</mat-option>
                <mat-option value="fr">French</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Timezone</mat-label>
              <mat-select [(ngModel)]="settings.timezone" name="timezone" required>
                <mat-option value="UTC">UTC</mat-option>
                <mat-option value="EST">EST</mat-option>
                <mat-option value="PST">PST</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-slide-toggle
              [(ngModel)]="settings.notifications"
              name="notifications"
              class="full-width">
              Enable Notifications
            </mat-slide-toggle>

            <div class="actions">
              <button *appGrant="'Settings'; action: grants['update']" mat-raised-button color="primary" type="submit" [disabled]="!settingsForm.form.valid">
                Save Settings
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
    mat-card {
      margin-top: 20px;
    }
  `]
})
export class SettingsComponent {
  settings: Settings = {
    theme: 'light',
    notifications: true,
    language: 'en',
    timezone: 'UTC'
  };
  // hasEditAccess = false;

  grants: {[key: string]: string} = {
    update: 'Settings.UpdateSettings'
  }

  constructor() {}

  saveSettings() {
    // In a real app, save to a service
    console.log('Saving settings:', this.settings);
  }
} 