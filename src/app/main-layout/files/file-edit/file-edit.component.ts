import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface File {
  id: number;
  name: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: Date;
}

@Component({
  selector: 'app-file-edit',
  template: `
    <div class="file-edit">
      <h2>{{ isNew ? 'Upload New File' : 'Edit File' }}</h2>
      <form (ngSubmit)="saveFile()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>File Name</mat-label>
          <input matInput [(ngModel)]="file.name" name="name" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>File Type</mat-label>
          <mat-select [(ngModel)]="file.type" name="type" required>
            <mat-option value="PDF">PDF</mat-option>
            <mat-option value="DOCX">DOCX</mat-option>
            <mat-option value="XLSX">XLSX</mat-option>
            <mat-option value="TXT">TXT</mat-option>
            <mat-option value="JPG">JPG</mat-option>
            <mat-option value="PNG">PNG</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>File Size (bytes)</mat-label>
          <input matInput type="number" [(ngModel)]="file.size" name="size" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Uploaded By</mat-label>
          <input matInput [(ngModel)]="file.uploadedBy" name="uploadedBy" required>
        </mat-form-field>

        <div class="actions">
          <button mat-button type="button" (click)="goBack()">Cancel</button>
          <button *appGrant="'Files'; action: isNew ? grants['create']: grants['update']" mat-raised-button color="primary" type="submit">Save</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .file-edit {
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
export class FileEditComponent implements OnInit {
  file: File = {
    id: 0,
    name: '',
    size: 0,
    type: '',
    uploadedBy: '',
    uploadedAt: new Date()
  };
  isNew = true;
  grants: {[key:string]: string} = {
    create: 'Files.UploadFiles',
    update: 'Files.UpdateFiles'
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isNew = false;
      const storedFiles = localStorage.getItem('files');
      if (storedFiles) {
        const files = JSON.parse(storedFiles);
        const file = files.find((f: File) => f.id === +id);
        if (file) {
          this.file = { ...file, uploadedAt: new Date(file.uploadedAt) };
        }
      }
    }
  }

  saveFile() {
    const storedFiles = localStorage.getItem('files');
    let files: File[] = [];
    
    if (storedFiles) {
      files = JSON.parse(storedFiles);
    }

    if (this.isNew) {
      this.file.id = files.length + 1;
      files.push(this.file);
    } else {
      const index = files.findIndex(f => f.id === this.file.id);
      if (index !== -1) {
        files[index] = this.file;
      }
    }

    localStorage.setItem('files', JSON.stringify(files));
    this.router.navigate(['/files']);
  }

  goBack() {
    this.router.navigate(['/files']);
  }
} 