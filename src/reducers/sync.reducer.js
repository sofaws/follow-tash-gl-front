////////////////////
//  Action types  //
////////////////////
export const LOADALL_SYNC_START = "LOADALL_SYNC_START";
export const LOADALL_STOP_SYNC = "LOADALL_STOP_SYNC";
export const CHANGE_STATE_SYNC = "CHANGE_STATE_SYNC";

///////////////////////
//  Action creators  //
///////////////////////
export const startSync = () => {
  return { type: LOADALL_SYNC_START };
};

export const stopSync = () => {
  return { type: LOADALL_STOP_SYNC };
};

export const changeStateSync = state => {
  return { type: CHANGE_STATE_SYNC, state };
};

///////////////
//  Reducer  //
///////////////
const syncReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATE_SYNC: {
      return {
        state: action.state
      };
    }
    default: {
      return { ...state };
    }
  }
};

const initialState = {
  state: null
};

/////////////////
//  Selectors  //
/////////////////
export const getStateSync = state => state.state;

export default syncReducer;
