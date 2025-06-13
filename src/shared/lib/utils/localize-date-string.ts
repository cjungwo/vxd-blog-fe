import dayjs from "dayjs";

export const localizeDate = (date: Date): string => {
    return dayjs(date).format('DD/MM/YYYY');
}
