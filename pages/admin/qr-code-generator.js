import { useState, useCallback, useMemo } from 'react'
import { Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, CircularProgress, Tabs, Box, Tab } from '@mui/material'
// *** components ***
import CustomInput from '@/components/common/FormFields/CustomInput'
import ConfirmDialog from '@/components/common/confirmDialog'
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
  // ****************** Memos ******************
  const boxSX = useMemo(() => ({ p: 3 }), [])

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
