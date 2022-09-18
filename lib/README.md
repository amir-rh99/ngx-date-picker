# Angular Date Picker
![Angular Date Picker](https://github.com/amir-rh99/ngx-date-picker/raw/master/src/assets/AngularDatePicker.png)

ngx-date-picker is a customizable jalali ( persian ) and gregorian date picker for Angular +12

[Check online demo](https://google.com)

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

## Config
There are some options for config your date picker as below:

| Option | Type | Default | Description
| ------ | ---- | ------- | ----------
| calendar | "gregorian" \| "jalali" | "gregorian" | Type of your calendar
| format | [ValueFormat](#ValueFormat) | "DD/MM/YYYY" | Format of your input element value
| outputData | object | [OutputEvent Config](#OutputEventConfig) | Output values from the [onDateSelect]() event
| displayFooter | boolean | true | This option is for date picker action buttons. date picker will be closed immediately after selecting the date if this option set to false.
| doneText | string | "Done" | Done action text
| cancelText | string | "Cancel" | Done action text
| theme | "light" \| "dark" | "light | Date picker theme mode
| themeConfig | object | [Default Theme Config](#DefaultThemeConfig) | You can change default styles like Primary-Color in light and dark mode

#### ValueFormat
```javascript
"MM/DD/YYYY" | "MM-DD-YYYY" | "DD-MM-YYYY" | "DD/MM/YYYY"
```

#### OutputEventConfig
```javascript
outputData: {
  date: true, // boolean
  type: false, // boolean
  year: false, // boolean
  month: false, // boolean
  day: false // boolean
}
```
#### DefaultThemeConfig
```javascript
themeConfig: {
    light: {
        primaryColor: "#777777", // string
        secondaryColor: "#444444", // string
        backgroudColor: "#ffffff" // string
    },
    dark: {
        primaryColor: "#ffffff", //string
        secondaryColor: "#eeeeee", // string
        backgroudColor: "#444444" // string
    },
    rounded: "medium" // flase | "medium" | "full"
}
```
## How to config?
If you want customize default configs, you can do it in two ways:

### 1. Global Config
Define your configs inside the NgxDatePickerModule.forRoot() . This configs will be applied to all date pickers.

#### Example:
```typescript
NgxDatePickerModule.forRoot({
  calendar: "jalali",
  displayFooter: false,
  theme: "dark",
  themeConfig: {
    rounded: "full",
    dark: {
      primaryColor: "#bbbbbb"
    }
  }
})
```
> All of your configs will be merged with default configs

### 2. Individual  Config
You can set individual configs for every date picker by pass your custom configs to it with **datePickerConfig**.
#### Example:
```html
<!-- HTML template -->

<input ngx-date-picker [(ngModel)]="dateControl"
[datePickerConfig]="customConfig">
```
```typescript
// typescript component

import { CustomConfig } from '@ah99/ngx-date-picker';
...
customConfig: CustomConfig = {
  calendar: "gregorian",
  format: "DD-MM-YYYY",
  themeConfig: {
    light: {
      primaryColor: "#ca8c07"
    }
  }
}
```
> Your individual configs will be merged with global configs

## Output Event (onDateSelect)
This event will be triggered when you select the date. The output value will be an object whose fields you can specify in [OutputEvent Config](#OutputEventConfig).
#### Example:
```html
<input ngx-date-picker [(ngModel)]="dateControl"
(onDateSelect)="log($event)">
```