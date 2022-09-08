import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarType, GlobalConfig, SelectModes, 
         weekDays, months, IDate, DaysViewInMonth, ISelectedDate } from '../config/datePicker-config';
import Calendar from '../helpers/calendar';
import DateInfo from '../helpers/dateInfo';

@Component({
  selector: 'ngx-date-picker',
  templateUrl: 'ngx-date-picker.component.html',
  styleUrls: ['./ngx-date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    Calendar
  ]
})

export class NgxDatePickerComponent implements OnInit, OnDestroy {

  @Input("config") config!: GlobalConfig;

  selectMode: SelectModes = "days";
  calendarType: CalendarType = "gregorian";
  months!: string[];
  weekDays!: string[];

  selectedMonthDays!: DaysViewInMonth[];
  currentDate!: IDate;
  selectedDate!: ISelectedDate;
  yearsStep: number = 0;

  constructor(
    private calandarConfig: Calendar
  ) {}

  ngOnInit(): void {
    this.calendarType = this.config.calendar;
    this.months = months[this.calendarType]
    this.weekDays = weekDays[this.calendarType]

    this.calandarConfig.setCalendar(this.calendarType);
    this.currentDate = this.getCurrentDate();    
    this.selectedDate = {...this.currentDate}

    const { month, year } = this.currentDate;
    const selectedMonthDays = this.calandarConfig.getChunkedDaysInSelectedMonth(month!, year);
    this.selectedMonthDays = selectedMonthDays;    
  }

  getCurrentDate(): IDate{
    const currentDate = new Date();
    const dateInfo = new DateInfo(this.calendarType);
    return dateInfo.getInfoOfDate(currentDate);
  }

  navigate(action: "next" | "back"){
    switch (this.selectMode) {
      case "years":
        if(action == "next"){
            this.yearsStep -= 1
        } else if (action == "back"){
            this.yearsStep += 1
        }
        break;

      case "days":        
        if(action == "next"){
            if(this.selectedDate.month == this.months.length-1){
              this.selectedDate.year += 1
              this.selectedDate.month = 0
            } else {
              this.selectedDate.month! += 1
            }

            this.selectedDate.day = null
          } else if (action == "back"){
            if(this.selectedDate.month == 0){
              this.selectedDate.year -= 1
              this.selectedDate.month = 11
            } else {
              this.selectedDate.month! -= 1
            }

            this.selectedDate.day = null
        }

        this.selectedMonthDays = 
        this.calandarConfig.getChunkedDaysInSelectedMonth(this.selectedDate.month!, this.selectedDate.year)
        break;

      case "months":        
        if(action == "next"){
            this.selectedDate.year += 1
        } else if (action == "back"){
          this.selectedDate.year -= 1
        }
        break;
    
      default:
        break;
    }
  }

  setValueForSelectView(viewMode: SelectModes, value: number){
    switch (viewMode) {
      case "years":
        {
          this.selectedDate.year = value          
          this.selectedDate.month = null
          this.selectMode = "months"
        }
        break;

      case "months":
        {
          this.selectedDate.month = value
          this.selectMode = "days"
          this.selectedDate.day = null;

          this.selectedMonthDays = 
          this.calandarConfig.getChunkedDaysInSelectedMonth(this.selectedDate.month, this.selectedDate.year)
        }
        break;

      case "days":
        {
          this.selectedDate.day = value          
        }
        break;
    
      default:
        break;
    }
  }

  closeDatePicker(){

  }

  saveIt(){

  }

  ngOnDestroy(): void {
  }
}
