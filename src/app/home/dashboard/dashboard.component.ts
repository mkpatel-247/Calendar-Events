import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../../auth/auth.component';
import { SidebarComponent } from 'src/shared/components/sidebar/sidebar.component';
import { BreadcrumbComponent } from 'src/shared/components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AuthComponent,
    SidebarComponent,
    BreadcrumbComponent,
    HeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
