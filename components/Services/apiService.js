// apiService.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://140.238.246.250:8080/api", // Server URL
  //baseURL: "https://localhost:7247/api", // Development URL
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


export const fetchWardIssueItems = async (facilityid, issueid) => {
  try {
    const response = await api.get(`/CGMSCStock/getWardIssueItems?faclityId=${facilityid}&issueId=${issueid}`);
    //alert(JSON.stringify(response.data));
    //console(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchItemStock = async (facilityid, itemId) => {
  try {
    const response = await api.get(`/CGMSCStock/getItemStock?faclityId=${facilityid}&itemid=${itemId}`);
    //alert(JSON.stringify(response.data));
    //console(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const postWardIssue = async (issueData, facid) => {
  try {
    alert(facid);
    const response = await api.post(`/CGMSCStock/postWardIssue?facid=${facid}`, issueData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to post ward issue");
    }
  } catch (error) {
    throw error;
  }
};



export const postWardIssueMaster = async (issueData, facid) => {
  try {
    alert(facid);
    const response = await api.post(`/CGMSCStock/postIssueNo?facid=${facid}`, issueData);
    alert("Status ke pehle wala : " + JSON.stringify(response.data));
    alert(response.status);
    if (response.status === 200) {
      alert("Status wala : " + JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error("Failed to post ward issue");
    }
  } catch (error) {
    throw error;
  }
};


export const fetchIncompleteWardIssueItems = async (issueId) => {
  try {
    const response = await api.get(`/CGMSCStock/getIncompleteWardIssueItems?issueId=${issueId}`);
    //alert(JSON.stringify(response.data));
    //console(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteIncompleteIssueItems = async (issueItemId) => {
  try {
    alert("before" + issueItemId)
    const response = await api.delete(`/CGMSCStock/deleteIncompleteIssueItems?IssueItemID=${issueItemId}`);
    alert("after : " + JSON.stringify(response.data));
    //console(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchFacilityWards = async (facilityId) => {
  try {

    const response = await api.get(`/CGMSCStock/getFacilityWards?faclityId=${facilityId}`);
    //alert(JSON.stringify(response.data));
    //console(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchFacilityIssueNo = async (facilityId) => {
  try {

    const response = await api.get(`/CGMSCStock/getGeneratedIssueNo?facId=${facilityId}`);
    alert(JSON.stringify(response.data));
    //console(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchHoldStockReport = async (facilityId) => {
  try {

    const response = await api.get(`/CGMSCStock/getHoldStock?faclityId=${facilityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }

};

export const fetchNearExpStockReport = async (facilityId, catid, criteria) => {
  try {

    const response = await api.get(`/CGMSCStock/getNearExpStock?faclityId=${facilityId}&catid=${catid}&criteria=${criteria}`);
    //alert(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }

};

export const fetchCategory = async (facilityId) => {
  try {

    const response = await api.get(`/CGMSCStock/getItemCategory?faclityId=${facilityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }

};


export const fetchIncomplWardIndentMaster = async (facilityId) => {
  try {

    const response = await api.get(`/CGMSCStock/getIncomplWardIndentMaster?faclityId=${facilityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }

};




export const fetchIncomplReceiptMasterWH = async (facilityId) => {
  try {

    const response = await api.get(`/CGMSCStock/getReceiptMasterFromWH?faclityId=${facilityId}`);

    return response.data;
  } catch (error) {
    throw error;
  }

};


export const postIssueNoAgainstIndent = async (issueMasterData) => {
  alert("inside apiServices: " + JSON.stringify(issueMasterData));
  try {
    const response = await api.post(`/CGMSCStock/postIssueNoAgainstIndent`, issueMasterData);
    alert(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }

};


// You can define more API functions here
// export const fetchOtherData = async () => { ... };
