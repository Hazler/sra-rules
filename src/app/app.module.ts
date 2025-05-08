import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectionComponent as SectionComponent } from './components/section/section.component';
import { TransformRefsPipe } from './pipes/transform-refs.pipe';
import { AttachmentsComponent } from './components/attachments/attachments.component';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { RulesComponent } from './components/rules/rules.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { MatCardModule } from '@angular/material/card';
import { HighlightNewPipe } from './pipes/highlight-new.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxRerenderModule } from 'ngx-rerender';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './components/search/search.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HighlightPipe } from './pipes/highlight.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { LimitPipe } from './pipes/limit.pipe';
import { SettingsComponent } from './components/settings/settings.component';
import { MatSelectModule } from '@angular/material/select';
import { ThemedImagePipe } from './pipes/themed-image.pipe';
import { SectionListComponent } from "./components/section-list/section-list.component";

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    SectionListComponent,
    TransformRefsPipe,
    AttachmentsComponent,
    RulesComponent,
    HeaderComponent,
    SideNavigationComponent,
    HighlightNewPipe,
    SanitizeHtmlPipe,
    SearchComponent,
    HighlightPipe,
    LimitPipe,
    SettingsComponent,
    ThemedImagePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatCheckboxModule,
    AppRoutingModule,
    NgxRerenderModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
