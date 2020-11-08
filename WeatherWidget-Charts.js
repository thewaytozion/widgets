// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: magic;
/**********************************************************************
**  Credit to Max Zeryck @ mzeryck                                   **
**  https://github.com/mzeryck/Weather-Cal/blob/main/weather-cal.js  **


/ ••original code - 
// ezgames/imgamez, Efrén Gámez
// https://gist.github.com/ImGamez/
// a8f9d77bf660d7703cc96fee87cdc4b0

***********************************************************************
**  Mod by thewaytozion                                              **  
***********************************************************************

/*
 * SETUP
 * Use this section to set up the widget.
 * ======================================
 */

// To use weather, get a free API key at openweathermap.org/appid and paste it in between the quotation marks.
const apiKey = ""

// Set the locale code. Leave blank "" to match the device's locale. You can change the hard-coded text strings in the TEXT section below.
let locale = "de"

// Set to true for fixed location, false to update location as you move around
const lockLocation = false

// The size of the widget preview in the app.
const widgetPreview = "large"

// Set to true for an image background, false for no image.
const imageBackground = true

// Set to true to reset the widget's background image.
const forceImageUpdate = false

// Set the padding around each item. Default is 5.
const padding = 1

// Decide if icons should match the color of the text around them.
const tintIcons = false

// hoursToShow : number > Number of predicted hours to show, Eg: 3 = a total of 4 hours in the widget (Default: 3 for the small widget and 11 for the medium one).
const hoursToShow = 9
const daysToShow = 6
 //(max 6)

// roundedGraph : true|false > true (Use
// rounded values to draw the graph) 
const roundedGraph = true
const roundedTemp = true

//define global var
var night = false

// accentColor : Color > Accent color of some elements (Graph lines and the location label).
const accentColor = new Color("#FFB01F", 1)
const nightColor = new Color("#616363", 1)
const linecolor = new Color("#A5A8A8", 1)
const rainColor= new Color("#3DADF2", 1)

// in case you do not want shadow change opacity to 0 
const shadow1 = new Color("#111111", 0.4)
const shadow2 = new Color("#111111", 0.2)
const shadow3 = new Color("#111111", 0.1)

let drawContext = new DrawContext();

const horizontalPad = padding < 10 ? 10 - padding : 10
const verticalPad = padding < 15 ? 15 - padding : 15

// https://developer.apple.com/design/human-interface-guidelines/ios/system-capabilities/widgets/#adapting-to-different-screen-sizes
let contextSize = 282
if ((Device.screenSize().width=== 414) && (Device.screenSize().height=== 896)) {contextSize = (376 -2 * horizontalPad)}
if ((Device.screenSize().width=== 375) && (Device.screenSize().height=== 812)) {contextSize = (345 -2 * horizontalPad)}
if ((Device.screenSize().width=== 414) && (Device.screenSize().height=== 736)) {contextSize = (357 -2 * horizontalPad)}
if ((Device.screenSize().width=== 375) && (Device.screenSize().height=== 667)) {contextSize = (324 -2 * horizontalPad)}
if ((Device.screenSize().width=== 320) && (Device.screenSize().height=== 568)) {contextSize = (299 -2 * horizontalPad)}

let mediumWidgetWidth = 584
if ((Device.screenSize().width=== 414) && (Device.screenSize().height=== 896)) {mediumWidgetWidth = (360 -2 * verticalPad)}
if ((Device.screenSize().width=== 375) && (Device.screenSize().height=== 812)) {mediumWidgetWidth = (329 -2 * verticalPad)}
if ((Device.screenSize().width=== 414) && (Device.screenSize().height=== 736)) {mediumWidgetWidth = (348 -2 * verticalPad)}
if ((Device.screenSize().width=== 375) && (Device.screenSize().height=== 667)) {mediumWidgetWidth = (322 -2 * verticalPad)}
if ((Device.screenSize().width=== 320) && (Device.screenSize().height=== 568)) {mediumWidgetWidth = (291 -2 * verticalPad)}

// did not follow up at upper definitions & set DrawContext Size to fixed value - matching iPhone 11 Pro Max
drawContext.size = new Size(665,260)
drawContext.opaque = false
drawContext.setTextAlignedCenter()
// define distances (x-axis) of icons
const spaceBetweenHours = 63
const spaceBetweenDays = 94

/*
 * LAYOUT
 * Decide what items to show on the widget.
 * ========================================
 */

// You always need to start with "row," and "column," items, but you can now add as many as you want.
// Adding left, right, or center will align everything after that. The default alignment is left.

// You can add a flexible vertical space with "space," or a fixed-size space like this: "space(50)"
// Align items to the top or bottom of columns by adding "space," before or after all items in the column.

// There are many possible items, including: date, greeting, events, current, future, battery, sunrise, and text("Your text here")
// Make sure to always put a comma after each item.

const items = [
 	
 	row(17),

		column(200),
			space(1),
			left,
			currentLoc,
			
		
		column,
			space(3),
			right,
			maxtemp,
			


	row(13),
	
		column,
			
			left,
			desconly,

		column,
			
			right,
			mintemp,
		

	row(130),
		column,
			center,
			drawdiagram,

  	row(130),
	
		column,
			center,
			drawdiagramdaily,


  row,

		column(105),
	   		left,
	   		feelsliketxt,
     
		column,
			right,
	   		feelslike,
		
		column(5),

		column(105),
			left,
			sunriseonlytxt,
      	
		column,
			right,
	    	sunriseonly,
     
	row,

		column(105),
			left,
	   		raintxt,
  
		column,
			right,
	   		rain,
		
		column(5),
     	
		column(105),
			left,
			sunsetonlytxt,
     	
		column,
			right,
	    	sunsetonly,

	row,

	    column(100),
			left,
	    	dewpointtxt,
     
		column,
			right,
	    	dewpoint,
		
		column(5),
     
		column(100),
			left,
	    	windtxt,
     	
		column,
			right,
	    	wind,

	row,
	   	column(105),
			left,
	   		humiditytxt,
 
		column,
			right,
	   		humidity,
		
		column(5),

		column(105),
			left,
	   		UVIndextxt,
     	
		column,
			right,
	   		UVIndex,

	row,
	   	column(95),
			left,
	   		pressuretxt,

	  	column,
	  		right,
			pressure,
		
		column(5),
	   		
	
		column(95),
			left,
	   		cloudstxt,
     	
		column,
			right,
	   		clouds,

	row,
	  	column,
			right,
	   		updatedtime,
		

  row,
	  	column,
		   	space,
    	
]

/*
 * ITEM SETTINGS
 * Choose how each item is displayed.
 * ==================================
 */  
 
// DATE
// ====
const dateSettings = {

  // If set to true, date will become smaller when events are displayed.
  dynamicDateSize: false

  // If the date is not dynamic, should it be large or small?
  ,staticDateSize: "large"

  // Determine the date format for each date type. See docs.scriptable.app/dateformatter
  ,smallDateFormat: "EEEE, MMMM d"
  ,largeDateLineOne: "EEEE,"
  ,largeDateLineTwo: "MMMM d"
}

// EVENTS
// ======
const eventSettings = {

  // How many events to show.
  numberOfEvents: 3

  // Show all-day events.
  ,showAllDay: true

  // Show tomorrow's events.
  ,showTomorrow: true

  // Can be blank "" or set to "duration" or "time" to display how long an event is.
  ,showEventLength: "duration"

  // Set which calendars for which to show events. Empty [] means all calendars.
  ,selectCalendars: []

  // Leave blank "" for no color, or specify shape (circle, rectangle) and/or side (left, right).
  ,showCalendarColor: "rectangle left"
  
  // When no events remain, show a hard-coded "message", a "greeting", or "none".
  ,noEventBehavior: "message"
}

// SUNRISE
// =======
const sunriseSettings = {
  
  // How many minutes before/after sunrise or sunset to show this element. 0 for always.
  showWithin: 0
}

// WEATHER
// =======
const weatherSettings = {

  // Set to imperial for Fahrenheit, or metric for Celsius
  units: "metric"
  
}

/*
 * TEXT
 * Change the language and formatting of text displayed.
 * =====================================================
 */  
 
// You can change the language or wording of any text in the widget.
const localizedText = {
  
  // The text shown if you add a greeting item to the layout.
  nightGreeting: "Good night."
  ,morningGreeting: "Good morning."
  ,afternoonGreeting: "Good afternoon."
  ,eveningGreeting: "Good evening."
  
  // The text shown if you add a future weather item to the layout, or tomorrow's events.
  ,nextHourLabel: "Next hour"
  ,tomorrowLabel: "Tomorrow"

  // Shown when noEventBehavior is set to "message".
  ,noEventMessage: "Enjoy the rest of your day."
  
  // The text shown after the hours and minutes of an event duration.
  ,durationMinute: "m"
  ,durationHour: "h"
     
}

// Set the font, size, and color of various text elements. Use iosfonts.com to find fonts to use. If you want to use the default iOS font, set the font name to one of the following: ultralight, light, regular, medium, semibold, bold, heavy, black, or italic.
const textFormat = {
  
  // Set the default font and color.
  defaultText: { size: 14, color: "ffffff", font: "regular" },
  
  // Any blank values will use the default.
  smallDate:   { size: 17, color: "", font: "semibold" },
  largeDate1:  { size: 30, color: "", font: "light" },
  largeDate2:  { size: 30, color: "", font: "light" },
  
  greeting:    { size: 30, color: "", font: "semibold" },
  eventLabel:  { size: 14, color: "", font: "semibold" },
  eventTitle:  { size: 14, color: "", font: "semibold" },
  eventTime:   { size: 14, color: "ffffff", font: "" },
  noEvents:    { size: 30, color: "", font: "semibold" },
  
  largeTemp:   { size: 34, color: "", font: "light" },
  smallTemp:   { size: 14, color: "", font: "" },
  tinyTemp:    { size: 12, color: "", font: "" },
  
  customText:  { size: 10, color: "A5A8A8", font: "light" },
  
  battery:     { size: 14, color: "", font: "medium" },
  sunrise:     { size: 14, color: "", font: "medium" },

  location:     { size: 14, color: "", font: "semibold" },
  desconly:  { size: 12, color: "", font: "regular" },
  HiLotemp:     { size: 12, color: "", font: "regular" },
  databtm:     { size: 10, color: "A5A8A8", font: "bold" },
  databtmtxt:     { size: 10, color: "A5A8A8", font: "regular" },
  updatetxt:     { size: 10, color: "A5A8A8", font: "light" },
}

