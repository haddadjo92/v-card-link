import { memo, forwardRef, useEffect, useMemo, useRef } from 'react'
// *** styles ***
import classNames from 'classnames'
import styles from '@/assets/styles/__components/common/FormFields/CustomFileUpload.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



const CustomFileUpload = forwardRef(({ name, value, accept, disabled, margin, onChange }, ref) => {
    const classes = useStyles()
    const formRef = useRef(null)

    // ****************** Memos ******************
    const fileUploadClassNames = useMemo(() => {
        return classNames(classes.fileUpload, {
            "hasValue": !!value,
            "marginNone": margin === "dense",
            "marginDense": margin === "dense",
            "marginNormal": margin === "normal"
        })
    }, [classes.fileUpload, margin, value])

    // ****************** Side Effects ******************
    useEffect(() => {
        if(!value) {
            formRef.current.reset()
        }        
    }, [value])


    return (
        <div className={fileUploadClassNames}>
            <form ref={formRef} name={name} value={value} onChange={onChange}>
                <div className="file-upload-wrapper" data-text={value?.name ? value?.name : "Select file"}>
                    <input {...(accept) && { accept }} ref={ref} name="file-upload-field" type="file" className="file-upload-field" disabled={disabled} />
                </div>
            </form>
        </div>
    )
})


CustomFileUpload.displayName = "CustomFileUpload"
export default memo(CustomFileUpload)