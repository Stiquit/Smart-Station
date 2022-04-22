import axios from "axios";
import { useState, useEffect } from "react";

const dayToWeekday = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Satruday",
};

export const useDate = (day, hour, minute) => {
  useEffect(() => {
    let timer;
    var now = new Date();
    if (now.getDay() === parseInt(day)) {
      timer = setInterval(() => {
        now = new Date();
        if (
          now.getHours() === parseInt(hour) &&
          now.getMinutes() === parseInt(minute)
        ) {
          console.log("activating rutine ");
        } else {
          console.log(now.getHours(), ":", now.getMinutes());
        }
      }, 60000);
    }
    return () => clearInterval(timer);
  });
  return `${dayToWeekday[day]}, ${hour}:${minute}`;
};

export const useAxiosGet = (path = "") => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8888/${path}`).then(
      (resp) => setData(resp.data),
      (err) => {
        console.log(err.toJSON());
        setData({ succes: false });
      }
    );
  }, [path]);
  return data;
};
export const useAxiosPost = (path = "", body = {}, config = {}) => {
  const [data, setData] = useState();
  useEffect(() => {
    axios.post(`http://localhost:8888/${path}`, body, config).then(
      (resp) => setData(resp.data),
      (err) => {
        console.log(err.toJSON());
        setData({ succes: false });
      }
    );
  }, [path, body, config]);
  return data;
};
export const useSocketMsg = (condition, ioSocket) => {
  const [msgState, setMsgState] = useState("");
  useEffect(() => {
    ioSocket.on("reply", (msg) => {
      console.log(msg);
      condition && setMsgState(msg);
    });
    return () => {
      ioSocket.removeListener("reply");
    };
  }, [ioSocket]);
  return msgState;
};
export const axiosGetRequest = (url = "", params) => {
  return axios
    .get(`http://localhost:8888/${url}`, {
      params: params,
    })
    .then((response) => response.data)
    .catch((err) => console.log(err.toJSON()));
};

export const axiosPostRequest = (url = "", body = {}, config = {}) => {
  return axios
    .post(`http://localhost:8888/${url}`, body, config)
    .then((resp) => resp.data)
    .catch((err) => err.toJSON());
};
export const axiosPutRequest = (url = "", body = {}, config = {}) => {
  return axios
    .put(`http://localhost:8888/${url}`, body, config)
    .then((resp) => resp.data)
    .catch((err) => err.toJSON());
};