/*
 * WIDGET CODE
 * Be more careful editing this section. 
 * =====================================
 */

// Make sure we have a locale value.
if (locale == "" || locale == null) { locale = Device.locale() }

// Declare the data variables.
var eventData, locationData, sunData, weatherData

// Create global constants.
const currentDate = new Date()
const files = FileManager.local()

/*
 * CONSTRUCTION
 * ============
 */




// Set up the widget with padding.
const widget = new ListWidget()

widget.setPadding(horizontalPad, verticalPad, horizontalPad, verticalPad)
widget.spacing = 0


// Set up the global variables.
var currentRow = {}
var currentColumn = {}

// Set up the initial alignment.
var currentAlignment = alignLeft

// Set up the global ASCII variables.
var currentColumns = []
var rowNeedsSetup = false

// It's ASCII time!
if (typeof items[0] == 'string') {
  for (line of items[0].split(/\r?\n/)) { await processLine(line) }
}
// Otherwise, set up normally.
else {
  for (item of items) { await item(currentColumn) }
}

/*
 * BACKGROUND DISPLAY
 * ==================
 */

// If it's an image background, display it.
if (imageBackground) {
  
  // Determine if our image exists and when it was saved.
  const path = files.joinPath(files.documentsDirectory(), "weather-cal-image-eric")
  const exists = files.fileExists(path)
  
  // If it exists and an update isn't forced, use the cache.
  if (exists && (config.runsInWidget || !forceImageUpdate)) {
    widget.backgroundImage = files.readImage(path)

  // If it's missing when running in the widget, use a gray background.
  } else if (!exists && config.runsInWidget) {
      widget.backgroundColor = Color.gray() 
    
  // But if we're running in app, prompt the user for the image.
  } else {
      const img = await Photos.fromLibrary()
      widget.backgroundImage = img
      files.writeImage(path, img)
  }
    
// If it's not an image background, show the gradient.
} else {
  let gradient = new LinearGradient()
  let gradientSettings = await setupGradient()
  gradient.colors = gradientSettings.color()
  gradient.locations = gradientSettings.position()
  
  widget.backgroundGradient = gradient

}

// Finish the widget and show a preview.
Script.setWidget(widget)
if (widgetPreview == "small") { widget.presentSmall() }
else if (widgetPreview == "medium") { widget.presentMedium() }
else if (widgetPreview == "large") { widget.presentLarge() }
Script.complete()

/*
 * ASCII FUNCTIONS
 * Now isn't this a lot of fun?
 * ============================
 */

// Provide the named function.
function provideFunction(name) {
  const functions = {
    space() { return space },
    left() { return left },
    right() { return right },
    center() { return center },
    date() { return date },
    greeting() { return greeting },
    events() { return events },
    battery() { return battery },
    sunrise() { return sunrise },

    currentLoc() { return currentLoc },
    maxtemp() { return maxtemp },
    mintemp() { return mintemp },
    desconly() { return desconly },
    drawdiagram() { return drawdiagram },
   
   	feelslike() { return feelslike },
    sunriseonly() { return sunriseonly },
    sunsetonly() { return sunsetonly },
    rain() { return rain },
    dewpoint() { return dewpoint },
    wind() { return wind },
    humidity() { return humidity },
    UVIndex() { return UVIndex },
    pressure() { return pressure },
    clouds() { return clouds },
  
	  feelsliketxt() { return feelsliketxt },
    sunriseonlytxt() { return sunriseonlytxt },
    sunsetonlytxt() { return sunsetonlytxt },
    raintxt() { return raintxt },
    dewpointtxt() { return dewpointtxt },
    windtxt() { return windtxt },
    humiditytxt() { return humiditytxt },
    UVIndextxt() { return UVIndextxt },
    pressuretxt() { return pressuretxt },
    cloudstxt() { return cloudstxt },
    

    updatedtime() { return updatedtime },
 	  drawdiagramdaily() { return drawdiagramdaily },
 
  }
  return functions[name]
}

// Processes a single line of ASCII. 
async function processLine(lineInput) {
  
  // Because iOS loves adding periods to everything.
  const line = lineInput.replace(/\.+/g,'')
  
  // If it's blank, return.
  if (line.trim() == '') { return }
  
  // If it's a line, enumerate previous columns (if any) and set up the new row.
  if (line[0] == '-' && line[line.length-1] == '-') { 
    if (currentColumns.length > 0) { await enumerateColumns() }
    rowNeedsSetup = true
    return
  }
  
  // If it's the first content row, finish the row setup.
  if (rowNeedsSetup) { 
    row(currentColumn)
    rowNeedsSetup = false 
  }
  
  // If there's a number, this is a setup row.
  const setupRow = line.match(/\d+/)

  // Otherwise, it has columns.
  const items = line.split('|')
  
  // Iterate through each item.
  for (var i=1; i < items.length-1; i++) {
    
    // If the current column doesn't exist, make it.
    if (!currentColumns[i]) { currentColumns[i] = { items: [] } }
    
    // Now we have a column to add the items to.
    const column = currentColumns[i].items
    
    // Get the current item and its trimmed version.
    const item = items[i]
    const trim = item.trim()
    
    // If it's not a function, figure out spacing.
    if (!provideFunction(trim)) { 
      
      // If it's a setup row, whether or not we find the number, we keep going.
      if (setupRow) {
        const value = parseInt(trim, 10)
        if (value) { currentColumns[i].width = value }
        continue
      }
      
      // If it's blank and we haven't already added a space, add one.
      const prevItem = column[column.length-1]
      if (trim == '' && (!prevItem || (prevItem && !prevItem.startsWith("space")))) {
        column.push("space")
      }
      
      // Either way, we're done.
      continue
    
    }
    
    // Determine the alignment.
    const index = item.indexOf(trim)
    const length = item.slice(index,item.length).length
    
    let align
    if (index > 0 && length > trim.length) { align = "center" }
    else if (index > 0) { align = "right" }
    else { align = "left" }
    
    // Add the items to the column.
    column.push(align)
    column.push(trim)
  }
}

// Runs the function names in each column.
async function enumerateColumns() {
  if (currentColumns.length > 0) {
    for (col of currentColumns) {
      
      // If it's null, go to the next one.
      if (!col) { continue }
      
      // If there's a width, use the width function.
      if (col.width) {
        column(col.width)(currentColumn)
        
      // Otherwise, create the column normally.
      } else {
        column(currentColumn)
      }
      for (item of col.items) {
        const func = provideFunction(item)()
        await func(currentColumn)
      }
    }
    currentColumns = []
  }
}

/*
 * LAYOUT FUNCTIONS
 * These functions manage spacing and alignment.
 * =============================================
 */

// Makes a new row on the widget.
function row(input = null) {

  function makeRow() {
    currentRow = widget.addStack()
    currentRow.layoutHorizontally()
    currentRow.setPadding(0, 0, 0, 0)
    currentColumn.spacing = 0
    
    // If input was given, make a column of that size.
    if (input > 0) { currentRow.size = new Size(0,input) }
  }
  
  // If there's no input or it's a number, it's being called in the layout declaration.
  if (!input || typeof input == "number") { return makeRow }
  
  // Otherwise, it's being called in the generator.
  else { makeRow() }
}

// Makes a new column on the widget.
function column(input = null) {
 
  function makeColumn() {
    currentColumn = currentRow.addStack()
    currentColumn.layoutVertically()
    currentColumn.setPadding(0, 0, 0, 0)
    currentColumn.spacing = 0
    
    // If input was given, make a column of that size.
    if (input > 0) { currentColumn.size = new Size(input,0) }
  }
  
  // If there's no input or it's a number, it's being called in the layout declaration.
  if (!input || typeof input == "number") { return makeColumn }
  
  // Otherwise, it's being called in the generator.
  else { makeColumn() }
}

// Create an aligned stack to add content to.
function align(column) {
  
  // Add the containing stack to the column.
  let alignmentStack = column.addStack()
  alignmentStack.layoutHorizontally()
  
  // Get the correct stack from the alignment function.
  let returnStack = currentAlignment(alignmentStack)
  returnStack.layoutVertically()
  return returnStack
}

// Create a right-aligned stack.
function alignRight(alignmentStack) {
  alignmentStack.addSpacer()
  let returnStack = alignmentStack.addStack()
  return returnStack
}

// Create a left-aligned stack.
function alignLeft(alignmentStack) {
  let returnStack = alignmentStack.addStack()
  alignmentStack.addSpacer()
  return returnStack
}

// Create a center-aligned stack.
function alignCenter(alignmentStack) {
  alignmentStack.addSpacer()
  let returnStack = alignmentStack.addStack()
  alignmentStack.addSpacer()
  return returnStack
}

// This function adds a space, with an optional amount.
function space(input = null) { 
  
  // This function adds a spacer with the input width.
  function spacer(column) {
  
    // If the input is null or zero, add a flexible spacer.
    if (!input || input == 0) { column.addSpacer() }
    
    // Otherwise, add a space with the specified length.
    else { column.addSpacer(input) }
  }
  
  // If there's no input or it's a number, it's being called in the column declaration.
  if (!input || typeof input == "number") { return spacer }
  
  // Otherwise, it's being called in the column generator.
  else { input.addSpacer() }
}

