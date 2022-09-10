import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatePickerComponent } from './ngx-date-picker.component';
import { NgxDatePickerDirective } from './ngx-date-picker.directive';
import { DATEPICKER_CONFIG, GlobalConfig, DefaultGlobalConfig, ThemeConfig } from '../config/datePicker-config';


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
    
    console.log({...{rounded: DefaultGlobalConfig.themeConfig.rounded},
      ...{rounded: config.themeConfig?.rounded}});
    let themeConfig: Partial<ThemeConfig> = {
      ...{rounded: DefaultGlobalConfig.themeConfig.rounded},
      ...{rounded: config.themeConfig?.rounded},
      light: {
        ...DefaultGlobalConfig.themeConfig.light,
        ...config.themeConfig?.light,
      },
      dark: {
        ...DefaultGlobalConfig.themeConfig.dark,
        ...config.themeConfig?.dark
      },
    }
        
    console.log(themeConfig);
    
    const value = {
      ...DefaultGlobalConfig,
      ...config,
      themeConfig
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
