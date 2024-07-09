import { memo, useCallback, useMemo } from 'react'
import { Chip, TextField, Autocomplete } from '@mui/material'
// *** styles ***
import styles from '@/assets/styles/__components/common/FormFields/CustomAutocompleteTags.styles'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
const useStyles = createUseStyles(styles)

function CustomAutocompleteTags({ name, options, value, labelText, placeholder, fullWidth, onChange, onBlur, ...props }) {
    const classes = useStyles()

    // ************* Callbacks *************
    const renderTags = useCallback((tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
            <Chip
                key={`chip-${index + 1}`}
                label={option.title}
                {...getTagProps({ index })}
            />
        ))
    }, [])


    const renderInput = useCallback((params) => {
        return (
            <TextField
                {...params}
                variant='filled'
                placeholder={placeholder}
                fullWidth
                onBlur={onBlur}
            />
        )
    }, [placeholder, onBlur])



    // ************* Memos *************
    const autocompleteClasses = useMemo(() => ({
        root: classes.customAutocompleteTagsRoot,
        popper: classes.customAutocompleteTagsPopper
    }), [classes.customAutocompleteTagsPopper, classes.customAutocompleteTagsRoot])


    const rootClassNames  =useMemo(() => {
        return classNames(classes.customAutocompleteTags, {
            "fullWidth": fullWidth
        })
    }, [classes.customAutocompleteTags, fullWidth])
    

    return (
        <div className={rootClassNames}>
            {labelText && <label>{labelText}</label>}
            <Autocomplete
                multiple
                fullWidth
                size='small'
                value={value}
                onChange={onChange}
                options={options}
                getOptionLabel={(option) => option.title}
                renderTags={renderTags}
                renderInput={renderInput}
                classes={autocompleteClasses}
                {...props}
            />
        </div>
    )
}

export default memo(CustomAutocompleteTags)