// Change the current alignment to right.
function right(x) { currentAlignment = alignRight }

// Change the current alignment to left.
function left(x) { currentAlignment = alignLeft }

// Change the current alignment to center.
function center(x) { currentAlignment = alignCenter }

/*
 * SETUP FUNCTIONS
 * These functions prepare data needed for items.
 * ==============================================
 */

// Set up the eventData object.
async function setupEvents() {
  
  eventData = {}
  const calendars = eventSettings.selectCalendars
  const numberOfEvents = eventSettings.numberOfEvents

  // Function to determine if an event should be shown.
  function shouldShowEvent(event) {
  
    // If events are filtered and the calendar isn't in the selected calendars, return false.
    if (calendars.length && !calendars.includes(event.calendar.title)) { return false }

    // Hack to remove canceled Office 365 events.
    if (event.title.startsWith("Canceled:")) { return false }

    // If it's an all-day event, only show if the setting is active.
    if (event.isAllDay) { return eventSettings.showAllDay }

    // Otherwise, return the event if it's in the future.
    return (event.startDate.getTime() > currentDate.getTime())
  }
  
  // Determine which events to show, and how many.
  const todayEvents = await CalendarEvent.today([])
  let shownEvents = 0
  let futureEvents = []
  
  for (const event of todayEvents) {
    if (shownEvents == numberOfEvents) { break }
    if (shouldShowEvent(event)) {
      futureEvents.push(event)
      shownEvents++
    }
  }

  // If there's room and we need to, show tomorrow's events.
  let multipleTomorrowEvents = false
  if (eventSettings.showTomorrow && shownEvents < numberOfEvents) {
  
    const tomorrowEvents = await CalendarEvent.tomorrow([])
    for (const event of tomorrowEvents) {
      if (shownEvents == numberOfEvents) { break }
      if (shouldShowEvent(event)) {
      
        // Add the tomorrow label prior to the first tomorrow event.
        if (!multipleTomorrowEvents) { 
          
          // The tomorrow label is pretending to be an event.
          futureEvents.push({ title: localizedText.tomorrowLabel.toUpperCase(), isLabel: true })
          multipleTomorrowEvents = true
        }
        
        // Show the tomorrow event and increment the counter.
        futureEvents.push(event)
        shownEvents++
      }
    }
  }
  
  // Store the future events, and whether or not any events are displayed.
  eventData.futureEvents = futureEvents
  eventData.eventsAreVisible = (futureEvents.length > 0) && (eventSettings.numberOfEvents > 0)
}

// Set up the gradient for the widget background.
async function setupGradient() {
  
  // Requirements: sunrise
  if (!sunData) { await setupSunrise() }

  let gradient = {
    dawn: {
      color() { return [new Color("142C52"), new Color("1B416F"), new Color("62668B")] },
      position() { return [0, 0.5, 1] },
    },

    sunrise: {
      color() { return [new Color("274875"), new Color("766f8d"), new Color("f0b35e")] },
      position() { return [0, 0.8, 1.5] },
    },

    midday: {
      color() { return [new Color("3a8cc1"), new Color("90c0df")] },
      position() { return [0, 1] },
    },

    noon: {
      color() { return [new Color("b2d0e1"), new Color("80B5DB"), new Color("3a8cc1")] },
      position() { return [-0.2, 0.2, 1.5] },
    },

    sunset: {
      color() { return [new Color("32327A"), new Color("662E55"), new Color("7C2F43")] },
      position() { return [0.1, 0.9, 1.2] },
    },

    twilight: {
      color() { return [new Color("021033"), new Color("16296b"), new Color("414791")] },
      position() { return [0, 0.5, 1] },
    },

    night: {
      color() { return [new Color("16296b"), new Color("021033"), new Color("021033"), new Color("113245")] },
      position() { return [-0.5, 0.2, 0.5, 1] },
    },
  }

  const sunrise = sunData.sunrise
  const sunset = sunData.sunset

  // Use sunrise or sunset if we're within 30min of it.
  if (closeTo(sunrise)<=15) { return gradient.sunrise }
  if (closeTo(sunset)<=15) { return gradient.sunset }

  // In the 30min before/after, use dawn/twilight.
  if (closeTo(sunrise)<=45 && currentDate.getTime() < sunrise) { return gradient.dawn }
  if (closeTo(sunset)<=45 && currentDate.getTime() > sunset) { return gradient.twilight }

  // Otherwise, if it's night, return night.
  if (isNight(currentDate)) { return gradient.night }

  // If it's around noon, the sun is high in the sky.
  if (currentDate.getHours() == 12) { return gradient.noon }

  // Otherwise, return the "typical" theme.
  return gradient.midday
}

// Set up the locationData object.
async function setupLocation() {

  locationData = {}
  const locationPath = files.joinPath(files.documentsDirectory(), "weather-cal-loc")

  // If our location is unlocked or cache doesn't exist, ask iOS for location.
  var readLocationFromFile = false
  if (!lockLocation || !files.fileExists(locationPath)) {
    try {
      const location = await Location.current()
      const geocode = await Location.reverseGeocode(location.latitude, location.longitude, locale)
      locationData.latitude = location.latitude
      locationData.longitude = location.longitude
      locationData.locality = geocode[0].locality
      files.writeString(locationPath, location.latitude + "|" + location.longitude + "|" + locationData.locality)
    
    } catch(e) {
      // If we fail in unlocked mode, read it from the cache.
      if (!lockLocation) { readLocationFromFile = true }
      
      // We can't recover if we fail on first run in locked mode.
      else { return }
    }
  }
  
  // If our location is locked or we need to read from file, do it.
  if (lockLocation || readLocationFromFile) {
    const locationStr = files.readString(locationPath).split("|")
    locationData.latitude = locationStr[0]
    locationData.longitude = locationStr[1]
    locationData.locality = locationStr[2]
  }
}

// Set up the sunData object.
async function setupSunrise() {

  // Requirements: location
  if (!locationData) { await setupLocation() }
  
  async function getSunData(date) {
    const req = "https://api.sunrise-sunset.org/json?lat=" + locationData.latitude + "&lng=" + locationData.longitude + "&formatted=0&date=" + date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
    const data = await new Request(req).loadJSON()
    return data
  }

  // Set up the sunrise/sunset cache.
  const sunCachePath = files.joinPath(files.documentsDirectory(), "weather-cal-sunrise")
  const sunCacheExists = files.fileExists(sunCachePath)
  const sunCacheDate = sunCacheExists ? files.modificationDate(sunCachePath) : 0
  let sunDataRaw

  // If cache exists and was created today, use cached data.
  if (sunCacheExists && sameDay(currentDate, sunCacheDate)) {
    const sunCache = files.readString(sunCachePath)
    sunDataRaw = JSON.parse(sunCache)
  }
  
  // Otherwise, get the data from the server.
  else {

    sunDataRaw = await getSunData(currentDate)
  
    // Calculate tomorrow's date and get tomorrow's data.
    let tomorrowDate = new Date()
    tomorrowDate.setDate(currentDate.getDate() + 1)
    const tomorrowData = await getSunData(tomorrowDate)
    sunDataRaw.results.tomorrow = tomorrowData.results.sunrise
    
    // Cache the file.
    files.writeString(sunCachePath, JSON.stringify(sunDataRaw))
  }

  // Store the timing values.
  sunData = {}
  sunData.sunrise = new Date(sunDataRaw.results.sunrise).getTime()
  sunData.sunset = new Date(sunDataRaw.results.sunset).getTime()
  sunData.tomorrow = new Date(sunDataRaw.results.tomorrow).getTime()
}

// Set up the weatherData object.
async function setupWeather() {

  // Requirements: location
  if (!locationData) { await setupLocation() }

  // Set up the cache.
  const cachePath = files.joinPath(files.documentsDirectory(), "weather-cal-cache")
  const cacheExists = files.fileExists(cachePath)
  const cacheDate = cacheExists ? files.modificationDate(cachePath) : 0
  var weatherDataRaw

  // If cache exists and it's been less than 60 seconds since last request, use cached data.
  if (cacheExists && (currentDate.getTime() - cacheDate.getTime()) < 60000) {
    const cache = files.readString(cachePath)
    weatherDataRaw = JSON.parse(cache)

  // Otherwise, use the API to get new weather data.
  } else {
    const weatherReq = "https://api.openweathermap.org/data/2.5/onecall?lat=" + locationData.latitude + "&lon=" + locationData.longitude + "&exclude=minutely,alerts&units=" + weatherSettings.units + "&lang=" + locale + "&appid=" + apiKey
    weatherDataRaw = await new Request(weatherReq).loadJSON()

    let updateddate = new Date()
    let hourupdate = updateddate.getHours()
    let minupdate = updateddate.getMinutes()
    if (hourupdate <= 9) hourupdate = "0" + hourupdate
    if (minupdate <= 9) minupdate = "0" + minupdate
    let updatedstring =hourupdate+":"+minupdate
    weatherDataRaw.update = updatedstring
    files.writeString(cachePath, JSON.stringify(weatherDataRaw))
  }

  // Store the weather values.
  weatherData = {}
  weatherData = weatherDataRaw

}

/*
 * WIDGET ITEMS
 * These functions display items on the widget.
 * ============================================
 */

