const rankingsFormatter = (tftRankings, tftBool, apexRanking, apexRankingBool) => {
    let str = '';
    if (tftRankings) {
        for (let i = 0; i < tftRankings.length; i++) {
            if (tftRankings[i].queueType === 'RANKED_TFT') {
                str += `TFT Solo: ${tftRankings[i].tier} ${tftRankings[i].rank} - ${tftRankings[i].leaguePoints} LP\n`
            }
            else if (tftRankings[i].queueType === 'RANKED_TFT_DOUBLE_UP') 
                str += `TFT Duos: ${tftRankings[i].tier} ${tftRankings[i].rank} - ${tftRankings[i].leaguePoints} LP\n`
            }
    } else {
        if (tftBool) str += 'No TFT rankings found';
    }
    if (apexRanking) {
        str += `Apex Ranked: ${apexRanking}\n`
    } else {
        if (apexRankingBool) str += 'No Apex rankings found';
    }
    return str;
}

module.exports = { rankingsFormatter };