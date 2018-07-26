// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

const puppeteer = require('puppeteer');
const fs = require('fs');

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  };
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
};

const getDateTime = () => {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth();
  let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  return `${year}.${month}.${day}.${hours}${minutes}`;
};

describe('on page load', () => {
  const targets = [
    ['candidates_Florida_jennifer-webb', '/candidates/Florida/jennifer-webb'],
    ['candidates_Florida', '/candidates/Florida'],
    ['candidates', '/candidates'],
    ['report_floridas-laws', '/report/floridas-laws'],
    ['report', '/report'],
    ['reports_budget', '/reports/budget'],
    ['reports_Budget', '/reports/Budget'],
    ['reports', '/reports'],
    ['states_Florida', '/states/Florida'],
    ['states', '/states'],
    ['take-action_Florida', '/take-action/Florida'],
    ['take-action', '/take-action'],
    ['about-us', '/about-us'],
    ['index', '/'],
  ];

  const timestamp = getDateTime();

  if (!fs.existsSync(timestamp)) {
    fs.mkdirSync(timestamp);
  }

  targets.forEach(target => {
    test(
      `taking screenshots of http://localhost:3000${target[1]}`,
      async () => {
        let browser = await puppeteer.launch({});
        let page = await browser.newPage();
        await page.goto(`http://localhost:3000${target[1]}`, {
          waitUntil: ['networkidle2', 'load', 'domcontentloaded'],
        });
        console.log('taking pic of', target[1]);
        await page.screenshot({
          path: `${timestamp}/${target[0]}.png`,
          fullPage: true,
        });
        await browser.close();
      },
      15000
    );
  });
});

// puppeteer.launch().then(async browser => {
//  const page = await browser.newPage()
//  await page.goto('https://example.com')
//  await page.screenshot({path: 'example.png'});
//  await browser.close();
// });
