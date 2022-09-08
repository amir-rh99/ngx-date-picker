import { CalendarType, DaysViewInMonth, IDayView } from "../config/datePicker-config"
import { toJalaali, jalaaliMonthLength, toGregorian } from "jalaali-js"
import DateInfo from "./dateInfo";

export default class Calendar {

    private calendarType!: CalendarType;

    public setCalendar(type: CalendarType){
        this.calendarType = type
    }

    public getChunkedDaysInSelectedMonth(currentMonth: number, currentYear: number): DaysViewInMonth[] {
        if(!this.calendarType) this.calendarType = "gregorian"

        const days = this.getDaysInSelectedMonth(currentMonth, currentYear)
        const fulledWeeks = this.fillEmptyDaysInFirstAndLastWeeks(days)
        const chunkedDays = this.spliceIntoChunks(fulledWeeks, 7)
        return chunkedDays
    }

    private getDaysInSelectedMonth(month: number, year: number): DaysViewInMonth {

        let days: IDayView[] = [];
        
        const monthLength = this.calendarType == "jalali" ? jalaaliMonthLength(year, month) : new Date(year, month, 0).getDate()
        let dayCounter = 1
        
        const now = new Date()
        let [y,m,d] = [now.getFullYear(), now.getMonth(), now.getDate()]
        const today = new Date(y, m, d)

        let isToday: boolean = false;

        while (dayCounter <= monthLength) {

            let [gYear, gMonth, gDay] = [year, month, dayCounter]

            if(this.calendarType == "jalali"){
                const {gy, gm, gd} = toGregorian(year, month, dayCounter);
                [gYear, gMonth, gDay] = [gy, gm - 1, gd]
            }

            const currentDate = new Date(gYear, gMonth, gDay)            
            isToday = currentDate.getTime() == today.getTime()
            let currentDayWeek = this.getDayIndexOfWeek(currentDate.getDay())

            days.push({
                date: currentDate, type: this.calendarType,
                year, month, day: dayCounter, disabled: false,
                weekDay: currentDayWeek, isToday, isSelected: false
            })

            dayCounter++
        }

        return days
    }

    private fillEmptyDaysInFirstAndLastWeeks(monthDays: IDayView[]): DaysViewInMonth {
        let firstDayInMonth = Object.create(monthDays[0])
        let lastDayInMonth = Object.create(monthDays[monthDays.length-1])
        
        firstDayInMonth.date = new Date(firstDayInMonth.date)
        lastDayInMonth.date = new Date(lastDayInMonth.date)
        
        for (let index = 0; index < firstDayInMonth.weekDay; index++) {
            firstDayInMonth.date.setDate(firstDayInMonth.date.getDate() - 1);
            
            const currentDate = new Date(firstDayInMonth.date)
            const dateInfo = new DateInfo(this.calendarType)
            const {year, month, day} = dateInfo.getInfoOfDate(currentDate)

            monthDays.unshift({
                date: currentDate, type: this.calendarType,
                year, month, day,
                weekDay: firstDayInMonth.weekDay - (index+1),
                disabled: true, isToday: false, isSelected: false
            });
        }
      
        for (let index = 0; index < (6 - lastDayInMonth.weekDay); index++) {
            lastDayInMonth.date.setDate(lastDayInMonth.date.getDate() + 1);
        
            const currentDate = new Date(lastDayInMonth.date)
            const dateInfo = new DateInfo(this.calendarType)
            const {year, month, day} = dateInfo.getInfoOfDate(currentDate)

            monthDays.push({
                date: currentDate, type: this.calendarType,
                year, month, day,
                weekDay: lastDayInMonth.weekDay + index + 1,
                disabled: true,  isToday: false, isSelected: false
            });
        }

        return monthDays
    }

    private getDayIndexOfWeek(index: number): number{
        if(this.calendarType == "jalali"){
            if(index == 6){
                index = 0
            } 
            // else if(index == 6){
            //     index = 1
            // } 
            else {
                index += 1
            }
            // if(index == 5){
            //     index = 0
            // } else if(index == 6){
            //     index = 1
            // } else {
            //     index += 2
            // }
        }
        return index
    }

    private spliceIntoChunks(arr: any[], chunkSize: number) {
        const res = [];
        while (arr.length > 0) {
            const chunk = arr.splice(0, chunkSize);
            res.push(chunk);
        }
        return res;
    }
}