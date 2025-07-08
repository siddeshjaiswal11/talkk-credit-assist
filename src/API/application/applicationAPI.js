import apiWrapper from "../apiWrapper";

const authURL = "/api/v1/"
  
export const logout = () => {
    return apiWrapper({
        url: `${authURL}logout`,
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
  