// Display the date on the widget.
async function date(column) {

  // Requirements: events (if dynamicDateSize is enabled)
  if (!eventData && dateSettings.dynamicDateSize) { await setupEvents() }

  // Set up the date formatter and set its locale.
  let df = new DateFormatter()
  df.locale = locale
  
  // Show small if it's hard coded, or if it's dynamic and events are visible.
  if (dateSettings.staticDateSize == "small" || (dateSettings.dynamicDateSize && eventData.eventsAreVisible)) {
    let dateStack = align(column)
    dateStack.setPadding(padding, padding, padding, padding)

    df.dateFormat = dateSettings.smallDateFormat
    let dateText = provideText(df.string(currentDate), dateStack, textFormat.smallDate)
    
  // Otherwise, show the large date.
  } else {
    let dateOneStack = align(column)
    df.dateFormat = dateSettings.largeDateLineOne
    let dateOne = provideText(df.string(currentDate), dateOneStack, textFormat.largeDate1)
    dateOneStack.setPadding(padding/2, padding, 0, padding)
    
    let dateTwoStack = align(column)
    df.dateFormat = dateSettings.largeDateLineTwo
    let dateTwo = provideText(df.string(currentDate), dateTwoStack, textFormat.largeDate2)
    dateTwoStack.setPadding(0, padding, padding, padding)
  }
}

async function drawdiagram(column) {
  // Requirements: weather and sunrise
	
  if (!weatherData) { await setupWeather() }
  if (!sunData) { await setupSunrise() }

  
  //define stack in which canvas will be drawn
  let diagramStack = column.addStack()
  diagramStack.layoutHorizontally()
  diagramStack.setPadding(0, 0, 0, 0)
  diagramStack.borderWidth = 0
	drawLine(0,15,665,15, 1, linecolor)
	// DRAW THE GRAPH
  let min, max, diff;
  for(let i = 0; i<=hoursToShow ;i++){
    let temp = shouldRound(roundedGraph, weatherData.hourly[i].temp);
    min = (temp < min || min == undefined ? temp : min)
    max = (temp > max || max == undefined ? temp : max)
	}

  let fromLeft = 50
  let heightDiff = 80
	diff = max -min;
	for(let i = 0; i<=hoursToShow ;i++){
		let hourData = weatherData.hourly[i];
		let nextHourTemp = shouldRound(roundedGraph, weatherData.hourly[i+1].temp);
		let hour = epochToDate(hourData.dt).getHours();
		//hour = (hour > 12 ? hour - 12 : (hour == 0 ? "12a" : ((hour == 12) ? "12p" : hour)))
		let temp = i==0?weatherData.current.temp : hourData.temp
		let delta = (diff>0)?(shouldRound(roundedGraph, temp) - min) / diff:0.5;
		let nextDelta = (diff>0)?(nextHourTemp - min) / diff:0.5

    if(i < hoursToShow){
      let hourDay = epochToDate(hourData.dt);
      for(let i2 = 0 ; i2 < weatherData.daily.length ; i2++){
        let day = weatherData.daily[i2];
        if(isSameDay(epochToDate(day.dt), epochToDate(hourData.dt))){
          hourDay = day;
          break;
        }
		  }
      // 'Night' boolean for line graph and SFSymbols
      night = (hourData.dt > hourDay.sunset || hourData.dt < hourDay.sunrise)    
	
		  drawLine(spaceBetweenHours * (i) + fromLeft, 176 - (heightDiff * delta),spaceBetweenHours * (i+1) + fromLeft , 176 - (heightDiff * nextDelta), 4, shadow1)
		  drawLine(spaceBetweenHours * (i) + fromLeft, 177 - (heightDiff * delta),spaceBetweenHours * (i+1) + fromLeft , 177 - (heightDiff * nextDelta), 4, shadow2)
      drawLine(spaceBetweenHours * (i) + fromLeft, 175 - (heightDiff * delta),spaceBetweenHours * (i+1) + fromLeft , 175 - (heightDiff * nextDelta), 4, (hourData.dt > hourDay.sunset || hourData.dt < hourDay.sunrise ? nightColor : accentColor))


      
    }

    drawLine(spaceBetweenHours * (i) + fromLeft+2, 215 ,spaceBetweenHours * (i) + fromLeft + 2, 215 - (heightDiff * delta)-40, 2, linecolor)


    // Next 2 lines SFSymbols tweak 
    const condition = i==0?weatherData.current.weather[0].id:hourData.weather[0].id
	  let conditionDigitvol= Math.floor(condition / 100)

    if (i == 0 ) {
      drawTextC(shouldRound(roundedTemp, temp)+"°", 40, spaceBetweenHours*i+33-20, 113 - (heightDiff*delta), 100, 42, shadow1)
      drawTextC(shouldRound(roundedTemp, temp)+"°", 40, spaceBetweenHours*i+34-20, 114 - (heightDiff*delta), 100, 42, shadow2)
      drawTextC(shouldRound(roundedTemp, temp)+"°", 40, spaceBetweenHours*i+35-20, 115 - (heightDiff*delta), 100, 42, shadow3)
      if (night) {  
		    drawTextC(shouldRound(roundedTemp, temp)+"°", 40, spaceBetweenHours*i+32-20, 112 - (heightDiff*delta), 100, 42, linecolor)
        if ((conditionDigitvol===2) || ( conditionDigitvol===3) || (conditionDigitvol===5)){
	    	  drawTextC(shouldRound(roundedTemp, temp)+"°", 40, spaceBetweenHours*i+32-20, 112 - (heightDiff*delta), 100, 42, rainColor)
        } else if (conditionDigitvol===6) {
          drawTextC(shouldRound(roundedTemp, temp)+"°", 40, spaceBetweenHours*i+32-20, 112 - (heightDiff*delta), 100, 42, Color.white())
		    } else {
	          drawTextC(shouldRound(roundedTemp, temp)+"°", 40, spaceBetweenHours*i+32-20, 112 - (heightDiff*delta), 100, 42, linecolor)
        }
      } else {
	      if ((conditionDigitvol===2) || ( conditionDigitvol===3) || (conditionDigitvol===5)){
	        drawTextC(shouldRound(roundedTemp, temp)+"°", 40, spaceBetweenHours*i+32-20, 112 - (heightDiff*delta), 100, 42, rainColor)
        } else if (conditionDigitvol===6) {
          drawTextC(shouldRound(roundedTemp, temp)+"°", 40, spaceBetweenHours*i+32-20, 112 - (heightDiff*delta), 100, 42, Color.white())
		    } else {
	        drawTextC(shouldRound(roundedTemp, temp)+"°", 40, spaceBetweenHours*i+32-20, 112 - (heightDiff*delta), 100, 42, accentColor)
        }
      }
    } else {
      drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenHours*i+33, 131 - (heightDiff*delta), 50, 21, shadow1)
      drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenHours*i+34, 132 - (heightDiff*delta), 50, 21, shadow2)
      drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenHours*i+35, 133 - (heightDiff*delta), 50, 21, shadow3)
      if (night) {
	      if ((conditionDigitvol===2) || ( conditionDigitvol===3) || (conditionDigitvol===5)){  
	        drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenHours*i+32, 130 - (heightDiff*delta), 50, 21, rainColor)
        } else if (conditionDigitvol===6) {
	        drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenHours*i+32, 130 - (heightDiff*delta), 50, 21, Color.white())
			  } else {
	        drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenHours*i+32, 130 - (heightDiff*delta), 50, 21, linecolor)
	      }
      } else {
        if ((conditionDigitvol===2) || ( conditionDigitvol===3) || (conditionDigitvol===5)){
	        drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenHours*i+32, 130 - (heightDiff*delta), 50, 21, rainColor)
        } else if (conditionDigitvol===6) {
	        drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenHours*i+32, 130 - (heightDiff*delta), 50, 21, Color.white())
		    } else {
	       	drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenHours*i+32, 130 - (heightDiff*delta), 50, 21, accentColor)
        }
      }
    }
    drawImage(symbolForCondition(condition), spaceBetweenHours * i + 33, 155 - (heightDiff*delta)); //40, 165
   
    if (hour <=9) {
    	hour = "0" + hour
    }
    drawTextC((i==0?"Jetzt":hour), 18, spaceBetweenHours*i+26, 221,50, 21, shadow1)
    drawTextC((i==0?"Jetzt":hour), 18, spaceBetweenHours*i+27, 222,50, 21, shadow2)
    drawTextC((i==0?"Jetzt":hour), 18, spaceBetweenHours*i+28, 223,50, 21, shadow3)
    if (night) {  
      drawTextC((i==0?"Jetzt":hour), 18, spaceBetweenHours*i+25, 220,50, 21, linecolor)
    } else {
      drawTextC((i==0?"Jetzt":hour), 18, spaceBetweenHours*i+25, 220,50, 21, accentColor)
    }
    
    previousDelta = delta;
	}
	// endo of for-loop
	drawLine(0,255,665,255, 1, linecolor)
	diagramStack.addImage(drawContext.getImage());
}


