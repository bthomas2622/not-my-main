const { getDb } = require('../index.js');
const { getTFTRankings } = require('../bot-scripts/get-tft-ranking.js');
const { staggerApexRankings } = require('./staggerApexApi.js');

const initializeLocalRankingDb = async () => {
    let db = getDb();
    try {
        const defaultRankings = {
            apex: '',
            tft_solo: '',
            tft_duo: ''
        }
        const defaultData = {
            ben: defaultRankings,
            patrick: defaultRankings,
            alex: defaultRankings
        }
        await db.read();
        db.data = defaultData;
        await db.write();
    }
    catch (error) {
        console.log('error initializing local ranking db');
        console.error(error);
    }
}

const getLocalRankingDb = async () => {
    let db = getDb();
    try {
        await db.read();
        if (db.data) {
            return db.data;
        }
        else {
            await initializeLocalRankingDb();
            await db.read();
            return db.data;
        }
    }
    catch (error) {
        console.log('error retrieving local ranking db');
        console.error(error);
    }
}

const setLocalRankingDb = async (ranking_data) => {
    let db = getDb();
    try {
        await db.read();
        db.data = ranking_data;
        await db.write();
    }
    catch (error) {
        console.log('error setting local ranking db');
        console.error(error);
    }
}

const updateLocalRankingDb = async () => {
    try {
        let patrickTFTRankings = await getTFTRankings('FigFire');
        let benTFTRankings = await getTFTRankings('freeBrunch');
        let awokenApexRankings = await staggerApexRankings(['freeBrunch', 'FigFire1', 'alliedengineer']);
        let patrickApexRanking = awokenApexRankings.FigFire1 === 'Unable to retrieve ranking' ? '' : awokenApexRankings.FigFire1;
        let benApexRanking = awokenApexRankings.freeBrunch === 'Unable to retrieve ranking' ? '' : awokenApexRankings.freeBrunch;
        let alexApexRanking = awokenApexRankings.alliedengineer === 'Unable to retrieve ranking' ? '' : awokenApexRankings.alliedengineer;
        let benTftSolo = '';
        let benTftDuo = '';
        let patrickTftSolo = '';
        let patrickTftDuo = '';

        if (benTFTRankings && benTFTRankings.length > 0) {
            for (let i = 0; i < benTFTRankings.length; i++) {
                if (benTFTRankings[i].queueType === 'RANKED_TFT') {
                    benTftSolo = `${tftRankings[i].tier} ${tftRankings[i].rank}`;
                }
                else if (tftRankings[i].queueType === 'RANKED_TFT_DOUBLE_UP') 
                    benTftDuo = `${tftRankings[i].tier} ${tftRankings[i].rank}`;
                }
        }

        if (patrickTFTRankings && patrickTFTRankings.length > 0) {
            for (let i = 0; i < patrickTFTRankings.length; i++) {
                if (patrickTFTRankings[i].queueType === 'RANKED_TFT') {
                    patrickTftSolo = `${tftRankings[i].tier} ${tftRankings[i].rank}`;
                }
                else if (tftRankings[i].queueType === 'RANKED_TFT_DOUBLE_UP')
                    patrickTftDuo = `${tftRankings[i].tier} ${tftRankings[i].rank}`;
                }
        }

        const rankingData = {
            ben: {
                apex: benApexRanking,
                tft_solo: benTftSolo,
                tft_duo: benTftDuo
            },
            patrick: {
                apex: patrickApexRanking,
                tft_solo: patrickTftSolo,
                tft_duo: patrickTftDuo
            },
            alex: {
                apex: alexApexRanking,
                tft_solo: '',
                tft_duo: ''
            }
        }
        
        await setLocalRankingDb(rankingData);
    } catch (error) {
        console.error('Error updating local ranking db');
        console.error(error);
    }
}

module.exports = {
    initializeLocalRankingDb,
    getLocalRankingDb,
    setLocalRankingDb,
    updateLocalRankingDb
}
