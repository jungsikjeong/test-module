import axios, { AxiosInstance } from "axios";

abstract class Service {
  protected axios: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.axios = axiosInstance || axios.create();
  }
}

export default Service;