async function drawdiagramdaily(column) {
 
	// Requirements: weather and sunrise
	if (!weatherData) { await setupWeather() }
	if (!sunData) { await setupSunrise() }
  
	//define stack in which canvas will be drawn
	let diagramStack = column.addStack()
	diagramStack.layoutHorizontally()
	diagramStack.setPadding(0, 0, 0, 0)
	diagramStack.borderWidth = 0
	// DRAW THE GRAPH
	let min, max, diff;
	for(let i = 0; i<=daysToShow ;i++){
		let temp = shouldRound(roundedGraph, weatherData.daily[i].temp.max);
		min = (temp < min || min == undefined ? temp : min)
		max = (temp > max || max == undefined ? temp : max)
	}
	
	for(let i = 0; i<=daysToShow ;i++){
		let temp = shouldRound(roundedGraph, weatherData.daily[i].temp.min);
		min = (temp < min || min == undefined ? temp : min)
		max = (temp > max || max == undefined ? temp : max)
	}

	let fromLeft = 50
	let heightDiff = 80
	diff = max - min
	let weekday = new Array(7);
  weekday[0] = "So";
  weekday[1] = "Mo";
  weekday[2] = "Di";
  weekday[3] = "Mi";
  weekday[4] = "Do";
  weekday[5] = "Fr";
  weekday[6] = "Sa";

	for(let i = 0; i<=daysToShow ;i++){
		let temp = shouldRound(roundedGraph, weatherData.daily[i].temp.max);
	  let nextHourTemp = shouldRound(roundedGraph, weatherData.daily[i+1].temp.max);
		let hour = epochToDate(weatherData.daily[i].dt).getDay();
		let delta = (diff>0)?(shouldRound(roundedGraph, temp) - min) / diff:0.5;
		let nextDelta = (diff>0)?(nextHourTemp - min) / diff:0.5
    if(i < daysToShow){
			let dayData = epochToDate(weatherData.daily[i].dt);
    }
		
    if (i<(daysToShow)) {
      drawLine(spaceBetweenDays * (i) + fromLeft, 176 - (heightDiff * delta),spaceBetweenDays * (i+1) + fromLeft , 176 - (heightDiff * nextDelta), 4, (shadow1))
      drawLine(spaceBetweenDays * (i) + fromLeft, 177 - (heightDiff * delta),spaceBetweenDays * (i+1) + fromLeft , 177 - (heightDiff * nextDelta), 4, (shadow2))
			drawLine(spaceBetweenDays * (i) + fromLeft, 175 - (heightDiff * delta),spaceBetweenDays * (i+1) + fromLeft , 175 - (heightDiff * nextDelta), 4, (accentColor))
    }
    
		drawLine(spaceBetweenDays * (i) + fromLeft+2, 215 ,spaceBetweenDays * (i) + fromLeft + 2, 215 - (heightDiff * delta)-40, 2, linecolor)
  	// Next 2 lines SFSymbols tweak 
		const condition = i==0?weatherData.current.weather[0].id:weatherData.daily[i].weather[0].id
   
		let conditionDigitvol= Math.floor(condition / 100)
		drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenDays*i+33, 131 - (heightDiff*delta), 50, 21, shadow1)
  	drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenDays*i+34, 132 - (heightDiff*delta), 50, 21, shadow2)
  	drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenDays*i+35, 133 - (heightDiff*delta), 50, 21, shadow3)

		if ((conditionDigitvol===2) || ( conditionDigitvol===3) || (conditionDigitvol===5)){
	    	drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenDays*i+32, 130 - (heightDiff*delta), 50, 21, rainColor)
		} else if (conditionDigitvol===6) {
			drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenDays*i+32, 130 - (heightDiff*delta), 50, 21, Color.white())
		} else {
			drawTextC(shouldRound(roundedTemp, temp)+"°", 20, spaceBetweenDays*i+32, 130 - (heightDiff*delta), 50, 21, accentColor)
		}
	  night=false
		drawImage(symbolForCondition(condition), spaceBetweenDays * i + 33, 155 - (heightDiff*delta)); //40, 165
   	drawTextC((i==0?"Heute":weekday[hour]), 18, spaceBetweenDays*i+26, 221,55, 21, shadow1)
		drawTextC((i==0?"Heute":weekday[hour]), 18, spaceBetweenDays*i+27, 222,55, 21, shadow2)
		drawTextC((i==0?"Heute":weekday[hour]), 18, spaceBetweenDays*i+28, 223,55, 21, shadow3)
  	drawTextC((i==0?"Heute":weekday[hour]), 18, spaceBetweenDays*i+25, 220,55, 21, Color.white())
  	previousDelta = delta;
	}
	
	for(let i = 0; i<daysToShow ;i++){
		let tempmin = shouldRound(roundedGraph, weatherData.daily[i].temp.min);
		let nextHourTempmin = shouldRound(roundedGraph, weatherData.daily[i+1].temp.min);
		let deltamin = (diff>0)?(shouldRound(roundedGraph, tempmin) - min) / diff:0.5;
		let nextDeltamin = (diff>0)?(nextHourTempmin - min) / diff:0.5
  	if (i<(daysToShow-1)) {
     	drawLine(spaceBetweenDays * (i) + fromLeft + spaceBetweenDays/2, 176 - (heightDiff * deltamin),spaceBetweenDays * (i+1) + fromLeft + spaceBetweenDays/2, 176 - (heightDiff * nextDeltamin), 4, (shadow1))
     	drawLine(spaceBetweenDays * (i) + fromLeft + spaceBetweenDays/2, 177 - (heightDiff * deltamin),spaceBetweenDays * (i+1) + fromLeft + spaceBetweenDays/2, 177 - (heightDiff * nextDeltamin), 4, (shadow2))
		  drawLine(spaceBetweenDays * (i) + fromLeft + spaceBetweenDays/2, 175 - (heightDiff * deltamin),spaceBetweenDays * (i+1) + fromLeft + spaceBetweenDays/2, 175 - (heightDiff * nextDeltamin), 4, (nightColor))
	  }
    // Next 2 lines SFSymbols tweak 
		const condition = i==0?weatherData.current.weather[0].id:weatherData.daily[i].weather[0].id
    
    let conditionDigitvol= Math.floor(condition / 100)
    drawTextC(shouldRound(roundedTemp, tempmin)+"°", 20, spaceBetweenDays*i+33 + spaceBetweenDays/2, 196 - (heightDiff*deltamin), 50, 21, shadow1)
    drawTextC(shouldRound(roundedTemp, tempmin)+"°", 20, spaceBetweenDays*i+34 + spaceBetweenDays/2, 197 - (heightDiff*deltamin), 50, 21, shadow2)
    drawTextC(shouldRound(roundedTemp, tempmin)+"°", 20, spaceBetweenDays*i+35 + spaceBetweenDays/2, 198 - (heightDiff*deltamin), 50, 21, shadow3)
    if ((conditionDigitvol===2) || ( conditionDigitvol===3) || (conditionDigitvol===5)){  
	    drawTextC(shouldRound(roundedTemp, tempmin)+"°", 20, spaceBetweenDays*i+32 + spaceBetweenDays/2, 195 - (heightDiff*deltamin), 50, 21, rainColor)
    } else if (conditionDigitvol===6) {
		  drawTextC(shouldRound(roundedTemp, tempmin)+"°", 20, spaceBetweenDays*i+32 + spaceBetweenDays/2, 195 - (heightDiff*deltamin), 50, 21, Color.white())
		} else {
	    drawTextC(shouldRound(roundedTemp, tempmin)+"°", 20, spaceBetweenDays*i+32 + spaceBetweenDays/2, 195 - (heightDiff*deltamin), 50, 21, linecolor)
    }
   
		night=true
		drawImage(symbolForCondition(condition), spaceBetweenDays * i + 33 + spaceBetweenDays/2, 155 - (heightDiff*deltamin)); //40, 165
   	previousDeltamin = deltamin;
	}
		// endo of for-loop
	drawLine(0,255,665,255, 1, linecolor)
	diagramStack.addImage(drawContext.getImage());
	
	
}

// display location ONLY on screen - thewaytozionmod
async function currentLoc(column) {
	// Requirements: location
  if (!locationData) { await setupLocation() }
  	
  // Set up the current weather stack.
  let currentLocStack = align(column)
  currentLocStack.layoutHorizontally()
  currentLocStack.setPadding(0, 0, 0, 0)
  currentLocStack.url = "https://weather.com/weather/today/l/" + locationData.latitude + "," + locationData.longitude
  let locationonlyTextStack = align(currentLocStack)
  locationonlyTextStack.layoutHorizontally()
  //symbolName = "mappin.and.ellipse"
  //const symbol = locationonlyTextStack.addImage(SFSymbol.named(symbolName).image)
  //symbol.imageSize = new Size(22,22)
  //tintIcon(symbol, textFormat.location)
  //locationonlyTextStack.addSpacer(padding)
  let locationonlyText = provideText(locationData.locality, locationonlyTextStack, textFormat.location)
}

// Display the current weather. thewaytozion addition
async function desconly(column) {

   // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }
  if (!sunData) { await setupSunrise() }
  // Set up the current weather stack.
  let currentdescStack = align(column)
  currentdescStack.setPadding(0, 0, 0, 0)
  currentdescStack.url = "https://weather.com/weather/today/l/" + locationData.latitude + "," + locationData.longitude
  // Show the current temperature.

  const descaloneStack = align(currentdescStack)
  descaloneStack.setPadding(0, 0, 0, 0)
  const descaloneText = weatherData.current.weather[0].description
  const descalone = provideText(descaloneText, descaloneStack, textFormat.desconly)
}





// Display the current weather. thewaytozion addition
async function maxtemp(column) {

   // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }
  
  // Set up the current weather stack.
  let maxtempStack = align(column)
  maxtempStack.setPadding(padding, 0, 0, 0)
  maxtempStack.url = "https://weather.com/weather/today/l/" + locationData.latitude + "," + locationData.longitude

  let maxtempText = ""
	maxtempText = "Max.: " + Math.round(weatherData.daily[0].temp.max).toString()+"°"
  const maxtemp = provideText(maxtempText, maxtempStack, textFormat.HiLotemp)
}

// Display the current weather. thewaytozion addition
async function mintemp(column) {

   // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }
  
  // Set up the current weather stack.
  let mintempStack = align(column)
  mintempStack.setPadding(padding, 0, 0, 0)
  mintempStack.url = "https://weather.com/weather/today/l/" + locationData.latitude + "," + locationData.longitude

  let mintempText = ""
  mintempText ="Min.: " + Math.round(weatherData.daily[0].temp.min).toString()+"°"
  const mintemp = provideText(mintempText, mintempStack, textFormat.HiLotemp)
}



