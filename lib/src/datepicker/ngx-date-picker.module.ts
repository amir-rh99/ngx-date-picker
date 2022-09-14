import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatePickerComponent } from './ngx-date-picker.component';
import { NgxDatePickerDirective } from './ngx-date-picker.directive';
import { DATEPICKER_CONFIG, GlobalConfig, DefaultGlobalConfig, DeepPartial } from '../config/datePicker-config';
import { DefaultsDeep } from '../helpers/functions';
import { NgxDatePickerService } from './ngx-date-picker.service';

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
  ],
  providers: [
    NgxDatePickerService
  ]
})

export class NgxDatePickerModule {
  static forRoot(config: DeepPartial<GlobalConfig> = {}): ModuleWithProviders<NgxDatePickerModule> {
    
    const value: GlobalConfig = DefaultsDeep(config, DefaultGlobalConfig)

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
