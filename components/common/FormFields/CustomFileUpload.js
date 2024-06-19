import { memo, forwardRef, useMemo } from 'react'
// *** styles ***
import classNames from 'classnames'
import styles from '@/assets/styles/__components/common/FormFields/CustomFileUpload.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



const CustomFileUpload = forwardRef(({ name, value, disabled, margin, onChange }, ref) => {
    const classes = useStyles()

    // ****************** Memos ******************
    const fileUploadClassNames = useMemo(() => {
        return classNames(classes.fileUpload, {
            "hasValue": !!value,
            "marginNone": margin === "dense",
            "marginDense": margin === "dense",
            "marginNormal": margin === "normal"
        })
    }, [classes.fileUpload, margin, value])


    return (
        <div className={fileUploadClassNames}>
            <form name={name} value={value} onChange={onChange}>
                <div className="file-upload-wrapper" data-text={value?.name ? value?.name : "Select file"}>
                    <input ref={ref} name="file-upload-field" type="file" className="file-upload-field" disabled={disabled} />
                </div>
            </form>
        </div>
    )
})


CustomFileUpload.displayName = "CustomFileUpload"
export default memo(CustomFileUpload)