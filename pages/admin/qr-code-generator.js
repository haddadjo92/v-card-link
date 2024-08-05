import { useState, useCallback, useMemo } from 'react'
import { Container, Typography, Tabs, Box, Tab, useMediaQuery } from '@mui/material'
// *** tabs ***
import GenerateNewQR from '@/components/admin/pages/QrCodeGenerator/generateNewQR'
import GeneratedQRs from '@/components/admin/pages/QrCodeGenerator/GeneratedQRs'
// *** styles ***
import styles from '@/assets/styles/__pages/admin/qrCodeGenerator.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)




function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}


function CustomTabPanel({ children, value, index, ...other }) {    
  const isSmallScreen = useMediaQuery('(max-width: 991px)')

  // ****************** Memos ******************
  const boxSX = useMemo(() => ({ p: isSmallScreen ? 1 : 3 }), [isSmallScreen])

  return (
    <div role="tabpanel" hidden={value !== index} id={`qr-${index}`} {...other}>
      {value === index && <Box sx={boxSX}>{children}</Box>}
    </div>
  );
}



export default function QrCodeGenerator() {
  const classes = useStyles()
  const [selectedTab, setSelectedTab] = useState(0)  

  // ****************** Callbacks ******************
  const handleTabChange = useCallback((event, newValue) => { setSelectedTab(newValue); }, [])

  // ****************** Memos ******************
  const boxSX = useMemo(() => ({ borderBottom: 1, borderColor: 'divider' }), [])



  return (
    <div className={classes.qrCodeGenerator}>
      <Container>
        <div className='content'>

          <Typography component="h1">QR Code Generator</Typography>

          <Box sx={boxSX}>
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label="Generate New QR" {...a11yProps(0)} />
              <Tab label="Generated QR's" {...a11yProps(1)} />
            </Tabs>
          </Box>
          
          <CustomTabPanel value={selectedTab} index={0}>
            <GenerateNewQR />
          </CustomTabPanel>

          <CustomTabPanel value={selectedTab} index={1}>
            <GeneratedQRs />
          </CustomTabPanel>

        </div>
      </Container>
    </div>
  )
}
