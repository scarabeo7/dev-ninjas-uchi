import { Selector } from "testcafe";

fixture`Homepage`.page`http://localhost:3000/`;

const cards = Selector(".MuiPaper-root");
const mapButton = Selector(".tab-button").withText("Map");
const mapContainer = Selector(".leaflet-container");
const searchBar = Selector(".search-bar");
const searchResults = Selector(".MuiCard-root");
const imageCheckbox = Selector('.switch-checkbox').withAttribute("name", "image")

test("List of cards shows after intro content", async (t) => {
  await t.click("#main-site").expect(cards.count).gt(1);
});

test("Map shows after clicking map button", async (t) => {
  await t.click("#main-site").click(mapButton).expect(mapContainer.exists).ok();
});

test("Search and filter work", async (t) => {

  await t.click("#main-site").typeText(searchBar, "sto").click(imageCheckbox);
  const count = await searchResults.count;
  for (let i = 0; i < count; i++) {
    await t
      .expect((await searchResults.nth(i).innerText).toLowerCase())
      .contains("sto")
      .expect(await searchResults.nth(i).find('img').exists)
      .notOk();
  }
});
