import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LucideAngularModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lingobuddy');
  private router = inject(Router);

  get showHeader(): boolean {
    const url = this.router.url;
    return !url.startsWith('/login') && !url.startsWith('/register');
  }
}