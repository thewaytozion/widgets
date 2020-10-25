// Licence: Robert Koch-Institut (RKI), dl-de/by-2-0
// international source data: https://disease.sh/
// ##################################
// original source code from KEVINKUB
// 
// https://gist.github.com/rphl/0491c5f9cb345bf831248732374c4ef5
// 
// ##################################
// generate customized pseudo-transparent background image with the following script:
// 
// https://gist.github.com/mzeryck/3a97ccd1e059b3afa3c6666d27a496c9#gistcomment-3468585
// save it to icloud ( using files app ) 
// use folder "Scriptable", below I added subfolder "img" to my iCloud-folder "Scriptable"
//  paste link to your image in const BG_IMG and BG_IMG_SUBFOLDER
// 
// ##################################
// ##################################
// USER INPUT

let USE_BG_IMG = false;
// for USE_BG_IMG true set your background image pas
// iCloud must be enabled on the device in order to use this.
// create sub-folder in iCloud-folder "Scriptable" and save bg-image 
const BG_IMG_SUBFOLDER = "/im/";
const BG_IMG = "widgetBG.jpg";

// for USE_BG_IMG false set your gradient colors below
const topcolor = "40372C";
const btmcolor = "594F42";

// ##################################
// ##################################


// ##################################
// fetching constants for RKI

const outputFields = 'GEN,cases_per_100k,cases7_per_100k,cases7_bl_per_100k,last_update,BL';

const apiUrl = (location) => `https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=${outputFields}&geometry=${location.longitude.toFixed(3)}%2C${location.latitude.toFixed(3)}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&returnGeometry=false&outSR=4326&f=json`;

const apiUrlStates = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/Coronaf%E4lle_in_den_Bundesl%E4ndern/FeatureServer/0/query?where=1%3D1&outFields=LAN_ew_GEN,cases7_bl_per_100k&returnGeometry=false&outSR=4326&f=json';

const apiUrlNewCases = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?f=json&where=NeuerFall%20IN(1%2C%20-1)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22AnzahlFall%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&resultType=standard&cacheHint=true';

// fetching constants for https://disease.sh/

const country = "USA";
const country2 = "DEU";
const country3 = "IND";
const country4 = "FRA";

const url = `https://disease.sh/v3/covid-19/countries/${country}`;
const req = new Request(url);
const res = await req.loadJSON();
const url1b = `https://disease.sh/v3/covid-19/countries/${country}?yesterday=true`;
const req1b = new Request(url1b);
const res1b = await req1b.loadJSON();


const url2 = `https://disease.sh/v3/covid-19/countries/${country2}`;
const req2 = new Request(url2);
const res2 = await req2.loadJSON();
const url2b = `https://disease.sh/v3/covid-19/countries/${country2}?yesterday=true`;
const req2b = new Request(url2b);
const res2b = await req2b.loadJSON();


const url3 = `https://disease.sh/v3/covid-19/countries/${country3}`;
const req3 = new Request(url3);
const res3 = await req3.loadJSON();
const url3b = `https://disease.sh/v3/covid-19/countries/${country3}?yesterday=true`;
const req3b = new Request(url3b);
const res3b = await req3b.loadJSON();


const url4 = `https://disease.sh/v3/covid-19/countries/${country4}`;
const req4 = new Request(url4);
const res4 = await req4.loadJSON();
const url4b = `https://disease.sh/v3/covid-19/countries/${country4}?yesterday=true`;
const req4b = new Request(url4b);
const res4b = await req4b.loadJSON();

// incidence limits Germany

const LIMIT_RED = 50
const LIMIT_ORANGE = 35
const LIMIT_RED_COLOR = new Color('C31621')
const LIMIT_ORANGE_COLOR = new Color('EBA03B')
const LIMIT_GREEN_COLOR = new Color('64D69E')


