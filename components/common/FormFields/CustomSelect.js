import { memo, useMemo } from 'react'
import { Stack, Select, FormControl, FormLabel, FormHelperText, InputLabel, MenuItem } from '@mui/material'
// *** Icons ***
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
// *** styles ***
import classNames from 'classnames'
import styles from '@/assets/styles/__components/common/FormFields/CustomSelect.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)

function CustomSelect({ name, value, labelText, placeholder, error, helperText, fullWidth, required, options, endAdornment, margin, onChange }) {
    const classes = useStyles()

    // ****************** Memos ******************
    const selectClasses = useMemo(() => { return { root: classes.customSelect } }, [classes.customSelect])
    const menuProps = useMemo(() => { return { classes: { paper: classes.menuPaper } } }, [classes.menuPaper])
    const formControlClasses = useMemo(() => {
        return classNames(classes.formControl, {
            "has-value": !!value,
            "has-error": !!error
        })
    }, [classes.formControl, value, error])

    const menuItemClasses = useMemo(() => {
        return {
            root: classes.menuItem,
            selected: classes.selectedMenuItem
        }
    }, [classes.menuItem, classes.selectedMenuItem])


    const rootClassNames = useMemo(() => {
        return classNames(classes.root, {
            "has-error": !!error,
            "marginNone": margin === "none",
            "marginDense": margin === "dense",
            "marginNormal": margin === "normal",
        })
    }, [classes.root, error, margin])


    const __endAdornment = useMemo(() => {

        return error ? (
            <Stack direction='row' alignItems="center" className='endAdornment'>
                <span className='warning-icon-wrapper'>
                    <PriorityHighOutlinedIcon />
                </span>
            </Stack>
        ) : endAdornment
    }, [endAdornment, error])


    return (
        <FormControl fullWidth={fullWidth} className={rootClassNames}>
            <FormLabel>{required ? `${labelText} *` : labelText}</FormLabel>
            <FormControl
                variant='filled'
                fullWidth={fullWidth}
                className={formControlClasses}
            >
                {placeholder && <InputLabel id={`${name}-label`}>{required ? `${placeholder} *` : placeholder}</InputLabel>}
                <Select
                    labelId={`${name}-label`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    classes={selectClasses}
                    label={labelText}
                    MenuProps={menuProps}
                    endAdornment={__endAdornment}
                >
                    {options?.map(({ name, value }) => (
                        <MenuItem classes={menuItemClasses} key={value} value={value}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default memo(CustomSelect)