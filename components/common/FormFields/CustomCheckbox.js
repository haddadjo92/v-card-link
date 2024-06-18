import { memo, useMemo } from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'

function CustomCheckbox({ labelText, checked, controlProps, ...props }) {
    // ****************** Memos ******************
    const control = useMemo(() => <Checkbox color="default" checked={checked} {...controlProps} />, [controlProps, checked])
    return <FormControlLabel control={control} label={labelText} {...props} />
}

export default memo(CustomCheckbox)