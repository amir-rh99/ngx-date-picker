# Angular Date Picker
![Angular Date Picker](src/assets/AngularDatePicker.png)

ngx-date-picker is a customizable jalali ( persian ) and gregorian date picker for Angular +12
## Demo: [ngx-date-picker](https://google.com)

***
## Install and Setup
### step 1: install @ah99/ngx-date-picker

```bash
npm i @ah99/ngx-date-picker
```
### step 2: Import NgxDatePickerModule to your module

```typescript
import { NgxDatePickerModule } from '@ah99/ngx-date-picker'

@NgModule({
    imports: [
        NgxDatePickerModule.forRoot() // dont forget forRoot()
    ]
})
```
### step 3: Import css styles to your global styles ( usually styles/.css/.scss/.less/ )
```css
  @import "@ah99/ngx-date-picker/styles"
```
## Use
use `ngx-date-picker` directive on any `html input element` you need
```html
  <input ngx-date-picker [(ngModel)]="dateControl">
```
**important**: you need to setup one form model in your input element with formControl or ngModel So you must have already imported **FormsModule** or **ReactiveFormsModule** in your module.