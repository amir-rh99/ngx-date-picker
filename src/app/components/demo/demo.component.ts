import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomConfig } from 'dist/ah99/ngx-date-picker/config/datePicker-config';

const defaultConfig = {
  calendar: "gregorian",
  format: "DD/MM/YYYY",
  outputData: {
      date: true,
      type: false,
      year: false,
      month: false,
      day: false
  },
  themeConfig: {
      light: {
          primaryColor: "#777777",
          secondaryColor: "#444444",
          backgroudColor: "#ffffff"
      },
      dark: {
          primaryColor: "#ffffff",
          secondaryColor: "#eeeeee",
          backgroudColor: "#444444"
      },
      rounded: "medium"
  },
  displayFooter: true,
  doneText: "Done",
  cancelText: "Cancel",
  theme: "light"
}
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})

export class DemoComponent implements OnInit {

  isDefaultConfig: boolean = true;
  customConfig: CustomConfig = {}

  configForm = new FormGroup({
    calendar: new FormControl(defaultConfig.calendar),
    doneText: new FormControl(defaultConfig.doneText),
    cancelText: new FormControl(defaultConfig.cancelText),
    displayFooter: new FormControl(defaultConfig.displayFooter),
    themeConfig: new FormGroup({
      light: new FormGroup({
        primaryColor: new FormControl(defaultConfig.themeConfig.light.primaryColor),
        secondaryColor: new FormControl(defaultConfig.themeConfig.light.secondaryColor),
        backgroudColor: new FormControl(defaultConfig.themeConfig.light.backgroudColor),
      }),
      dark: new FormGroup({
        primaryColor: new FormControl(defaultConfig.themeConfig.dark.primaryColor),
        secondaryColor: new FormControl(defaultConfig.themeConfig.dark.secondaryColor),
        backgroudColor: new FormControl(defaultConfig.themeConfig.dark.backgroudColor),
      }),
      rounded: new FormControl(defaultConfig.themeConfig.rounded)
    }),
    outputData: new FormGroup({
      date: new FormControl(defaultConfig.outputData.date),
      type: new FormControl(defaultConfig.outputData.type),
      year: new FormControl(defaultConfig.outputData.year),
      month: new FormControl(defaultConfig.outputData.month),
      day: new FormControl(defaultConfig.outputData.day),
    }),
    theme: new FormControl(defaultConfig.theme),
    format: new FormControl(defaultConfig.format)
  })

  selects = {
    calendar: ["gregorian", "jalali"],
    theme: ["light", "dark"],
    format: ["MM/DD/YYYY", "DD/MM/YYYY", "MM-DD-YYYY", "DD-MM-YYYY"],
    rounded: [false, "medium", "full"]
  }

  dateControl = new FormControl('');
  customDateControl = new FormControl('');

  ngOnInit(): void {    
    this.configForm.valueChanges.subscribe(value => {
      this.isDefaultConfig = false
      this.customConfig = value
      this.dateControl.setValue("")
    })
  }
  
  select(e: any){
    console.log(e)
  }

  resetToDefault(){
    this.configForm.setValue(defaultConfig)
    this.isDefaultConfig = true
  }
}
