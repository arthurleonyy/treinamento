<<<<<<< HEAD
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterModule } from '@angular/router';

import { AlertCustomComponent } from './components/alert-custom/alert-custom.component';
import { LoadingCustomComponent } from './components/loading-custom/loading-custom.component';
import { PaginatorCustomComponent } from './components/paginator-custom/paginator-custom.component';
import { TableCustomComponent } from './components/table-custom/table-custom.component';
import { LoadingCustomInterceptor } from './components/loading-custom/config/loading-custom-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TableEmptyDirective } from './components/table-custom/config/table-empty.directive';
import { TableBodyDirective } from './components/table-custom/config/table-body.directive';
import { TableHeaderDirective } from './components/table-custom/config/table-header.directive';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { UpperCaseDirective } from './directives/upper-case.directive';



=======
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertCustomComponent } from './components/alert-custom/alert-custom.component';
import { LoadingCustomInterceptor } from './components/loading-custom/config/loading-custom-interceptor';
import { LoadingCustomComponent } from './components/loading-custom/loading-custom.component';
import { PaginatorCustomComponent } from './components/paginator-custom/paginator-custom.component';
import { TableBodyDirective } from './components/table-custom/config/table-body.directive';
import { TableEmptyDirective } from './components/table-custom/config/table-empty.directive';
import { TableHeaderDirective } from './components/table-custom/config/table-header.directive';
import { TableCustomComponent } from './components/table-custom/table-custom.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { UpperCaseDirective } from './directives/upper-case.directive';

>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5
@NgModule({
  declarations: [
    AlertCustomComponent,
    LoadingCustomComponent,
    PaginatorCustomComponent,
    TableCustomComponent,
    TableHeaderDirective,
    TableBodyDirective,
    TableEmptyDirective,
    UpperCaseDirective,
    OnlyNumberDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBorderRadius: '0px',
      fullScreenBackdrop: true,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
<<<<<<< HEAD
      primaryColour: '#007bff',
      secondaryColour: '#0069d9',
      tertiaryColour: '#007bff'
=======
      primaryColour: '#dc3545',
      secondaryColour: '#dc3545',
      tertiaryColour: '#dc3545'
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5
    }),
  ],
  exports: [
    LoadingCustomComponent,
    TableCustomComponent,
    TableHeaderDirective,
    TableBodyDirective,
    TableEmptyDirective,
    PaginatorCustomComponent,
    UpperCaseDirective,
    AlertCustomComponent,
    OnlyNumberDirective,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingCustomInterceptor,
      multi: true
<<<<<<< HEAD
    }
=======
    },
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
<<<<<<< HEAD
 }
=======
}
>>>>>>> 394ee876be0d38e76ef99cf003aa6a7c58a33af5
