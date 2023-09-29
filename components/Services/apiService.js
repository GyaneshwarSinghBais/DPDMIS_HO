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


export const fetchStockReport = async (facilityId,itemid,iType) => {
  try {
    const response = await api.get(`/CGMSCStock/stockReport?faclityId=${facilityId}&itemid=${itemid}&catname=${iType}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchfacstockReportddl = async (facilityId) => {
  try {
    const response = await api.get(`/CGMSCStock/facstockReportddl?faclityId=${facilityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMainCategoryService = async (facilityId) => {
  try {
   // alert("In Service Call"+facilityId);
    const response = await api.get(`/CGMSCStock/getMainCategory?faclityId=${facilityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchWarehouseStockReport = async (searchp,facilityid,mcatid) => {
  try {
  

    const response = await api.get(`/CGMSCStock/WHstockReport?searchp=${searchp}&facid=${facilityid}&mcatid=${mcatid}`);
 
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

export const fetchItemStock = async (facilityid, itemId, indentid) => {
  try {
    const response = await api.get(`/CGMSCStock/getItemStock?faclityId=${facilityid}&itemid=${itemId}&indentid=${indentid}`);
    //alert(JSON.stringify(response.data));
    //console(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const postWardIssue = async (issueData, facid) => {
  try {  
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
       const response = await api.post(`/CGMSCStock/postIssueNo?facid=${facid}`, issueData);   
    if (response.status === 200) {     
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
    //alert("before" + issueItemId)
    const response = await api.delete(`/CGMSCStock/deleteIncompleteIssueItems?IssueItemID=${issueItemId}`);
    //alert("after : " + JSON.stringify(response.data));
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
 // alert("inside apiServices: " + JSON.stringify(issueMasterData));
  try {
    const response = await api.post(`/CGMSCStock/postIssueNoAgainstIndent`, issueMasterData);
    //alert(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }

};



export const fetchIndentItems = async (indentId) => {
  try {
    //alert("Inset fetchIndentItems:" + indentId)
    const response = await api.get(`/CGMSCStock/getWardIndentItems?nocid=${indentId}`);
    //alert("Response: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const putCompleteWardIssues = async (issueId) => {  
  try {
    const response = await api.put(`/CGMSCStock/completeWardIssues?IssueID=${issueId}`);   
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteWardIssues = async (issueId) => {  
  try {
    const response = await api.delete(`/CGMSCStock/deleteWardIssues?IssueID=${issueId}`);   
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const postReceiptMaster = async (receiptData, facid) => {
  alert(JSON.stringify(receiptData));
  console.log(JSON.stringify(receiptData));
  try {  
    const response = await api.post(`/CGMSCStock/postReceiptMaster?facid=${facid}`, receiptData);
    //alert(JSON.stringify(response.data));
    if (response.status === 200) {      
      return response.data;
    } else {
      throw new Error("Failed to post ward issue");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchReceiptItemsDDL = async (facid,receiptid,indentId) => {
  try {
    //alert("Inset fetchIndentItems:" + indentId)
    const response = await api.get(`/CGMSCStock/getReceiptItemsDDL?faclityId=${facid}&FACRECEIPTID=${receiptid}&IndentID=${indentId}`);
    //alert("gyan Response: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRacks = async (facid) => {
  try {
    //alert("Inset fetchIndentItems:" + indentId)
    const response = await api.get(`/CGMSCStock/getRacks?WH_FACID=${facid}`);
    //alert("Response: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchReceiptDetails = async (receipttype,facid,facReceiptid) => {
  try {
    //alert("Inset fetchIndentItems:" + indentId)
    const response = await api.get(`/CGMSCStock/getReceiptDetails?facilityReceiptType=${receipttype}&facilityId=${facid}&facReceiptId=${facReceiptid}`);
    //alert("Response: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchReceiptItemsDetail = async (faclityId,FACRECEIPTID,IndentID,inwno) => {
  try {   
    const response = await api.get(`/CGMSCStock/getReceiptItemsDetail?faclityId=${faclityId}&FACRECEIPTID=${FACRECEIPTID}&IndentID=${IndentID}&inwno=${inwno}`);
    //alert("Response: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchReceiptItms = async (receiptData,rackID,facid,facReceiptId,whinwno) => {
  try {  
    const response = await api.post(`/CGMSCStock/postReceiptItems?rackID=${rackID}&facid=${facid}&facReceiptId=${facReceiptId}&whinwno=${whinwno}`, receiptData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to post Receipt data");
    }
  } catch (error) {
    throw error;
  }
};


export const deleteReceipts= async (receiptId) => {
  try {
    //alert("before" + issueItemId)
    const response = await api.delete(`/CGMSCStock/deleteReceipts?receiptId=${receiptId}`);
    //alert("after : " + JSON.stringify(response.data));
    //console(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const putReceipts = async (receiptId) => {  
  try {
    const response = await api.put(`/CGMSCStock/completeReceipts?receiptId=${receiptId}`);   
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReceiptItems = async (inwno,facReceiptItemId,itemid,receiptId,deletedBatchQty) => {  
  try {
    const response = await api.delete(`/CGMSCStock/deleteReceiptItems?inwno=${inwno}&facReceiptItemId=${facReceiptItemId}&itemid=${itemid}&receiptId=${receiptId}&deletedBatchQty=${deletedBatchQty}`);   
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchStockPerEDL = async (faclityId,Mcatid) => {
  try {   
    const response = await api.get(`/CGMSCStock/getStockPerEDL?faclityId=${faclityId}&Mcatid=${Mcatid}`);
    //alert("Response from fetchStockPerEDL: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchStockPerNonEDLAg_ApprovedAI = async (faclityId,Mcatid) => {
  try {   
    const response = await api.get(`/CGMSCStock/getStockPerNonEDLAg_ApprovedAI?faclityId=${faclityId}&Mcatid=${Mcatid}`);
    //alert("Response from fetchStockPerNonEDLAg_ApprovedAI: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchStockOutDrillDown = async (faclityId,Mcatid,isEDL) => {
  try {   
    const response = await api.get(`/CGMSCStock/getStockOutDrillDown?faclityId=${faclityId}&Mcatid=${Mcatid}&isEDL=${isEDL}`);
    //alert("Response from fetchStockOutDrillDown: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchFacilityIndentToWH = async (faclityId,yrid,itemid) => {
  try {   
    const response = await api.get(`/CGMSCStock/getFacilityIndentToWH?faclityId=${faclityId}&yrid=${yrid}&itemid=${itemid}`);
    //alert("Response from fetchFacilityIndentToWH: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchWHissueToFacility = async (faclityId,yrid,itemid) => {
  try {   
    const response = await api.get(`/CGMSCStock/getWHissueToFacility?faclityId=${faclityId}&yrid=${yrid}&itemid=${itemid}`);
    //alert("Response from fetchFacilityIndentToWH: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchFacilityReceiptAgainstIndent = async (faclityId,yrid,itemid) => {
  try {   
    const response = await api.get(`/CGMSCStock/getFacilityReceiptAgainstIndent?faclityId=${faclityId}&yrid=${yrid}&itemid=${itemid}`);
    //alert("Response from fetchFacilityIndentToWH: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchFacilityReceiptFromOtherFacilityOrLP = async (faclityId,yrid,itemid) => {
  try {   
    const response = await api.get(`/CGMSCStock/getFacilityReceiptFromOtherFacilityOrLP?faclityId=${faclityId}&yrid=${yrid}&itemid=${itemid}`);
    //alert("Response from fetchFacilityIndentToWH: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchFacilityWardIssue = async (faclityId,yrid,itemid) => {
  try {   
    const response = await api.get(`/CGMSCStock/getFacilityWardIssue?faclityId=${faclityId}&yrid=${yrid}&itemid=${itemid}`);
    //alert("Response from fetchFacilityIndentToWH: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchFacilityIssueToOtherFacility = async (faclityId,yrid,itemid) => {
  try {   
    const response = await api.get(`/CGMSCStock/getFacilityIssueToOtherFacility?faclityId=${faclityId}&yrid=${yrid}&itemid=${itemid}`);
    //alert("Response from fetchFacilityIndentToWH: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchItemDetail = async (faclityId,yrid,itemid) => {
  try {   
    const response = await api.get(`/CGMSCStock/getItemDetail?faclityId=${faclityId}&yrid=${yrid}&itemid=${itemid}`);
    //alert("Response from fetchItemDetail: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchYear = async () => {
  try {   
    const response = await api.get(`/CGMSCStock/getYear`);
    //alert("Response from fetchYear: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchFacilityAvailableItem = async (facilityId) => {
  try {
    //alert("Inset fetchIndentItems:" + indentId)
    const response = await api.get(`/CGMSCStock/getFacilityAvailableItem?facilityId=${facilityId}`);
    //alert("Response: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};










// You can define more API functions here
// export const fetchOtherData = async () => { ... };
