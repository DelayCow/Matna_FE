
export const DateFormat = (inDate: Date | string | undefined | null ): string => {
    if (!inDate) {
        return '';
    }

    const date = inDate instanceof Date ? inDate : new Date(inDate);

    if (isNaN(date.getTime())) {
        return String(inDate);
    }

    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};