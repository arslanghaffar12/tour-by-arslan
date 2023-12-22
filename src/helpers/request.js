
import axios from "axios";

const token = localStorage.getItem('token')

const apiUrl = "https://task.omno.junaidlatif.com"
// const apiUrl = "http://192.168.10.134:5000"





export const loginRequest = async (requestData) => {
  const requestOptions = {
    method: "POST",
    url: apiUrl + "/login",
    data: requestData,
    headers: {
      "Content-Type": "application/json",
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    localStorage.setItem('token', response.data.result.accessToken)
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};







export const homePage = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};

export const realEstate = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/real-estate',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};

export const listedPropertyData = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/listed',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};


export const capitaData = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/capita',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};


export const economicPage = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/economic',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};



// Home APi
export const tenNZData = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/homepage/nz',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};


export const twomonthData = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/homepage/last-two-months',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};

export const primeData = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/homepage/prime-market',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};

export const table_Data = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/homepage/lvp-table',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};


export const table_extra = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/homepage/table-extra',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};


export const homecard = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/homepage/gdp-box',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};


// Real State


export const sale_price = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl +'/real-estate/sales-price',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};
export const days_sell = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/real-estate/days-sell',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};
export const num_sell = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/real-estate/no-sales',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};
export const rate_rent = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/real-estate/rates-rent',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};
export const consent_capita = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/real-estate/consent-capita',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};

// Listed Api

export const stockpriice = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/listed-property/stoke-prices',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};



export const pricandenta = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/listed-property/price-nta',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};

export const pricperenta = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/listed-property/price-per-nta',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};

export const marketpercapRate = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/listed-property/market-cap-rate',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};

export const dividen = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/listed-property/dividen-yield',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};


// Ecnomic Api


export const govt = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/economic/gov',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};
export const gdp = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/economic/gdp',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};
export const national = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/economic/national',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};
export const labour = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/economic/labour',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};
export const mortgage = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/economic/mortgage',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};
export const rbnz = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/economic/rbnz',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};
export const us_nz = async (requestData) => {
  const requestOptions = {
    method: "GET",
    url: apiUrl + '/economic/us-nz',
    data: requestData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  let resolved = {
    data: null,
    error: null
  }
  try {
    const response = await axios(requestOptions);
    resolved.data = response.data;
    resolved.error = null
  } catch (error) {
    console.error("Error:", error);
    resolved.error = "Somthing went Wrong"
  }
  return resolved
};


