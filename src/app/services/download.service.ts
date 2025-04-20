import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  downloadFile(file: File) {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  }

  async downloadAll(files: File[]) {
    if (files.length === 1) {
      this.downloadFile(files[0]);
    } else {
      const zip = new JSZip();
      files.forEach(file => {
        zip.file(file.name, file);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'selected-files.zip');
    }
  }
}
