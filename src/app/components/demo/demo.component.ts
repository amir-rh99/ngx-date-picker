import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomConfig } from 'dist/ah99/ngx-date-picker/config/datePicker-config';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  customConfig: CustomConfig = {}

  configForm = new FormGroup({
    calendar: new FormControl("gregorian"),
    doneText: new FormControl("Done"),
    cancelText: new FormControl("Cancel"),
    displayFooter: new FormControl(true),
    themeConfig: new FormGroup({
      light: new FormGroup({
        primaryColor: new FormControl("#777")
      })
    })
  })

  dateControl = new FormControl('');
  customDateControl = new FormControl('');

  ngOnInit(): void {
    this.configForm.valueChanges.subscribe(value => {
      console.log(value);
      
      this.customConfig = value
    })
  }
  
  select(e: any){
    console.log(e)
  }
}
