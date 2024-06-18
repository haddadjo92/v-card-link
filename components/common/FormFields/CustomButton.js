import { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress } from '@mui/material'
// *** styles ***
import styles from '@/assets/styles/__components/common/FormFields/CustomButton.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)

function CustomButton({ type = "button", size = "medium", innerText, loading, startIcon, fullWidth, disabled, onClick, ...props }) {
  const classes = useStyles()

  // ****************** Memos ******************
  const buttonStartIcon = useMemo(() => { return loading ? <CircularProgress className='loading-progress' size={size === "large" ? 20 : size === "medium" ? 18 : 16} /> : startIcon }, [loading, startIcon, size])
  const buttonClasses = useMemo(() => { return { root: classes.buttonRoot } }, [classes.buttonRoot])

  return (
    <Button
      type={type}
      size={size}
      variant='contained'
      startIcon={buttonStartIcon}
      classes={buttonClasses}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {innerText}
    </Button>
  )
}


CustomButton.propTypes = {
  size: PropTypes.oneOf(["large", "medium", "small"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  innerText: PropTypes.string,
  loading: PropTypes.bool,
  startIcon: PropTypes.object,
  onClick: PropTypes.func
}

export default memo(CustomButton)