// BUNDESLAENDER_SHORT Option
const BUNDESLAENDER_SHORT = {
    'Baden-Württemberg': 'Baden-Württemberg',
    'Bayern': 'Bayern',
    'Berlin': 'Berlin',
    'Brandenburg': 'Brandenburg',
    'Bremen': 'Bremen',
    'Hamburg': 'Hamburg',
    'Hessen': 'Hessen',
    'Mecklenburg-Vorpommern': 'Mecklenburg-Vorpommern',
    'Niedersachsen': 'Niedersachsen',
    'Nordrhein-Westfalen': 'Nordrhein-Westfalen',
    'Rheinland-Pfalz': 'Rheinland-Pfalz',
    'Saarland': 'Saarland',
    'Sachsen': 'Sachsen',
    'Sachsen-Anhalt': 'Sachsen-Anhalt',
    'Schleswig-Holstein': 'Schleswig-Holstein',
    'Thüringen': 'Thüringen'
};

const widget = await createWidget();
if (!config.runsInWidget) {
    await widget.presentLarge();
}
Script.setWidget(widget);
Script.complete();

// widget here
async function createWidget(items) {
	const locale = Device.locale().split('_')[0];
    const data = await getData();
    const list = new ListWidget();
// 	generate widget background
	if (USE_BG_IMG){
		const BG_Wall = await getImage(BG_IMG);
	    list.backgroundImage = BG_Wall;
		
	} else {
		const gradient = new LinearGradient();
	    gradient.locations = [0, 1];
	    gradient.colors = [
	      new Color(topcolor),
	      new Color(btmcolor)
	    ]
	    list.backgroundGradient = gradient;
	}
// fetch data and plot it
	if (data) {
        const weekData = saveLoadData(data, data.areaName);
        if (!data.shouldCache) {
            list.addSpacer(6);
            const loadingIndicator = list.addText("Ort wird ermittelt...".toUpperCase());
            loadingIndicator.font = Font.mediumSystemFont(13);
            loadingIndicator.textOpacity = 0.5;
        }
// Main Header of Large Widget
		const header4 = list.addText("🦠 Sars-CoV-2".toUpperCase());
		header4.centerAlignText();
		header4.font = new Font("HelveticaNeue-MediumItalic", 24);
	
		list.addSpacer();
	
// Sub Header for Daily New Infection Cases
		const header2 = list.addText("🇩🇪 Neuinfektionen täglich".toUpperCase())	
		header2.font = new Font("HelveticaNeue-MediumItalic", 14);
	
		list.addSpacer();

		const stack0 = list.addStack();
		stack0.layoutHorizontally();
	    stack0.centerAlignContent();
		stack0.setPadding(0,20,0,0)	;
		// Get Case Numbers
		const formatedCasesGermany= new Number(data.cases).toLocaleString('de-DE');
		const countlabel = stack0.addText(`+${formatedCasesGermany}`);
	countlabel.font = new Font("HelveticaNeue-Bold ", 26);
	
		list.addSpacer();
		
// SubeHeader for Incidence Numbers locally via GPS Data - Germany
		const header = list.addText("Inzidenz".toUpperCase()+" letzten 7 Tage/100.000 Einwohner");
		header.font = new Font("HelveticaNeue-MediumItalic", 14);

// INCIDENCE
//Build up Stack Left and right for Landkreis , Bundesland
		const stack = list.addStack();
		stack.layoutHorizontally();
	    stack.centerAlignContent();
		stack.setPadding(0,0,0,0);	
		const leftstackLabel = stack.addStack();
		leftstackLabel.layoutVertically();
	    leftstackLabel.centerAlignContent();
		leftstackLabel.setPadding(0,20,0,0);
	
// Add Landkreis Data
	// left stack
        data.incidence = (data.incidence >= 100) ? parseInt(data.incidence) : data.incidence;
        const label = leftstackLabel.addText('' + (Math.round(data.incidence*10)/10) + '' + getIncidenceTrend(data, weekData));
        label.font = Font.boldSystemFont(26);
        label.textColor = data.incidence >= LIMIT_RED ? LIMIT_RED_COLOR : data.incidence >= LIMIT_ORANGE ? LIMIT_ORANGE_COLOR : LIMIT_GREEN_COLOR;
		const areaLabel= leftstackLabel.addText(data.areaName.toUpperCase());
        areaLabel.font = new Font("HelveticaNeue-Thin", 12);
	// 2 Right stack
		const rightstackLabel = stack.addStack();
		rightstackLabel.layoutVertically();
	    rightstackLabel.centerAlignContent();
		rightstackLabel.setPadding(0,20,0,0);
		data.incidenceBL = (data.incidenceBL >= 100) ? parseInt(data.incidenceBL) : data.incidenceBL;
		const labelBL = rightstackLabel.addText((Math.round(data.incidenceBL*10)/10)+ '' + getIncidenceTrend(data, weekData));
	    labelBL.font = Font.boldSystemFont(26);
	    labelBL.textColor = data.incidenceBL >= LIMIT_RED ? LIMIT_RED_COLOR : data.incidenceBL >= LIMIT_ORANGE ? LIMIT_ORANGE_COLOR : LIMIT_GREEN_COLOR;
	    const areaLabel2 = rightstackLabel.addText(data.nameBL.toUpperCase());
	    areaLabel2.font = new Font("HelveticaNeue-Thin", 12);
    
		list.addSpacer(10);

		const labelUpdated = list.addText(`Daten RKI, Stand vom ${data.updated.substr(0, 10)} für Vortag`);
        labelUpdated.font = new Font("HelveticaNeue-Thin", 10);
        labelUpdated.textColor = Color.white();

		const location2 = await getLocation().latitude;

		list.addSpacer();

// change source and fetch international data
		const header3 = list.addText("🇺🇳 Neuinfektionen ( Tote ) / Vortag".toUpperCase());
	    header3.font = new Font("HelveticaNeue-MediumItalic", 14);

// GERMANY

		const stack2= list.addStack();
		stack2.layoutHorizontally();
	    stack2.centerAlignContent();
		stack2.setPadding(0,20,0,0)	;
	
		let date2=new Date(res2.updated);

		let minutes2 = date2.getMinutes();
		if (minutes2<10) minutes2= "0"+minutes2;
		let time2 = date2.getHours() + ":" + minutes2;
		let date2string = date2.getDate()+ "."+(date2.getMonth()+1)+'.'+ date2.getFullYear() + ", "+ time2;
	 date2string = "";

		const infectionsText2 = stack2.addText('🇩🇪:  ' + parseInt(res2.todayCases).toLocaleString(locale) + ' (' + parseInt(res2.todayDeaths).toLocaleString(locale) + ') ');
		infectionsText2.font = Font.systemFont(13);
		const infectionsTextDate2 = stack2.addText(date2string);
		infectionsTextDate2.font = Font.systemFont(8);
		infectionsTextDate2.textColor = Color.gray();
	
	   const infectionsText2b = stack2.addText(" / " +parseInt(res2b.todayCases).toLocaleString(locale) + ' (' + parseInt(res2b.todayDeaths).toLocaleString(locale) + ') ');
		infectionsText2b.font = new Font("HelveticaNeue-Light", 11);

// USA

		const stack1= list.addStack();
		stack1.layoutHorizontally();
	    stack1.centerAlignContent();
		stack1.setPadding(0,20,0,0)	;
	
		let date1=new Date(res.updated);
		let minutes1 = date1.getMinutes();
		if (minutes1<10) minutes1= "0"+minutes1;
		let time1 = date1.getHours() + ":" + minutes1;
		let date1string = date1.getDate() + "."+(date1.getMonth()+1)+'.'+ date1.getFullYear() + ", "+ time1;
 
		 date1string = "";

		const infectionsText1 = stack1.addText('🇺🇸:  ' + parseInt(res.todayCases).toLocaleString(locale) + ' (' + parseInt(res.todayDeaths).toLocaleString(locale) + ') ');
		infectionsText1.font = Font.systemFont(13);
		const infectionsTextDate1 = stack1.addText(date1string);
		infectionsTextDate1.font = Font.systemFont(8);
		infectionsTextDate1.textColor = Color.gray();
	
	   const infectionsText1b = stack1.addText(" / " +parseInt(res1b.todayCases).toLocaleString(locale) + ' (' + parseInt(res1b.todayDeaths).toLocaleString(locale) + ') ');
		infectionsText1b.font = new Font("HelveticaNeue-Light", 11);

// India

		const stack3= list.addStack();
		stack3.layoutHorizontally();
	    stack3.centerAlignContent();
		stack3.setPadding(0,20,0,0)	;
	
		let date3=new Date(res3.updated);
		let minutes3 = date3.getMinutes();
		if (minutes3<10) minutes3= "0"+minutes3;
		let time3 = date3.getHours() + ":" + minutes3;
		let date3string = date3.getDate() + "."+(date3.getMonth()+1)+'.'+ date3.getFullYear() + ", "+ time3;
 
		 date3string = "";
		const infectionsText3 = stack3.addText('🇮🇳:  ' + parseInt(res3.todayCases).toLocaleString(locale) + ' (' + parseInt(res3.todayDeaths).toLocaleString(locale) + ') ');
		infectionsText3.font = Font.systemFont(13);
		const infectionsTextDate3 = stack3.addText(date3string);

		infectionsTextDate3.font = Font.systemFont(8);
		infectionsTextDate3.textColor = Color.gray();
	
	   const infectionsText3b = stack3.addText(" / " +parseInt(res3b.todayCases).toLocaleString(locale) + ' (' + parseInt(res3b.todayDeaths).toLocaleString(locale) + ') ');
		infectionsText3b.font = new Font("HelveticaNeue-Light", 11);

// FRANCE

		const stack4= list.addStack();
		stack4.layoutHorizontally();
	    stack4.centerAlignContent();
		stack4.setPadding(0,20,0,0)	;
	
		let date4=new Date(res4.updated);
		let minutes4 = date4.getMinutes();
		if (minutes4<10) minutes4= "0"+minutes4;
		let time4 = date4.getHours() + ":" + minutes4;

		let date4string = date4.getDate() + "."+(date4.getMonth()+1)+'.'+ date4.getFullYear() + ", "+ time4;
 
		//  let date4string = "";

		const infectionsText4 = stack4.addText('🇫🇷:  ' + parseInt(res4.todayCases).toLocaleString(locale) + ' (' + parseInt(res4.todayDeaths).toLocaleString(locale) + ') ');
		infectionsText4.font = Font.systemFont(13);

			// 	const infectionsTextDate4 = stack4.addText(date4string);

		const infectionsTextDate4 = stack4.addText("");
	
		infectionsTextDate4.font = Font.systemFont(8);
		infectionsTextDate4.textColor = Color.gray();
	
	   const infectionsText4b = stack4.addText(" / " +parseInt(res4b.todayCases).toLocaleString(locale) + ' (' + parseInt(res4b.todayDeaths).toLocaleString(locale) + ') ');
		infectionsText4b.font = new Font("HelveticaNeue-Light", 11);

	  list.addSpacer();

		const labelUpdated2 = list.addText(`Daten disease.sh, Stand vom `+ date4string);
        labelUpdated2.font = new Font("HelveticaNeue-Thin", 10);
        labelUpdated2.textColor = Color.white();


        if (data.shouldCache) {
            list.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000);
	      }
	} else {
	        list.addSpacer();
	        const errorLabel = list.addText("Daten nicht verfügbar. \nWidget öffnen für reload...");
	        errorLabel.font = Font.mediumSystemFont(12);
	        errorLabel.textColor = Color.gray();
    }

    return list
}

