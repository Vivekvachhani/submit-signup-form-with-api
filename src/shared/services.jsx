
import axiosClient from '../api/index'

const statusCheck = {
    validateStatus: (status) => {
        console.log(':::::::::::::', status);
      if (status === 201) {
          return true;
        } else {
          window.location.reload(true)
      }
    }
}

export const mainPostServices = (url, data) => axiosClient.post(url, data,statusCheck)