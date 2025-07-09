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

export const getApplicationReviewSet = (data) => {
    return apiWrapper({
        url: `${authURL}loan_application/review`,
        method: "POST",
        data
    })
}

export const addCommentOnReview = (id, data) => {
    return apiWrapper({
      url: `${authURL}review/${id}`,
      method: "PATCH",
      data,
    });
  };
  