// Display the current weather. thewaytozion addition
async function sunsetonly(column) {
  // Requirements: sunrise
  if (!sunData) { await setupSunrise() }
  
  const sunset = sunData.sunset
  
  
  const sunsetonlyStack = align(column)
  sunsetonlyStack.setPadding(padding, 0, 0, 0)
  sunsetonlyStack.borderWidth = 0
// sunsetonlyStack.size = new Size(55, 0);
  // Add the time.
  const sunsetonlyText = formatTime(new Date(sunset))
  const sunsetonly = provideText(sunsetonlyText, sunsetonlyStack, textFormat.databtm)


}


// Display the current weather. thewaytozion addition
async function sunriseonly(column) {


  // Requirements: sunrise
  if (!sunData) { await setupSunrise() }
  
  const sunrise = sunData.sunrise
  console.log(sunrise)
  
  const sunriseonlyStack = align(column)
  sunriseonlyStack.setPadding(padding, 0, 0, 0)
// sunriseonlyStack.size = new Size(55, 0);
  // Add the time.
  const sunriseonlyText = formatTime(new Date(sunrise))
  const sunriseonly = provideText(sunriseonlyText, sunriseonlyStack, textFormat.databtm)
}

// Display the current weather. thewaytozion addition
async function feelslike(column) {

   // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }
  	
  
  // Set up the current weather stack.
  let feelslikeStack = align(column)
  feelslikeStack.setPadding(padding, 0, 0, 0)

  feelslikeStack.borderWidth = 0
//   feelslikeStack.size = new Size(55, 0);
  
  const feelslikeText = Math.round(weatherData.current.feels_like).toString() +"°"

  const feelslike = provideText(feelslikeText, feelslikeStack, textFormat.databtm)
  feelslike.rightAlignText()
}

// Display the current weather. thewaytozion addition
async function rain(column) {

   // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }
 
  // Set up the current weather stack.
  let rainStack = align(column)
  rainStack.setPadding(padding, 0, 0, 0)
//   rainStack.size = new Size(55, 0);

  const rainText = Math.round(100*weatherData.hourly[0].pop).toString() +"%"
  const rain = provideText(rainText, rainStack, textFormat.databtm)
rain.rightAlignText()
}

// Display the current weather. thewaytozion addition
async function dewpoint(column) {

   // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }
 
  // Set up the current weather stack.
  let dewpointStack = align(column)
  dewpointStack.setPadding(padding, 0, 0, 0)
// dewpointStack.size = new Size(55, 0);

  const dewpointText = Math.round(weatherData.current.dew_point).toString() +"°"
 const dewpoint = provideText(dewpointText, dewpointStack, textFormat.databtm)
 dewpoint.rightAlignText()
}

// Display the current weather. thewaytozion addition
async function humidity(column) {

   // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }
 
  // Set up the current weather stack.
  let humidityStack = align(column)
  humidityStack.setPadding(padding, 0, 0, 0)
//   humidityStack.size = new Size(65, 0);

  const humidityText = Math.round(weatherData.current.humidity).toString() +"%"
  const humidity = provideText(humidityText, humidityStack, textFormat.databtm)
 humidity.rightAlignText()
}
// Display the current weather. thewaytozion addition
async function pressure(column) {

   // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }
 
  // Set up the current weather stack.
  let pressureStack = align(column)
  pressureStack.setPadding(padding, 0, 0, 0)
//   pressureStack.size = new Size(85, 0);
  const pressureText = Math.round(weatherData.current.pressure).toString() +" mbar"
 const pressure = provideText(pressureText, pressureStack, textFormat.databtm)
 pressure.rightAlignText()
}

// Display the current weather. thewaytozion addition
async function wind(column) {

   // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }




 
  let winddir =""
  let direction = weatherData.current.wind_deg
console.log("direction " + direction)
  if (direction <= 360) winddir = "N";
  if (direction < 348.75) winddir = "NNW";    
  if (direction < 326.25) winddir = "NW";   
  if (direction < 303.75) winddir = "WNW";
  if (direction < 281.25) winddir = "W";    
  if (direction < 258.75) winddir = "WSW";    
  if (direction < 236.25) winddir = "SW";
  if (direction < 213.75) winddir = "SSW";    
  if (direction < 191.25) winddir = "S";    
  if (direction < 168.75) winddir = "SSO";
  if (direction < 146.25) winddir = "SO";   
  if (direction < 123.75) winddir = "OSO";    
  if (direction < 101.25) winddir = "O";    
  if (direction < 78.75) winddir = "ONO";   
  if (direction < 56.25) winddir = "NO";
  if (direction < 33.75) winddir = "NNO";   
  if (direction < 11.25) winddir = "N";


  // Set up the current weather stack.
  let windStack = align(column)
  windStack.setPadding(padding, 0, 0, 0)
  const windText = Math.round(weatherData.current.wind_speed).toString() +" m/s " + winddir
// const windText = Math.round(weatherData.current.wind_speed).toString() +" m/s "
  const wind = provideText(windText, windStack, textFormat.databtm)
 

}


// Display the current weather. thewaytozion addition
async function UVIndex(column) {

   // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }
 
  // Set up the current weather stack.
  let UVIndexStack = align(column)
  UVIndexStack.setPadding(padding, 0, 0, 0)
//   UVIndexStack.size = new Size(55, 0);
  const UVIndexText = (weatherData.current.uvi).toString()
 const UVIndex = provideText(UVIndexText, UVIndexStack, textFormat.databtm)

}
// Display the current weather. thewaytozion addition
async function clouds(column) {

   // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }
 
  // Set up the current weather stack.
  let cloudsStack = align(column)
  cloudsStack.setPadding(padding, 0, 0, 0)
//   cloudsStack.size = new Size(55, 0);
  const cloudsText = Math.round(weatherData.current.clouds).toString() +"%"
  const clouds = provideText(cloudsText, cloudsStack, textFormat.databtm)
 
}


// get time to show updated time - thewaytozion mod
async function updatedtime(column) {
  // Requirements: weather and sunrise
  if (!weatherData) { await setupWeather() }
 
  // Show the current temperature.
  const updatedStack = align(column)
  updatedStack.setPadding(0, padding, 0, 0)
  
  //console.log("update " +weatherData.update)

  const updatedText = ("Aktualisiert: " + weatherData.update)


//    const updatedText = formatTime(new Date(weatherData.update))
const updatevar = provideText(updatedText, updatedStack, textFormat.updatetxt)

  //const updatevar = provideText(updatedText, updatedStack, textFormat.updated)

}




// Display the current weather. thewaytozion addition
async function sunsetonlytxt(column) {
  // Requirements: sunrise
  
  const sunsetonlyStack = align(column)
  sunsetonlyStack.setPadding(padding, 0, 0, 0)

  sunsetonlyStack.borderWidth = 0
  // Add the time.
  const sunsetonlyText = "SONNENUNTERG."
  const sunsetonly = provideText(sunsetonlyText, sunsetonlyStack, textFormat.databtmtxt)


}


// Display the current weather. thewaytozion addition
async function sunriseonlytxt(column) {


 
  
  const sunriseonlyStack = align(column)
  sunriseonlyStack.setPadding(padding, 0, 0, 0)
  // Add the time.
  const sunriseonlyText = "SONNENAUFG."
  const sunriseonly = provideText(sunriseonlyText, sunriseonlyStack, textFormat.databtmtxt)
}

// Display the current weather. thewaytozion addition
async function feelsliketxt(column) {

  
  
  // Set up the current weather stack.
  let feelslikeStack = align(column)
  feelslikeStack.setPadding(padding, 0, 0, 0)
  feelslikeStack.borderWidth = 0
  const feelslikeText = "GEFÜHLT"
  const feelslike = provideText(feelslikeText, feelslikeStack, textFormat.databtmtxt)

}

// Display the current weather. thewaytozion addition
async function raintxt(column) {

   
  // Set up the current weather stack.
  let rainStack = align(column)
  rainStack.setPadding(padding, 0, 0, 0)
  const rainText = "NIEDERSCHLAGSW."
  const rain = provideText(rainText, rainStack, textFormat.databtmtxt)

}

// Display the current weather. thewaytozion addition
async function dewpointtxt(column) {

   
  // Set up the current weather stack.
  let dewpointStack = align(column)
  dewpointStack.setPadding(padding, 0, 0, 0)
  const dewpointText = "TAUPUNKT"
 const dewpoint = provideText(dewpointText, dewpointStack, textFormat.databtmtxt)
}

// Display the current weather. thewaytozion addition
async function humiditytxt(column) {

   
 
  // Set up the current weather stack.
  let humidityStack = align(column)
  humidityStack.setPadding(padding, 0, 0, 0)
  const humidityText = "LUFTFEUCHTE"
  const humidity = provideText(humidityText, humidityStack, textFormat.databtmtxt)

}
// Display the current weather. thewaytozion addition
async function pressuretxt(column) {

   
 
  // Set up the current weather stack.
  let pressureStack = align(column)
  pressureStack.setPadding(padding, 0, 0, 0)
  const pressureText = "LUFTDRUCK"
 const pressure = provideText(pressureText, pressureStack, textFormat.databtmtxt)

}

// Display the current weather. thewaytozion addition
async function windtxt(column) {

 
  
  let windStack = align(column)
  windStack.setPadding(padding, 0, 0, 0)
  const windText = "WIND"
  const wind = provideText(windText, windStack, textFormat.databtmtxt)


}


// Display the current weather. thewaytozion addition
async function UVIndextxt(column) {

   
  // Set up the current weather stack.
  let UVIndexStack = align(column)
  UVIndexStack.setPadding(padding, 0, 0, 0)
  const UVIndexText = "UV-INDEX"
 const UVIndex = provideText(UVIndexText, UVIndexStack, textFormat.databtmtxt)

}
// Display the current weather. thewaytozion addition
async function cloudstxt(column) {

  
 
  // Set up the current weather stack.
  let cloudsStack = align(column)
  cloudsStack.setPadding(padding, 0, 0, 0)
  const cloudsText = "BEWÖLKUNG"
  const clouds = provideText(cloudsText, cloudsStack, textFormat.databtmtxt)

}



