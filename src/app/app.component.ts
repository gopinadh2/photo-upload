import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSideBarComponent } from './bottom-side-bar/bottom-side-bar.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showCamera: boolean = false;
  @ViewChild('video')
  video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  capturedImages: string[] = [];
  images: string[] = [];
  maxImages = 6;
  source!: string;
  constructor(private bottomSheet: MatBottomSheet,
    private router: Router
  ) { }
  ngAfterViewInit() {
    const context = this.canvas?.nativeElement.getContext('2d');
  }

  captureImage(imageData: string) {
    if (this.images.length < 6) {
      this.images.push(imageData);
    }
  }

  openBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(BottomSideBarComponent);
    bottomSheetRef.instance.openCameraEvent.subscribe(async (source: string) => {
      this.showCamera = true
      this.source;
      console.log(source, 's')
      if (source === 'camera') {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });

          if (stream) {
            this.video.nativeElement.srcObject = stream;
            await new Promise(resolve => this.video.nativeElement.onloadedmetadata = resolve);

            const context = this.canvas.nativeElement.getContext('2d');

            this.canvas.nativeElement.width = 150;
            this.canvas.nativeElement.height = 150;

            context?.drawImage(this.video.nativeElement, 0, 0);

            const capturedImage = this.canvas.nativeElement.toDataURL('image/jpeg', 0.8);
            this.capturedImages.push(capturedImage);

            this.video.nativeElement.pause();
            this.video.nativeElement.srcObject = null;
            // ... Release camera resources (consider adding cleanup)
          } else {
            console.error('Camera access not supported');
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
        }

      } else if (source === 'gallery') {

        if (this.capturedImages.length >= this.maxImages) {
          alert('You can select a maximum of 6 images.');
          return;
        }
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.addEventListener('change', (event) => {
          console.log(event.target, 'oo')
          const files = (event.target as HTMLInputElement)?.files;
          if (files && files.length > 0) {
            const imagesToAdd = Math.min(this.maxImages - this.capturedImages.length, files.length);
            const reader = new FileReader();
            reader.onload = (e) => {

              this.capturedImages.push(e.target?.result as string);
            };
            for (let i = 0; i < imagesToAdd; i++) {
              reader.readAsDataURL(files[i]);
            }
          }
        });
        input.click();
      }
    });

  }

  openCamera(source: string): void {
    this.showCamera = true;
    this.source = source;
  }

  removeImage(index: number) {
    this.capturedImages.splice(index, 1);
  }
  reorderImages(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
  }
}





