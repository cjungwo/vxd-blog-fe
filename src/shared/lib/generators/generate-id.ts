import dayjs from "dayjs";

export const generateId = (prefix: string) => {
    return prefix + dayjs().format("YYYYMMDDHHmmss") + Math.floor(Math.random() * 1000000).toString();
}
