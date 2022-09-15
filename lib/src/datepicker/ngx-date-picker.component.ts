import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CalendarType, GlobalConfig, SelectModes, 
         weekDays, months, IDate, DaysViewInMonth, ISelectedDate, IDayView, DatepickerEvents } from '../config/datePicker-config';
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
  @Output("onDateSelect") onDateSelect = new EventEmitter<Date>()
  @Output("onEvents") onEvents = new EventEmitter<DatepickerEvents>()

  selectMode: SelectModes = "days";
  calendarType: CalendarType = "gregorian";
  displayFooter: boolean = true;

  months!: string[];
  weekDays!: string[];

  selectedMonthDays!: DaysViewInMonth[];
  currentDate!: IDate;
  selectedDate!: ISelectedDate;
  viewDate!: {
    year: number,
    month: number | null
  }

  yearsStep: number = 0;

  constructor(
    private calandarConfig: Calendar
  ) {}

  ngOnInit(): void {
    this.calendarType = this.config.calendar;
    this.displayFooter = this.config.displayFooter;

    this.months = months[this.calendarType]
    this.weekDays = weekDays[this.calendarType]

    this.calandarConfig.setCalendar(this.calendarType);
    this.currentDate = this.getCurrentDate();    
    this.selectedDate = {...this.currentDate, day: null}
    this.viewDate = {
      year: this.selectedDate.year,
      month: this.selectedDate.month
    }

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
            if(this.viewDate.month == this.months.length-1){
              this.viewDate.year += 1
              this.viewDate.month = 0
            } else {
              this.viewDate.month! += 1
            }
          } else if (action == "back"){
            if(this.viewDate.month == 0){
              this.viewDate.year -= 1
              this.viewDate.month = 11
            } else {
              this.viewDate.month! -= 1
            }
        }

        this.selectedMonthDays = 
        this.calandarConfig.getChunkedDaysInSelectedMonth(this.viewDate.month!, this.viewDate.year)
        break;

      case "months":        
        if(action == "next"){
            this.viewDate.year += 1
        } else if (action == "back"){
          this.viewDate.year -= 1
        }
        break;
    
      default:
        break;
    }
  }

  setValueForSelectView(viewMode: SelectModes, value: number, dayInfo?: IDayView){
    switch (viewMode) {
      case "years":
        {
          if(value !== this.selectedDate.year){
            this.selectedDate.year = value
            this.selectedDate.month = null
          }

          this.viewDate.year = value             
          this.selectMode = "months"
        }
        break;

      case "months":
        {
          if(value !== this.selectedDate.month){
            this.selectedDate.month = value
            this.selectedDate.day = null;
          }

          this.viewDate.month = value
          this.selectMode = "days"

          this.selectedMonthDays = 
          this.calandarConfig.getChunkedDaysInSelectedMonth(this.viewDate.month!, this.viewDate.year)
        }
        break;

      case "days":
        {
          const { date, day, month, year } = dayInfo!
          this.selectedDate = {
            ...this.selectedDate,
            date, day, month, year
          }

          if(!this.displayFooter) this.done()
        }
        break;
    
      default:
        break;
    }
  }

  closeDatePicker(){
    this.onEvents.emit("closeDatepicker")
  }

  done(){
    if(!this.selectedDate.day){
      this.closeDatePicker()
    } else {
      const { date } = this.selectedDate
      this.onDateSelect.emit(date)
    }
  }

  ngOnDestroy(): void {
  }
}