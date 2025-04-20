import { Component } from '@angular/core';
import { FolderAccessService } from '../services/google/folder-access.service';

@Component({
  selector: 'drive-form',
  templateUrl: './drive-form.component.html',
  styleUrls: ['./drive-form.component.css']
})
export class DriveFormComponent {
  folderId: string = '';
  files: any[] = [];
  error: string = '';

  constructor(private folderService: FolderAccessService) {}

  fetchFiles() {
    this.folderService.listFiles(this.folderId).subscribe({
      next: (response) => {
        this.files = response.files;
        this.error = '';
      },
      error: (err) => {
        this.error = 'Failed to fetch files. Please check folder ID or API key.';
        console.error(err);
      }
    });
  }
}
