import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { Container, Tabs, Box, Tab } from '@mui/material'
import { toast } from 'react-toastify'
import _ from 'lodash'
// *** api ***
import axiosClient from '@/api/axiosClient'
// *** redux ***
import { useSelector } from 'react-redux'
// *** utils ***
import FileToBase64 from '@/utils/fileToBase64'
// *** tabs ***
import Content from '@/components/user/pages/CustomizeProfile/Content'
import Design_Settings from '@/components/user/pages/CustomizeProfile/Design_Settings'
import QR_Code from '@/components/user/pages/CustomizeProfile/QR_Code'
// *** styles ***
import styles from '@/assets/styles/__pages/user/customizeProfile.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)


const socialLinksInitialState = {
    facebook: "", twitterX: "", instagram: "", tiktok: "", discord: "",
    snapchat: "", youtube: "", whatsapp: "", behance: "", threads: "",
    linkedin: "", dripple: "", pinterest: "", twitch: "", telegram: "",
}

const activeFieldsInitialState = {
    //----------- Section 1 ---------------
    fullName: true,
    title: true,
    position: true,
    companyName: true,
    email: true,
    mobileNumber: true,
    //----------- Section 2 ---------------
    aboutMe: true,
    description: true,
    addressLine: true,
    locationAddress: true,
    workingDays: true,
    workingHours: true,
    website: true,
}


const contentInitialValuesInitialState = {
    //----------- Section 1 ---------------
    fullName: "",
    title: "",
    position: "",
    companyName: "",
    email: "",
    mobileNumber: "",
    //----------- Section 2 ---------------
    aboutMe: "",
    description: "",
    addressLine: "",
    locationAddress: "",
    workingDays: [],
    workingHoursFrom: "",
    workingHoursTo: "",
    website: ""
}


function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}


function CustomTabPanel({ children, value, index, ...other }) {
    // ****************** Memos ******************
    const boxSX = useMemo(() => ({ pt: 3 }), [])

    return (
        <div
            id={`qr-${index}`}
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            <Box sx={boxSX}>{children}</Box>
        </div>
    );
}

