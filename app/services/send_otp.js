import axios from "axios";
import { api } from "../libs/api";
import bugsnag from "./bugsnag";

const sendOtp = mobile => {
  try {
    return axios.post(
      api.sendOtp,
      { mobile },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
  } catch (e) {
    bugsnag.notify(e);
  }
};

export { sendOtp };
