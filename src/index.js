import FullCardInfoUpdater from "./FullCardInfoUpdater";
import { CardsPage, CollectionPage, MarketPage, SetsPage } from "./pages";

let currentPage;
const fullCardInfoUpdater = new FullCardInfoUpdater();

function executeRoute(url) {
  if (url.includes('/cards')) {
    currentPage = new CardsPage();
  }
  if (url.includes('/decks')) {
    currentPage = new CollectionPage();
  }
  if (url.includes('/market')) {
    currentPage = new MarketPage();
  }
  if (url.includes('/sets')) {
    currentPage = new SetsPage();
  }

  if (currentPage) currentPage.run();
}

window.navigation.addEventListener("navigate", (event) => {
  if (currentPage) currentPage.disconnect();
  currentPage = null;
  executeRoute(event.destination.url);
});

executeRoute(window.location.href);
fullCardInfoUpdater.run();
