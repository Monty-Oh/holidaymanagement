import express from 'express';
import {AddHoldy} from './testDB.lib';

const fs = require('fs');
const router = express.Router();
const app = express();

// backend 영역

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

// delivered new data. save new data
router.post('/holdy', async (req, res) => {
  const data = {holidayList: req.body.data};
  const nextData = JSON.stringify(data);
  await fs.writeFileSync('testDB.json', nextData, (err) => {
    if (err) console.log(err);
  });

  // '/apis/holdy'로 리다이렉트. 결과값으로 다시 새로운 DB가 반환됨.
  res.redirect('/apis/holdy')
  // await fs.readFile('testDB.json', (err, data) => {
  //   if (err) console.log(err);
  //   return res.send(JSON.parse(data))
  // });
});

// get data and send(data)
router.get('/holdy', async (req, res) => {
  await fs.readFile('testDB.json', (err, data) => {
    if (err) console.log(err);
    return res.send(JSON.parse(data))
  });
})

// 새로운 요소 생성
router.post('/holdy/item', async (req, res) => {
  await fs.readFile('testDB.json', async (err, data) => {
    if (err) console.log(err);
    const nextData = (JSON.parse(data)).holidayList.map((holiday) => {
      return {
        ...holiday,
      }
    });

    // 이미 있는 데이터를 검사하고 호출.
    const result = AddHoldy(nextData, req.body.data);
    if (result[0] === 'normalAlreadyExist' ||
      result[0] === 'deliverAlreadyExist' ||
      result[0] === 'normalNotExist') {
      // res.data = result[0];
      res.status(202);
      res.send(result[0]);
    } else {
      const nextData = JSON.stringify({holidayList: result})
      await fs.writeFileSync('testDB.json', nextData, (err) => {
        if (err) console.log(err);
      });
      res.redirect('/apis/holdy');
    }
  });
});


// Export the server middleware
export default router;
