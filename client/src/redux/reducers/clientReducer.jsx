import { io } from "socket.io-client";
export const SEND = "SEND";
const socket = io("http://localhost:8888", {
  reconnectionDelayMax: 5000,
});
const initialState = {
  done: false,
  socket: socket,
};
function client(state = initialState, action) {
  switch (action.type) {
    case SEND:
      return {
        ...initialState,
        done: socket.emit(action.payload.event, action.payload.data).connected,
      };
    default:
      return state;
  }
}
export default client;
