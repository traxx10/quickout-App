const INITIAL_STATE = {
  symtomps: [
    {name: 'Fever', id: '1', day: 1},
    {name: 'Fatigue', id: '2', day: 2},
    {name: 'Dry Cough', id: '3', day: 3},
    {name: 'Anorexia', id: '4', day: 4},
    {name: 'Myalgia', id: '5', day: 5},
    {name: 'Dyspnea', id: '6', day: 6},
    {name: 'Expctoration', id: '7', day: 7},
    {name: 'Pharyngalgia', id: '8', day: 8},
    {name: 'Diarrhea', id: '9', day: 9},
    {name: 'Nausea', id: '10', day: 10},
    {name: 'Dizziness', id: '11', day: 11},
    {name: 'Headache', id: '12', day: 12},
    {name: 'Vomiting', id: '13', day: 13},
    {name: 'Abdominal Pain', id: '14', day: 14},
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
