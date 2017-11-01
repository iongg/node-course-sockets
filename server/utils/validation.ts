/**
 * Created by iong on 01.11.2017.
 */
export function isRealString(str) {
    return typeof str === 'string' && str.trim().length > 0;

}