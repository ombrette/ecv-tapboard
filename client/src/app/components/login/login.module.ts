/* Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

/* Definition */
@NgModule({
    declarations: [ LoginComponent ],
    imports: [ CommonModule, FormsModule ],
    exports: [ LoginComponent ],
})

/* Export */
export class LoginModule {};