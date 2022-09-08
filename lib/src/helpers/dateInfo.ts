import { toJalaali } from "jalaali-js"
import { CalendarType, IDate } from "../config/datePicker-config";

export default class DateInfo {

    type!: CalendarType

    constructor(type: CalendarType){
        this.type = type
    }

    public getInfoOfDate(date: Date): IDate {
        const currentDate = new Date(date)
        let [year, month, day] = [currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()]
    
        console.log(currentDate);
        
        if(this.type == "jalali"){
          let { jy, jm, jd } = toJalaali(currentDate);
          [year, month, day] = [jy, jm, jd]
        }
    
        return {
          date: currentDate, type: this.type,
          year, month, day
        }
    }
}