
import { Request, Response } from "express";
import axios from "axios";
import { AxiosInstance } from "axios";



export async function login(request: Request, response: Response) {

    var apiURL = 'https://core-api-525.herokuapp.com/api';

    var axiosClient = axios.create({
        timeout: 10000,
        headers: {
            "Content-Type": "application/json"
        }
    });

    var result;
    await request;

    var loginInfo = {
        email: request.body.email,
        password: request.body.password
    }
    console.log("request : ", request);
    console.log("request body : ", request.body);
    
    axiosClient.post(apiURL + '/client/login', loginInfo)
        .then(res => {
            console.log("into res");
            console.log(loginInfo);
            console.log(res);
            //result = res;
            response.send(res);
            
        })
        .catch(err => {
            console.log("into err");
            console.log(loginInfo);
            console.log(err);
            //console.log(err.response.status);
            //result = err;
            response.send(err.response.data);
            //response.status(err.response.status);
        });

    //response.send(result);

}