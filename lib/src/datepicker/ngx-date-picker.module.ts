import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatePickerComponent } from './ngx-date-picker.component';
import { NgxDatePickerDirective } from './ngx-date-picker.directive';
import { DATEPICKER_CONFIG, GlobalConfig, DefaultGlobalConfig } from '../config/datePicker-config';


@NgModule({
  declarations: [
    NgxDatePickerComponent,
    NgxDatePickerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxDatePickerDirective
  ]
})

export class NgxDatePickerModule {
  static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders<NgxDatePickerModule> {
    
    const value = {
      ...DefaultGlobalConfig,
      ...config
    }

    return {
      ngModule: NgxDatePickerModule,
      providers: [
        {
          provide: DATEPICKER_CONFIG,
          useValue: value
        }
      ]
    }
  }
}
