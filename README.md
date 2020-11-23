
## Weather Shortcut on Lockscreen / Homescreen ##

#DRAFT#

IS RUNNING ON iOS 14.3 (beta2) ONLY. Crossing fingers that "Set Wallpaper" function will stay with public iOS 14.3 release.

Shortcut can be downloaded here [Link Later](https://t.co/XuruULlFCb?amp=1 "Link Later") for iOS14.3
 
My personal screenshot from Shortcut can be seen below:
![Screenshot1](https://github.com/thewaytozion/widgets/blob/main/img/HS_Shortcuts.PNG "Screenshot1")
![Screenshot2](https://github.com/thewaytozion/widgets/blob/main/img/LS_Shortcuts.PNG "Screenshot2")

### Installation Guideline: ###
1. Create Subfolder "iOSWeather" to your iCloud "Shortcuts" folder
2. Create Subfolder "walls" to the subfolder created above "iOSWeather"
3. Place your own Wallpapers (maximum size for wallpapers are limited to your screensize --> [Device Screensizes](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/ "Device Screensizes") e.g. iPhone 11: 828x1792 px MAX!!:
 Store 4 Wallpapers to the folder:
  
4. Run script from point 2, follow script guideline and export picture to your photo library app on the iPhone
5. Create a new script within scriptable using source code from this [WeatherWidget-Charts.js](https://github.com/thewaytozion/widgets/blob/main/WeatherWidget-Charts.js "WeatherWidget-Charts.js"); for gradient colored background set variable USE_BG_IMG (line 37 in source code) to false, for background image set it to true
6. Go to iPhone homescreen press and hold on background image, go to + button in upper left corner, add widget from scriptable and select WeatherWidget-Charts.js
7. done

### Sources/Credits: ###

1. Text to PNG source code from [Text to PNG](https://routinehub.co/shortcut/6552/ "Text to PNG") by [atnbueno](https://routinehub.co/user/atnbueno "atnbueno") 
2. Wallpaper Preparation from [kleinmone](https://twitter.com/kleinmone "kleinmone") 

---
## Weather Widget ##

Widget to be used in [Scriptable-AppStore](https://t.co/XuruULlFCb?amp=1 "Scriptable-AppStore") for iOS14.

Initial source code had been leveraged in from multiple sources, which are listed at the end of this README.md. I modified this source-code for my personal use. Source code is not optimized and is for personal use. Feel free to improve code. Currently German language only.
 
My personal screenshot from widget can be seen below:
![Screenshot](https://github.com/thewaytozion/widgets/blob/main/img/ScreenShot-Weather-Widget.jpg "Screenshot")

### Installation Guideline: ###
1. Download [Scriptable](https://t.co/XuruULlFCb?amp=1 "Scriptable") from AppStore
2. Create a new script within scriptable using source code from [pseudo-transparent script](https://gist.github.com/mzeryck/3a97ccd1e059b3afa3c6666d27a496c9#gistcomment-3468585 "pseudo-transparent script")
3. Take a screenshot from your empty homescreen (guideline [here](https://www.howtogeek.com/694004/how-to-create-widgets-with-transparent-backgrounds-on-iphone/amp/ "here") )
4. Run script from point 2, follow script guideline and export picture to your photo library app on the iPhone
5. Create a new script within scriptable using source code from this [WeatherWidget-Charts.js](https://github.com/thewaytozion/widgets/blob/main/WeatherWidget-Charts.js "WeatherWidget-Charts.js"); for gradient colored background set variable USE_BG_IMG (line 37 in source code) to false, for background image set it to true
6. Go to iPhone homescreen press and hold on background image, go to + button in upper left corner, add widget from scriptable and select WeatherWidget-Charts.js
7. done

### Sources/Credits: ###

1. Base source code used from [weather-cal scripts](https://github.com/mzeryck/Weather-Cal/blob/main/weather-cal.js "weather-cal scripts") by [mzeryck](https://gist.github.com/mzeryck "mzeryck") 
2. Amazing [pseudo-transparent script](https://gist.github.com/mzeryck/3a97ccd1e059b3afa3c6666d27a496c9#gistcomment-3468585 "pseudo-transparent script") by [mzeryck](https://gist.github.com/mzeryck "mzeryck") and [simonbs](https://gist.github.com/simonbs "simonbs") 
3. Weather Widgets with chart, leveraged in source code: [weather-widget script](https://gist.github.com/ImGamez/a8f9d77bf660d7703cc96fee87cdc4b0 " weather-widget script") by [ImGamez](https://gist.github.com/ImGamez "ImGamez") 

---


## Widget for COVID-19 Cases and Incidence Numbers ##

Widget to be used in [Scriptable-AppStore](https://t.co/XuruULlFCb?amp=1 "Scriptable-AppStore") for iOS14.

Initial source code had been leveraged in from multiple sources, which are listed at the end of this README.md. I modified this source-code for my personal use. Source code is not optimized and is for personal use. Feel free to improve code.
 
My personal screenshot from widget can be seen below:
![Screenshot](https://github.com/thewaytozion/widgets/blob/main/img/ScreenShot-Covid-Widget.jpg "Screenshot")

### Installation Guideline: ###
1. Download [Scriptable](https://t.co/XuruULlFCb?amp=1 "Scriptable") from AppStore
2. Create a new script within scriptable using source code from [pseudo-transparent script](https://gist.github.com/mzeryck/3a97ccd1e059b3afa3c6666d27a496c9#gistcomment-3468585 "pseudo-transparent script")
3. Take a screenshot from your empty homescreen (guideline [here](https://www.howtogeek.com/694004/how-to-create-widgets-with-transparent-backgrounds-on-iphone/amp/ "here") )
4. Run script from point 2, follow script guideline and export to FILE at end of script, save image to "Scriptable" iCloud-folder (or subfolder). Remember (subfolder and) image file name!
5. Create a new script within scriptable using source code from this [Inzidenz-COVID-19.js](https://github.com/thewaytozion/widgets/blob/main/Inzidenz-COVID-19.js "Inzidenz-COVID-19.js"); for gradient colored background set variable USE_BG_IMG (line 20 in source code) to false, for background image set it to true, define BG_IMG_SUBFOLDER and BG_IMG as saved (remembered) from point 4 above
6. Go to iPhone homescreen press and hold on background image, go to + button in upper left corner, add widget from scriptable and select Inzidenz-COVID-19.js
7. done

### Sources/Credits: ###

1. Initial [toilet paper script](https://gist.github.com/marco79cgn/23ce08fd8711ee893a3be12d4543f2d2 "toilet paper script") by [marco79cgn](https://gist.github.com/marco79cgn "marco79cgn")
2. Initial [incidence scripts](https://gist.github.com/kevinkub/46caebfebc7e26be63403a7f0587f664 "incidence scripts") by [Kevninkub](https://gist.github.com/kevinkub "Kevninkub")  
3. Amazing [pseudo-transparent script](https://gist.github.com/mzeryck/3a97ccd1e059b3afa3c6666d27a496c9#gistcomment-3468585 "pseudo-transparent script") by [mzeryck](https://gist.github.com/mzeryck "mzeryck") and [simonbs](https://gist.github.com/simonbs "simonbs")



