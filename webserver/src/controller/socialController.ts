
import { Request, Response } from "express";
import axios from "axios";
import { AxiosInstance } from "axios";

var apiURL = 'https://core-api-525.herokuapp.com/api';

var axiosClient = axios.create({
    timeout: 3000,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function login(request: Request, response: Response) {

    var result;

    var loginInfo = {
        email: request.params.email,
        password: request.params.password
    }

    axios.post(this.apiURL + '/client/login', loginInfo)
    .then(res => {
      console.log(res);
      result = res;
    })
    .catch(err => {
      console.log(err.response); 
      console.log(err.response.status);

    });
    response.send(result);

}