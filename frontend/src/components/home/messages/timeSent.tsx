import React, { useEffect, useState } from "react";

interface props {
    timeMsgSent: string
    timePrevMsgSent: string | null
}

const TimeSent: React.FC<props> = (props) => {
    const [greaterThanOneHour, setGreaterThanOneHour] = useState<boolean>(true);
    const [date, setDate] = useState<string>();

    useEffect(() => {
        //console.log("timeMsgSent: " + props.timeMsgSent + '\n' + "timePrevMsgSent: " + props.timePrevMsgSent)

        if (props.timePrevMsgSent) {
            const difference = Date.parse(props.timeMsgSent) - Date.parse(props.timePrevMsgSent);

            const hours = Math.floor(difference / 3.6e+6);

            if (hours <= 1) setGreaterThanOneHour(false); 
        }
        // Put date in string
        const date = new Date(props.timeMsgSent);

        const weekdays = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
        const weekday = weekdays[date.getDay()];
        
        const month = date.toLocaleString('default', { month: 'short' });

        const dayNum = date.getDate();
        const day = dayNum.toString() + nth(dayNum);

        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        
        setDate(weekday + ", " + month + " " + day + " at " + time);
    }, [])

    const nth = (d: number) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
    }

    if (greaterThanOneHour) 
        return (
            <div>
                {date}
            </div>
        )
    return null
}
export default TimeSent