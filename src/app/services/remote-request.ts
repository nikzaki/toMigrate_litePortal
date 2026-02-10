import {HttpHeaders} from '@angular/common/http';
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
    public static WILDCARD_IMAGE                = "image/*";
    public static MULTIPART_FORM                = "multipart/form-data";
}
export class RemoteRequest {
    /**
     * Creates a GET request using form data
     * @param url The URL
     * @param formData The form data
     * @returns {RemoteRequest} Returns the request
     */
    public static createGetRemoteRequest(url: string, formData: any, hdrs?: any): RemoteRequest{
        return RemoteRequest.createRemoteRequest(url, formData, 'GET', hdrs);
    }

    public static createPostRequest(url: string, formData: any, hdrs?: any): RemoteRequest {
        return RemoteRequest.createRemoteRequest(url, formData, 'POST', hdrs);
    }

    public static createRemoteRequest(url: string, formData: any, method: string, hdrs?: any): RemoteRequest {
        let remoteRequest = new RemoteRequest(url, method,
            ContentType.URL_ENCODED_FORM_DATA,formData, hdrs);
        return remoteRequest;
    }

    constructor(private url: string,
        private method: string,
        private reqContentType?: string,
        private data?: any,
        private headers?: any) {
    }

    buildAjax(additionalHeaders?: any): any {
        let effUrl    = this.url;
        const headers = new HttpHeaders();
        // Populate additional headers
        this.populateHeader(headers, additionalHeaders);
        // Now set the headers from the request
        this.populateHeader(headers, this.headers);
        let bodyStr: string = '';
        // console.debug("building ajax", this.data, this.reqContentType)
        if (this.method === 'GET' && isPresent(this.data)) {
            // console.debug("get")
            const paramStr = this.paramString(this.data);
            if (paramStr && paramStr.length) {
                // console.debug("get with param", paramStr, this.data)
                effUrl += '?' + paramStr;
                // bodyStr = this.data;
                headers.set('Content-Type', ContentType.URL_ENCODED_FORM_DATA);
            }
        }
        else if (isPresent(this.data)) {
            if (ContentType.URL_ENCODED_FORM_DATA === this.reqContentType) {
                // console.debug("non get URL FORM DATA")
                bodyStr = this.paramString(this.data);
                headers.set('Content-Type', ContentType.URL_ENCODED_FORM_DATA);
            } else if (ContentType.PLAIN_TEXT === this.reqContentType) {
                bodyStr = this.data; // this.paramString(this.data);
                //! for file, there is no need to set Content-Type, browser will handle
                // headers.set("enctype", ContentType.MULTIPART_FORM);
                // headers.set("Content-Type", ContentType.MULTIPART_FORM);
            } 
            else {
                
                // console.debug("non get NOT URL FORM DATA")
                bodyStr = JSON.stringify(this.data);
                headers.set('Content-Type', ContentType.JSON);
            }
            
        }
        else {
            
            // console.debug("not present")
            headers.set('Content-Type', ContentType.URL_ENCODED_FORM_DATA);
        }
        const args = {
            url    : effUrl,
            headers: headers,
            body   : bodyStr
        };
        // console.debug("building ajax [2]", bodyStr, headers, args)
        return args;
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
     * Populate the HttpHeaders instance with header attributes
     * @param hdr
     */
    private populateHeader(hdr: HttpHeaders, info: any) {
        if (isPresent(info)) {
            for (const key in info)
                hdr = hdr.set(key, info[key]);
        }
    }
}
