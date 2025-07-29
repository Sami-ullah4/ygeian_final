import { YGEIAN_NEWS } from "../../http/config";

const token = localStorage.getItem("ygeianNewsToken");
export const updateFullNameApi = (payload) => {
  YGEIAN_NEWS.put("user/update-fullname", payload, {
    headers: {
      Authorization: `${token}`,
    },
  });
};
