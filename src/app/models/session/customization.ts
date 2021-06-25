/**
 * Created by ashok on 29/04/17.
 */

export interface Customization {
    readonly currentTheme: string;
    readonly textSize: string; //compact or material size
    readonly menuLayout: string; // static, overlay, horizontal
    readonly menuColor: string; // light or dark
    readonly profileType: string; // inline or top
}