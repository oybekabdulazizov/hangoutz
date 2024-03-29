import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Cookies from 'js-cookie';
import axios from 'axios';

import { IAuth_Response } from './interfaces';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = 'http://localhost:8080/api/v1';
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const uploadImage = async (files: File[]): Promise<string> => {
  if (files && files.length > 0) {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'hangoutz_preset');
    try {
      const data = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      ).then((res) => res.json());
      return data.secure_url;
    } catch (error: any) {
      throw new Error(`(uploadToCloudinary): ${error.message}`);
    }
  }
  return '';
};

export const saveToCookie = (res: IAuth_Response) => {
  Cookies.set('sessionToken', res.sessionToken, {
    expires: new Date(res.sessionTokenExpiresAt),
  });
  Cookies.set('refreshToken', res.refreshToken, {
    expires: new Date(res.refreshTokenExpiresAt),
  });
  Cookies.set('user', JSON.stringify(res.user), {
    expires: new Date(res.refreshTokenExpiresAt),
  });
};

export const clearCookie = () => {
  Cookies.remove('sessionToken');
  Cookies.remove('refreshToken');
  Cookies.remove('user');
};

export const getTimeWithCurrentTimezone = (datetime: Date) => {
  datetime.setMinutes(datetime.getMinutes() - datetime.getTimezoneOffset());
  return datetime;
};
