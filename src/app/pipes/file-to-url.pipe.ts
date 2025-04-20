import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileToUrl'
})
export class FileToUrlPipe implements PipeTransform {
  transform(file: File): string | null {
    return file ? URL.createObjectURL(file) : null;
  }
}
