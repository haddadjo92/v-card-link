import { memo, useCallback, useMemo } from 'react'
import { useMediaQuery } from '@mui/material'
import DatePicker from "react-multi-date-picker";
// *** animations ***
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
// *** plugins ***
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
// *** components ***
import CustomInput from './CustomInput'
// *** Icons ***
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// *** styles ***
import styles from '@/assets/styles/__components/common/FormFields/CustomDatePicker.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)


function CustomDatePicker({ value, onChange, format, ...props }) {
    const classes = useStyles()    
    const isSmallScreen = useMediaQuery('(max-width: 991px)')    

    // ****************** Memos ******************
    const animations = useMemo(() => {
        return [
            opacity(),
            transition({ from: 10, transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)" }),
        ]
    }, [])

    const render = useCallback((value, openCalendar) => {
        const endAdornment = (
            <div style={{ display: "flex", marginRight: 10 }}>
                <CalendarMonthIcon />
            </div>
        )

        return (
            <CustomInput
                value={value}
                onFocus={openCalendar}
                endAdornment={endAdornment}
                {...props}
            />
        )
    }, [props])


    const plugins = useMemo(() => { return [<DatePickerHeader key="DatePickerHeader" />] }, [])


    return (
        <div className={classes.customDatePicker}>
            <DatePicker
                value={value}
                onChange={onChange}
                animations={animations}
                render={render}
                format={format}
                fixMainPosition
                {...(!isSmallScreen) && { plugins }}
            />
        </div>
    )
}

export default memo(CustomDatePicker)