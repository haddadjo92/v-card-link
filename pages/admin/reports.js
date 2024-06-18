import { useState, useCallback, useMemo } from 'react'
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, Fade, Box, CircularProgress } from '@mui/material'
// *** components ***
import CustomSelect from '@/components/common/FormFields/CustomSelect'
import CustomDatePicker from '@/components/common/FormFields/CustomDatePicker'
import CustomButton from '@/components/common/FormFields/CustomButton'
// *** Icons ***
import SearchIcon from '@mui/icons-material/Search'
// *** styles ***
import styles from '@/assets/styles/__pages/admin/reports.styles.js'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



const reportOptions = [
  { name: "Number of visitors", value: "numOfVisitors" },
  { name: "Number of users", value: "numOfUsers" }
]


const userOptions = [
  { name: "Username1", value: "username1" },
  { name: "Username2", value: "username2" },
  { name: "Username3", value: "username3" },
  { name: "Username4", value: "username4" },
]



const visitorsThead = [
  { id: 1, title: "#", align: "left" },
  { id: 1, title: "Username", align: "left" },
  { id: 2, title: "From Date", align: "left" },
  { id: 3, title: "To Date", align: "left" },
  { id: 4, title: "Number of Profile Visits", align: "left" },
]

const usersThead = [
  { id: 1, title: "#", align: "left" },
  { id: 1, title: "From Date", align: "left" },
  { id: 2, title: "To Date", align: "left" },
  { id: 3, title: "Number of Users", align: "left" },
]





