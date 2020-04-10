import produce from "immer";

const INITIAL_STATE = {
  data: {},
  items: [],
  failed: undefined,
  loading: undefined,
  refreshing: false,
};

function friends(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@friends/BROWSE_REQUEST":
      case "@friends/READ_REQUEST":
      case "@friends/EDIT_REQUEST":
      case "@friends/ADD_REQUEST":
      case "@friends/DESTROY_REQUEST": {
        const { refreshing } = action.payload;
        draft.refreshing = refreshing;
        draft.loading = !refreshing;
        draft.failed = undefined;
        break;
      }
      case "@friends/BROWSE_SUCCESS": {
        draft.items = action.payload;
        draft.loading = false;
        draft.refreshing = false;
        break;
      }
      case "@friends/READ_SUCCESS": {
        draft.data = action.payload;
        draft.loading = false;
        draft.refreshing = false;
        break;
      }
      case "@friends/ADD_SUCCESS": {
        const items = action.payload;
        draft.data = items;
        draft.items = [items].concat(state.items);
        draft.loading = false;
        draft.refreshing = false;
        break;
      }
      case "@friends/EDIT_SUCCESS": {
        const { id, ...rest } = action.payload;
        draft.data = action.payload;
        draft.items = state.items.map((item) => {
          if (item.id === id) {
            return { ...item, ...rest };
          }
          return item;
        });
        draft.loading = false;
        draft.refreshing = false;
        break;
      }
      case "@friends/DESTROY_SUCCESS": {
        const { id } = action.payload;
        draft.items = state.items.filter((item) => item._id !== id);
        draft.loading = false;
        draft.refreshing = false;
        break;
      }
      case "@friends/BROWSE_FAILURE":
      case "@friends/READ_FAILURE":
      case "@friends/EDIT_FAILURE":
      case "@friends/ADD_FAILURE":
      case "@friends/DESTROY_FAILURE": {
        const { failed } = action;
        draft.failed = failed.response
          ? failed.response.data
          : { errors: { message: failed.message } };
        draft.loading = false;
        draft.refreshing = false;
        break;
      }

      default:
    }
  });
}

export default friends;
