// class holiday {
//   constructor(date, name, register, type) {
//     this.date = date;
//     this.name = name;
//     this.register = register;
//     // 0: 선택안함 1: 일반휴일 2: 배송휴일
//     this.type = type;
//     this.regitDate = new Date();
//   }
// }

function state() {
  return {
    holidayList: [],
  }
}

export default state;
