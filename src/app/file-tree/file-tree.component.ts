import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { FileDataService } from '../services/local/file-data.service';
import { FileTreeNode } from 'src/common/FileTreeNode';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit {
  @Input() files: File[] = [];
  fileTree: FileTreeNode[] = [];

  constructor(private fileDataService: FileDataService) {}

  ngOnInit(): void {
    if (this.files?.length) {
      this.fileTree = this.fileDataService.getFileTreelocal(this.files);
    }
  }
}
