import { Component, Input, Output } from '@angular/core';
import { DownloadService} from '../services/download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
    @Input() DownloadableFiles: File[];
    constructor (private downloadService: DownloadService) {
      
    }
    downloadSelected() {
      this.downloadService.downloadAll(this.DownloadableFiles);
    }
}
