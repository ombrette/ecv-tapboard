import { Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  // Définition des variables
  private appTitle = "Titre de l'application";
  private appSubTitle = "Sous-titre de l'application"

}