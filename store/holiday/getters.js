const getters = {
  // 객체 형태의 holiday를 배열로 바꿔서 return해야함.
  holidayList: state => {
    return state.holidayList.map((holiday) => {
      return [
        holiday.check ? holiday.check : false,
        new Date(holiday.begDt),
        holiday.holdyNm,
        holiday.createdBy,
        new Date(holiday.createdAt),
        holiday.holdyTpCd,
        holiday.holdySn,
        holiday.lastModifiedAt,
        holiday.lastModifiedBy,
      ]
    });
  },
  test: state => [['Maria Anders', 'Sales Representative', 'Berlin', 'Germany'],
    ['Ana Trujillo', 'Owner', 'Mxico D.F.', 'Mexico'],
    ['Antonio Moreno', 'Owner', 'Mxico D.F.', 'Mexico'],
    ['Thomas Hardy', 'Sales Representative', 'London', 'UK'],
    ['Christina Berglund', 'Order Administrator', 'Lule', 'Sweden'],
    ['Hanna Moos', 'Sales Representative', 'Mannheim', 'Germany'],
    ['Frdrique Citeaux', 'Marketing Manager', 'Strasbourg', 'France'],
    ['Martn Sommer', 'Owner', 'Madrid', 'Spain'],
    ['Laurence Lebihan', 'Owner', 'Marseille', 'France'],
    ['Elizabeth Lincoln', 'Accounting Manager', 'Tsawassen', 'Canada'],
    ['Victoria Ashworth', 'Sales Representative', 'London', 'UK'],
    ['Patricio Simpson', 'Sales Agent', 'Buenos Aires', 'Argentina']]
}

export default getters;
