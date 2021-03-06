import convert from '@src/utils/convert';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {persistReducer} from 'redux-persist';
import {DEFAULT_REWARD_RATE} from './stake.utils';
import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
  DEPOSIT_FLOW,
  ACTION_CHANGE_FLOW_STEP,
  ACTION_CHANGE_FLOW_ACCOUNT,
  ACTION_CHANGE_FLOW_AMOUNT,
  STEP_FLOW,
  ACTION_FETCHING_FEE,
  ACTION_FETCHED_FEE,
  ACTION_FETCH_FAIL_FEE,
  WITHDRAW_FLOW,
  ACTION_FETCHING_CREATE_STAKE,
  ACTION_FETCHED_CREATE_STAKE,
  ACTION_FETCH_FAIL_CREATE_STAKE,
  ACTION_FETCHING_CREATE_UNSTAKE,
  ACTION_FETCHED_CREATE_UNSTAKE,
  ACTION_FETCH_FAIL_CREATE_UNSTAKE,
  ACTION_BACKUP_CREATE_STAKE,
  ACTION_TOGGLE_GUIDE,
} from './stake.constant';

const initialState = {
  isFetching: false,
  isFetched: false,
  flow: {
    deposit: {
      step: 0,
      account: null,
      amount: 0,
    },
    withdraw: {
      step: 0,
      account: null,
      amount: 0,
    },
    activeFlow: DEPOSIT_FLOW,
  },
  data: {
    minToStake: 0,
    minToWithdraw: 0,
    maxToStake: 0,
    balance: 0,
    currentRewardRate: DEFAULT_REWARD_RATE,
    stakingMasterAddress: '',
    balancePStake: 0,
  },
  fee: {
    isFetching: false,
    isFetched: false,
    value: 0,
  },
  createStake: {
    isFetching: false,
    isFetched: false,
    data: null,
  },
  createUnStake: {
    isFetching: false,
    isFetched: false,
    data: null,
  },
  createUnStakeRewards: {
    isFetching: false,
    isFetched: false,
    data: null,
  },
  storage: {
    guide: false,
    backup: false,
  },
};

const stakeReducer = (state = initialState, action) => {
  switch (action.type) {
  case ACTION_FETCHING: {
    return {
      ...state,
      isFetching: true,
    };
  }
  case ACTION_FETCHED: {
    return {
      ...state,
      isFetching: false,
      isFetched: true,
      data: {...action.payload},
    };
  }
  case ACTION_FETCH_FAIL: {
    return {
      ...state,
      isFetched: false,
      isFetching: false,
    };
  }
  case ACTION_CHANGE_FLOW_STEP: {
    const {activeFlow, step} = action.payload;
    return {
      ...state,
      flow: {
        ...state.flow,
        [activeFlow]: {
          ...state.flow[activeFlow],
          step,
        },
        activeFlow,
      },
    };
  }
  case ACTION_CHANGE_FLOW_ACCOUNT: {
    const {account} = action.payload;
    const {activeFlow} = state.flow;
    switch (activeFlow) {
    case DEPOSIT_FLOW:
      return {
        ...state,
        flow: {
          ...state.flow,
          [activeFlow]: {
            ...state.flow[activeFlow],
            account,
            step: STEP_FLOW.TYPE_AMOUNT,
          },
        },
        data: {
          ...state.data,
          maxToStake: account?.value,
        },
        fee: {
          ...initialState.fee,
        },
      };
    case WITHDRAW_FLOW: {
      return {
        ...state,
        flow: {
          ...state.flow,
          [activeFlow]: {
            ...state.flow[activeFlow],
            account,
            step: STEP_FLOW.TYPE_AMOUNT,
          },
        },
      };
    }
    default:
      return state;
    }
  }
  case ACTION_CHANGE_FLOW_AMOUNT: {
    const {amount} = action.payload;
    const {activeFlow} = state.flow;
    return {
      ...state,
      flow: {
        ...state.flow,
        [activeFlow]: {
          ...state.flow[activeFlow],
          amount,
          step: STEP_FLOW.SHOW_STATUS,
        },
      },
    };
  }
  case ACTION_FETCHING_FEE: {
    return {
      ...state,
      fee: {
        ...state.fee,
        isFetching: true,
      },
    };
  }
  case ACTION_FETCHED_FEE: {
    const fee = convert.toNumber(action.payload);
    let maxToStake = convert.toNumber(state.data.maxToStake);
    if (maxToStake > 0 && maxToStake > fee) {
      maxToStake = maxToStake - fee;
    }
    return {
      ...state,
      data: {
        ...state.data,
        maxToStake,
      },
      fee: {
        ...state.fee,
        isFetched: true,
        isFetching: false,
        value: fee,
      },
    };
  }
  case ACTION_FETCH_FAIL_FEE: {
    return {
      ...state,
      fee: {
        ...state.fee,
        isFetched: false,
        isFetching: false,
      },
    };
  }
  case ACTION_FETCHING_CREATE_STAKE: {
    return {
      ...state,
      createStake: {
        ...state.createStake,
        isFetching: true,
      },
    };
  }
  case ACTION_FETCHED_CREATE_STAKE: {
    return {
      ...state,
      createStake: {
        ...state.createStake,
        isFetching: false,
        isFetched: true,
        data: {...action.payload},
      },
    };
  }
  case ACTION_BACKUP_CREATE_STAKE: {
    return {
      ...state,
      storage: {
        ...state.storage,
        backup: true,
      },
    };
  }
  case ACTION_FETCH_FAIL_CREATE_STAKE: {
    return {
      ...state,
      createStake: {
        ...state.createStake,
        isFetched: false,
        isFetching: false,
      },
    };
  }
  case ACTION_FETCHING_CREATE_UNSTAKE: {
    return {
      ...state,
      createUnStake: {
        ...state.createUnStake,
        isFetching: true,
      },
    };
  }
  case ACTION_FETCHED_CREATE_UNSTAKE: {
    return {
      ...state,
      createUnStake: {
        ...state.createUnStake,
        isFetching: false,
        isFetched: true,
        data: {...action.payload},
      },
    };
  }
  case ACTION_FETCH_FAIL_CREATE_UNSTAKE: {
    return {
      ...state,
      createUnStake: {
        ...state.createUnStake,
        isFetched: false,
        isFetching: false,
      },
    };
  }
  case ACTION_TOGGLE_GUIDE: {
    return {
      ...state,
      storage: {
        ...state.storage,
        guide: true,
      },
    };
  }
  default:
    return state;
  }
};

const persistConfig = {
  key: 'stake',
  storage: AsyncStorage,
  whitelist: ['storage'],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, stakeReducer);
