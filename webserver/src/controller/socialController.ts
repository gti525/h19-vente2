
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

    await request;

    var loginInfo = {
        email: request.body.email,
        password: request.body.password
    }

    axiosClient.post(apiURL + '/client/login', loginInfo)
        .then(res => {

            response.status(200);
            response.json(res.data);
            response.send();
            
        })
        .catch(err => {

            response.status(err.response.data.status);
            response.json(err.response.data);
            response.send();
           
        });

    //response.send(result);

}

