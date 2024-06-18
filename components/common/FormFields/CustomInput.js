import { memo, useState, useCallback, useMemo } from 'react'
import { FormControl, FormLabel, FilledInput, FormHelperText, Stack, IconButton } from '@mui/material'
// *** Icons ***
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
// *** styles ***
import classNames from 'classnames'
import styles from '@/assets/styles/__components/common/FormFields/CustomInput.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)

function CustomInput({ name, value, type, labelText, placeholder, required, readOnly, disabled ,error, helperText, fullWidth, multiline, minRows, maxRows, margin, endAdornment, onChange, onFocus, onBlur, ...props }) {
  const classes = useStyles()

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = useCallback(() => { setShowPassword(prev => !prev) }, [])
  // ****************** Memos ******************
  const rootClassNames = useMemo(() => {
    return classNames(classes.customInput, {
      "multiline": !!multiline,
      "hasError": !!error,
      "marginNone": margin === "none",
      "marginDense": margin === "dense",
      "marginNormal": margin === "normal",
    })
  }, [classes.customInput, multiline, error, margin])


  const __endAdornment = useMemo(() => {
    return error ? (
      <Stack direction='row' alignItems="center" className='endAdornment'>
        {type === "password" ? (
          <IconButton disabled={disabled} onClick={toggleShowPassword}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        ) : endAdornment}
        <span className='warning-icon-wrapper'>
          <PriorityHighOutlinedIcon />
        </span>
      </Stack>
    ) : type === "password" ? (
      <IconButton disabled={disabled} onClick={toggleShowPassword}>
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    ) : endAdornment

  }, [type, error, disabled, showPassword, endAdornment, toggleShowPassword])


  return (
    <FormControl className={rootClassNames} error={error} fullWidth={fullWidth} disabled={disabled}>
      {labelText && <FormLabel>{required ? `${labelText} *` : labelText}</FormLabel>}

      <FilledInput
        type={type === "password" && !showPassword ? "password" : "text"}
        value={value}        
        name={name}
        placeholder={required ? `${placeholder} *` : placeholder}
        multiline={multiline}
        minRows={minRows}
        maxRows={maxRows}
        endAdornment={__endAdornment}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readOnly}
        {...props}
      />

      {helperText && <FormHelperText>{helperText}</FormHelperText>}

    </FormControl>
  )
}

export default memo(CustomInput)