import { CalendarType, OutputEventConfig, ValueFormat } from "../config/datePicker-config";
import DateInfo from "./dateInfo";

const reg = {
    "YYYY": "year",
    "DD": "dayWithZero",
    "MM": "monthWithZero",
    "D": "day",
    "M": "month",
    "m": "monthName"
}

export default class DateTransform {

    constructor(private date: Date, private calendarType: CalendarType){}

    // replace(year: number, month: number, day: number, format: string){
    // }

    transformDate(format: ValueFormat): string {

        const calendarType: CalendarType = this.calendarType;
        let { year, month: m, day: d } = new DateInfo(calendarType).getInfoOfDate(this.date)

        // months starts from 0 index
        m += 1; 

        let month = m.toString().padStart(2, "0")
        let day = d.toString().padStart(2, "0")

        let result: string;

        switch (format) {
            case "MM-DD-YYYY": result = [month, day, year].join("-");
            break;

            case "DD-MM-YYYY": result = [day, month, year].join("-");
            break;

            case "MM/DD/YYYY": result = [month, day, year].join("/");
            break;

            case "DD/MM/YYYY": result = [day, month, year].join("/");
            break;
        }

        return result;
    }

    getOutputData(fields: any){
        const dateInfo: any = new DateInfo(this.calendarType).getInfoOfDate(this.date)
        let res = {}
        for(let field in dateInfo){
            if(fields[field]){
                res = {
                    ...res,
                    [field]: dateInfo[field]
                }
            }
        }
        return res
    }
}