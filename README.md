
## Weather Shortcut on Lockscreen w/ "Traveling" Moon/Sun ##


IS RUNNING ON iOS 14.3 (beta2) ONLY. Crossing fingers that "Set Wallpaper" function will stay with public iOS 14.3 release.

Just a modification from Shortcut presented below.
  
 
My personal screenshot from Shortcut can be seen below:

![Screenshot1](https://github.com/thewaytozion/widgets/blob/main/img/LSMoon.PNG "Screenshot1")

![Screenshot2](https://github.com/thewaytozion/widgets/blob/main/img/LSun.PNG "Screenshot2")

### Installation Guideline: ###

1. Download all images from here: [Download Lockscreen Layer Images](https://github.com/thewaytozion/widgets/tree/main/img/daynightwalls  "Download Lockscreen Layer Images") and place the images into your iCloud- folder (you have to create this folder):

/Shortcuts/iOSWeather/daynightwalls/Scaling/

2. Download the "Setup Shortcut" and run it on your device: [Install Setup iOS Weather LATER]( "Install Setup iOS Weather"). You have to run it 3 times initially to set up Lockscreen, Homescreen day and Homescreen night, follow guideline within this shortuct.

3. Download the [SunMoonWeather Shortcut LATER]( "Install SunMoonWeather Shortcut") and run it.

Optional and recommended:

4. Set automation to run this shortcut (e.g. every hour)
5. Set also automation for sunset and sunrise
6. turn notifications for Shortcuts-app off ( iPhone settings --> usage time --> click on more (under diagramm) -> scroll down to notifications and find Shortcuts ( at least one automation/notications is required on phone before you see shortcuts here) --> turn off )

### Sources/Credits: ###

1. Text to PNG source code from [Text to PNG](https://routinehub.co/shortcut/6552/ "Text to PNG") by [atnbueno](https://routinehub.co/user/atnbueno "atnbueno")
2. [Baseline Wall used](https://steamcommunity.com/sharedfiles/filedetails/?id=1441736444 "Baseline Wall used") by [skitz :] ](https://steamcommunity.com/id/ariff0/myworkshopfiles/?appid=431960 "skitz :]") 

## Weather Shortcut on Lockscreen / Homescreen ##


IS RUNNING ON iOS 14.3 (beta2) ONLY. Crossing fingers that "Set Wallpaper" function will stay with public iOS 14.3 release.

Shortcut for iOS 14.3 can be downloaded here [Install Shortcut](https://www.icloud.com/shortcuts/2fcdb02f82be4612a6484a8084daf6a1 "Shortcut").
  
 
My personal screenshot from Shortcut can be seen below:

![Screenshot1](https://github.com/thewaytozion/widgets/blob/main/img/LS.PNG "Screenshot1")

![Screenshot2](https://github.com/thewaytozion/widgets/blob/main/img/HS.PNG "Screenshot2")

### Installation Guideline: ###

1. We need to place 4 wallpapers in your iCloud-folder "/Shortcuts/iOSWeather/walls/". You can do that manually (1b) or using another shortcut (1a) below:

1a. You may install a schortcut to select from your photo-library: [Install Setup iOS Weather](https://www.icloud.com/shortcuts/3f47d801765b417e9a6ade5c897b1aa4 "Install Setup iOS Weather"). 

1b Manually store wallpaper images to iCloud folder:

Create Subfolder "iOSWeather" to your iCloud "Shortcuts" folder

Create Subfolder "walls" to the subfolder created above (in "iOSWeather")

Place your own Wallpapers (try to match your iPhone screen size,  --> [Device Screensizes](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/ "Device Screensizes") e.g. iPhone 11: 828x1792 px MAX!!):

Store 4 Wallpapers into the folder "/Shortcuts/iOSWeather/walls/" with the SAME file names shown in screenshot below:

![files](https://github.com/thewaytozion/widgets/blob/main/img/wallpapers.png "Files")

The wallpapers can have the same image in it, but the intend is to have 4 separate wallpapers for lockscreen and homescreen with night and day time.
You may use the following wallpapers for testing purposes.

[Wallpaper iPhone 11 Max Pro](https://github.com/thewaytozion/widgets/tree/main/img/walls "Wallpaper iPhone 11 Max Pro")

2. Run Shortcut

3. done



Optional and recommended:

4. Set automation to run this shortcut (e.g. every hour)
5. Set also automation for sunset and sunrise
6. turn notifications for Shortcuts-app off ( iPhone settings --> usage time --> click on more (under diagramm) -> scroll down to notifications and find Shortcuts ( at least one automation/notications is required on phone before you see shortcuts here) --> turn off )


### Sources/Credits: ###

1. Text to PNG source code from [Text to PNG](https://routinehub.co/shortcut/6552/ "Text to PNG") by [atnbueno](https://routinehub.co/user/atnbueno "atnbueno") 
2. Wallpaper preparation from [kleinmone](https://twitter.com/kleinmone "kleinmone") 

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



