import { useState, useMemo, useCallback, useRef } from 'react'
import { Container, Tabs, Box, Tab } from '@mui/material'
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
    
    // ===================== Content =====================
    const [activeFields, setActiveFields] = useState(activeFieldsInitialState)
    const [socialLinkId, setSocialLinkId] = useState("")
    const [socialLinks, setSocialLinks] = useState(socialLinksInitialState)
    const [photoGallery, setPhotoGallery] = useState([])
    const [profilePicture, setProfilePicture] = useState(null)

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


    // ****************** Memos ******************
    const boxSX = useMemo(() => ({ borderBottom: 1, borderColor: 'divider' }), [])


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

                    <CustomTabPanel value={selectedTab} index={1}>
                        <QR_Code />
                    </CustomTabPanel>

                </div>
            </Container>
        </div>
    )
}