async function getData() {
    try {
        let dataCases = await new Request(apiUrlNewCases).loadJSON();
        const cases = dataCases.features[0].attributes.value;
        let dataStates = await new Request(apiUrlStates).loadJSON();
        const incidencePerState = dataStates.features.map((f) => { return { BL: BUNDESLAENDER_SHORT[f.attributes.LAN_ew_GEN], incidence: f.attributes.cases7_bl_per_100k } });
        const averageIncidence = incidencePerState.reduce((a, b) => a + b.incidence, 0) / incidencePerState.length;
        const location = await getLocation();
        let data = await new Request(apiUrl(location)).loadJSON();
        const attr = data.features[0].attributes;
        const res = {
            incidence: parseFloat(attr.cases7_per_100k.toFixed(1)),
            incidenceBL: parseFloat(attr.cases7_bl_per_100k.toFixed(1)),
            areaName: attr.GEN,
            nameBL: BUNDESLAENDER_SHORT[attr.BL],
            shouldCache: true,
            updated: attr.last_update,
            incidencePerState: incidencePerState,
            averageIncidence: parseFloat(averageIncidence.toFixed(1)),
            cases: cases
        }
        return res;
    } catch (e) {
        return null;
    }
}

async function getLocation() {
    try {
        if (args.widgetParameter) {
            const fixedCoordinates = args.widgetParameter.split(",").map(parseFloat);
            return {
                latitude: fixedCoordinates[0],
                longitude: fixedCoordinates[1]
            }
        } else {
            Location.setAccuracyToThreeKilometers();
            return await Location.current();
        }
    } catch (e) {
        return null;
    }
}

