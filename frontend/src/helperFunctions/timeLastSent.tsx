export const timeLastSent = (specifiedTime: string): string => {
    const difference = Date.now() - Date.parse(specifiedTime) // Date is number of milliseconds since Jan 1, 1970 (epoch time)

    // years
    const years = Math.floor(difference / 3.154e+10) // number of milliseconds in a year

    // weeks
    const weeks = Math.floor(difference / 6.048e+8)

    // days
    const days = Math.floor(difference / 8.64e+7)

    // hours
    const hours = Math.floor(difference / 3.6e+6)

    // minutes
    let mins = Math.round(difference / 60000)
    if (mins === 0) mins = 1
    if (mins === 60) mins = 59

    if (years >= 1) {
        return years + "y"
    } else if (weeks >= 1) {
        return weeks + "w"
    } else if (days >= 1) {
        return days + "d"
    } else if (hours >= 1) {
        return hours + "h"
    }
    return mins + "m"
}