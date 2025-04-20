import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from './config';

@Injectable({ providedIn: 'root' })
export class FolderAccessService {
  constructor(private http: HttpClient) {}

  listFiles(folderId: string): Observable<any> {
    const params = new HttpParams()
      .set('q', `'${folderId}' in parents`)
      .set('key', CONFIG.GOOGLE_API_KEY)
      .set('fields', 'files(id, name)')
      .set('includeItemsFromAllDrives', 'true')
      .set('supportsAllDrives', 'true');

    return this.http.get(CONFIG.GOOGLE_API_URL, { params });
  }
}
