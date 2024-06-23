import { memo, useMemo } from 'react';
import PropTypes from "prop-types"
import { Button, Dialog, Typography } from "@mui/material";
// *** styles ***
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import ConfirmDialogStyles from '@/assets/styles/__components/common/ConfirmDialog.styles';
const useStyles = createUseStyles(ConfirmDialogStyles);


function ConfirmDialog({ open, title, content, variant = "danger", resolveBtnText = "Ok", rejectBtnText = "Cancel", onClose, onResolve, onReject }) {
    const classes = useStyles();

    // ************* Memos *************
    const dialogClasses = useMemo(() => { return { paper: classNames(classes.dialogRoot, variant) } }, [classes.dialogRoot, variant])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={dialogClasses}
        >
            <Typography className='title'>{title}</Typography>

            <Typography className='content'>
                {content}
            </Typography>

            <hr className='separator' />

            <div className="actions">
                <Button variant='contained' onClick={onReject}>{resolveBtnText}</Button>
                <Button variant='contained' onClick={onResolve}>{rejectBtnText}</Button>                
            </div>
        </Dialog>
    )
}


ConfirmDialog.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    variant: PropTypes.oneOf(["success", "danger"]),
    resolveBtnText: PropTypes.string,
    rejectBtnText: PropTypes.string,
}

export default memo(ConfirmDialog)