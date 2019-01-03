////////////////////
//  Action types  //
////////////////////
export const LOADALL_SYNC_START = "LOADALL_SYNC_START";
export const LOADALL_STOP_SYNC = "LOADALL_STOP_SYNC";
export const CHANGE_STATE_SYNC = "CHANGE_STATE_SYNC";
export const CHANGE_STATE_LOADING_SYNC = "CHANGE_STATE_LOADING_SYNC";

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

export const enableLoadingSync = state => {
  return { type: CHANGE_STATE_LOADING_SYNC, loading: true };
};

export const disableLoadingSync = state => {
  return { type: CHANGE_STATE_LOADING_SYNC, loading: false };
};

///////////////
//  Reducer  //
///////////////
const syncReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATE_SYNC: {
      return {
        ...state,
        state: action.state
      };
    }
    case CHANGE_STATE_LOADING_SYNC: {
      return {
        ...state,
        loading: action.loading
      };
    }
    default: {
      return { ...state };
    }
  }
};

const initialState = {
  state: null,
  loading: false,
};

/////////////////
//  Selectors  //
/////////////////
export const getStateSync = state => state.state;
export const getSyncLoading = state => state.loading;

export default syncReducer;
