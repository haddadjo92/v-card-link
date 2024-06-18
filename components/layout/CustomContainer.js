import { memo, useMemo } from 'react'
import { Container } from '@mui/material'

function CustomContainer({ children, disablePadding }) {
    // ************** Memos *******************
    const containerSX = useMemo(() => { return { maxWidth: 1366, px: disablePadding ? 0 : 6 } }, [disablePadding])

    return (
        <Container maxWidth={false} sx={containerSX} disableGutters>
            {children}
        </Container>
    )
}

export default memo(CustomContainer)