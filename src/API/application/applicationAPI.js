import apiWrapper from "../apiWrapper";

const authURL = "/api/v1/"
  
export const getLoanApplications = () => {
    return apiWrapper({
        url: `${authURL}loan_application`,
        method: "GET",
    })
}

export const getParticularLoanApplications = (id) => {
    return apiWrapper({
        url: `${authURL}loan_application/${id}`,
        method: "GET",
    })
}

export const resetPassword = (email, newPassword) => {
    return apiWrapper({
        url: `${authURL}reset-password`,
        method: "POST",
        data: { email, newPassword }
    })
}

export const chatSessionRename = (id, data) => {
    return apiWrapper({
      url: `${chatSessionURL}rename/${id}`,
      method: "PATCH",
      data,
    });
  };
  