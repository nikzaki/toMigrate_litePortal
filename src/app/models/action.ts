/**
 * Created by ashok on 26/06/17.
 */

export interface Action {
    actionId: string;
    iconOnly: boolean;
    actionLabel?: string;
    icon?: string;
    description?: string;
    flat?: boolean;
    color?: string;
    extraClasses?:string;
    isDisplay?: Function;
    deriveRouterLink?: Function;
    routerLink?: string[];
}