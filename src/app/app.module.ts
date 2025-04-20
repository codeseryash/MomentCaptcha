import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DriveFormComponent } from './drive-form/drive-form.component';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FolderAccessService } from './services/google/folder-access.service';
import { FileDataService } from './services/local/file-data.service';
import { DownloadService } from './services/download.service';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FileToUrlPipe } from './pipes/file-to-url.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DownloadComponent } from './download/download.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, DriveFormComponent, FileTreeComponent, HomeComponent, FooterComponent, ImagePreviewComponent, FileToUrlPipe, DownloadComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, MatButtonModule, MatStepperModule, BrowserAnimationsModule, MatTabsModule
    , ScrollingModule
  ],
  providers: [FolderAccessService, FileDataService, DownloadService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
