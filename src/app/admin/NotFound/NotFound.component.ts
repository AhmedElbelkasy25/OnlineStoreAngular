import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-NotFound',
  templateUrl: './NotFound.component.html',
  styleUrls: ['./NotFound.component.css'],
  imports: [RouterLink],
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
