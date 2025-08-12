import { YGEIAN_NEWS } from "../../http/config";

export const getNewsApi = () => YGEIAN_NEWS.get('news');

export const toggleSaveNewsApi = (_id, token) =>
  YGEIAN_NEWS.post(
    `news/${_id}/toggle-save`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  