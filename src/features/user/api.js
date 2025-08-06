import { YGEIAN_NEWS } from "../../http/config";

export const updateFullNameApi = (payload) =>
  YGEIAN_NEWS.put('user/update-fullname', payload, {
    headers: {
      Authorization: `${localStorage.getItem('ygeianNewsToken')}`,
    },
  });
  
