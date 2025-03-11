import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss']
})
export class GalleryPage {
  photosFromServer: any[] = [];

  constructor(
    public photoService: PhotoService, 
    private router: Router,
    private authService: AuthService
  ) {}

  async addPhoto() {
    try {
      const base64Data = await this.photoService.takePhotoBase64();
      this.photoService.uploadPhoto(base64Data).subscribe({
        next: (res: any) => {
          this.loadPhotos();
        },
        error: (err) => {
          console.error('Error al subir foto:', err);
        }
      });
    } catch (error) {
      console.error('Error al tomar foto:', error);
    }
  }

  ionViewWillEnter() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.photoService.getPhotos().subscribe({
      next: (res: any) => {
        this.photosFromServer = res;
      },
      error: (err) => {
        console.error('Error al cargar fotos:', err);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