function getIncidenceTrend(data, weekdata) {
    let incidenceTrend = ' ';
    if (Object.keys(weekdata).length > 0) {
        const prevData = getDataForDate(weekdata);
        if (prevData) {
            incidenceTrend = (data.incidence < prevData.incidence) ? '↓' : '↑';
        }
    }
    return incidenceTrend;
}

function getIncidenceBLTrend(data, weekdata) {
    let incidenceBLTrend = ' ';    
    if (Object.keys(weekdata).length > 0) {
        const prevData = getDataForDate(weekdata);
        if (prevData) {
            incidenceBLTrend = (data.incidenceBL < prevData.incidenceBL) ? '↓' : '↑';
        }
    }
    return incidenceBLTrend;
}

function getDataForDate(weekdata, yesterday = true, datestr = '') {
    let dateKey;
    let dayOffset = 1;
    const today = new Date();
    const todayDateKey = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    if (typeof weekdata[todayDateKey] === 'undefined') {
        dayOffset = 2;
    }

    if (yesterday) {
        today.setDate(today.getDate() - dayOffset);
        dateKey = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    } else {
        dateKey = datestr;
    }

    if (typeof weekdata[dateKey] !== 'undefined') {
        return weekdata[dateKey];
    }
    return false;
}

// LIMIT TO 7 DAYS
function saveLoadData (newData, suffix = '') {
    const updated = newData.updated.substr(0, 10);
    const loadedData = loadData(suffix);
    if (loadedData) {
        loadedData[updated] = newData;
        const loadedDataKeys = Object.keys(loadedData);
        const lastDaysKeys = loadedDataKeys.slice(Math.max(Object.keys(loadedData).length - 7, 0));
        let loadedDataLimited = {}
        lastDaysKeys.forEach(key => {
            loadedDataLimited[key] = loadedData[key];
        })
        let fm = FileManager.iCloud();
        let path = fm.joinPath(fm.documentsDirectory(), 'covid19' + suffix + '.json');
        fm.writeString(path, JSON.stringify(loadedDataLimited));
        return loadedData;
    }
    return {};
}

function loadData(suffix) {
    let fm = FileManager.iCloud();
    let path = fm.joinPath(fm.documentsDirectory(), 'covid19' + suffix + '.json');
    if (fm.fileExists(path)) {
        let data = fm.readString(path);
        return JSON.parse(data);
    }
    return {};
}

// get images from local filestore or download them once
async function getImage(image) {
    let fm = FileManager.iCloud();
    let dir = fm.documentsDirectory()+BG_IMG_SUBFOLDER;
    let path = fm.joinPath(dir, image);
    if (fm.fileExists(path)) {
	console.log(`file found ${path}.`);
        return fm.readImage(path);
    } else {
        // file not found
        // download once
        let imageUrl = "later.png";
        console.log(`Sorry, couldn't find ${path}.`);
        let iconImage = await loadImage(imageUrl);
        fm.writeImage(path, iconImage);
        return iconImage;
        }
}

// helper function to download an image from a given url
async function loadImage(imgUrl) {
    const req = new Request(imgUrl);
    return await req.loadImage();
}


// end of Script
