import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";

const sans = (await readFile("public/fonts/dm-sans.woff2")).toString("base64");
const serif = (
  await readFile("public/fonts/instrument-serif-italic.woff2")
).toString("base64");
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/google-chrome",
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html><style>
    @font-face{font-family:DM;src:url(data:font/woff2;base64,${sans});font-weight:100 1000}
    @font-face{font-family:Serif;src:url(data:font/woff2;base64,${serif});font-style:italic}
    *{box-sizing:border-box}body{margin:0;background:#f9faf6;font-family:DM;color:#202922;padding:66px 75px;height:630px}
    .top{display:flex;justify-content:space-between;border-bottom:1px solid #dce1d6;padding-bottom:25px;font-size:14px;letter-spacing:1px;color:#245b43}
    .name{margin-top:48px;font-size:18px;color:#636c61}h1{font-size:75px;font-weight:500;line-height:1.09;letter-spacing:-3px;margin:20px 0 0}em{font-family:Serif;font-size:87px;color:#245b43;font-weight:400}
    .bottom{border-top:1px solid #dce1d6;padding-top:22px;margin-top:32px;font-size:13px;letter-spacing:1px;color:#636c61}svg{position:absolute;right:45px;top:215px;width:310px;height:310px}
  </style><body><div class="top"><span>BENJAMIN AGOGO ↗</span><span>ENGINEERING · AI · HEALTHCARE</span></div><p class="name">Otete Benjamin Agogo / Software Engineer</p><h1>Engineering for<br>a more <em>connected</em><br>world<span style="color:#245b43">.</span></h1><svg viewBox="0 0 300 300"><g fill="none" stroke="#8baa80" stroke-width=".7"><circle cx="150" cy="150" r="123"/><ellipse cx="150" cy="150" rx="123" ry="43"/><ellipse cx="150" cy="150" rx="123" ry="80"/><ellipse cx="150" cy="150" rx="43" ry="123"/><ellipse cx="150" cy="150" rx="80" ry="123"/><ellipse cx="150" cy="150" rx="149" ry="44" transform="rotate(-32 150 150)"/></g><g fill="#245b43"><circle cx="57" cy="68" r="5"/><circle cx="257" cy="208" r="5"/><circle cx="188" cy="89" r="4"/></g></svg><p class="bottom">SOFTWARE. INTELLIGENCE. HUMAN IMPACT.</p></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/images/social-preview.png" });
  console.log("Generated social sharing artwork.");
} finally {
  await browser.close();
}
