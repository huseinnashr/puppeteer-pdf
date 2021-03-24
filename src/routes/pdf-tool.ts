
import express from "express";
import util from 'util';
import cp from 'child_process';
import fs from 'fs'

const router = express.Router();

router.post('/decrypt', async (req, res) => {
  const { filename, password } = req.body;
  if(!filename) return res.send({ error: { code: "BAD_REQUEST", message: 'filename should be defined' } })
  if(!password) return res.send({ error: { code: "BAD_REQUEST", message: 'password should be defined' } })

  const filepath = `persistent/puppeteer-pdf/${filename}`
  if(!fs.existsSync(filepath)) return res.send({ error: { code: "BAD_REQUEST", message: 'File is not exist' } })

  try {
    await util.promisify(cp.exec)(`qpdf --decrypt --password=${password} ${filepath} --replace-input`)
  } catch (e) {
    if(e.message.includes('invalid password')) return res.send({ error: { code: "WRONG_PASSWORD", message: 'Wrong Password' }})
    return res.send({ error: { code: "INTERNAL_SERVER_ERROR", message: e.message }})
  }

  res.send({ data: { filename } })
})

export { router as pdfToolRouter }