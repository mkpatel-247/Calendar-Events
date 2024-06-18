import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbComponent } from 'src/shared/components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { SidebarComponent } from 'src/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DashboardComponent,
    SidebarComponent,
    BreadcrumbComponent,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