// Display a time-based greeting on the widget.
async function greeting(column) {

  // This function makes a greeting based on the time of day.
  function makeGreeting() {
    const hour = currentDate.getHours()
    if (hour    < 5)  { return localizedText.nightGreeting }
    if (hour    < 12) { return localizedText.morningGreeting }
    if (hour-12 < 5)  { return localizedText.afternoonGreeting }
    if (hour-12 < 10) { return localizedText.eveningGreeting }
    return localizedText.nightGreeting
  }
  
  // Set up the greeting.
  let greetingStack = align(column)
  let greeting = provideText(makeGreeting(), greetingStack, textFormat.greeting)
  greetingStack.setPadding(padding, padding, padding, padding)
}

// Display events on the widget.
async function events(column) {

  // Requirements: events
  if (!eventData) { await setupEvents() }

  // If no events are visible, figure out what to do.
  if (!eventData.eventsAreVisible) { 
    const display = eventSettings.noEventBehavior
    
    // If it's a greeting, let the greeting function handle it.
    if (display == "greeting") { return await greeting(column) }
    
    // If it's a message, get the localized text.
    if (display == "message" && localizedText.noEventMessage.length) {
      const messageStack = align(column)
      messageStack.setPadding(padding, padding, padding, padding)
      provideText(localizedText.noEventMessage, messageStack, textFormat.noEvents)
    }
    
    // Whether or not we displayed something, return here.
    return
  }
  
  // Set up the event stack.
  let eventStack = column.addStack()
  eventStack.layoutVertically()
  const todaySeconds = Math.floor(currentDate.getTime() / 1000) - 978307200
  eventStack.url = 'calshow:' + todaySeconds
  
  // If there are no events and we have a message, show it and return.
  if (!eventData.eventsAreVisible && localizedText.noEventMessage.length) {
    let message = provideText(localizedText.noEventMessage, eventStack, textFormat.noEvents)
    eventStack.setPadding(padding, padding, padding, padding)
    return
  }
  
  // If we're not showing the message, don't pad the event stack.
  eventStack.setPadding(0, 0, 0, 0)
  
  // Add each event to the stack.
  var currentStack = eventStack
  const futureEvents = eventData.futureEvents
  for (let i = 0; i < futureEvents.length; i++) {
    
    const event = futureEvents[i]
    const bottomPadding = (padding-10 < 0) ? 0 : padding-10
    
    // If it's the tomorrow label, change to the tomorrow stack.
    if (event.isLabel) {
      let tomorrowStack = column.addStack()
      tomorrowStack.layoutVertically()
      const tomorrowSeconds = Math.floor(currentDate.getTime() / 1000) - 978220800
      tomorrowStack.url = 'calshow:' + tomorrowSeconds
      currentStack = tomorrowStack
      
      // Mimic the formatting of an event title, mostly.
      const eventLabelStack = align(currentStack)
      const eventLabel = provideText(event.title, eventLabelStack, textFormat.eventLabel)
      eventLabelStack.setPadding(padding, padding, padding, padding)
      continue
    }
    
    const titleStack = align(currentStack)
    titleStack.layoutHorizontally()
    const showCalendarColor = eventSettings.showCalendarColor
    const colorShape = showCalendarColor.includes("circle") ? "circle" : "rectangle"
    
    // If we're showing a color, and it's not shown on the right, add it to the left.
    if (showCalendarColor.length && !showCalendarColor.includes("right")) {
      let colorItemText = provideTextSymbol(colorShape) + " "
      let colorItem = provideText(colorItemText, titleStack, textFormat.eventTitle)
      colorItem.textColor = event.calendar.color
    }

    const title = provideText(event.title.trim(), titleStack, textFormat.eventTitle)
    titleStack.setPadding(padding, padding, event.isAllDay ? padding : padding/5, padding)
    
    // If we're showing a color on the right, show it.
    if (showCalendarColor.length && showCalendarColor.includes("right")) {
      let colorItemText = " " + provideTextSymbol(colorShape)
      let colorItem = provideText(colorItemText, titleStack, textFormat.eventTitle)
      colorItem.textColor = event.calendar.color
    }
  
    // If there are too many events, limit the line height.
    if (futureEvents.length >= 3) { title.lineLimit = 1 }

    // If it's an all-day event, we don't need a time.
    if (event.isAllDay) { continue }
    
    // Format the time information.
    let timeText = formatTime(event.startDate)
    
    // If we show the length as time, add an en dash and the time.
    if (eventSettings.showEventLength == "time") { 
      timeText += "–" + formatTime(event.endDate) 
      
    // If we should it as a duration, add the minutes.
    } else if (eventSettings.showEventLength == "duration") {
      const duration = (event.endDate.getTime() - event.startDate.getTime()) / (1000*60)
      const hours = Math.floor(duration/60)
      const minutes = Math.floor(duration % 60)
      const hourText = hours>0 ? hours + localizedText.durationHour : ""
      const minuteText = minutes>0 ? minutes + localizedText.durationMinute : ""
      const showSpace = hourText.length && minuteText.length
      timeText += " \u2022 " + hourText + (showSpace ? " " : "") + minuteText
    }

    const timeStack = align(currentStack)
    const time = provideText(timeText, timeStack, textFormat.eventTime)
    timeStack.setPadding(0, padding, padding, padding)
  }
}



// Return a text-creation function.
function text(input = null) {

  function displayText(column) {
  
    // Don't do anything if the input is blank.
    if (!input || input == "") { return }
  
    // Otherwise, add the text.
    const textStack = align(column)
    textStack.setPadding(padding, padding, padding, padding)
    const textDisplay = provideText(input, textStack, textFormat.customText)
  }
  return displayText
}

// Add a battery element to the widget; consisting of a battery icon and percentage.
async function battery(column) {

  // Get battery level via Scriptable function and format it in a convenient way
  function getBatteryLevel() {
  
    const batteryLevel = Device.batteryLevel()
    const batteryPercentage = `${Math.round(batteryLevel * 100)}%`

    return batteryPercentage
  }
  
  const batteryLevel = Device.batteryLevel()
  
  // Set up the battery level item
  let batteryStack = align(column)
  batteryStack.layoutHorizontally()
  batteryStack.centerAlignContent()

  let batteryIcon = batteryStack.addImage(provideBatteryIcon())
  batteryIcon.imageSize = new Size(30,30)
  
  // Change the battery icon to red if battery level is <= 20 to match system behavior
  if ( Math.round(batteryLevel * 100) > 20 || Device.isCharging() ) {

    tintIcon(batteryIcon, textFormat.battery)

  } else {

    batteryIcon.tintColor = Color.red()

  }

  batteryStack.addSpacer(padding * 0.6)

  // Display the battery status
  let batteryInfo = provideText(getBatteryLevel(), batteryStack, textFormat.battery)

  batteryStack.setPadding(padding/2, padding, padding/2, padding)

}

// Show the sunrise or sunset time.
async function sunrise(column) {
  
  // Requirements: sunrise
  if (!sunData) { await setupSunrise() }
  
  const sunrise = sunData.sunrise
  const sunset = sunData.sunset
  const tomorrow = sunData.tomorrow
  const current = currentDate.getTime()
  
  const showWithin = sunriseSettings.showWithin
  const closeToSunrise = closeTo(sunrise) <= showWithin
  const closeToSunset = closeTo(sunset) <= showWithin

  // If we only show sometimes and we're not close, return.
  if (showWithin > 0 && !closeToSunrise && !closeToSunset) { return }
  
  // Otherwise, determine which time to show.
  let timeToShow, symbolName
  const halfHour = 30 * 60 * 1000
  
  // If we're between sunrise and sunset, show the sunset.
  if (current > sunrise + halfHour && current < sunset + halfHour) {
    symbolName = "sunset.fill"
    timeToShow = sunset
  }
  
  // Otherwise, show a sunrise.
  else {
    symbolName = "sunrise.fill"
    timeToShow = current > sunset ? tomorrow : sunrise
  }
  
  // Set up the stack.
  const sunriseStack = align(column)
  sunriseStack.setPadding(padding/2, padding, padding/2, padding)
  sunriseStack.layoutHorizontally()
  sunriseStack.centerAlignContent()
  
  sunriseStack.addSpacer(padding * 0.3)
  
  // Add the correct symbol.
  const symbol = sunriseStack.addImage(SFSymbol.named(symbolName).image)
  symbol.imageSize = new Size(22,22)
  tintIcon(symbol, textFormat.sunrise)
  
  sunriseStack.addSpacer(padding)
  
  // Add the time.
  const timeText = formatTime(new Date(timeToShow))
  const time = provideText(timeText, sunriseStack, textFormat.sunrise)
}

// Allow for either term to be used.
async function sunset(column) {
  return await sunrise(column)
}

/*
 * HELPER FUNCTIONS
 * These functions perform duties for other functions.
 * ===================================================
 */

// Tints icons if needed.
function tintIcon(icon,format) {
  if (!tintIcons) { return }
  icon.tintColor = new Color(format.color || textFormat.defaultText.color)
}

// Determines if the provided date is at night.
function isNight(dateInput) {
  const timeValue = dateInput.getTime()

// add here
if (timeValue < sunData.sunrise){
	night= true
} else {
	night=false
}

  return (timeValue < sunData.sunrise) || (timeValue > sunData.sunset)
}

// Determines if two dates occur on the same day
function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

// Returns the number of minutes between now and the provided date.
function closeTo(time) {
  return Math.abs(currentDate.getTime() - time) / 60000
}

