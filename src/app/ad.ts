import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'ad',
    template:'<a [href]="redirectUrl"><ion-img [src]="image" (mousedown)="bannerClick()"></ion-img></a>'
})


export class Ad implements OnInit {
    private storageKey = "gti525analytic";
    private clientId;
    private headers = {'x-access-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY0LCJpYXQiOjE1NTMyOTA1OTJ9.rzTQxpXHOedSfEtC3zgDkwifhTQj50gornz99vNQwAA"}
    public image;
    public redirectUrl;
    private clientStatisticId;
    private clientInfos: any = {};

    constructor(private router: Router, private geolocation: Geolocation,private http: HttpClient) {
        this.storageKey = "gti525analytic";
    }

    async ngOnInit() {
        this.clientId = this.getClientId();
        if (!this.clientId) {
            await this.getClientInfos();
        }
        const banner = await this.getAdvertisment();
        this.redirectUrl = banner.url;
        this.image = banner.img;
        this.clientStatisticId = banner.clientStatisticId;
    }

    
    private async postClientInfos(): Promise<any> {
        const url = "https://gti525-analitycs.herokuapp.com/api/v1/analytics/client"
        return await this.http
            .post(url,this.clientInfos,{headers: this.headers,responseType:'text'})
            .toPromise()
    }

    private async getAdvertisment(): Promise<any> {
        const url = `https://gti525-analitycs.herokuapp.com/api/v1/banner/mobile-analityc-banner/${this.clientId}`
        const response = await this.http.get(url,{headers:this.headers,responseType:'json'}).toPromise()
        return response;
        
    }

    public async bannerClick() {
        const url = `https://gti525-analitycs.herokuapp.com/api/v1/banner/click/${this.clientStatisticId}`
        await this.http.post(url,{},{headers:this.headers,responseType:'json'}).toPromise()
    }

    private setclientId() {
        if (typeof (Storage) !== "undefined"){
            const expiration = new Date().getTime() + 86400000;
            localStorage.setItem(this.storageKey, JSON.stringify({ clientId: this.clientId, expiration }))
        }
    }

    private getClientId() {
        if (typeof (Storage) !== "undefined" && localStorage.getItem(this.storageKey)) {
            const infos = JSON.parse(localStorage.getItem(this.storageKey));
            if (new Date(infos.expiration).getTime() > new Date().getTime())
                return infos.clientId;
        }
        return undefined;
    }

    private async getLocalisationInfo(): Promise<string> {
        const resp = await this.geolocation.getCurrentPosition();
        return resp.coords.latitude + 'X' + resp.coords.longitude;
    }

    private async getClientInfos() {
        this.clientInfos.plugins = this.arrayToString(navigator.plugins, ".", 'name');
        this.clientInfos.languages = "EN";
        this.clientInfos.doNotTrack = typeof (Storage) !== "undefined";
        this.clientInfos.platform = "Mobile";
        this.clientInfos.browser = "Mobile";
        this.clientInfos.webglinfo = this.getVideoCardInfo();
        this.clientInfos.screen = this.getScreenInfos();
        this.clientInfos.canvas = this.getCanvasHash();
        this.clientInfos.location = await this.getLocalisationInfo();
        this.clientId = await this.postClientInfos();
        this.setclientId();
    }

    private getVideoCardInfo() {
        // https://stackoverflow.com/questions/49267764/how-to-get-the-video-card-driver-name-using-javascript-browser-side
        let gl = document.createElement('canvas').getContext('webgl');
        if (!gl) {
            return {
                error: "no webgl",
            };
        }
        let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "no_webgl";
    }

    private getCanvasHash() {
        // https://jsfiddle.net/pitasato/dppqhtg3/1/
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let txt = 'i9asdm..$#po((^@KbXrww!~cz';
        ctx.textBaseline = "top";
        ctx.font = "16px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.rotate(.05);
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = "rgba(102, 200, 0, 0.7)";
        ctx.fillText(txt, 4, 17);
        ctx.shadowBlur = 10;
        ctx.shadowColor = "blue";
        ctx.fillRect(-20, 10, 234, 5);
        let strng = canvas.toDataURL();
        let hash = 0;
        if (strng.length == 0) return 'nothing!';
        for (let i = 0; i < strng.length; i++) {
            let char = strng.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    private arrayToString(array, separator, subValue) {
        let res = "";
        for (const item of array) {
            res += (subValue ? item[subValue] : item) + separator;
        }
        return res.slice(0, -1);
    }


    private getScreenInfos() {
        return (screen.height ? screen.height : -1) + '.' +
            (screen.width ? screen.width : -1) + '.' +
            (screen.colorDepth ? screen.colorDepth : -1);
    }
}