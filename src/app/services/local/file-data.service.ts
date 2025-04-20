import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FileTreeNode } from 'src/common/FileTreeNode';

@Injectable({ providedIn: 'root' })
export class FileDataService {

  getFileTreelocal(files: File[]): FileTreeNode[] {
    const tree: { [key: string]: FileTreeNode } = {};
    const root: FileTreeNode[] = [];
    files.forEach(file => {
      const parts = file.webkitRelativePath.split('/');
      let currentLevel = root;
      let currentPath = '';
      console.log(parts);
        parts.forEach((part, index) => {
          currentPath += (index > 0 ? '/' : '') + part;
          console.log(currentPath);

          const isFile = index === parts.length - 1;
          console.log(isFile);
          console.log(file.type);
          let existing = currentLevel.find(f => f.name === part);
          
          if (!existing) {
            existing = {
              name: part,
              path: currentPath,
              type: isFile? file.type.toLowerCase() : 'folder',
              isImage: isFile && file.type.startsWith('image'),
              filesAndFolder: isFile ? undefined : [],
              File: isFile ? file : undefined,
              expanded: false
            };
            currentLevel.push(existing);
          }
          
          if (!isFile && existing.filesAndFolder) {
            currentLevel = existing.filesAndFolder;
          }
        });
      });
      console.log(root);
      return root;
    }

  getFileTree(mode:string = 'LOCAL', files?:File[]): Observable<FileTreeNode[]> {
    if(mode === 'LOCAL'){
      return of(this.getFileTreelocal(files || []));
    }
    return of([]);
  }
}
