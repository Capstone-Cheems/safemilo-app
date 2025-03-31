export const timeAgo = (dateString: string): string => {
    const date = new Date(!isNaN(Number(dateString))? Number(dateString): dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    }

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const count = Math.floor(seconds / secondsInUnit)
        if (count >= 1) {
            return `${count} ${unit}${count > 1 ? 's' : ''} ago`
        }
    }

    return 'Just now'
}

export const getDayFromDate = (dateString: string): string => {
    const date = new Date(!isNaN(Number(dateString)) ? Number(dateString) : dateString);
    const now = new Date();

    const isSameDay = (d1: Date, d2: Date) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    if (isSameDay(date, now)) return "Today";

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (isSameDay(date, yesterday)) return "Yesterday";

    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    if (date > oneWeekAgo) {
        return date.toLocaleDateString("en-US", { weekday: "long" });
    }

    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

export const getTimeFromDate = (dateString: string): string => {
    const date = new Date(!isNaN(Number(dateString)) ? Number(dateString) : dateString);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};
