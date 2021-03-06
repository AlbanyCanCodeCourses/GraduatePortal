import axios from "axios";
import config from "../config";

const api = `${config.apiUrl}api`;

const send = (url, data = null, method = "POST") => {
  const token = localStorage.getItem("token");
  return axios(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    data: data ? JSON.stringify(data) : null
  })
    .then(response => response.data)
    .catch(error => error);
};

const upload = (url, image = null, method = "PUT") => {
  const token = localStorage.getItem("token");
  const data = new FormData();
  data.append("image", image);
  return axios(url, {
    method,
    headers: {
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    data
  }).then(response => response.data);
};

// Login, Fetch All Profiles, New & Edit Profile use the "send" AJAX call
// ----------------------------------------------------------------------
export const loginRequest = (username, password) => {
  return send(`${api}/login`, {
    username,
    password
  }).then(response => {
    if (response.token) localStorage.token = response.token;
    return response;
  });
};

export const fetchAllProfilesRequest = () => {
  return send(`${api}/graduates`, null, "GET");
};

export const fetchProfilesNewRequest = profileData => {
  return send(`${api}/graduates/new`, profileData).then(response => {
    if (response.token) localStorage.token = response.token;
    return response;
  });
};

export const fetchProfileEditRequest = profileData => {
  return send(`${api}/graduates/edit`, profileData, "PUT").then(response => {
    if (response.token) localStorage.token = response.token;
    return response;
  });
};

// Upload Image and Resume use the "upload" AJAX call
// --------------------------------------------------
export const uploadImageRequest = data => {
  return upload(`${api}/upload/image`, data).then(response => {
    if (response.token) localStorage.token = response.token;
    return response;
  });
};

export const uploadResumeRequest = data => {
  return upload(`${api}/upload/resume`, data).then(response => {
    if (response.token) localStorage.token = response.token;
    return response;
  });
};

// Create pending users
// --------------------------------------------------
export const newuserCreation = newusers => {
  console.log(newusers);
  return send(`${api}/users/new`, newusers).then(response => {
    if (response.token) localStorage.token = response.token;
    return response;
  });
};

// Register new user
// --------------------------------------------------
export const newuserRegister = (email, temppassword) => {
  return send(`${api}/user/reg-form`, {
    email: email,
    password: temppassword
  }).then(response => {
    if (response.token) localStorage.token = response.token;
    return response;
  });
};

// Forgot Password, Reset Password use the "send" AJAX call
// ----------------------------------------------------------------------
export const ForgotPasswordRequest = (email) => {
  return send(`${api}/user/forgot-password`, {
    email
  }).then(response => {
    return response;
  });
};

export const ResetPasswordRequest = (password) => {
  return send(`${api}/user/reset-password`, {
    password
  }).then(response => {
    return response;
  });
};