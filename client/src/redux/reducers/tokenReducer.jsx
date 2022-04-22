//Action declaration
export const ADD_TOKEN = "ADD_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";

const initialState = {
  token: "",
  user: "",
  isLogged: false,
};
function token(state = initialState, action) {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        token: action.payload.token,
        user: action.payload.user,
        isLogged: true,
      };
    case DELETE_TOKEN:
      return initialState;
    default:
      return state;
  }
}
export default token;
