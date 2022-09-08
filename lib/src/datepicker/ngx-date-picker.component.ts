import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CalendarType, GlobalConfig, SelectModes, days, months, IDate } from '../config/datePicker-config';
import { toJalaali } from "jalaali-js"
import Calendar from '../helpers/calendar';
import DateInfo from '../helpers/dateInfo';

@Component({
  selector: 'ngx-date-picker',
  templateUrl: 'ngx-date-picker.component.html',
  styleUrls: ['./ngx-date-picker.component.scss'],
  providers: [
    Calendar
  ]
})

export class NgxDatePickerComponent implements OnInit, OnDestroy {

  @Input("config") config!: GlobalConfig;

  selectMode: SelectModes = "days";
  calendarType: CalendarType = "gregorian";

  currentDate!: IDate;

  constructor(
    private calandarConfig: Calendar
  ) {}

  ngOnInit(): void {
    this.calendarType = this.config.calendar
    this.calandarConfig.setCalendar(this.calendarType)
    this.currentDate = this.getCurrentDate()
    const { month, year } = this.currentDate
    const res = this.calandarConfig.getChunkedDaysInSelectedMonth(month, year)
    console.log(res);
  }

  getCurrentDate(): IDate{
    const currentDate = new Date()
    const dateInfo = new DateInfo(this.calendarType)
    return dateInfo.getInfoOfDate(currentDate)
  }

  navigate(action: "next" | "back"){

  }

  ngOnDestroy(): void {
  }
}
