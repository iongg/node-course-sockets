/**
 * Created by iong on 31.10.2017.
 */
export function generateMessage (from:string, text:string) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

export function generateLocationMessage (from:string, lat, long) {
    return {
        from,
        url:`https://www.google.com/maps?q=${lat},${long}`,
        createdAt: new Date().getTime()
    }
}

