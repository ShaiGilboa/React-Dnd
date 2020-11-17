import produce from 'immer';
import { actionMan, gameState } from './types';
import { canMoveKnight } from '../../utils';

const initialState : gameState = {
  status: "idle",
  knightLocation: [1,7],
  moves: 0,
  pastPositions: [],
}
//appStatus: 'idle', 'loading'


const appReducer = (state: gameState = initialState, action: actionMan) => {
  switch (action.type) {
    case 'SET_STATUS_LOADING':
      return produce(state, draftState => {
        draftState.status = 'loading';
      });
    case 'SET_STATUS_IDLE':
      return produce(state, draftState => {
        draftState.status = 'idle';
      });
    case 'CHANGE_KNIGHT_LOCATION':
      return produce(state, draftState => {
        if (canMoveKnight(action.data, state.knightLocation)) {
          // console.log('state.knightLocation', state.knightLocation)
          draftState.pastPositions = [...state.pastPositions, state.knightLocation]
          draftState.moves = state.moves + 1;
          draftState.knightLocation = action.data;
      } else {
        
      }
      });
    case 'UNDO': 
      if (state.pastPositions.length > 0) {
        return produce(state, draftState => {
          const pos : number[] = state.pastPositions[state.pastPositions.length - 1];
          draftState.knightLocation = pos;
          draftState.pastPositions = state.pastPositions.splice(state.pastPositions.length - 1, 1);
        })
      }
    default:
      return state;
  }
}

export default appReducer;