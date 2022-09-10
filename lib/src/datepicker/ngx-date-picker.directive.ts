import { ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output, ViewContainerRef } from '@angular/core';
import { CalendarType, DATEPICKER_CONFIG, DefaultGlobalConfig, GlobalConfig, IDate, ThemeConfig, ValueFormat } from '../config/datePicker-config';
import { DatePickerHandler } from "../handlers";
import DateTransform from '../helpers/dateTransform';

@Directive({
  selector: '[ngx-date-picker]',
  providers: [
    DatePickerHandler
  ]
})

export class NgxDatePickerDirective {

  private inputElement!: HTMLInputElement;
  private datePickerComponentElement!: ComponentRef<any> | null;

  
  @Input("datePickerConfig") datePickerConfig: Partial<GlobalConfig> = {};
  @Input("datePickerType") calendar!: CalendarType;
  @Input("datePickerFormat") outPutFormat!: ValueFormat;
  @Output("onDateSelect") onSelect = new EventEmitter<Partial<IDate>>()

  constructor(
    @Inject(DATEPICKER_CONFIG) token: GlobalConfig,
    private _viewContainerRef: ViewContainerRef,
    private el: ElementRef,
    private dpHandler: DatePickerHandler
  ) {

    this.inputElement = this.el.nativeElement;
    this.inputElement.onfocus = () => {   

      console.log({...{rounded: DefaultGlobalConfig.themeConfig.rounded},
        ...{rounded: this.datePickerConfig.themeConfig?.rounded}});
      
      let themeConfig: Partial<ThemeConfig> = {
        ...{rounded: DefaultGlobalConfig.themeConfig.rounded},
        ...{rounded: this.datePickerConfig.themeConfig?.rounded},
        light: {
          ...DefaultGlobalConfig.themeConfig.light,
          ...this.datePickerConfig.themeConfig?.light,
        },
        dark: {
          ...DefaultGlobalConfig.themeConfig.dark,
          ...this.datePickerConfig.themeConfig?.dark
        },
      }
          
      const config = {
        ...DefaultGlobalConfig,
        ...this.datePickerConfig,
        themeConfig
      }

      console.log(config);
      
      // const config: GlobalConfig = {
      //   ...token,
      //   calendar: this.calendar || DefaultGlobalConfig.calendar,
      //   format: this.outPutFormat || DefaultGlobalConfig.format
      // }
      
      if(!this.dpHandler.datePickerIsOpened){
        this.datePickerComponentElement = this.dpHandler.init(this.inputElement, config, this._viewContainerRef)      
        this.datePickerComponentElement.instance.onDateSelect.subscribe((date: Date) => {

          const dateTransform = new DateTransform(date, config.calendar)
          const inputValue = dateTransform.transformDate(config.format)
          this.inputElement.value = inputValue

          const outputData = dateTransform.getOutputData(config.outputData)
          this.onSelect.next(outputData)

          this.closeDatePicker()
        })
      }
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if(this.datePickerComponentElement && this.datePickerComponentElement.location.nativeElement){      
      const isOutSideClick = !this.datePickerComponentElement.location.nativeElement.contains(event.target)
      if(isOutSideClick) this.closeDatePicker()
    }
  }

  closeDatePicker(){
    this.datePickerComponentElement = null;
    this.dpHandler.closeAndRemoveDatePicker()
  }
}