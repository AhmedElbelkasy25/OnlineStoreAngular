import { Component } from '@angular/core';
import { AdminRoutingModule } from '../../admin/admin-routing-module';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './navBar/navBar.component';

@Component({
  selector: 'app-admin-component',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './admin-component.html',
  styleUrls: ['./admin-component.scss'],
})
export class AdminComponent {}
