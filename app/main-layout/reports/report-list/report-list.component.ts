import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from '../../../core/services/access.service';

interface Report {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-report-list',
  template: `
    <div class="container">
      <div class="header">
        <h1>Reports</h1>
        <button *appGrant="'Reports'; action: grants['create']" mat-raised-button color="primary" (click)="createReport()">
          <mat-icon>add</mat-icon>
          Create New Report
        </button>
      </div>

      <div class="reports-grid">
        <mat-card *ngFor="let report of reports" class="report-card">
          <mat-card-header>
            <mat-card-title>{{ report.title }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{ report.description }}</p>
            <p class="date">Created: {{ report.createdAt | date }}</p>
            <p class="date">Last Updated: {{ report.updatedAt | date }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button *appGrant="'Reports'; action: grants['view']" mat-icon-button color="primary" (click)="viewReport(report)" matTooltip="View Details">
              <mat-icon>visibility</mat-icon>
            </button>
            <button *appGrant="'Reports'; action: grants['update']" mat-icon-button color="primary" (click)="editReport(report)" matTooltip="Edit Report">
              <mat-icon>edit</mat-icon>
            </button>
            <button *appGrant="'Reports'; action: grants['delete']" mat-icon-button color="warn" (click)="deleteReport(report)" matTooltip="Delete Report">
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
    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .report-card {
      height: 100%;
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
export class ReportListComponent implements OnInit {
  reports: Report[] = [];

  grants: {[key: string]: string} = {
    update: 'Reports.UpdateReports',
    view: 'Reports.GetReports',
    delete: 'Reports.DeleteReports',
    create: 'Reports.CreateReports'
  }
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    const storedReports = localStorage.getItem('reports');
    if (storedReports) {
      const reports = JSON.parse(storedReports);
      this.reports = reports.map((report: any) => ({
        ...report,
        createdAt: new Date(report.createdAt),
        updatedAt: new Date(report.updatedAt || report.createdAt)
      }));
    } else {
      // Initialize with mock data
      this.reports = [
        {
          id: 1,
          title: 'Q1 Financial Report',
          description: 'Financial analysis and performance metrics for Q1 2024',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-20')
        },
        {
          id: 2,
          title: 'Annual Performance Review',
          description: 'Comprehensive review of company performance in 2023',
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-10')
        },
        {
          id: 3,
          title: 'Market Analysis',
          description: 'Detailed analysis of market trends and opportunities',
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date('2024-01-18')
        }
      ];
      localStorage.setItem('reports', JSON.stringify(this.reports));
    }
  }

  createReport() {
    this.router.navigate(['/reports/new']);
  }

  viewReport(report: Report) {
    this.router.navigate(['/reports', report.id]);
  }

  editReport(report: Report) {
    this.router.navigate(['/reports', report.id, 'edit']);
  }

  deleteReport(report: Report) {
    if (confirm(`Are you sure you want to delete ${report.title}?`)) {
      const storedReports = localStorage.getItem('reports');
      if (storedReports) {
        const reports = JSON.parse(storedReports);
        const updatedReports = reports.filter((r: Report) => r.id !== report.id);
        localStorage.setItem('reports', JSON.stringify(updatedReports));
        this.loadReports();
      }
    }
  }
} 