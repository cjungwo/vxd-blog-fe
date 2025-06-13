import dayjs from "dayjs";

export const generatePostId = () => {
    return "P" + dayjs().format("YYYYMMDDHHmmss") + Math.floor(Math.random() * 1000000).toString();
}
