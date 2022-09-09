import { ComponentRef, Directive, ElementRef, HostListener, Inject, Input, ViewContainerRef } from '@angular/core';
import { CalendarType, DATEPICKER_CONFIG, GlobalConfig } from '../config/datePicker-config';
import { DatePickerHandler } from "../handlers";

@Directive({
  selector: '[ngx-date-picker]',
  providers: [
    DatePickerHandler
  ]
})

export class NgxDatePickerDirective {

  private inputElement!: HTMLInputElement;
  private datePickerComponentElement!: ComponentRef<any> | null;

  @Input("calendarType") calendar!: CalendarType;
    
  constructor(
    @Inject(DATEPICKER_CONFIG) token: GlobalConfig,
    private _viewContainerRef: ViewContainerRef,
    private el: ElementRef,
    private dpHandler: DatePickerHandler
  ) {

    this.inputElement = this.el.nativeElement;
    this.inputElement.onfocus = () => {   

      const config: GlobalConfig = {
        ...token,
        ...(this.calendar && {
          calendar: this.calendar
        })
      }

      if(!this.dpHandler.datePickerIsOpened){
        this.datePickerComponentElement = this.dpHandler.init(this.inputElement, config, this._viewContainerRef)      
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