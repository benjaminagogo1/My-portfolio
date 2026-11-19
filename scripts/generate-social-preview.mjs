import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { identity, projects } from "../src/lib/content.ts";

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );

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
  </style><body><div class="top"><span>BENJAMIN AGOGO ↗</span><span>ENGINEERING · AI · HEALTHCARE</span></div><p class="name">${escapeHtml(identity.name)} / ${escapeHtml(identity.title)}</p><h1>Engineering for<br>a more <em>connected</em><br>world<span style="color:#245b43">.</span></h1><svg viewBox="0 0 300 300"><g fill="none" stroke="#8baa80" stroke-width=".7"><circle cx="150" cy="150" r="123"/><ellipse cx="150" cy="150" rx="123" ry="43"/><ellipse cx="150" cy="150" rx="123" ry="80"/><ellipse cx="150" cy="150" rx="43" ry="123"/><ellipse cx="150" cy="150" rx="80" ry="123"/><ellipse cx="150" cy="150" rx="149" ry="44" transform="rotate(-32 150 150)"/></g><g fill="#245b43"><circle cx="57" cy="68" r="5"/><circle cx="257" cy="208" r="5"/><circle cx="188" cy="89" r="4"/></g></svg><p class="bottom">SOFTWARE. INTELLIGENCE. HUMAN IMPACT.</p></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/images/social-preview.png" });
  for (const project of projects) {
    const preview =
      project.preview.kind === "screenshot"
        ? `<img src="data:image/webp;base64,${(await readFile(`public${project.preview.src}`)).toString("base64")}" alt="" />`
        : project.preview.kind === "language"
          ? `<div class="diagram"><strong>${escapeHtml(project.preview.languages[0])} ↔ ${escapeHtml(project.preview.languages[1])}</strong><span>Data Collection Website</span><b>↓</b><span>Data Review &amp; Validation</span><b>↓</b><span>Clean / Verified Dataset</span></div>`
          : `<div class="diagram"><span>Referring facility</span><b>↓</b><strong>HMSI<br><small>Referral exchange</small></strong><b>↓</b><span>Receiving facility</span></div>`;
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
      @font-face{font-family:DM;src:url(data:font/woff2;base64,${sans});font-weight:100 1000}
      @font-face{font-family:Serif;src:url(data:font/woff2;base64,${serif});font-style:italic}
      *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;padding:48px 58px;background:#f9faf6;color:#202922;font-family:DM}
      header{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #dce1d6;padding-bottom:22px;font-size:17px;color:#245b43}
      main{display:grid;grid-template-columns:1.4fr 1fr;gap:42px;align-items:center;height:400px}
      .category{font-size:15px;color:#636c61;margin:0 0 14px}h1{font-size:64px;line-height:1.05;letter-spacing:-2px;margin:0 0 22px;font-weight:550}
      .headline{font-family:Serif;font-style:italic;font-size:35px;line-height:1.2;color:#245b43;margin:0;max-width:600px}
      .role{margin:18px 0 0;font-size:18px;font-weight:600;color:#245b43}
      .visual{height:300px;border:1px solid #c6d3c0;border-radius:8px;background:#e4ecde;overflow:hidden;display:flex;align-items:center;justify-content:center}
      img{width:100%;height:100%;object-fit:cover;object-position:top}
      .diagram{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:17px;color:#245b43}.diagram strong{padding:14px 30px;text-align:center;border:1px solid #a5b69a;border-radius:6px;background:#f9faf6}.diagram small{font-size:15px;font-weight:400}
      footer{border-top:1px solid #dce1d6;padding-top:20px;display:flex;justify-content:space-between;font-size:15px;color:#636c61}
    </style></head><body>
      <header><span>${escapeHtml(identity.name)} · ${escapeHtml(identity.title)}</span><span>PROJECT CASE STUDY</span></header>
      <main><div><p class="category">${escapeHtml(project.category)}</p><h1>${escapeHtml(project.name)}</h1><p class="headline">${escapeHtml(project.headline)}</p>${project.role ? `<p class="role">${escapeHtml(project.role)}</p>` : ""}</div><div class="visual">${preview}</div></main>
      <footer><span>${escapeHtml(project.technologies.slice(0, 4).join(" · "))}</span><span>${escapeHtml(project.status)}</span></footer>
    </body></html>`);
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator("img").all())
      await image.evaluate((element) => element.decode());
    await page.screenshot({ path: `public/images/${project.slug}-social.png` });
  }
  console.log(
    `Generated portfolio and ${projects.length} project sharing images.`,
  );
} finally {
  await browser.close();
}
