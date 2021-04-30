import assignment from "../src/assignment/index";
import { parserRequestUrl, $ } from "./ultil";

const Assignment = new assignment();

const routes = {
  "/": Assignment,
};

const router = async () => {
  const { resource } = parserRequestUrl();
  const parseUrl = resource ? `/${resource}` : "/";
  const page = routes[parseUrl] ? routes[parseUrl] : "Err";
  $("#content").innerHTML = await page.render();
  if (page.afterRender) {
    await page.afterRender();
  }
};

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
