const INITIAL_STATE = {
  markedDates: {
    '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
    '2012-05-17': {marked: true},
    '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
  },
  days: [],
  startDate: null,
  currentDay: 1,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
