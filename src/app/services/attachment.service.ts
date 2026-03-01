import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../environments/environments';
import { IAttachment } from '../models/attachment.model';
import { ISuccessMessage } from '../models/success-message.model';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  baseUrl = `${environment.API_URL}/tickets`;

  constructor(private http: HttpClient) {}

  uploadFile(file: File, ticketId: number) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http
      .post<IAttachment>(`${this.baseUrl}/${ticketId}/attachments`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              return {
                progress: Math.round((100 * event.loaded) / event.total!),
                isDone: false,
                body: null,
              };
            case HttpEventType.Response:
              return {
                progress: 100,
                isDone: true,
                body: event.body,
              };
            default:
              return null;
          }
        }),
      );
  }

  deleteAttachment(id: number) {
    return this.http.delete<ISuccessMessage>(`${this.baseUrl}/${id}/attachments`);
  }

  downloadAttachment(id: number) {
    return `${environment.API_URL}/attachments/download/${id}`;
  }
}
