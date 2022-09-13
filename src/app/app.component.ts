import { Component } from '@angular/core';
import { CustomConfig } from 'lib/src/config/datePicker-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ngx-date-picker';

  select(e: any){
    console.log(e)
  }
}
