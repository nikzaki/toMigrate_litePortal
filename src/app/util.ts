/**
 * Created by ashok on 27/04/17.
 */
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Headers, RequestMethod} from '@angular/http';
import {ContentType, RemoteRequest} from './services/remote-request';
import {TreeNode} from 'primeng/primeng';

/**
 * Created by ashok on 25/02/17.
 */
export const Keys: any  = {
    userInfo: 'userInfo',
    sessionInfo: 'sessionInfo',
    authenticated: 'authenticated',
    currentUser: 'currentUser',
    playerInfo: 'playerInfo',
    clubInfo: 'clubInfo',
    organizerInfo: 'organizerInfo'
};
export function isPresent(obj: any): boolean {
    return obj != null;
}
export class Util {
    /**
     * Gets the error message from an error
     * @param error
     * @returns {null}
     */
    public static getErrorMessage(error: any, defMsg?: string): string {
        let msg = null;
        if (error && error.message)
            msg = error.message;
        else if (error && error.errorMessage)
            msg = error.errorMessage;
        else if (error && error.exception)
            msg = error.exception;
        else if (typeof error === 'string')
            msg = error;
        else if(error instanceof Response) {
            let resp: Response = error;
            let errorMsg = msg  = resp.headers.get('error-message');
            if(isPresent(errorMsg))
                msg = errorMsg;

        }
        else if(error && error._body) {
            let body = JSON.parse(error._body);
            msg = body['exception'];
        }
        else if (isPresent(defMsg))
            msg = defMsg;
        return msg;
    }

    /**
     * Remove an item from the given array. Make sure that both array and item are not undefined
     * @param array The array from which item needs to be removed
     * @param itemToRemove The item to be removed
     * @returns {Array<any>} Returns the array after removing the item
     */
    public static removeArrayItem(array: Array<any>, itemsToRemove: Array<any>): Array<any> {
        array = array.filter((item) => {
            return itemsToRemove.indexOf(item) < 0;
        });
        return array;
    }

    public static redirectTo(redirectInfo, router: Router): Promise<boolean>{

        if (redirectInfo && redirectInfo.link) {
            const navInfo =  [];
            navInfo.push(...redirectInfo.link);
            if (redirectInfo.data) {
                navInfo.push(...redirectInfo.data);
            }
            return router.navigate(navInfo);
        } else if (redirectInfo && redirectInfo.url) {
            return router.navigateByUrl(redirectInfo.url);
        } else {
            return Promise.resolve(false);
        }


    }

    public static handleError(error) {
        let result: any;
        if(error.headers){
            let hdr: Headers = error.headers;
            if(hdr.has("Error-Message")) {
                result = hdr.get("Error-Message");
            }
        }
        if(!result) {
            if (error && error.json) {
                result = error.json();
            } else if (error) {
                result = error;
            } else {
                result = 'Server error occured';
            }
        }


        return Observable.throw(result);

    }

    public static buildSearchParam(pageNumber: number,
        pageSize: number,
        searchString: string): any{
        const params: any = {
            pageNumber: pageNumber,
            pageSize: pageSize
        };
        if (isPresent(searchString))
            params['searchText'] = searchString;
        return params;
    }

    /**
     * Groups an array of object by given key values
     * @param arr The array to be grouped
     * @param key The key values on which the array will be grouped
     * @returns {any} Return
     */
    public static groupBy(arr: any[], key: string) {
        return arr.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    public static groupByFields(arr: any[], keys: string []) {
        let grouped = Util.groupBy(arr, keys[0]);
        if (keys.length > 1){
            for (let field in grouped) {
                grouped[field] = Util.groupChild(grouped[field], keys, 1)
            }
        }
        return grouped;
    }

    private static groupChild(arr: any,  keys: string[], idx: number ) {
        let grouped = Util.groupBy(arr, keys[idx]);
        if(idx+1 < keys.length){
            for(let field in grouped){
                grouped[field]= Util.groupChild(grouped[field], keys, idx+1)
            }
        }
        return grouped;
    }

    /**
     * Derives the TreeNodes from given array
     * @param arr The array of Objects
     * @param keySpec The key spec object is of type
     * {property: <nameOfPropertyToGroup>, label:<TheLabelOfTreeNode>}
     */
    public static getTreeNodes(arr: any, keys: string []): TreeNode[] {

        //Group the Objects by the keys
        let grouped = Util.groupByFields(arr, keys);
        let treeNodes: TreeNode[] = Util.buildTreeNode(grouped, keys, 0);
        return treeNodes;
    }

    private static buildTreeNode(obj: any, keys: string[], idx: number): TreeNode[] {
        let treeNodes: TreeNode[] = [];
        for(let field in obj) {
            let node: TreeNode = {
            };
            let fieldVal = obj[field];
            if(keys.length > (idx+1) && fieldVal){
                node.data = {
                    name: field
                };
                node.children = Util.buildTreeNode(fieldVal, keys, idx+1);
                node.expanded = true;

            }
            else {
                node.data = {
                    name: field
                };
                if(fieldVal && fieldVal.length){
                    node.children = fieldVal.map(v=>{
                        return {
                            data: v,
                            selectable: true,
                            partialSelected: true
                        };
                    });
                    node.expanded= true;
                }
                else if(fieldVal){
                    node.data = fieldVal;
                    node.selectable = true;
                    node.partialSelected = true;
                }
            }

            treeNodes.push(node);
        }
        return treeNodes;
    }


    
}


export function generateUUID() {
    var d    = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d     = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};