import { toJalaali } from "jalaali-js"
import { CalendarType, IDate } from "../config/datePicker-config";

export default class DateInfo {

    type!: CalendarType

    constructor(type: CalendarType){
        this.type = type
    }

    public getInfoOfDate(currentDate: Date): IDate {
        // const currentDate = new Date(date)
        let [year, month, day] = [currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()]
        let date = new Date(year, month, day)

        if(this.type == "jalali"){          
          let { jy, jm, jd } = toJalaali(currentDate);
          [year, month, day] = [jy, jm - 1, jd]          
        }
    
        return {
          date, type: this.type,
          year, month, day
        }
    }
}