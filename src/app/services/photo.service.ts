import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'http://localhost:4000/api/photos';

  constructor(private http: HttpClient,
                private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getPhotos() {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  uploadPhoto(base64Data: string) {
    return this.http.post(`${this.apiUrl}/upload`, { imageBase64: base64Data });
  }

  async takePhotoBase64(): Promise<string> {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 90
    });
    return photo.base64String || '';
  }
}
