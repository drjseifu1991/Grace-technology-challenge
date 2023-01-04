const parser = (data) => {
    let date = ''
    let time = ''
    let note = ''
    const arrayData = data.split(',');

    if(arrayData.length === 3) {
        date = dateParser(arrayData[0])
        time = arrayData[1]
        note = noteParser(arrayData[2])
        return {
            date, time, note
        }
    }
    else {
        date = dateParser(arrayData[0])
        note = noteParser(arrayData[1])
        return {
            date, note
        }
    }
}


const dateParser = (stringDat) => {
    return new Date(stringDat)
}

const timeParser = (stringDate) => {
    const timeArray = ''
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
    return note.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}

module.exports = {parser}