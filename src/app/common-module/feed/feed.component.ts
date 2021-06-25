import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FeedService} from '../../services/FeedService';
import {Feed} from '../../models/feed/feed';
import {Observable} from 'rxjs/Observable';
import {FeedEntry} from '../../models/feed/feed-entry';

@Component({
    selector   : 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls  : ['./feed.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FeedComponent implements OnInit, OnChanges {
    @Input() feedUrl: string;
    @Input() refreshRate: number;
    @Input() maxHeight: string;
    @Input() maxCharacters: number=0;
    @Input() overflow: string;
    feed: Observable<Feed>;
    constructor(private feedService: FeedService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.feed = this.feedService.getFeedContent(this.feedUrl);
    }
    styleObj() {
        let style: any = {};
        if(this.maxHeight) {
            style.maxHeight = this.maxHeight;
            // if(this.overflow) {
            //     style.overflow = this.overflow
            // }
        }
        return style;
    }
    getDescription(item: FeedEntry) {
        if(!item.description) return '';
        if(!this.maxCharacters) {
            return item.description;
        } else if( item.description.length <= this.maxCharacters) {
            return item.description;
        } else {
            let truncated = item.description.slice(0, this.maxCharacters) + "...";
            return truncated;
        }
    }
}
