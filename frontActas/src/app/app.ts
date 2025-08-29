import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}


import { HttpClientModule } from '@angular/common/http';

export const appConfig = {
  providers: [
    // ...otros providers
    HttpClientModule,
  ]
};