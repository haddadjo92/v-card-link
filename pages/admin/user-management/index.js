import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Pagination, IconButton } from '@mui/material'
import _ from 'lodash'
import { toast } from 'react-toastify'
// *** api ***
import axiosClient from '@/api/axiosClient'
// *** hooks ***
import useDebounce from '@/hooks/useDebounce'
// *** components ***
import CustomCheckbox from '@/components/common/FormFields/CustomCheckbox'
import CustomButton from '@/components/common/FormFields/CustomButton'
import CustomInput from '@/components/common/FormFields/CustomInput'
import CustomSelect from '@/components/common/FormFields/CustomSelect'
// *** Icons ***
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
// *** styles ***
import styles from '@/assets/styles/__pages/admin/userManagement.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



const PAGE_SIZE_OPTIONS = [
  { name: 5, value: 5 },
  { name: 10, value: 10 },
  { name: 20, value: 20 },
  { name: 50, value: 50 },
  { name: 100, value: 100 },
]



export default function UserManagement() {
  const router = useRouter()
  const classes = useStyles()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [totalPageSize, setTotalPageSize] = useState()
  const [searchQuery, setSearchQuery] = useState("")

  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  // ****************** Callbacks ******************
  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value)
    setPage(1)
  }, [])
  const handlePageChange = useCallback((event, nextPage) => setPage(nextPage), [])
  const handleAddNewUser = useCallback(() => { router.push("/admin/new-user") }, [router])

  const handleCheckChange = useCallback((checkId, currentCheck) => {
    setLoading(true)

    axiosClient.post(`/api/management/${currentCheck ? "deActivateUser" : "activateUser"}?id=${checkId}`)
      .then(res => {
        const result = _.map(data, (props) => {
          if (props?.id === checkId) {
            return {
              ...props,
              active: !currentCheck
            }
          }

          return props
        })

        setData(result)
        toast.success(`User has been ${currentCheck ? "deactivated" : "activated"} successfully.`)
      })
      .catch(error => {
        console.log("error: ", error);
        toast.error(`Fail to ${currentCheck ? "deactivate" : "activate"} user.`)
      })
      .finally(() => setLoading(false))
  }, [data])

  const handleChangePageSize = useCallback((event) => setPageSize(event.target.value), [])


  const fetchData = useCallback((pageIndex, pageSize, searchQuery) => {
    setLoading(true)

    let URL = `/api/management/getAllUsersWithPaging?pageSize=${pageSize}&pageIndex=${pageIndex - 1}`
    if (searchQuery)
      URL = URL + `&searchQuery=${searchQuery}`

    axiosClient.get(URL)
      .then(res => {
        const totalPageSize = Math.ceil(res.data?.totalElements / pageSize)
        setTotalPageSize(totalPageSize)
        setData(res.data?.content)
      })
      .catch(error => {
        console.log("error: ", error);
        toast.error("Failed to get data for users management.")
      })
      .finally(() => setLoading(false))

  }, [])




  // ****************** Memos ******************
  const newUserBtnStartIcon = useMemo(() => <AddIcon />, [])
  const searchInputStartAdornment = useMemo(() => <SearchIcon />, [])
  const searchInputEndAdornment = useMemo(() => searchQuery ? (
    <IconButton size='small' onClick={() => setSearchQuery("")}>
      <CloseIcon sx={{ fontSize: 20 }} />
    </IconButton>
  ) : null, [searchQuery])

  // ****************** Side Effects ******************
  useEffect(() => {
    if (debouncedSearchQuery)
      return;

    fetchData(page, pageSize)
  }, [page, pageSize, debouncedSearchQuery])


  useEffect(() => {

    if (!debouncedSearchQuery)
      return;

    fetchData(page, pageSize, debouncedSearchQuery)
  }, [page, pageSize, debouncedSearchQuery])


  return (
    <div className={classes.userManagement}>
      <Container>
        <div className='content'>

          <Typography component='h1'>Users Management</Typography>

          <div className='top-section'>
            <CustomButton
              size='medium'
              innerText="New User"
              startIcon={newUserBtnStartIcon}
              onClick={handleAddNewUser}
            />


            <div className='right'>
              <CustomSelect
                name="pageSize"
                value={pageSize}
                placeholder="Page Size"
                options={PAGE_SIZE_OPTIONS}
                endAdornment
                margin="none"
                onChange={handleChangePageSize}
              />

              <CustomInput
                value={searchQuery}
                placeholder="Search"
                margin="none"
                startAdornment={searchInputStartAdornment}
                endAdornment={searchInputEndAdornment}
                onChange={handleSearch}
              />
            </div>

          </div>

          <TableContainer component={Paper} >
            <Table size="small" >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ maxWidth: 48 }}>#</TableCell>
                  {/* <TableCell>First Name</TableCell> */}
                  {/* <TableCell>Last Name</TableCell> */}
                  <TableCell>Email</TableCell>
                  {/* <TableCell>Phone Number</TableCell> */}
                  <TableCell>Is Active</TableCell>
                  <TableCell align="center">QR Code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <div className='loading-wrapper'>
                        <CircularProgress size={60} />
                      </div>
                    </TableCell>
                  </TableRow>
                ) :
                  data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <div className='no-data-presented'>
                          <div className='icon-wrapper'>
                            <ArchiveRoundedIcon />
                          </div>
                          <Typography>No Data</Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.map(({ id, firstName, lastName, email, phone, active, qrCodeId, username }, Idx) => (
                      <TableRow key={id}>
                        <TableCell component="th" scope="row" sx={{ maxWidth: 48 }}>{Idx + 1}</TableCell>
                        {/* <TableCell>{firstName}</TableCell> */}
                        {/* <TableCell>{lastName}</TableCell> */}
                        <TableCell>{email}</TableCell>
                        {/* <TableCell>
                        {Array.isArray(phone) && phone?.length > 0 ? (
                          <div className='phoneNumber'>
                            <span>{phone?.[0]?.phoneType?.type}</span>
                            <span>{phone?.[0]?.phoneNumber}</span>
                          </div>
                        ) : (
                          <div className='no-data'>No Data</div>
                        )}
                      </TableCell> */}

                        <TableCell align="center">
                          <div className='management-checks'>
                            <CustomCheckbox labelText="Active" checked={active} onChange={() => handleCheckChange(id, active)} />
                            <CustomCheckbox labelText="Inactive" checked={!active} onChange={() => handleCheckChange(id, active)} />
                          </div>
                        </TableCell>

                        <TableCell align="center" className='view-qr-code'>
                          <Link href={`/admin/user-management/${id}`}>
                            View
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}

              </TableBody>
            </Table>
          </TableContainer>

          <div className={classes.pagination}>
            <Pagination
              size="medium"
              page={page}
              count={totalPageSize}
              onChange={handlePageChange}
            />
          </div>


        </div>
      </Container>
    </div>
  )
}