export default function Reports() {
  const classes = useStyles()
  const [reportType, setReportType] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState("")
  const [fromVisitorsDate, setFromVisitorsDate] = useState("")
  const [toVisitorsDate, setToVisitorsDate] = useState("")
  const [fromUsersDate, setFromUsersDate] = useState("")
  const [toUsersDate, setToUsersDate] = useState("")
  const [tableDate, setTableDate] = useState([])
  const [tableIsVisible, setTableIsVisible] = useState(false)




  // ****************** Callbacks ******************  
  const handleUserSelectChange = useCallback((event) => { setSelectedUser(event.target.value) }, [])
  const handleFromVisitorsDateChange = useCallback((value) => { setFromVisitorsDate(value) }, [])
  const handleToVisitorsDateChange = useCallback((value) => { setToVisitorsDate(value) }, [])
  const handleFromUsersDateChange = useCallback((value) => { setFromUsersDate(value) }, [])
  const handleToUsersDateChange = useCallback((value) => { setToUsersDate(value) }, [])

  const handleReportSelectChange = useCallback((event) => {

    setReportType(event.target.value)
    setTableDate([])
    setTableIsVisible(false)
  }, [])


  const handleSearch = useCallback(() => {

    setLoading(true)

    setTimeout(() => {

      if (reportType === "numOfVisitors")
        setTableDate([{ id: 1, username: "Username2", fromDate: "06/05/2024", toDate: "30/05/2024", numOfProfileVisitors: "17" }])
      else setTableDate([{ id: 1, fromDate: "20/06/2022", toDate: "10/04/2023", numOfUsers: "17" }])

      setLoading(false)
      setTableIsVisible(true)
    }, 2000)



  }, [reportType])



  // ****************** Memos ******************
  const searchBtnStartIcon = useMemo(() => { return loading ? <CircularProgress size={20} /> : <SearchIcon /> }, [loading])
  const thead = useMemo(() => reportType === "numOfVisitors" ? visitorsThead : usersThead, [reportType])


  return (
    <div className={classes.reports}>
      <Container>
        <div className='content'>

          <section className='top-section'>
            <Typography component='h1'>Reports</Typography>
            <CustomButton
              size="large"
              innerText="Search"
              disabled={loading}
              startIcon={searchBtnStartIcon}
              onClick={handleSearch}
            />
          </section>


          <Grid container spacing={5}>
            <Grid item md={6}>
              <CustomSelect
                labelText="Select Report"
                placeholder="Select a Report"
                name="report"
                margin="normal"
                value={reportType}
                options={reportOptions}
                onChange={handleReportSelectChange}
                fullWidth
              />


              <Fade in={reportType === "numOfVisitors"} timeout={1000}>
                <Box>
                  {reportType === "numOfVisitors" && (
                    <CustomSelect
                      labelText="Select User"
                      placeholder="Select a Specific User"
                      name="user"
                      margin="normal"
                      value={selectedUser}
                      options={userOptions}
                      onChange={handleUserSelectChange}
                      fullWidth
                    />
                  )}
                </Box>
              </Fade>



              <Fade in={reportType === "numOfUsers"} timeout={1000}>
                <Box>
                  {reportType === "numOfUsers" && (
                    <CustomDatePicker
                      value={fromUsersDate}
                      onChange={handleFromUsersDateChange}
                      labelText="From Date"
                      placeholder="Select from date.."
                      fullWidth
                      margin="normal"
                    />
                  )}
                </Box>
              </Fade>


              <Fade in={reportType === "numOfUsers"} timeout={1000}>
                <Box>
                  {reportType === "numOfUsers" && (
                    <CustomDatePicker
                      value={toUsersDate}
                      onChange={handleToUsersDateChange}
                      labelText="To Date"
                      placeholder="Select to date.."
                      fullWidth
                      margin="normal"
                    />
                  )}
                </Box>
              </Fade>


            </Grid>
            <Grid item md={6}>

              <Fade in={reportType === "numOfVisitors"} timeout={1000}>
                <Box>
                  {reportType === "numOfVisitors" && (
                    <CustomDatePicker
                      value={fromVisitorsDate}
                      onChange={handleFromVisitorsDateChange}
                      labelText="From Date"
                      placeholder="Select from date.."
                      fullWidth
                      margin="normal"
                    />
                  )}
                </Box>
              </Fade>


              <Fade in={reportType === "numOfVisitors"} timeout={1000}>
                <Box>
                  {reportType === "numOfVisitors" && (
                    <CustomDatePicker
                      value={toVisitorsDate}
                      onChange={handleToVisitorsDateChange}
                      labelText="To Date"
                      placeholder="Select to date.."
                      fullWidth
                      margin="normal"
                    />
                  )}
                </Box>
              </Fade>


            </Grid>
          </Grid>


          <hr className='separator' />


          {tableIsVisible && (
            <TableContainer component={Paper} className='table-container'>
              <Table size="small" >
                <TableHead>

                  <TableRow>
                    {thead.map(({ id, title, align }) => <TableCell key={`table-cell-${id}`} align={align}>{title}</TableCell>)}
                  </TableRow>

                </TableHead>
                <TableBody>

                  {reportType === "numOfVisitors" && (
                    tableDate?.map(({ id, username, fromDate, toDate, numOfProfileVisitors }, Idx) => (
                      <TableRow key={id}>
                        <TableCell component="th" scope="row">{Idx + 1}</TableCell>
                        <TableCell>{username}</TableCell>
                        <TableCell>{fromDate}</TableCell>
                        <TableCell>{toDate}</TableCell>
                        <TableCell>{numOfProfileVisitors}</TableCell>
                      </TableRow>
                    )))}


                  {reportType === "numOfUsers" && (
                    tableDate?.map(({ id, fromDate, toDate, numOfUsers }, Idx) => (
                      <TableRow key={id}>
                        <TableCell component="th" scope="row">{Idx + 1}</TableCell>
                        <TableCell>{fromDate}</TableCell>
                        <TableCell>{toDate}</TableCell>
                        <TableCell>{numOfUsers}</TableCell>
                      </TableRow>
                    )))}

                </TableBody>
              </Table>
            </TableContainer>
          )}


        </div>
      </Container>
    </div>
  )
}

