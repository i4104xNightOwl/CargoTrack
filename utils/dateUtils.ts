/**
 * Định dạng lại các thuộc tính Date trong object
 * 
 * @param obj object cần định dạng lại
 * @returns object đã được định dạng lại
*/
const formatDate = (date: Date): string => date.toISOString().substring(0, 19).replace('T', ' ');

export default function nomalizeDate(obj: any): any {
    for (const key in obj) {
        if (obj[key] instanceof Date) {
            obj[key] = formatDate(obj[key]);
        }
        else if (typeof obj[key] === 'object' && obj[key] !== null) {
            obj[key] = nomalizeDate(obj[key]);
        }
    }
    return obj;
}


