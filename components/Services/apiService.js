// apiService.js

import axios from "axios";

const api = axios.create({
  //baseURL: "http://140.238.246.250:8080/api", // Your API's base URL
  baseURL: "https://localhost:7247/api", // Your API's base URL
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/Login", {
      emailid: email,
      pwd: password,
    });

    if (response.status === 200) {
      return response.data.userInfo;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    throw error;
  }
};


export const fetchStockReport = async (facilityId) => {
  try {
    const response = await api.get(`/CGMSCStock/stockReport?faclityId=${facilityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchWarehouseStockReport = async (searchKeyword, facilityid) => {
  try {
    const response = await api.get(`/CGMSCStock/concernWhStock?id=${searchKeyword}&facid=${facilityid}`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchIncompleteWardIssue = async (facilityid) => {
  try {
    const response = await api.get(`/CGMSCStock/getIncompleteWardIssue?faclityId=${facilityid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchWardIssueItems = async (facilityid) => {
  try {
    const response = await api.get(`/CGMSCStock/getWardIssueItems?faclityId=23345`);
    alert(response.data);
    console(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// You can define more API functions here
// export const fetchOtherData = async () => { ... };
