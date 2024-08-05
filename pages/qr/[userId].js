import Link from 'next/link'
import { useMemo } from 'react'
import { Container, Typography, Button } from '@mui/material'
import axios from 'axios'
import _ from 'lodash'
// *** templates ***
import Template1 from '@/components/client/templates/template1'
import Template2 from '@/components/client/templates/template2'
import Template3 from '@/components/client/templates/template3'
import Template4 from '@/components/client/templates/template4'
// *** styles ***
import styles from '@/assets/styles/__pages/client/qrPage.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)

export default function TemplatePage({ error, data }) {
    const classes = useStyles()    

    // ************* Memos *************
    const containerSX = useMemo(() => ({ maxWidth: 850, pl: 2, pr: 2 }), [])


    if (error) return (
        <div className={classes.error}>
            <div className='content'>
                <Typography variant='h1' component='h1'>
                    Either User not found Or fail to fetch user data.
                </Typography>
                <Link href="/">Back to Login</Link>
            </div>
        </div>
    )
    else return (
        <div className={classes.qrPage}>
            <Container maxWidth={false} sx={containerSX}>
                <div className='content'>
                    {data?.templateDesign?.templateName === "template1" && <Template1 {...data} />}
                    {data?.templateDesign?.templateName === "template2" && <Template2 {...data} />}
                    {data?.templateDesign?.templateName === "template3" && <Template3 {...data} />}
                    {data?.templateDesign?.templateName === "template4" && <Template4 {...data} />}
                </div>
            </Container>
        </div>
    )
}



export async function getServerSideProps(ctx) {

    const { userId } = ctx?.query



    // const data = {
    //     // avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg", // template1
    //     avatar: "https://thumbs.dreamstime.com/b/young-man-standing-crossed-arms-pose-square-composition-photo-portrait-happy-smiling-face-male-model-blue-background-guy-187062130.jpg",
    //     fullName: "Mike Jonathan",
    //     title: "Frontend Developer",
    //     position: "Senior Frontend Developer",
    //     companyName: "prvisoft.com",
    //     contact: {
    //         email: "mikejonathan@gmail.com",
    //         mobile: "+962796626365",
    //         addressLine: "123 Main Street, apt 4B San Diego CA, 91911",
    //         locationAddress: ""
    //     },
    //     aboutMe: "I'm Mike Jonathan, and I recently graduated with an advanced diploma from Smith secondary school. I'm seeking an internship where I can apply my skills in content creation and increase my experience in digital marketing.",
    //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    //     workingDays: "Monday, Tuesday, Wednesday, Thursday, Friday",
    //     workingHours: {
    //         from: "8:00am",
    //         to: "6:00pm"
    //     },
    //     website: "http://www.example.com",
    //     socialLinks: {
    //         facebook: "http://www.facebook.com",
    //         twitterX: "http://www.x.com",
    //         instagram: "http://www.instagram.com",
    //         tiktok: "http://www.tiktok.com",
    //         discord: "http://www.discord.com",
    //         snapchat: "http://www.snapchat.com",
    //         youtube: "http://www.youtube.com",
    //         whatsapp: "http://www.web.whatsapp.com",
    //         behance: "http://www.behance.com",
    //         threads: "http://www.threads.com",
    //         linkedin: "http://www.linkedin.com",
    //         dripple: "http://www.dripple.com",
    //         pinterest: "http://www.pinterest.com",
    //         twitch: "http://www.twitch.com",
    //         telegram: "http://www.telegram.com"
    //     },
    //     photoGallery: [
    //         "https://agcdn-1d97e.kxcdn.com/wp-content/uploads/2015/12/13-must-attend-business-student-events-in-2016.jpg",
    //         "https://www.primeum.com/hubfs/D%C3%A9finition-performance-commerciale.jpg",
    //         "https://argylecommunitytrust.co.uk/wp-content/uploads/2018/11/business-camera-coffee-1509428.jpg",
    //         "https://www.forbes.com/advisor/wp-content/uploads/2021/04/steps_to_start_a_small_business_-_article_image.jpg",
    //         "https://www.savethestudent.org/uploads/person-on-laptop-lightbulbs2.jpg",
    //     ],
    //     templateDesign: {
    //         "id": 1,
    //         "templateName": "template2",
    //         "primaryColor": "#b601fe",
    //         "secondaryColor": "#296ed1",
    //         "iconColor": "#eeab10"
    //     }
    // }

    try {
        const data = (await axios.get(`${process.env.BASE_URL}/visitor/${userId}/user/profile`)).data
        const profilePicture = (await axios.get(`${process.env.BASE_URL}/visitor/${userId}/image64`)).data
        const photos  = (await axios.get(`${process.env.BASE_URL}/visitor/${userId}/all/images64`)).data
        const photoGallery = _.map(photos, ({ image }) => `data:image/jpeg;base64,${image}`)


        let socialMediaResult = []
        if (Array.isArray(data?.socialMedia) && data?.socialMedia?.length > 0) {
            socialMediaResult = _.reduce(data?.socialMedia, (acc, obj) => {
                acc[obj.fieldName] = obj.fieldValue;
                return acc;
            }, {});
        }


        let workingDaysResult = "";
        if (Array.isArray(data?.workInformation?.workingDay) && data?.workInformation?.workingDay?.length > 0)
            workingDaysResult = _.map(data?.workInformation?.workingDay, 'dayOfWeek').map(day => _.capitalize(day.toLowerCase())).join(', ');



        const templateData = {
            templateDesign: data?.templateDesign,
            avatar: profilePicture ? `data:image/jpeg;base64,${profilePicture}` : "https://ssl.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png",
            fullName: String(`${data?.firstName || ""} ${data.middleName || ""} ${data?.lastName || ""}`),
            title: data?.title || "",
            position: data?.workInformation?.position || "",
            companyName: data?.workInformation?.companyName || "",
            contact: {
                email: data?.email || "",
                mobile: Array.isArray(data?.phones) && data?.phones?.length > 0 ? data?.phones?.[0]?.phoneNumber : "",
                addressLine: data?.address?.addressLine || "",
                locationAddress: data?.address?.location || ""
            },
            aboutMe: data?.aboutMe || "",
            description: data?.workInformation?.description || "",
            workingDays: workingDaysResult,
            workingHours: {
                from: data?.workInformation?.workingHoursFrom || "",
                to: data?.workInformation?.workingHoursTo || ""
            },
            website: data?.workInformation?.webSite || "",
            socialLinks: socialMediaResult,
            photoGallery
        }

        return {
            props: {
                error: false,
                data: templateData
            }
        }
    }
    catch (error) {
        return {
            props: {
                error: true,
                data: {}
            }
        }
    }

}



