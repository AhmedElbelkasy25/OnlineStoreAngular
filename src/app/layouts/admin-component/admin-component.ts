import { Component } from '@angular/core';
import { AdminRoutingModule } from '../../admin/admin-routing-module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-component',
  standalone: true,
  imports: [AdminRoutingModule, RouterOutlet],
  templateUrl: './admin-component.html',
  styleUrls: ['./admin-component.css'],
})
export class AdminComponent {}
