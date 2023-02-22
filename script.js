//select dom elements
const totalValue = document.getElementById('totalValue');
const incrementInput = document.querySelector('#incrementFrom input[name="increment"]');
const decrementInput = document.querySelector('#decrementFrom input[name="decrement"]');
const matchRow = document.getElementById("matchRow");
const incrementRow = document.getElementById("incrementRow");
const resetButton = document.getElementById("resetButton");

// Define actions
const INCREMENT_SCORE = 'INCREMENT_SCORE';
const DECREMENT_SCORE = 'DECREMENT_SCORE';
const RESET_BUTTON= 'RESET_BUTTON';

// Define initial state
const initialState = {
  matches: [
    {
      id: 1,
      name: "Match 1",
      increment: 0,
      decrement: 0,
      totalScore: 0,
      reset: 0,
    },
  ],
  totalScore: 0,
};

// Action creators
const incrementScore = (matchId, increment, incrementValue) => {
  return {
    type: INCREMENT_SCORE,
    payload: { matchId, incrementValue },
  };
};

const decrementScore = (matchId, decrement, decrementValue) => {
  return {
    type: DECREMENT_SCORE,
    payload: { matchId, decrementValue },
  };
};

const resetData = (matchId, reset) =>{
  return{
    type: RESET_BUTTON,
    payload: {matchId, reset}

  }
}
// Reducer function
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_MATCH":
      return {
        ...state,
        matches: [
          ...state.matches,
          { name: `Match ${state.matches.length + 1}`, increment: 0, decrement: 0 },
        ],
      };
  }
  switch (action.type) {
    case INCREMENT_SCORE:
      return {
        ...state,
        matches: state.matches.map(match =>
          match.id === action.payload.matchId
            ? {
              ...match,
              increment: match.increment + action.payload.incrementValue,
              totalScore: match.totalScore + action.payload.incrementValue,
            }
            : match
        ),
        totalScore: state.totalScore + action.payload.incrementValue,
      };

    case DECREMENT_SCORE:
      return {
        ...state,
        matches: state.matches.map(match =>
          match.id === action.payload.matchId
            ? {
              ...match,
              decrement: match.decrement + action.payload.decrementValue,
              totalScore: Math.max(0, match.totalScore - action.payload.decrementValue),
            }
            : match
        ),
        totalScore: Math.max(0, state.totalScore - action.payload.decrementValue),
      };

      case RESET_BUTTON :
      switch (action.type) {
        case "RESET_BUTTON":
          return {
            ...state,
            matches: [
              ...state.matches,
               state.matches.increment = 0 ,
               state.matches.decrement = 0,
            ],
          };
      }
    default:
      return state;
  }
}

// Creating store
const store = Redux.createStore(counterReducer);

// Event listeners
incrementInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    var incrementValue = parseInt(event.target.value);
    store.dispatch(incrementScore(1, 'increment', incrementValue));
  }
});


decrementInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    var decrementValue = parseInt(event.target.value);
    store.dispatch(decrementScore(1, 'decrement', decrementValue));
  }
});




// function renderMatches() {
//   const { matches } = store.getState();

//   matchRow.innerHTML = "";

//   matches.forEach((match, index) => {
//     const newMatch = document.createElement("div");
//     newMatch.classList.add("match");
//     newMatch.innerHTML = `
//             <div class="wrapper">
//               <button class="lws-delete">
//                 <img src="./image/delete.svg" alt="" />
//               </button>
//               <h3 class="lws-matchName">${match.name}</h3>
//             </div>
//             <div class="inc-dec">
//               <form class="incrementForm" id="incrementFrom${index}">
//                 <h4>Increment</h4>
//                 <input
//                   type="number"
//                   name="increment"
//                   class="lws-increment"
//                   id="incrementData"
//                 />
//               </form>
//               <form onsubmit="decrementFunction()" class="decrementForm" id="decrementFrom${index}">
//                 <h4>Decrement</h4>
//                 <input
//                   type="number"
//                   name="decrement"
//                   class="lws-decrement"
//                   id="decrementData"
//                 />
//               </form>
//             </div>
//             <div class="numbers">
//               <h2 class="lws-singleResult " id="totalValue"></h2>
//             </div>
//           `;
//     matchRow.appendChild(newMatch);
//   });
// }

// renderMatches();



// incrementRow.addEventListener("click", () => {
//   store.dispatch({ type: "ADD_MATCH" });
// });


resetButton.addEventListener("click",() => {
  // store.dispatch(resetData())
  totalValue.innerText = 0;

})

const render = () => {
  const state = store.getState();
  totalValue.innerText = state.totalScore;
}

render();
// renderMatches();


store.subscribe(render);
// store.subscribe(renderMatches);
