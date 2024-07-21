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



const activeFieldsBackendKeys = {
    //----------- Section 1 ---------------
    fullName: {
        key: "firstName,middleName,lastName",
        section: "default"
    },
    title: {
        key: "title",
        section: "default"
    },
    position: {
        key: "position",
        section: "workInfo"
    },
    companyName: {
        key: "companyName",
        section: "workInfo"
    },
    email: {
        key: "email",
        section: "default"
    },
    mobileNumber: {
        key: "phone",
        section: "default"
    },
    //----------- Section 2 ---------------
    aboutMe: {
        key: "aboutMe",
        section: "default"
    },
    description: {
        key: "description",
        section: "workInfo"
    },
    addressLine: {
        key: "addressLine",
        section: "default"
    },
    locationAddress: {
        key: "location",
        section: "default"
    },
    workingDays: {
        key: "worksDays",
        section: "workInfo"
    },
    workingHours: {
        key: "workingHoursFrom,workingHoursTo",
        section: "workInfo"
    },
    website: {
        key: "webSite",
        section: "workInfo"
    },
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
    website: "",
    //----------- Extra attributes ---------------
    phoneId: null
}

const themeColorsInitialState = {
    selectedTemplate: "",
    primaryColor: "#ED7A7A",
    secondaryColor: "#3AD853",
    textAndIconColor: "#25E0D5"
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
    const [deletedPhotoGalleryIds, setDeletedPhotoGalleryIds] = useState([])
    const [profilePicture, setProfilePicture] = useState(null)
    const [profilePictureIsDeleted, setProfilePictureIsDeleted] = useState(false)
    // ===================== Design_Settings =====================
    const [themeColors, setThemeColors] = useState(themeColorsInitialState)

    // ===================== QR_Code =====================
    const [qrColor, setQrColor] = useState("#000")
    const [qrImageFile, setQrImageFile] = useState(null)
    const [qrImage, setQrImage] = useState(null)
    const [qrImageDimensions, setQrImageDimensions] = useState({ width: 100, height: 100 })

    // ****************** Callbacks ******************
    const handleTabChange = useCallback((event, newValue) => { setSelectedTab(newValue); }, [])


    const handleSubmitContentSection = useCallback(({ fullName, ...values }, { setSubmitting, resetForm }) => {
        setSubmitting(true)


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

        let hiddenData = ""
        let workInformationHiddenData = "";

        Object.entries(activeFields).map(([key, value], Idx) => {
            const backendKey = activeFieldsBackendKeys[key].key
            const backendSection = activeFieldsBackendKeys[key].section

            if (!value) {
                if (backendSection === "workInfo")
                    workInformationHiddenData = String(workInformationHiddenData).concat(`${backendKey},`)
                else
                    hiddenData = String(hiddenData).concat(`${backendKey},`)
            }
        })


        const userInfo = {
            firstName,
            lastName,
            middleName,
            username: values?.email,
            email: values?.email,
            aboutMe: values?.aboutMe,
            hiddenData,
            ...(values?.phoneId) && {
                phone: [
                    {
                        id: values?.phoneId,
                        phoneNumber: values?.mobileNumber,
                        phoneTypeId: 1000
                    }
                ],
            },
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
                hiddenData: workInformationHiddenData,
                workAddress: {
                    addressLine: null,
                    location: null
                },
                worksDays: (Array.isArray(values?.workingDays) && values?.workingDays?.length > 0) ? _.map(values?.workingDays, ({ title: workday }) => String(workday).toUpperCase()) : []
            }
        }

        // 1) User Info
        // -----------------------------------------------------------------------------
        axiosClient.put(`/api/user-controller/updateUserProfile?id=${userId}`, userInfo)
            .then(res => toast.success("User Info was successfully updated."))
            .catch(error => {
                console.log("error: ", error);
                toast.error("Fail to update user info")
            })
            .finally(() => setSubmitting(false))



        // 2) Social Media
        // -----------------------------------------------------------------------------        
        const socialMediaBody = _.filter(_.map(socialLinks, (fieldValue, fieldName) => fieldValue && ({ fieldValue, fieldName })), (value) => !!value)
        axiosClient.put(`/api/user-controller/updateUserSocialMedia?userId=${userId}`, socialMediaBody)
            .then(res => toast.success("Social Links was successfully saved."))
            .catch(error => {
                console.log("error: ", error);
                toast.error("Fail to save social links")
            })



        // 3) profile picture
        // -----------------------------------------------------------------------------
        // upload profile picture
        if (Array.isArray(profilePicture) && profilePicture?.length === 1) {

            const formData = new FormData()
            const headers = { contentType: "multipart/form-data" }
            formData.append("imageFile", profilePicture[0]?.file)

            axiosClient.post(`/api/images/updateUserImage`, formData, { headers, params: { userId } })
                .then(res => toast.success("Profile picture was successfully updated."))
                .catch(error => {
                    console.log("error: ", error);
                    toast.error("Fail to update profile picture.")
                })
        }



        // delete profile picture
        if (profilePictureIsDeleted) {
            axiosClient.delete("/api/images/deleteProfileImage", { params: { userId } })
                .then(res => toast.success("Profile Image was successfully deleted."))
                .catch(error => {
                    console.log("error: ", error);
                    toast.error("Fail to delete profile image.")
                })
        }

        // 4) photo gallery and profile picture
        // -----------------------------------------------------------------------------
        // upload photo gallery images
        const imagesWithFiles = _.filter(photoGallery, (item) => !!item?.file)
        if (imagesWithFiles?.length > 0) {
            const formData = new FormData()
            imagesWithFiles.map(({ file }) => formData.append("imageFile", file))

            const headers = { contentType: "multipart/form-data" }

            axiosClient.put(`/api/images/addUserImages`, formData, { headers, params: { userId } })
                .then(res => {
                    console.log("res: ", res);
                    toast.success("new photoGallery images was successfully added.")
                })
                .catch(error => {
                    console.log("error: ", error);
                    toast.error("Fail to add new photoGallery images.")
                })
        }

        // Delete photo gallery images
        if (Array.isArray(deletedPhotoGalleryIds) && deletedPhotoGalleryIds?.length > 0) {
            axiosClient.delete('/api/images/deleteProfileImages', { data: deletedPhotoGalleryIds })
                .then(res => {
                    console.log("res: ", res);
                    toast.success("Images marked as delete on photoGallery was successfully deleted.")
                })
                .catch(error => {
                    console.log("error: ", error);
                    toast.error("Fail to delete marked images on photoGallery.")
                })
        }
    }, [activeFields, deletedPhotoGalleryIds, photoGallery, profilePicture, profilePictureIsDeleted, socialLinks, userId])


    const handleDeleteImage = useCallback((imageId) => {

        if (imageId === "profile-image")
            setProfilePictureIsDeleted(true)
        else setDeletedPhotoGalleryIds(prevState => ([...prevState, imageId]))
    }, [])

    // ===================== Content =====================    
    const handleWorkingDaysChange = useCallback((event, newValue) => formRef.current.setFieldValue("workingDays", newValue), [])
    const handleChangeProfilePicture = useCallback((imageList, addUpdateIndex) => setProfilePicture(imageList), [])
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


    // ===================== Design/Settings =====================
    const handleSelectTemplate = useCallback((event) => setThemeColors(prevState => ({ ...prevState, selectedTemplate: event.target.getAttribute("data-template-id") })), [])
    const handleTemplateThemeColorChange = useCallback((id, color) => setThemeColors(prevState => ({ ...prevState, [id]: color })), [])

    const handleSaveDesignSettings = useCallback(() => {

        const body = {
            templateName: themeColors.selectedTemplate,
            primaryColor: themeColors.primaryColor,
            secondaryColor: themeColors.secondaryColor,
            iconColor: themeColors.textAndIconColor
        }


        if (!themeColors.selectedTemplate)
            toast.warn("Please select template before continue.")
        else {

            axiosClient.put(`/api/social-media/updateUserTemplateDesign?userId=${userId}`, body)
                .then(res => {
                    console.log("res: ", res);
                    toast.success("Design/settings configurations has been updated successfully.")
                })
                .catch(error => {
                    console.log("error: ", error);
                    toast.error("Fail to update design/settings configurations")
                })
        }

    }, [themeColors, userId])


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


    const handleSaveQRCodeTab = useCallback(() => {

        const headers = {
            "Content-type": "multipart/form-data"
        }
        const formData = new FormData();

        if (qrImageFile)
            formData.append("image", qrImageFile)

        formData.append("name", "")
        formData.append("qrCodeUrl", `${window.location.origin}/qr/${userId}`)
        formData.append("high", qrImageDimensions.height)
        formData.append("width", qrImageDimensions.width)
        formData.append("color", qrColor)

        axiosClient.put(`/api/social-media/updateQRCode?userId=${userId}`, formData, { headers })
            .then(() => toast.success("Your QR Customization has been successfully saved."))
            .catch(error => {
                console.log("error: ", error);
                toast.error("Fail to save QR Customization.")
            })

    }, [qrColor, qrImageDimensions.height, qrImageDimensions.width, qrImageFile, userId])

    // ****************** Memos ******************
    const boxSX = useMemo(() => ({ borderBottom: 1, borderColor: 'divider' }), [])


    const templateData = {
        avatar: profilePicture?.[0]?.dataURL || "https://ssl.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png",
        fullName: activeFields.fullName ? formRef?.current?.getFieldProps("fullName")?.value : "",
        title: activeFields.title ? formRef?.current?.getFieldProps("title")?.value : "",
        position: activeFields.position ? formRef?.current?.getFieldProps("position")?.value : "",
        companyName: activeFields.companyName ? formRef?.current?.getFieldProps("companyName")?.value : "",
        contact: {
            email: activeFields.email ? formRef?.current?.getFieldProps("email")?.value : "",
            mobile: activeFields.mobileNumber ? formRef?.current?.getFieldProps("mobileNumber")?.value : "",
            addressLine: activeFields.addressLine ? formRef?.current?.getFieldProps("addressLine")?.value : "",
            locationAddress: activeFields.locationAddress ? formRef?.current?.getFieldProps("locationAddress")?.value : ""
        },
        aboutMe: activeFields.aboutMe ? formRef?.current?.getFieldProps("aboutMe")?.value : "",
        description: activeFields.description ? formRef?.current?.getFieldProps("description")?.value : "",
        workingDays: activeFields.workingDays ? _.map(formRef?.current?.getFieldProps("workingDays")?.value, 'title').join(', ') : "",
        workingHours: {
            from: activeFields.workingHours ? formRef?.current?.getFieldProps("workingHoursFrom")?.value : "",
            to: activeFields.workingHours ? formRef?.current?.getFieldProps("workingHoursTo")?.value : ""
        },
        website: activeFields.website ? formRef?.current?.getFieldProps("website")?.value : "",
        socialLinks: _.pickBy(socialLinks, value => value),
        photoGallery: _.map(photoGallery, ({ dataURL }) => dataURL),
        templateDesign: {
            templateName: themeColors.selectedTemplate,
            primaryColor: themeColors.primaryColor,
            secondaryColor: themeColors.secondaryColor,
            iconColor: themeColors.textAndIconColor
        }
    }


    // ****************** Side Effects ******************
    useEffect(() => {

        if (userId) {

            setSetContentIsLoading(true)

            // ===================== Content =====================    
            axiosClient.get(`/api/user-controller/getProfile?userId=${userId}`)
                .then(res => {
                    const data = res?.data
                    const workingDaysResult = Array.isArray(data?.workInformation?.workingDay) ? _.map(data?.workInformation?.workingDay, ({ id, dayOfWeek }) => ({ title: `${String(dayOfWeek).charAt(0).toUpperCase()}${String(dayOfWeek).slice(1).toLocaleLowerCase()}` })) : []

                    // User Info
                    setContentInitialValues(prevState => ({
                        ...prevState,
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
                        //----------- Extra attributes ---------------
                        phoneId: (Array.isArray(data?.phones) && data?.phones?.length > 0) ? data?.phones[0]?.id : null,
                    }), [])

                    // hidden fields
                    const hiddenData = data?.hiddenData
                    const hiddenWorkInfoData = data?.workInformation.hiddenData

                    const hiddenKeys = typeof (hiddenData) === "string" ? hiddenData.split(",") : "";
                    const hiddenWorkInfoKeys = typeof (hiddenWorkInfoData) === 'string' ? hiddenWorkInfoData.split(",") : "";

                    const result = _.zipObject(hiddenKeys, _.map(hiddenKeys, () => false))
                    const workInfoResult = _.zipObject(hiddenWorkInfoKeys, _.map(hiddenWorkInfoKeys, () => false))

                    setActiveFields(prevState => ({
                        ...prevState,
                        //----------- Section 1 ---------------
                        ...((result?.firstName === false) || (result?.middleName === false) || result?.lastName === false) && { fullName: false },
                        ...(result?.title === false) && { title: false },
                        ...(workInfoResult?.position === false) && { position: false },
                        ...(workInfoResult?.companyName === false) && { companyName: false },
                        ...(result?.email === false) && { email: false },
                        ...(result?.phone === false) && { mobileNumber: false },
                        //----------- Section 2 ---------------
                        ...(result?.aboutMe === false) && { aboutMe: false },
                        ...(workInfoResult?.description === false) && { description: false },
                        ...(result?.addressLine === false) && { addressLine: false },
                        ...(result?.location === false) && { locationAddress: false },
                        ...(workInfoResult?.worksDays === false) && { workingDays: false },
                        ...((workInfoResult?.workingHoursFrom === false) || (workInfoResult?.workingHoursTo === false)) && { workingHours: false },
                        ...(workInfoResult?.webSite === false) && { website: false }
                    }))


                    // Social Media Links
                    if (Array.isArray(data?.socialMedia) && data?.socialMedia?.length > 0) {
                        const socialMediaArray = _.map(data?.socialMedia, ({ id, fieldName, fieldValue }) => ({ [fieldName]: fieldValue }))
                        const result = _.merge({}, ...socialMediaArray)

                        setSocialLinks(prevState => ({
                            ...prevState,
                            ...result
                        }))
                    }
                })
                .catch(error => {
                    console.log("error: ", error);
                    toast.error("Fail to fetch user profile.")
                })
                .finally(() => {
                    setTimeout(() => { setSetContentIsLoading(false) }, 500)
                })


            // Photo Gallery
            axiosClient.get(`/api/images/getAllProfileImages?id=${userId}`)
                .then(res => {
                    if (Array.isArray(res?.data) && res?.data?.length > 0)
                        setPhotoGallery(res?.data.map(({ id, image: base64image }) => ({ id, dataURL: `data:image/jpeg;base64,${base64image}` })))
                })
                .catch(error => {
                    console.log("error: ", error);
                    toast.error("Fail to fetch photo gallery.")
                })


            // Profile Picture
            axiosClient.get(`/api/images/getUserImage?id=${userId}`)
                .then(res => res?.data !== "Not Found" && setProfilePicture([{ id: "profile-image", dataURL: `data:image/jpeg;base64,${res.data}` }]))
                .catch(error => {
                    console.log("error: ", error);
                    toast.error("Fail to fetch profile picture.")
                })
                .finally(() => setSetContentIsLoading(false))


            // ===================== Design_Settings =====================        
            axiosClient.get(`/api/social-media/retrieveUserTemplateDesign?userId=${userId}`)
                .then(res => {
                    const data = res?.data;
                    setThemeColors(prevState => ({
                        ...prevState,
                        ...(data?.templateName) && { selectedTemplate: data?.templateName },
                        ...(data?.primaryColor) && { primaryColor: data?.primaryColor },
                        ...(data?.secondaryColor) && { secondaryColor: data?.secondaryColor },
                        ...(data?.iconColor) && { textAndIconColor: data?.iconColor }
                    }))
                })
                .catch(error => {
                    console.log("error: ", error);
                    toast.error("Fail to fetch Design/settings configurations.")
                })


            // ===================== QR_Code =====================
            // getUserQRCodeImage
            axiosClient.get(`/api/social-media/getUserQRCodeImage?userId=${userId}`)
                .then(res => setQrImage(`data:image/jpeg;base64,${res.data}`))
                .catch(error => {
                    console.log("error: ", error);
                    toast.error("Fail to fetch user QR Image.")
                })

            
            // retrieveUserQRCode //! Need testing
            axiosClient.get(`/api/social-media/retrieveUserQRCode?userId=${userId}`)
                .then(res => {
                    setQrColor(res?.data?.color)
                    setQrImageDimensions({
                        width: res?.data?.width,
                        height: res?.data?.highest
                    })
                })
                .catch(error => {
                    console.log("error: ", error);
                    toast.error("Fail to fetch qr code configurations.")
                })
        }
    }, [userId])



    console.log("contentInitialValues: ", contentInitialValues);

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
                            onChangeProfilePicture={handleChangeProfilePicture}
                            onToggleActiveField={handleToggleActiveField}
                            onWorkingDaysChange={handleWorkingDaysChange}
                            onDeleteImage={handleDeleteImage}
                            onSubmit={handleSubmitContentSection}
                        />
                    </CustomTabPanel>

                    <CustomTabPanel value={selectedTab} index={1}>
                        <Design_Settings
                            {...themeColors}
                            templateData={templateData}
                            onTemplateThemeColorChange={handleTemplateThemeColorChange}
                            onSaveDesignSettings={handleSaveDesignSettings}
                            onSelectTemplate={handleSelectTemplate}
                        />
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
                            onSaveQRCodeTab={handleSaveQRCodeTab}
                        />
                    </CustomTabPanel>

                </div>
            </Container>
        </div>
    )
}
