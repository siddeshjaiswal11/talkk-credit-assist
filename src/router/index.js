import routesConstant from "../constant/routes.js";
function getRoutes() {
  return {
    path: "",
    children: [
      {
        path: routesConstant.home,
        load: () => {
            return import("../pages/home/Home.jsx")
        },
        private: false,
      },
      {
        path: routesConstant.applicationList,
        load: () => {
            return import("../pages/applicationList/ApplicationList.jsx")
        },
        private: false,
      },
      {
        path: routesConstant.applicationReview,
        load: () => {
            return import("../pages/applicationReview/ApplicationReview.jsx")
        },
        private: false,
      }
    ]
  }
}

function routesNode() {
    return getRoutes();
}

export default routesNode;