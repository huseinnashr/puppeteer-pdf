
import express from "express";
import puppeteer from 'puppeteer';
import fs from 'fs'
import util from 'util';
import cp from 'child_process';

const router = express.Router();

router.post("/single", async (req, res) => {
  const { html, format, password } = req.body;

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage()
  await page.setContent(html);
  
  const path = `${new Date().getTime()}.pdf`;
  await page.pdf({ path, format });
  await browser.close();

  await util.promisify(cp.exec)(`qpdf --encrypt userpasswd ${password} 256 -- ${path} --replace-input`)

  await util.promisify(res.download.bind(res))(path)
  await fs.promises.unlink(path);
});

export { router as htmlToPDFRouter }