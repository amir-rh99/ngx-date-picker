import { ComponentRef, Injectable } from '@angular/core';

export class NgxDatePickerService {

  private openedDatePicker!: ComponentRef<any> | null;

  constructor() { }

  set datePickerComponent(cmp: ComponentRef<any>){
    this.openedDatePicker = cmp
  }

  haveOpenedDatePicker(): boolean {
    return this.openedDatePicker ? true : false
  }

  closeOpenedDatePicker(){
    if(this.openedDatePicker){
      this.openedDatePicker.instance.close()
      this.openedDatePicker = null
    }
  }
}
