import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Report {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-report-edit',
  template: `
    <div class="report-edit">
      <h2>{{ isNew ? 'Create New Report' : 'Edit Report' }}</h2>
      <form (ngSubmit)="saveReport()">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" [(ngModel)]="report.title" name="title" required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" [(ngModel)]="report.description" name="description" rows="4" required></textarea>
        </div>
        <div class="actions">
          <button type="button" (click)="goBack()">Cancel</button>
          <button type="submit" *appGrant="'Reports'; action: isNew ? grants['create'] : grants['update'] ">Save</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .report-edit {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[type="submit"] {
      background-color: #007bff;
      color: white;
    }
    button[type="button"] {
      background-color: #6c757d;
      color: white;
    }
  `]
})
export class ReportEditComponent implements OnInit {
  report: Report = {
    id: 0,
    title: '',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  isNew = true;
  grants: {[key: string]: string} = {
    create: "Reports.CreateReports",
    update: "Reports.UpdateReports"
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isNew = false;
      const storedReports = localStorage.getItem('reports');
      if (storedReports) {
        const reports = JSON.parse(storedReports);
        const report = reports.find((r: Report) => r.id === +id);
        if (report) {
          this.report = {
            ...report,
            createdAt: new Date(report.createdAt),
            updatedAt: new Date(report.updatedAt || report.createdAt)
          };
        }
      }
    }
  }

  saveReport() {
    const storedReports = localStorage.getItem('reports');
    let reports: Report[] = [];
    
    if (storedReports) {
      reports = JSON.parse(storedReports);
    }

    if (this.isNew) {
      this.report.id = reports.length + 1;
      this.report.createdAt = new Date();
      this.report.updatedAt = new Date();
      reports.push(this.report);
    } else {
      const index = reports.findIndex(r => r.id === this.report.id);
      if (index !== -1) {
        this.report.updatedAt = new Date();
        reports[index] = this.report;
      }
    }

    localStorage.setItem('reports', JSON.stringify(reports));
    this.router.navigate(['/reports']);
  }

  goBack() {
    this.router.navigate(['/reports']);
  }
} 