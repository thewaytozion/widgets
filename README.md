## Widget for COVID-19 cases and incidence numbers ##

Widget to be used in [Scriptable-AppStore](https://t.co/XuruULlFCb?amp=1 "Scriptable-AppStore") for iOS14.

Initial source code had been leveraged in from multiple sources, which are listed at the end of this README.md. I modified this source-code for my personal use. Source code is not optimized and for personal use. Feel free to improve code.
 
My personal screenshot from widget can be seen below:
![Screenshot](https://github.com/thewaytozion/widgets/blob/main/img/ScreenShot-Covid-Widget.jpg "Screenshot")

### Installation Guideline: ###
1. Download [Scriptable](https://t.co/XuruULlFCb?amp=1 "Scriptable") from AppStore
2. Create a new script within scriptable using source code from [pseudo-transparent script](https://gist.github.com/mzeryck/3a97ccd1e059b3afa3c6666d27a496c9#gistcomment-3468585 "pseudo-transparent script")
3. Take a screenshot from your empty homescreen (guideline [here](https://www.howtogeek.com/694004/how-to-create-widgets-with-transparent-backgrounds-on-iphone/amp/ "here") )
4. Run script from point 2, follow script guideline and export to FILE at end of script, save image to "Scriptable" iCloud-folder (or subfolder). Remember (subfolder and) image file name!
5. Create a new script within scriptable using source code from this [Inzidenz-COVID-19.js](https://github.com/thewaytozion/widgets/blob/main/Inzidenz-COVID-19.js "Inzidenz-COVID-19.js"); for gradient colored background set variable USE_BG_IMG (line 20 in source code) to false, for background image set it to true, define BG_IMG_SUBFOLDER and BG_IMG as saved (remembered) from point 4 above
let USE_BG_IMG = false;
const BG_IMG_SUBFOLDER = "/img/";
const BG_IMG = "widgetBG.jpg";
6. go to iPhone homescreen press and hold on nackground image, go to + button in upper left corner, add widget from scriptable and select Inzidenz-COVID-19.js
7. done

### Sources/Credits: ###

1. Initial [toilet paper script](https://gist.github.com/marco79cgn/23ce08fd8711ee893a3be12d4543f2d2 "toilet paper script") by [marco79cgn](https://gist.github.com/marco79cgn "marco79cgn")
2. Initial [incidence scripts](https://gist.github.com/kevinkub/46caebfebc7e26be63403a7f0587f664 "incidence scripts") by [Kevninkub](https://gist.github.com/kevinkub "Kevninkub")  
3. Amazing [pseudo-transparent script](https://gist.github.com/mzeryck/3a97ccd1e059b3afa3c6666d27a496c9#gistcomment-3468585 "pseudo-transparent script") by [mzeryck](https://gist.github.com/mzeryck "mzeryck") and [simonbs](https://gist.github.com/simonbs "simonbs")



