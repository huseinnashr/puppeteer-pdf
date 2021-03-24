
import express from "express";
import puppeteer from 'puppeteer';
import fs from 'fs'
import util from 'util';
import cp from 'child_process';
import * as uuid from 'uuid';

const router = express.Router();

router.post("/single", async (req, res) => {
  const { html, format, password } = req.body;

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage()
  await page.setContent(html);
  
  const path = `${uuid.v4()}.pdf`;
  if(fs.existsSync(path)) return res.status(500).send({ error: { message: "UUID Filename Collision" } })
  await page.pdf({ path, format, printBackground: true });
  await browser.close();

  if(password) {
    await util.promisify(cp.exec)(`qpdf --encrypt userpasswd ${password} 256 -- ${path} --replace-input`)
  }

  await util.promisify(res.download.bind(res))(path)
  await fs.promises.unlink(path);
});

export { router as htmlToPDFRouter }