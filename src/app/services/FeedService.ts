import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Feed} from '../models/feed/feed';

@Injectable()
export class FeedService {
    private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';

    constructor(private http: Http) {
    }

    getFeedContent(url: string): Observable<Feed> {
        return this.http.get(this.rssToJsonServiceBaseUrl + encodeURIComponent(url))
                   .map(resp => {
                       return this.extractFeeds(resp);
                   })
                   .catch(this.handleError);
    }

    private extractFeeds(res: Response): Feed {
        let feed = res.json();
        return feed || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}