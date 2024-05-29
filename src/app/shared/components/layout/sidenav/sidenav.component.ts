import { Component, Input, computed, signal } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemModel } from './menu-item.model';

@Component({
  selector: 'metavision-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  // دکمه های منوی کناری
  menuItems = signal<MenuItemModel[]>([
    {
      icon: 'dashboard',
      label: 'داشبورد',
      route: 'dashboard',
    },
    {
      icon: 'apps',
      label: 'دسته بندی محصولات',
      route: 'product-categories',
    },
  ]);
  // دکمه های منوی کناری

  // تغییر اندازه منوی کناری
  sidenavCollapsed = signal<boolean>(false);
  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }
  // تغییر اندازه منوی کناری

  // تغییر اندازه ی عکس پروفایل داخل منوی کناری
  setProfilePicSize = computed(() => (this.sidenavCollapsed() ? '32' : '100'));
}
