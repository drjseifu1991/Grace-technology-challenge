const dateParser = (stringDate) => {
    try {
        const date = new Date(stringDate)
        const dateNumber = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
        const parsedDate = [dateNumber, month, date.getFullYear()].join('-')
        return parsedDate

    } catch (error) {
        console.log('')
    }
    
}

const timeParser = (stringDate) => {
    // check if incoming string date has time with it
    const hasTime = stringDate.includes('T');

    if(hasTime) {
        try {
            const date = new Date(stringDate)
            const hours = date.getHours()
            const minutes = date.getMinutes()
            const seconds = date.getSeconds()
            if(seconds) {
                return [hours, minutes, seconds].join(':')
            }
            else {
                return [hours, minutes].join(':')
            }
    
        } catch (error) {
            
        }
    }
    else {
        return null
    }
    
}

const noteParser = (note) => {
    // parse note and return
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}

module.exports = {dateParser, timeParser, noteParser}