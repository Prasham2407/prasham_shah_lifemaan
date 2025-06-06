import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

interface File {
  id: number;
  name: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: Date;
}

@Component({
  selector: 'app-file-list',
  template: `
    <div class="file-list">
      <div class="header">
        <h2>Files</h2>
        <button *appGrant="'Files'; action: grants['create']" mat-raised-button color="primary" (click)="createFile()">
          <mat-icon>add</mat-icon>
          Upload File
        </button>
      </div>

      <mat-table [dataSource]="dataSource" matSort>
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
          <mat-cell *matCellDef="let file">{{file.name}}</mat-cell>
        </ng-container>

        <!-- Size Column -->
        <ng-container matColumnDef="size">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Size</mat-header-cell>
          <mat-cell *matCellDef="let file">{{file.size | fileSize}}</mat-cell>
        </ng-container>

        <!-- Type Column -->
        <ng-container matColumnDef="type">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Type</mat-header-cell>
          <mat-cell *matCellDef="let file">{{file.type}}</mat-cell>
        </ng-container>

        <!-- Uploaded By Column -->
        <ng-container matColumnDef="uploadedBy">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Uploaded By</mat-header-cell>
          <mat-cell *matCellDef="let file">{{file.uploadedBy}}</mat-cell>
        </ng-container>

        <!-- Uploaded At Column -->
        <ng-container matColumnDef="uploadedAt">
          <mat-header-cell *matHeaderCellDef mat-sort-header>Uploaded At</mat-header-cell>
          <mat-cell *matCellDef="let file">{{file.uploadedAt | date:'medium'}}</mat-cell>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let file">
            <button *appGrant="'Files'; action: grants['update']" mat-icon-button color="primary" (click)="editFile(file)">
              <mat-icon>edit</mat-icon>
            </button>
            <button *appGrant="'Files'; action: grants['delete']" mat-icon-button color="warn" (click)="deleteFile(file)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>

      <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of files"></mat-paginator>
    </div>
  `,
  styles: [`
    .file-list {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    mat-table {
      width: 100%;
      margin-bottom: 20px;
    }
    .mat-column-actions {
      width: 120px;
      text-align: center;
    }
  `]
})
export class FileListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'size', 'type', 'uploadedBy', 'uploadedAt', 'actions'];
  dataSource: MatTableDataSource<File>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  grants: {[key: string]: string} = {
    create: 'Files.UploadFiles',
    update: 'Files.UpdateFiles',
    delete: 'Files.DeleteFiles'
  }

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource<File>([]);
  }

  ngOnInit() {
    const storedFiles = localStorage.getItem('files');
    if (storedFiles) {
      const files = JSON.parse(storedFiles);
      this.dataSource.data = files.map((file: any) => ({
        ...file,
        uploadedAt: new Date(file.uploadedAt)
      }));
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  createFile() {
    this.router.navigate(['/files/new']);
  }

  editFile(file: File) {
    this.router.navigate(['/files', file.id]);
  }

  deleteFile(file: File) {
    if (confirm('Are you sure you want to delete this file?')) {
      const storedFiles = localStorage.getItem('files');
      if (storedFiles) {
        const files = JSON.parse(storedFiles);
        const updatedFiles = files.filter((f: File) => f.id !== file.id);
        localStorage.setItem('files', JSON.stringify(updatedFiles));
        this.dataSource.data = updatedFiles;
      }
    }
  }
} 