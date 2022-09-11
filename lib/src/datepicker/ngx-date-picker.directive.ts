import { ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output, ViewContainerRef } from '@angular/core';
import { DATEPICKER_CONFIG, DeepPartial, GlobalConfig, IDate } from '../config/datePicker-config';
import { DatePickerHandler } from "../handlers";
import DateTransform from '../helpers/dateTransform';
import { DefaultsDeep } from '../helpers/functions';

@Directive({
  selector: '[ngx-date-picker]',
  providers: [
    DatePickerHandler
  ]
})

export class NgxDatePickerDirective {

  private inputElement!: HTMLInputElement;
  private datePickerComponentElement!: ComponentRef<any> | null;

  @Input("datePickerConfig") datePickerConfig: DeepPartial<GlobalConfig> = {};
  @Output("onDateSelect") onSelect = new EventEmitter<Partial<IDate>>()

  constructor(
    @Inject(DATEPICKER_CONFIG) token: GlobalConfig,
    private _viewContainerRef: ViewContainerRef,
    private el: ElementRef,
    private dpHandler: DatePickerHandler
  ) {
    
    this.inputElement = this.el.nativeElement;
    
    this.inputElement.onfocus = () => {   
      
      if(!this.dpHandler.datePickerIsOpened){

        const config: GlobalConfig = DefaultsDeep(this.datePickerConfig, token)
        
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