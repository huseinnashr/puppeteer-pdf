import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { indexRouter } from './routes/index';
import { htmlToPDFRouter } from './routes/html-to-pdf';
import { pdfToolRouter } from './routes/pdf-tool';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(cors())

app.use('/', indexRouter);
app.use('/html-to-pdf', htmlToPDFRouter);
app.use('/pdf-tool', pdfToolRouter);

app.all("*", (_, res) => {
  res.send({ __typename: 'EndpointNotFound' })  
})

export { app };