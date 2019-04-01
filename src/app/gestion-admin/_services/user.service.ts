﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Admin } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Admin[]>(`localhost:4200/users`);
    }
}
