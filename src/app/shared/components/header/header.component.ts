import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { TOKEN } from '../../constant/keys.constant';
import { getLocalStorage } from '../../common/function';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router, private http: HttpService) {}

  /**
   * Remove Token from localStorage and make the user logout from website.
   */
  logoutButton() {
    this.http.logout().subscribe({
      next: (response: any) => {
        console.log(response);

        localStorage.removeItem(TOKEN);
        this.router.navigateByUrl('/');
      },
    });
  }
}
