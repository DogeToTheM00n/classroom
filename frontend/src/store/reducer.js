const initialState = {
  auth: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "False_Auth":
      return {
        ...state,
        auth: false,
        user: null,
      };
    case "True_Auth":
      return {
        ...state,
        auth: true,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
