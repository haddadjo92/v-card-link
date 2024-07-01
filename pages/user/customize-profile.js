import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { Container, Tabs, Box, Tab } from '@mui/material'
import { toast } from 'react-toastify'
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
    workingDays: "",
    workingHoursFrom: "",
    website: "",
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

    const { session: { id: userId } } = useSelector(state => state.auth)

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


    const handleSubmitContentSection = useCallback((values, { setSubmitting }) => {
        console.log("values: ", values);
        console.log("formRef: ", formRef);
        console.log("socialLinks: ", socialLinks);
        console.log("photoGallery: ", photoGallery);
        console.log("profilePicture: ", profilePicture);


    }, [formRef, socialLinks, photoGallery, profilePicture])


    // ===================== Content =====================
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

                setContentInitialValues(prevState => ({
                    ...prevState,
                    //----------- Section 1 ---------------
                    fullName: `${data?.firstName ? data?.firstName : ""}${" "}${data?.middleName ? data?.middleName : ""}${" "}${data?.lastName ? data?.lastName : ""}`,
                    title: data?.title,
                    // position: data?.position //! Not presented.,
                    // companyName: "", //! Not presented.
                    email: data?.email,
                    mobileNumber: (Array.isArray(data?.phones) && data?.phones > 0) ? data?.phones[0]?.phoneNumber : "",
                    //----------- Section 2 ---------------
                    // aboutMe: "",//! about me is not presented.
                    description: data?.workInformation?.description,
                    addressLine: data?.userAddress?.addressLine,
                    locationAddress: data?.userAddress?.location,
                    workingDays: data?.workInformation?.workingDays, //! Frontend should handle this by changing the field of 'workingDays' from textfield to textfield tags.,
                    workingHoursFrom: "", //! There's one field "workingHours" inside workInformation,, I need the 'workingHoursFrom' AND 'workingHoursTo'.
                    website: data?.workInformation?.webSite,
                }), [])

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