export default function CustomizeProfile() {
    const classes = useStyles()
    const formRef = useRef()
    const [selectedTab, setSelectedTab] = useState(0)

    const authState = useSelector(state => state.auth)
    const userId = authState?.session?.id;

    // ===================== Content =====================
    const [contentIsLoading, setSetContentIsLoading] = useState(true)
    const [contentInitialValues, setContentInitialValues] = useState(contentInitialValuesInitialState)
    const [activeFields, setActiveFields] = useState(activeFieldsInitialState)
    const [socialLinkId, setSocialLinkId] = useState("")
    const [socialLinks, setSocialLinks] = useState(socialLinksInitialState)
    const [photoGallery, setPhotoGallery] = useState([])
    const [profilePicture, setProfilePicture] = useState(null)
    // ===================== QR_Code =====================
    const [qrColor, setQrColor] = useState("#000")
    const [qrImageFile, setQrImageFile] = useState(null)
    const [qrImage, setQrImage] = useState(null)
    const [qrImageDimensions, setQrImageDimensions] = useState({ width: 100, height: 100 })

    // ****************** Callbacks ******************
    const handleTabChange = useCallback((event, newValue) => { setSelectedTab(newValue); }, [])


    const handleSubmitContentSection = useCallback(({ fullName, ...values }, { setSubmitting, resetForm }) => {

        console.log("values: ", values);

        // 1) User info
        let firstName = "";
        let middleName = "";
        let lastName = "";
        const __fullName = String(fullName).split(" ");

        switch (__fullName.length) {
            case 1:
                firstName = __fullName[0];
                break;
            case 2:
                firstName = __fullName[0];
                middleName = __fullName[1];
                break;
            case 3:
                firstName = __fullName[0];
                middleName = __fullName[1];
                lastName = __fullName[2];
                break;
            default:
                break;
        }


        /**
         * Notes: 
         * 
         * 
         */
        const userInfo = {
            firstName,
            lastName,
            middleName,
            username: "string",
            email: values?.email,
            aboutMe: values?.aboutMe,
            phone: [
                {
                    id: 0, //! required
                    phoneNumber: values?.mobileNumber,
                    phoneTypeId: 0 //! required
                }
            ],
            title: values?.title,
            userAddress: {
                addressLine: values?.addressLine,
                location: values?.locationAddress
            },
            workInformation: {
                description: values?.description,
                workingHoursFrom: values?.workingHoursFrom,
                workingHoursTo: values?.workingHoursTo,
                webSite: values?.website,
                companyName: values?.companyName,
                position: values?.position,
                workAddress: { //! useless section
                    addressLine: "", //! (workAddress - addressLine) not on the Ui/Ux 
                    location: "" //! (workAddress - location) not on the Ui/Ux
                },
                worksDays: (Array.isArray(values?.workingDays) && values?.workingDays?.length > 0) ? _.map(values?.workingDays, ({ title: workday }) => String(workday).toUpperCase()) : []
            }
        }

        // -----------------------------------------------------------------------------
        // 2) Social Media
        // const socialMediaBody = _.filter(_.map(socialLinks, (fieldValue, fieldName) => fieldValue && ({ fieldValue, fieldName })), (value) => !!value)        
        // axiosClient.put(`/api/user-controller/updateUserSocialMedia?userId=${userId}`, socialMediaBody)
        //     .then(res => toast.success("Social Links was successfully saved."))
        //     .catch(error => {
        //         console.log("error: ", error);
        //         toast.error("Fail to save social links")
        //     })

        // -----------------------------------------------------------------------------
        // 3) photo gallery and profile picture



        // =============================================================================
        // =============================================================================
        // setSubmitting(true)
        // setTimeout(() => {
        //     console.log("values: ", values);
        //     console.log("formRef: ", formRef);
        //     console.log("socialLinks: ", socialLinks);
        //     console.log("photoGallery: ", photoGallery);
        //     console.log("profilePicture: ", profilePicture);
        //     setSubmitting(false)
        // }, 2000)        





    }, [socialLinks, userId])


    // ===================== Content =====================    
    const handleWorkingDaysChange = useCallback((event, newValue) => formRef.current.setFieldValue("workingDays", newValue), [])
    const handlePhotoGalleryChange = useCallback((imageList, addUpdateIndex) => { setPhotoGallery(imageList) }, [])
    const handleChangeSocialLinks = useCallback(() => { setSocialLinks(prevState => ({ ...prevState, [socialLinkId]: event.target.value })) }, [socialLinkId])
    const handleClickSocialBtn = useCallback((event) => {
        const id = event.target.getAttribute("data-id")
        setSocialLinkId(prevId => id === prevId ? "" : id)
    }, [])

    const handleToggleActiveField = useCallback((event) => {
        const fieldId = event.target.getAttribute("data-field-id")
        setActiveFields(prevState => ({ ...prevState, [fieldId]: !prevState[fieldId] }))
    }, [])


    const handleClickSetProfilePicture = useCallback((event) => {
        const imageId = event.target.getAttribute("data-image-id")
        setProfilePicture(prevImageId => (prevImageId === imageId) ? null : imageId)
    }, [])




    // ===================== Design/Settings =====================


    // ===================== QR Code =====================
    const handleQRColorChange = useCallback((color) => setQrColor(color.hex), [])
    const handleQRImageChange = useCallback((event) => {

        setQrImageFile(event?.target?.files[0])
        FileToBase64(event?.target?.files[0])
            .then(async res => setQrImage(res))
            .catch(error => console.log(error))
    }, [])

    const handleRemoveQRImage = useCallback(() => {
        setQrImageFile(null)
        setQrImage(null)
    }, [])


    const handleQrImageDimensionsChange = useCallback((event) => {
        const name = event.target.name;
        const value = event.target.value;
        const regex = /^[0-9]+$/;
        if (regex.test(value))
            setQrImageDimensions(prevState => ({ ...prevState, [name]: value }))

    }, [])


    // ****************** Memos ******************
    const boxSX = useMemo(() => ({ borderBottom: 1, borderColor: 'divider' }), [])


    // ****************** Side Effects ******************
    useEffect(() => {

        setSetContentIsLoading(true)

        axiosClient.get(`/api/user-controller/getProfile?userId=${userId}`)
            .then(res => {
                const data = res?.data

                console.log("data: ", data);

                const workingDays = [
                    "SUNDAY",
                    "MONDAY",
                    "TUESDAY"
                ]

                const workingDaysResult = _.map(workingDays, (weekday) => ({ title: `${String(weekday).charAt(0).toUpperCase()}${String(weekday).slice(1).toLocaleLowerCase()}` }))

                // User Info
                setContentInitialValues(prevState => ({
                    //----------- Section 1 ---------------
                    fullName: `${data?.firstName ? `${data?.firstName} ` : ""}${data?.middleName ? `${data?.middleName} ` : ""}${data?.lastName ? `${data?.lastName}` : ""}`,
                    title: data?.title ? data?.title : "",
                    position: data?.workInformation?.position ? data?.workInformation?.position : "",
                    companyName: data?.workInformation?.companyName ? data?.workInformation?.companyName : "",
                    email: data?.email ? data?.email : "",
                    mobileNumber: (Array.isArray(data?.phones) && data?.phones?.length > 0) ? data?.phones[0]?.phoneNumber : "",
                    //----------- Section 2 ---------------
                    aboutMe: data?.aboutMe ? data?.aboutMe : "",
                    description: data?.workInformation?.description,
                    addressLine: data?.address?.addressLine ? data?.address?.addressLine : "",
                    locationAddress: data?.address?.location,
                    workingDays: workingDaysResult,
                    workingHoursFrom: data?.workInformation?.workingHoursFrom,
                    workingHoursTo: data?.workInformation?.workingHoursTo,
                    website: data?.workInformation?.webSite,

                    //----------- TEST ---------------                                                                            
                    // workingDays: data?.workInformation?.workingDays,
                    // workingDays: _.map(workingDays, (weekday) => ({ title: `${String(weekday).charAt(0).toUpperCase()}${String(weekday).slice(1).toLocaleLowerCase()}` })),                                                            
                }), [])


                // Social Media Links
                if (Array.isArray(data?.socialMedia) && data?.socialMedia?.length > 0) {
                    const socialMediaArray = _.map(data?.socialMedia, ({ id, fieldName, fieldValue }) => ({ [fieldName]: fieldValue }))
                    const result = _.merge({}, ...socialMediaArray)

                    setSocialLinks(prevState => ({
                        ...prevState,
                        ...result
                    }))
                }


                // Photo Gallery

            })
            .catch(error => {
                console.log("error: ", error);
                toast.error("Fail to fetch user profile.")
            })
            .finally(() => setSetContentIsLoading(false))
    }, [userId])



    return (
        <div className={classes.customizeProfile}>
            <Container maxWidth={false} sx={{ maxWidth: 1366 }}>
                <div className='content'>

                    <Box sx={boxSX}>
                        <Tabs value={selectedTab} onChange={handleTabChange}>
                            <Tab label="Content" {...a11yProps(0)} />
                            <Tab label="Design/Settings" {...a11yProps(1)} />
                            <Tab label="QR Code" {...a11yProps(2)} />
                        </Tabs>
                    </Box>

                    <CustomTabPanel value={selectedTab} index={0}>
                        <Content
                            ref={formRef}
                            loading={contentIsLoading}
                            initialValues={contentInitialValues}
                            activeFields={activeFields}
                            socialLinkId={socialLinkId}
                            socialLinks={socialLinks}
                            profilePicture={profilePicture}
                            photoGallery={photoGallery}
                            onClickSocialBtn={handleClickSocialBtn}
                            onChangeSocialLinks={handleChangeSocialLinks}
                            onChangePhotoGallery={handlePhotoGalleryChange}
                            onClickSetProfilePicture={handleClickSetProfilePicture}
                            onToggleActiveField={handleToggleActiveField}
                            onWorkingDaysChange={handleWorkingDaysChange}
                            onSubmit={handleSubmitContentSection}
                        />
                    </CustomTabPanel>

                    <CustomTabPanel value={selectedTab} index={1}>
                        <Design_Settings />
                    </CustomTabPanel>

                    <CustomTabPanel value={selectedTab} index={2}>
                        <QR_Code
                            qrColor={qrColor}
                            qrImage={qrImage}
                            qrImageFile={qrImageFile}
                            qrImageDimensions={qrImageDimensions}
                            onQRColorChange={handleQRColorChange}
                            onQrImageDimensionsChange={handleQrImageDimensionsChange}
                            onQRImageChange={handleQRImageChange}
                            onRemoveQRImage={handleRemoveQRImage}
                        />
                    </CustomTabPanel>

                </div>
            </Container>
        </div>
    )
}
