import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonDirective,
  CollapseDirective,
  ContainerComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  FormControlDirective,
  FormDirective,
  NavbarBrandDirective,
  NavbarComponent,
  NavbarNavComponent,
  NavbarTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
} from '@coreui/angular';

@Component({
  selector: 'app-navBar',
  standalone: true,
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css'],
  imports: [
    CommonModule,
    NavbarComponent,
    ContainerComponent,
    NavbarBrandDirective,
    NavbarTogglerDirective,
    CollapseDirective,
    NavbarNavComponent,
    NavItemComponent,
    NavLinkDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    FormDirective,
    FormControlDirective,
    ButtonDirective,
  ],
})
export class NavBarComponent implements OnInit {
  public sidebarVisible = false;

  constructor() {}

  ngOnInit() {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
