import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface CloudinaryUploadResponse {
  secure_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private cloudName = 'djy0fxyoq'; // reemplaza aquí
  private uploadPreset = 'angular_upload'; // reemplaza aquí
  private uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

  constructor(private http: HttpClient) {}

  uploadImage(file: string): Observable<CloudinaryUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post<CloudinaryUploadResponse>(this.uploadUrl, formData);
  }
}
