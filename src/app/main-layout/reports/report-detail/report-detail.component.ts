import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessService } from '../../../core/services/access.service';

interface Report {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-report-detail',
  template: `
    <div class="container">
      <div class="header">
        <h1>Report Details</h1>
        <div class="actions">
          <button *appGrant="'Reports'; action: grants['edit']" mat-raised-button color="primary" (click)="editReport()">
            <mat-icon>edit</mat-icon>
            Edit Report
          </button>
          <button mat-button (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Back to List
          </button>
        </div>
      </div>

      <mat-card class="detail-card">
        <mat-card-content>
          <div class="detail-section">
            <h2>Basic Information</h2>
            <div class="detail-row">
              <span class="label">Report Title:</span>
              <span class="value">{{ report.title }}</span>
            </div>
          </div>

          <div class="detail-section">
            <h2>Description</h2>
            <p class="description">{{ report.description }}</p>
          </div>

          <div class="detail-section">
            <h2>Timeline</h2>
            <div class="detail-row">
              <span class="label">Created:</span>
              <span class="value">{{ report.createdAt | date:'medium' }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Last Updated:</span>
              <span class="value">{{ report.updatedAt | date:'medium' }}</span>
            </div>
          </div>
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
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .actions {
      display: flex;
      gap: 16px;
    }
    .detail-card {
      margin-bottom: 20px;
    }
    .detail-section {
      margin-bottom: 24px;
    }
    .detail-section h2 {
      color: #333;
      margin-bottom: 16px;
      font-size: 1.2em;
    }
    .detail-row {
      display: flex;
      margin-bottom: 12px;
      align-items: center;
    }
    .label {
      font-weight: 500;
      width: 120px;
      color: #666;
    }
    .value {
      flex: 1;
    }
    .description {
      line-height: 1.6;
      color: #444;
    }
  `]
})
export class ReportDetailComponent implements OnInit {
  report: Report = {
    id: 0,
    title: '',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  // hasEditAccess = false;
  grants: {[key:string]: string} = {
    edit: 'Reports.UpdateReports'
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private accessService: AccessService
  ) {}

  ngOnInit() {
    // this.accessService.getAccessibleComponents('Reports').subscribe(actions => {
    //   this.hasEditAccess = actions.includes('edit');
    // });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const storedReports = localStorage.getItem('reports');
      if (storedReports) {
        const reports = JSON.parse(storedReports);
        const report = reports.find((r: Report) => r.id === +id);
        if (report) {
          this.report = {
            ...report,
            createdAt: new Date(report.createdAt),
            updatedAt: new Date(report.updatedAt)
          };
        } else {
          this.router.navigate(['/reports']);
        }
      }
    }
  }

  editReport() {
    this.router.navigate(['/reports', this.report.id, 'edit']);
  }

  goBack() {
    this.router.navigate(['/reports']);
  }
} 