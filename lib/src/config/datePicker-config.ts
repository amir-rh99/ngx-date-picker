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

export const weekDays: WeekdayAndMonthTitle = {
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
    disabled: boolean,
    isToday: boolean,
    isSelected: boolean
}

export type DaysViewInMonth = IDayView[]

export interface IDate {
    date: Date,
    type: CalendarType,
    year: number,
    month: number,
    day: number,
}

export interface ISelectedDate {
    date: Date,
    type: CalendarType,
    year: number,
    month: number | null,
    day: number | null,
}

// DatePicker configs

export type ValueFormat = "MM/DD/YYYY" | "MM-DD-YYYY" | "DD-MM-YYYY" | "DD/MM/YYYY"
export interface OutputEventConfig {
    date: boolean,
    type: boolean,
    year: boolean,
    month: boolean,
    day: boolean
}
export interface GlobalConfig {
    calendar: CalendarType,
    format: ValueFormat,
    outputData: Partial<OutputEventConfig>,
    displayFooter: boolean,
    doneText: string,
    cancelText: string
}

export const DefaultGlobalConfig: GlobalConfig = {
    calendar: "gregorian",
    format: "DD/MM/YYYY",
    outputData: {
        date: true,
        type: false,
        year: false,
        month: false,
        day: false
    },
    displayFooter: true,
    doneText: "Done",
    cancelText: "Cancel"
}

export const DATEPICKER_CONFIG = new InjectionToken<GlobalConfig>("DatePickerToken")