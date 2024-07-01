import Link from 'next/link'
import { useMemo } from 'react';
import { Typography } from '@mui/material'
import _ from 'lodash'
// *** common ***
import socialIcons from './common/socialIcons'
// *** Icons ***
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import PublicIcon from '@mui/icons-material/Public';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// *** styles ***
import { Template3Styles } from '@/assets/styles/__pages/client/template.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(Template3Styles)

export default function Template3() {
    const classes = useStyles()

    return (
        <div className={classes.template3}>

        </div>
    )
}