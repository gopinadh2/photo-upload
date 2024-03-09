import { Component, EventEmitter, Output } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-side-bar',
  templateUrl: './bottom-side-bar.component.html',
  styleUrls: ['./bottom-side-bar.component.css']
})
export class BottomSideBarComponent {
  showCamera: boolean = false;
  showGallery: boolean = false;
  @Output() openCameraEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSideBarComponent>) { }

  close(): void {
    this.bottomSheetRef.dismiss();
  }

  openCamera(source: string): void {
    this.showCamera = true;
    this.openCameraEvent.emit(source);
    this.bottomSheetRef.dismiss();

  }

}
