import { InjectionToken } from "@angular/core"

export type CalendarType = "jalali" | "gregorian"
export type SelectModes = "years" | "months" | "days"

const weekDaysArray = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const jweekDaysArray = ["ش", "ی", "د", "س", "چ", "پ", "ج"]
const monthsArray = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
const jmonthsArray = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]

export type WeekdayAndMonthTitle = {
    [type in CalendarType]: string[]
}

export const days: WeekdayAndMonthTitle = {
    gregorian: weekDaysArray,
    jalali: jweekDaysArray
}

export const months: WeekdayAndMonthTitle = {
    gregorian: monthsArray,
    jalali: jmonthsArray
}

export interface IDayView {
    date: Date,
    type: CalendarType,
    year: number,
    month: number,
    weekDay: number,
    day: number,
    disabled: boolean
}

export type DaysViewInMonth = IDayView[]

export interface IDate {
    date: Date,
    type: CalendarType,
    year: number,
    month: number,
    day: number,
}

// DatePicker configs

export interface GlobalConfig {
    calendar: CalendarType
}

export const DefaultGlobalConfig: GlobalConfig = {
    calendar: "gregorian"
}

export const DATEPICKER_CONFIG = new InjectionToken<GlobalConfig>("DatePickerToken")