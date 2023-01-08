import axios from "axios";
import dayjs from "dayjs";

/**
 * Gets free games from epic games store
 * @returns {Promise<string>} formatted string of free games
 */
async function getFreeEPICGamesFormatted() {
  const { data } = await axios.get("https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=US");

  if (data.errors) {
    console.log("error retrieving free games");
    console.error(data.errors);
    return "error retrieving free games";
  }
  const currFreeGames = [];
  const nextFreeGames = [];

  try {
    let hasPromoOffers = false;
    let hasUpcomingPromoOffers = false;
    let isFree = false;
    let willBeFree = false;
    let inThisWeek = false;
    let inNextWeek = false;

    for (const game of data.data.Catalog.searchStore.elements) {
      hasPromoOffers = false;
      hasUpcomingPromoOffers = false;
      isFree = false;
      willBeFree = false;
      inThisWeek = false;
      inNextWeek = false;

      isFree = game.price.totalPrice.discountPrice === 0;
      if (game.promotions) {
        if (game.promotions.promotionalOffers.length !== 0) {
          hasPromoOffers = true;
          inThisWeek = dayjs() > dayjs(game.promotions.promotionalOffers[0].promotionalOffers[0].startDate) && dayjs() <
                        dayjs(game.promotions.promotionalOffers[0].promotionalOffers[0].endDate);
        }
        if (game.promotions.upcomingPromotionalOffers.length !== 0) {
          hasUpcomingPromoOffers = true;
          inNextWeek = dayjs().add(1, "week") > dayjs(game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].startDate) && dayjs().add(1, "week") <
                        dayjs(game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].endDate);
          willBeFree = game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].discountSetting.discountPercentage === 0;
        }
      }
      if (isFree && hasPromoOffers && inThisWeek) {
        currFreeGames.push(game);
      }
      if (willBeFree && hasUpcomingPromoOffers && inNextWeek) {
        nextFreeGames.push(game);
      }
    }
    let message = "";

    if (currFreeGames.length !== 0) {
      message += "**---This Week---**\n";
      for (const game of currFreeGames) {
        if (game.catalogNs && game.catalogNs.mappings && game.catalogNs.mappings[0] && game.catalogNs.mappings[0].pageSlug) {
          message += `[${game.title}](https://store.epicgames.com/en-US/p/${game.catalogNs.mappings[0].pageSlug})`;
          if (game.price && game.price.totalPrice && game.price.totalPrice.fmtPrice && game.price.totalPrice.fmtPrice.originalPrice) {
            message += ` (~~${game.price.totalPrice.fmtPrice.originalPrice}~~)\n`;
          } else {
            message += "\n";
          }
        } else {
          message += `${game.title}\n`;
        }
      }
    }
    if (nextFreeGames.length !== 0) {
      message += "**---Next Week---**\n";
      for (const game of nextFreeGames) {
        if (game.catalogNs && game.catalogNs.mappings && game.catalogNs.mappings[0] && game.catalogNs.mappings[0].pageSlug) {
          message += `[${game.title}](https://store.epicgames.com/en-US/p/${game.catalogNs.mappings[0].pageSlug})`;
          if (game.price && game.price.totalPrice && game.price.totalPrice.fmtPrice && game.price.totalPrice.fmtPrice.originalPrice) {
            message += ` (~~${game.price.totalPrice.fmtPrice.originalPrice}~~)\n`;
          } else {
            message += "\n";
          }
        } else {
          message += `${game.title}\n`;
        }
      }
    }
    return message;
  } catch (error) {
    console.error(error);
    return "error retrieving free games";
  }

}

export default getFreeEPICGamesFormatted;
