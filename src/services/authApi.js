import axios from "axios";

const API_URL = "http://localhost:8080";

const checkDuplicatedNickname = async (name) => {
  try {
    const res = await axios.get(`${API_URL}/members/validate/nickname`, {
      params: { nickname: name },
    });
    return res.data;
  } catch (error) {
    console.log("checking nickname error", error);
    throw error;
  }
};

const checkDuplicatedEmail = async (email) => {
  try {
    const res = await axios.get(`${API_URL}/members/validate/email`, {
      params: { email },
    });
    return res.data;
  } catch (error) {
    console.log("checking email error", error);
    throw error;
  }
};

export { checkDuplicatedNickname, checkDuplicatedEmail };
