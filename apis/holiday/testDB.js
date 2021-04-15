import { filterByCreatedAt, filterByHoldyTpCd } from "./testDB.lib";

// 가상 DB 서버가 있다는 가정하의 작업들.
// 쿼리문과 조건을 붙여서 날리면 답이 온다는 가정으로 만듬.
// 정리된 데이터가 return
export async function loadDBJson({startDate, endDate, normalHoliday, transferHoliday}) {
  // readDB 함수 실행. 비동기 함수
  let result = (await readDB()).holidayList;
  result = filterByCreatedAt(startDate, endDate, result);
  result = filterByHoldyTpCd(normalHoliday, transferHoliday, result);
  return result;
}

// 비동기 json 파일 읽어오기
function readDB() {
  return fetch('../testDB.json')
    .then((response) => {
      return response.json();
    })
}

export async function writeDBJson(data) {


  // fs 수정 후 연동해야함.
  // console.log(fs);
  // 덮어씌우기
  // const nextData = data.map((item) => JSON.stringify(item));
  // let nextData = checkHolidayList(data);
  return data;
  // nextData = JSON.stringify({holidayList: data});
  // await fs.writeFile('testDB.json', nextData, err => {
  //   console.error(err);
  // });
  // // const result = await axios.get('testDB.json');
  // console.log(fs);
}
