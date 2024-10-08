import { sportData } from "radar-sport-api";
import SportradarAPI from "./src/libs/SportRadar/SportradarAPI.js";

(async () => {
    var sportRadar = new SportradarAPI();
    //contrua as classes
    // const betfair = new sportData('betfair', {
    //     languageId: '514d1e14ad5c11eeebf17ba7f5dc97ad',
    //     server: 'gismo',
    //     getCommonContents: false,
    //     lang: 'en'
    // });

    // var data = await betfair.getInfo('Europe:Berlin', 'stats_season_meta', 76415);

    // console.log(data);

    // var data = await sportRadar.getSportsList();
    var data = await sportRadar.getSupportedCountries(1);
    console.log(data);
})();