// Format the time for a Date input.
function formatTime(date) {
  let df = new DateFormatter()
  df.locale = locale
  df.useNoDateStyle()
  df.useShortTimeStyle()
  return df.string(date)
}

// Provide a text symbol with the specified shape.
function provideTextSymbol(shape) {

  // Rectangle character.
  if (shape.startsWith("rect")) {
    return "\u2759"
  }
  // Circle character.
  if (shape == "circle") {
    return "\u2B24"
  }
  // Default to the rectangle.
  return "\u2759" 
}

// Provide a battery SFSymbol with accurate level drawn on top of it.
function provideBatteryIcon() {
  
  // If we're charging, show the charging icon.
  if (Device.isCharging()) { return SFSymbol.named("battery.100.bolt").image }
  
  // Set the size of the battery icon.
  const batteryWidth = 87
  const batteryHeight = 41
  
  // Start our draw context.
  let draw = new DrawContext()
  draw.opaque = false
  draw.respectScreenScale = true
  draw.size = new Size(batteryWidth, batteryHeight)
  
  // Draw the battery.
  draw.drawImageInRect(SFSymbol.named("battery.0").image, new Rect(0, 0, batteryWidth, batteryHeight))
  
  // Match the battery level values to the SFSymbol.
  const x = batteryWidth*0.1525
  const y = batteryHeight*0.247
  const width = batteryWidth*0.602
  const height = batteryHeight*0.505
  
  // Prevent unreadable icons.
  let level = Device.batteryLevel()
  if (level < 0.05) { level = 0.05 }
  
  // Determine the width and radius of the battery level.
  const current = width * level
  let radius = height/6.5
  
  // When it gets low, adjust the radius to match.
  if (current < (radius * 2)) { radius = current / 2 }

  // Make the path for the battery level.
  let barPath = new Path()
  barPath.addRoundedRect(new Rect(x, y, current, height), radius, radius)
  draw.addPath(barPath)
  const color = tintIcons ? (textFormat.battery.color || textFormat.defaultText.color) : "000000"
  draw.setFillColor(new Color(color))
  draw.fillPath()
  return draw.getImage()
}

// Provide a symbol based on the condition.
function provideConditionSymbol(cond,night) {
  
  // Define our symbol equivalencies.
  let symbols = {
  
    // Thunderstorm
    "2": function() { return "cloud.bolt.rain.fill" },
    
    // Drizzle
    "3": function() { return "cloud.drizzle.fill" },
    
    // Rain
    "5": function() { return (cond == 511) ? "cloud.sleet.fill" : "cloud.rain.fill" },
    
    // Snow
    "6": function() { return (cond >= 611 && cond <= 613) ? "cloud.snow.fill" : "snow" },
    
    // Atmosphere
    "7": function() {
      if (cond == 781) { return "tornado" }
      if (cond == 701 || cond == 741) { return "cloud.fog.fill" }
      return night ? "cloud.fog.fill" : "sun.haze.fill"
    },
    
    // Clear and clouds
    "8": function() {
      if (cond == 800 || cond == 801) { return night ? "moon.stars.fill" : "sun.max.fill" }
      if (cond == 802 || cond == 803) { return night ? "cloud.moon.fill" : "cloud.sun.fill" }
      return "cloud.fill"
    }
  }
  
  // Find out the first digit.
  let conditionDigit = Math.floor(cond / 100)
  
  // Get the symbol.
  return SFSymbol.named(symbols[conditionDigit]()).image
}

// Provide a font based on the input.
function provideFont(fontName, fontSize) {
  const fontGenerator = {
    "ultralight": function() { return Font.ultraLightSystemFont(fontSize) },
    "light": function() { return Font.lightSystemFont(fontSize) },
    "regular": function() { return Font.regularSystemFont(fontSize) },
    "medium": function() { return Font.mediumSystemFont(fontSize) },
    "semibold": function() { return Font.semiboldSystemFont(fontSize) },
    "bold": function() { return Font.boldSystemFont(fontSize) },
    "heavy": function() { return Font.heavySystemFont(fontSize) },
    "black": function() { return Font.blackSystemFont(fontSize) },
    "italic": function() { return Font.italicSystemFont(fontSize) }
  }
  
  const systemFont = fontGenerator[fontName]
  if (systemFont) { return systemFont() }
  return new Font(fontName, fontSize)
}
 
// Add formatted text to a container.
function provideText(string, container, format) {
  const textItem = container.addText(string)
  const textFont = format.font || textFormat.defaultText.font
  const textSize = format.size || textFormat.defaultText.size
  const textColor = format.color || textFormat.defaultText.color
  
  textItem.font = provideFont(textFont, textSize)
  textItem.textColor = new Color(textColor)
  return textItem
}

/*
 * DRAWING FUNCTIONS
 * These functions draw onto a canvas.
 * ===================================
 */

// Draw the vertical line in the tomorrow view.
function drawVerticalLine(color, height) {
  
  const width = 2
  
  let draw = new DrawContext()
  draw.opaque = false
  draw.respectScreenScale = true
  draw.size = new Size(width,height)
  
  let barPath = new Path()
  const barHeight = height
  barPath.addRoundedRect(new Rect(0, 0, width, height), width/2, width/2)
  draw.addPath(barPath)
  draw.setFillColor(color)
  draw.fillPath()
  
  return draw.getImage()
}

// Draw the temp bar.
function drawTempBar() {

  // Set the size of the temp bar.
  const tempBarWidth = 200
  const tempBarHeight = 20
  
  // Calculate the current percentage of the high-low range.
  let percent = (weatherData.currentTemp - weatherData.todayLow) / (weatherData.todayHigh - weatherData.todayLow)

  // If we're out of bounds, clip it.
  if (percent < 0) {
    percent = 0
  } else if (percent > 1) {
    percent = 1
  }

  // Determine the scaled x-value for the current temp.
  const currPosition = (tempBarWidth - tempBarHeight) * percent

  // Start our draw context.
  let draw = new DrawContext()
  draw.opaque = false
  draw.respectScreenScale = true
  draw.size = new Size(tempBarWidth, tempBarHeight)

  // Make the path for the bar.
  let barPath = new Path()
  const barHeight = tempBarHeight - 10
  barPath.addRoundedRect(new Rect(0, 5, tempBarWidth, barHeight), barHeight / 2, barHeight / 2)
  draw.addPath(barPath)
  
  // Determine the color.
  const barColor = textFormat.battery.color || textFormat.defaultText.color
  draw.setFillColor(new Color(textFormat.tinyTemp.color || textFormat.defaultText.color, 0.5))
  draw.fillPath()

  // Make the path for the current temp indicator.
  let currPath = new Path()
  currPath.addEllipse(new Rect(currPosition, 0, tempBarHeight, tempBarHeight))
  draw.addPath(currPath)
  draw.setFillColor(new Color(textFormat.tinyTemp.color || textFormat.defaultText.color, 1))
  draw.fillPath()

  return draw.getImage()
}



// converts the retrieved time in open
// weather to a date to work with
function epochToDate(epoch){
  return new Date(epoch * 1000)
}

// drawText()
function drawText(text, fontSize, x, y, color = Color.black()){
  drawContext.setFont(Font.boldSystemFont(fontSize))
  drawContext.setTextColor(color)
  drawContext.drawText(new String(text).toString(), new Point(x, y))
}

// drawImage()
function drawImage(image, x, y){
  drawContext.drawImageAtPoint(image, new Point(x, y))
}

// drawText()
function drawTextC(text, fontSize, x, y, w, h, color = Color.black()){
  drawContext.setFont(Font.boldSystemFont(fontSize))
  drawContext.setTextColor(color)
  drawContext.drawTextInRect(new String(text).toString(), new Rect(x, y, w, h))
}

// drawLine()
function drawLine(x1, y1, x2, y2, width, color){
  const path = new Path()
  path.move(new Point(x1, y1))
  path.addLine(new Point(x2, y2))
  drawContext.addPath(path)
  drawContext.setStrokeColor(color)
  drawContext.setLineWidth(width)
  drawContext.strokePath()
}

// checks and see if we should round
function shouldRound(should, value){
  return ((should) ? Math.round(value) : value)
}


// This function returns an SFSymbol image for a weather condition.
function symbolForCondition(cond){
//   console.log("night in symbol function: " + night)
  
  // Define our symbol equivalencies.
  let symbols = {
  
    // Thunderstorm
    "2": function() {
      return "cloud.bolt.rain.fill"
    },
    
    // Drizzle
    "3": function() {
      return "cloud.drizzle.fill"
    },
    
    // Rain
    "5": function() {
      return (cond == 511) ? "cloud.sleet.fill" : "cloud.rain.fill"
    },
    
    // Snow
    "6": function() {
      return (cond >= 611 && cond <= 613) ? "cloud.snow.fill" : "snow"
    },
    
    // Atmosphere
    "7": function() {
      if (cond == 781) { return "tornado" }
      if (cond == 701 || cond == 741) { return "cloud.fog.fill" }
      return night ? "cloud.fog.fill" : "sun.haze.fill"
    },
    
    // Clear and clouds
    "8": function() {
      if (cond == 800) { return night ? "moon.stars.fill" : "sun.max.fill" }
      if (cond == 802 || cond == 803) { return night ? "cloud.moon.fill" : "cloud.sun.fill" }
      return "cloud.fill"
    }
  }
  
  // Find out the first digit.
  let conditionDigit = Math.floor(cond / 100)
  
  // Get the symbol.
  let sfs = SFSymbol.named(symbols[conditionDigit]())
  sfs.applyFont(Font.systemFont(34))
  return sfs.image
}


// checks days so that the line will be 
// orange at sunrise time
function isSameDay(date1, date2){
  return (date1.getYear() == date2.getYear() && date1.getMonth() == date2.getMonth() &&  date1.getDate() == date2.getDate())
}
