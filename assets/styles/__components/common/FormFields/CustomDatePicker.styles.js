import { Poppins } from 'next/font/google'
const poppins400 = Poppins({ weight: '400', subsets: ['latin'] })

const CustomDatePickerStyles = {
    customDatePicker: {
        "& *:not(:nth-child(1))": {
            ...poppins400.style,
            lineHeight: "normal"
        },
        "& .rmdp-container ": {
            width: "100%",
            "& .rmdp-header-plugin": {
                backgroundColor: "#333"
            },
            "& .rmdp-day.rmdp-selected span:not(.highlight)": {
                backgroundColor: "#333",
                color: "#fff"
            },
            "& .rmdp-day.rmdp-today span": {
                backgroundColor: "#eee",
                color: "#333",
            },
            "& .rmdp-week-day": {
                color: "#333",
            },
            "& .rmdp-arrow": {
                borderColor: "#333",
            },
            "& .rmdp-arrow-container:hover": {
                backgroundColor: "#000",
                "& .rmdp-arrow": {
                    borderColor: "#fff"
                }
            },
            "& .rmdp-day:not(.rmdp-disabled,.rmdp-day-hidden) span:hover": {
                backgroundColor: "#888",
                color: "#eee",
            }
        },
    }
}


export default CustomDatePickerStyles