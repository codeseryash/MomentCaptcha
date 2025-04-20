import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, HostListener } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent {
  @Input() files: File[] = [];
  @Input() stepper!: MatStepper;

  @Output() shortlisted = new EventEmitter<File[]>();
  @Output() imageCountChange = new EventEmitter<number>();
  @Output() selectedImageCountChange = new EventEmitter<number>();

  images: File[] = [];
  selectedImages: File[] = [];
  currentIndex: number = 0;

  ngOnInit() {
    this.images = this.files.filter(file => file.type.startsWith('image'));
    this.imageCountChange.emit(this.images.length);
    this.selectedImageCountChange.emit(this.selectedImages.length);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['files']) {
      this.images = this.files?.filter(file => file.type.startsWith('image')) || [];
      this.currentIndex = 0;
      this.imageCountChange.emit(this.images.length);
      this.selectedImageCountChange.emit(this.selectedImages.length);
    }
  }

  prevImage() {
    if (this.images.length) {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }

  nextImage() {
    if (this.images.length) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

  toggleSelect(image: File) {
    const index = this.selectedImages.indexOf(image);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    } else {
      this.selectedImages.push(image);
    }
    this.shortlisted.emit(this.selectedImages);
    this.selectedImageCountChange.emit(this.selectedImages.length);
  }

  isSelected(image: File): boolean {
    return this.selectedImages.includes(image);
  }

  finishSelection() {
    this.shortlisted.emit(this.selectedImages);
    this.stepper.next();
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  onArrowLeft(event: KeyboardEvent) {
    this.prevImage();
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  onArrowRight(event: KeyboardEvent) {
    this.nextImage();
  }
}