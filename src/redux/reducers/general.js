import { ADD_ENTRY, UPDATE_ENTRY, DELETE_ENTRY, TOGGLE_STATUS } from "../actionTypes";
import { EntryStatus } from '../../components/Entry';

const initialState = {
  entryList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTRY: {
      const { id, content } = action.payload;
      return {
        ...state,
        entryList: state.entryList.concat({
          id: id,
          content: content,
          status: EntryStatus.OPEN,
        })
      };
    }
    case UPDATE_ENTRY: {
      const { id, content } = action.payload;
      return {
        ...state,
        entryList: {
          ...state.entryList,
          [id]: {
            ...state.entryList[id],
            content: content
          }
        }
      };
    }
    case DELETE_ENTRY: {
      const { id } = action.payload;
      return Object.assign({}, state, {
        entryList: [...state.entryList.filter(entry => entry.id !== id)],
      });
    }
    case TOGGLE_STATUS: {
      const { id } = action.payload;
      const currentEntry = state.entryList.slice(id, id+1);
      const currentStatus = currentEntry.status;
      if(currentStatus === EntryStatus.OPEN) {
        return {
          ...state,
          entryList: {
            ...state.entryList,
            [id]: {
              ...state.entryList[id],
              status: EntryStatus.DONE
            }
          }
        };
      }
      return {
        ...state,
        entryList: {
          ...state.entryList,
          [id]: {
            ...state.entryList[id],
            status: EntryStatus.OPEN
          }
        }
      };
    }
    default:
      return state;
  }
}
