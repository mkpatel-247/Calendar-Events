import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

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
    RouterModule,
    BreadcrumbComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
