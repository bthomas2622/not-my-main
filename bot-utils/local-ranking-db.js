import getDb from "../index.js";
import getTFTRankings from "../bot-scripts/get-tft-ranking.js";
import staggerApexRankings from "./staggerApexApi.js";


/**
 * Initialize the local ranking db
 * @returns {Promise<void>} void
 */
async function initializeLocalRankingDb() {
  const db = getDb();

  try {
    const defaultRankings = {
      apex: "",
      tftSolo: "",
      tftDuo: ""
    };
    const defaultData = {
      ben: defaultRankings,
      patrick: defaultRankings,
      alex: defaultRankings
    };

    await db.read();
    db.data = defaultData;
    await db.write();
  } catch (error) {
    console.log("error initializing local ranking db");
    console.error(error);
  }
}

/**
 * Get the local ranking db
 * @returns {Promise<Object>} local ranking db
 */
async function getLocalRankingDb() {
  const db = getDb();

  try {
    await db.read();
    if (db.data) {
      return db.data;
    }

    await initializeLocalRankingDb();
    await db.read();
    return db.data;

  } catch (error) {
    console.log("error retrieving local ranking db");
    console.error(error);
    return null;
  }
}

/**
 * Set the local ranking db
 * @param {Object} rankingData the data to set the local ranking db to
 * @returns {Promise<void>} void
 */
async function setLocalRankingDb(rankingData) {
  const db = getDb();

  try {
    await db.read();
    db.data = rankingData;
    await db.write();
  } catch (error) {
    console.log("error setting local ranking db");
    console.error(error);
  }
}

/**
 * Update the local ranking db
 * @returns {Promise<void>} void
 */
async function updateLocalRankingDb() {
  try {
    const patrickTFTRankings = await getTFTRankings("FigFire");
    const benTFTRankings = await getTFTRankings("freeBrunch");
    const awokenApexRankings = await staggerApexRankings(["freeBrunch", "FigFire1", "alliedengineer"]);
    const patrickApexRanking = awokenApexRankings.FigFire1 === "Unable to retrieve ranking" ? "" : awokenApexRankings.FigFire1;
    const benApexRanking = awokenApexRankings.freeBrunch === "Unable to retrieve ranking" ? "" : awokenApexRankings.freeBrunch;
    const alexApexRanking = awokenApexRankings.alliedengineer === "Unable to retrieve ranking" ? "" : awokenApexRankings.alliedengineer;
    let benTftSolo = "";
    let benTftDuo = "";
    let patrickTftSolo = "";
    let patrickTftDuo = "";

    if (benTFTRankings && benTFTRankings.length > 0) {
      for (let i = 0; i < benTFTRankings.length; i++) {
        if (benTFTRankings[i].queueType === "RANKED_TFT") {
          benTftSolo = `${benTFTRankings[i].tier} ${benTFTRankings[i].rank}`;
        } else if (benTFTRankings[i].queueType === "RANKED_TFT_DOUBLE_UP") {
          benTftDuo = `${benTFTRankings[i].tier} ${benTFTRankings[i].rank}`;
        }
      }
    }

    if (patrickTFTRankings && patrickTFTRankings.length > 0) {
      for (let i = 0; i < patrickTFTRankings.length; i++) {
        if (patrickTFTRankings[i].queueType === "RANKED_TFT") {
          patrickTftSolo = `${patrickTFTRankings[i].tier} ${patrickTFTRankings[i].rank}`;
        } else if (patrickTFTRankings[i].queueType === "RANKED_TFT_DOUBLE_UP") {
          patrickTftDuo = `${patrickTFTRankings[i].tier} ${patrickTFTRankings[i].rank}`;
        }
      }
    }

    const rankingData = {
      ben: {
        apex: benApexRanking,
        tftSolo: benTftSolo,
        tftDuo: benTftDuo
      },
      patrick: {
        apex: patrickApexRanking,
        tftSolo: patrickTftSolo,
        tftDuo: patrickTftDuo
      },
      alex: {
        apex: alexApexRanking,
        tftSolo: "",
        tftDuo: ""
      }
    };

    await setLocalRankingDb(rankingData);
  } catch (error) {
    console.error("Error updating local ranking db");
    console.error(error);
  }
}

export {
  initializeLocalRankingDb,
  getLocalRankingDb,
  setLocalRankingDb,
  updateLocalRankingDb
};
