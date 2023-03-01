import {Headers, Request, RequestMethod} from '@angular/http';
import {isPresent} from '../util';
/**
 * This class represents a remote request
 * Created by Ashok on 06-04-2016.
 */
export class ContentType {
    public static URL_ENCODED_FORM_DATA: string = 'application/x-www-form-urlencoded';
    public static JSON: string                  = 'application/json';
    public static JAVASCRIPT: string            = 'application/javascript';
    public static HTML: 'text/html';
    public static XML: 'application/xml';
    public static XHTML: 'application/xhtml+xml';
    public static PLAIN_TEXT                    = 'text/plain';
    public static JPEG                          = 'image/jpeg';
    public static PNG                           = 'image/png';
}
export class RemoteRequest {
    /**
     * Creates a GET request using form data
     * @param url The URL
     * @param formData The form data
     * @returns {RemoteRequest} Returns the request
     */
    public static createGetRemoteRequest(url: string, formData: any, hdrs?: any): RemoteRequest{
        return RemoteRequest.createRemoteRequest(url, formData, RequestMethod.Get, hdrs);
    }

    public static createPostRequest(url: string, formData: any, hdrs?: any): RemoteRequest {
        return RemoteRequest.createRemoteRequest(url, formData, RequestMethod.Post, hdrs);
    }

    public static createRemoteRequest(url: string, formData: any, method: RequestMethod, hdrs?: any): RemoteRequest {
        let remoteRequest = new RemoteRequest(url, method,
            ContentType.URL_ENCODED_FORM_DATA,formData, hdrs);
        return remoteRequest;
    }

    constructor(private url: string,
        private method: RequestMethod,
        private reqContentType?: string,
        private data?: any,
        private headers?: any) {
    }

    buildAjax(additionalHeaders?: any): Request {
        let effUrl    = this.url;
        const headers = new Headers();
        // Populate additional headers
        this.populateHeader(headers, additionalHeaders);
        // Now set the headers from the request
        this.populateHeader(headers, this.headers);
        let bodyStr: string = '';
        console.debug("building ajax", this.data, this.reqContentType)
        if (this.method === RequestMethod.Get && isPresent(this.data)) {
            console.debug("get")
            const paramStr = this.paramString(this.data);
            if (paramStr && paramStr.length) {
                console.debug("get with param", paramStr, this.data)
                effUrl += '?' + paramStr;
                // bodyStr = this.data;
                headers.set('Content-Type', ContentType.URL_ENCODED_FORM_DATA);
            }
        }
        else if (isPresent(this.data)) {
            if (ContentType.URL_ENCODED_FORM_DATA === this.reqContentType) {
                console.debug("non get URL FORM DATA")
                bodyStr = this.paramString(this.data);
                headers.set('Content-Type', ContentType.URL_ENCODED_FORM_DATA);
            }
            else {
                
                console.debug("non get NOT URL FORM DATA")
                bodyStr = JSON.stringify(this.data);
                headers.set('Content-Type', ContentType.JSON);
            }
            
        }
        else {
            
            console.debug("not present")
            headers.set('Content-Type', ContentType.URL_ENCODED_FORM_DATA);
        }
        const args = {
            url    : effUrl,
            headers: headers,
            body   : bodyStr
        };
        console.debug("building ajax [2]", bodyStr, headers, args)
        const req  = new Request(args);
        req.url    = effUrl;
        req.method = this.method;
        return req;
    }

    private paramString(data: any): string {
        const params = [];
        if (isPresent(data)) {
            for (const key in data) {
                let comp = encodeURIComponent(key);
                if (isPresent(data[key])) {
                    comp += '=' + encodeURIComponent(data[key]);
                }
                params.push(comp);
            }
        }
        return params.join('&');
    }

    /**
     * Populate the Headers instance with header attributes
     * @param hdr
     */
    private populateHeader(hdr: Headers, info: any) {
        if (isPresent(info)) {
            for (const key in info)
                hdr.set(key, info[key]);
        }
    }
}
