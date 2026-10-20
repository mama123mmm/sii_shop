import {Component} from '@angular/core';
import {Home} from './home/home';
import {Footer} from './footer/footer';
import {Header} from './header/header';

@Component({
  selector: 'app-root',
  imports: [Home, Footer, Header],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sii_shop';
}
