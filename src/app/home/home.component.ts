import { Component, ViewChild, ElementRef } from '@angular/core';
import { FileTreeNode } from 'src/common/FileTreeNode';
import { FileDataService } from '../services/local/file-data.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private fileDataService: FileDataService) {}
  viewMode: 'LIST' | 'IMAGE' = 'LIST';
  tabIndex = 0;

  onTabChange(index: number) {
    this.viewMode = index === 0 ? 'LIST' : 'IMAGE';
  }
  loading = false;
  chooseClicked = false;
  fileTree: FileTreeNode[]= []; //[];
  selectedFiles: File[] =[];
  shortlisted: File[] =[];
  
  imageCount: number = 0;
  selectedImageCount: number = 1;

  @ViewChild('folderInputRef') folderInputRef!: ElementRef<HTMLInputElement>;

  onFolderSelected(event: any, stepper: MatStepper): void {
    event.preventDefault();
    this.loading = true;
    const files = event.target.files;
    if (!files || files.length === 0) {
      this.loading= false;
      console.log('User canceled folder selection.');
      return;
    }
    this.finishUpload( Array.from(files), stepper);
  }

  onDrop(event: DragEvent, stepper: MatStepper): void {
    event.preventDefault();
    this.loading = true;
  
    const items = event.dataTransfer?.items;
    const files: File[] = [];
  
    if (items) {
      const promises: Promise<void>[] = [];
  
      for (let i = 0; i < items.length; i++) {
        const entry = items[i].webkitGetAsEntry();
        if (entry) {
          promises.push(this.readEntry(entry, files));
        }
      }
  
      Promise.all(promises).then(() => {
        this.finishUpload(files, stepper);
      });
    }
  }

  readEntry(entry: FileSystemEntry, files: File[]): Promise<void> {
    return new Promise((resolve) => {
      if (entry.isFile) {
        const fileEntry = entry as FileSystemFileEntry;
        fileEntry.file(file => {
          files.push(file);
          resolve();
        });
      } else if (entry.isDirectory) {
        const dirReader = (entry as FileSystemDirectoryEntry).createReader();
        dirReader.readEntries(entries => {
          const subPromises = Array.from(entries).map(e => this.readEntry(e, files));
          Promise.all(subPromises).then(() => resolve());
        });
      }
    });
  }
  
  finishUpload(files: File[], stepper: MatStepper): void{
    this.selectedFiles = files;
    this.loading = false;
    if(this.selectedFiles.filter(file => file.type.startsWith('image')).length > 0){
      this.tabIndex = 1;
      this.onTabChange(this.tabIndex);
    }
    stepper.next();
  }
  

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  triggerFolderInput(): void {
    //this.browser_local();
  }
  browser_local():void{
      const fileInput = document.getElementById('folderInputModelOpener') as HTMLInputElement;
      fileInput?.click();
  }


  // toggleViews(event): void {
  //   var {event} = event;
  //   var mode = event.target.value;
  //   this.previewImages = false;
  //   this.viewAllFiles = false;

  //   if(mode === 'LIST'){
  //     this.viewAllFiles = true;
  //   }
  //   if(mode === 'IMAGE'){
  //     this.previewImages = true;
  //   }
  // }
 

}
