import { YGEIAN_NEWS } from "../../http/config";


export const updatePreferencesApi = (payload) =>
  YGEIAN_NEWS.put('user/update-specialties', payload, {
    headers: {
      Authorization: `${localStorage.getItem('ygeianNewsToken')}`,
    },
  }); 

  
export const updateFullNameApi = (payload) =>
  YGEIAN_NEWS.put('user/update-fullname', payload, {
    headers: {
      Authorization: `${localStorage.getItem('ygeianNewsToken')}`,
    },
  });
  
