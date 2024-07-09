import { memo } from 'react'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
// *** templates ***
import Template1 from '@/components/client/templates/template1'
import Template2 from '@/components/client/templates/template2'
import Template3 from '@/components/client/templates/template3'
import Template4 from '@/components/client/templates/template4'
// *** styles ***






const data = {
  // avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg", // template1
  avatar: "https://thumbs.dreamstime.com/b/young-man-standing-crossed-arms-pose-square-composition-photo-portrait-happy-smiling-face-male-model-blue-background-guy-187062130.jpg",
  fullName: "Mike Jonathan",
  title: "Frontend Developer",
  position: "Senior Frontend Developer",
  companyName: "prvisoft.com",
  contact: {
    email: "mikejonathan@gmail.com",
    mobile: "+962796626365",
    addressLine: "123 Main Street, apt 4B San Diego CA, 91911",
    locationAddress: ""
  },
  aboutMe: "I'm Mike Jonathan, and I recently graduated with an advanced diploma from Smith secondary school. I'm seeking an internship where I can apply my skills in content creation and increase my experience in digital marketing.",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  workingDays: "Monday, Tuesday, Wednesday, Thursday, Friday",
  workingHours: {
    from: "8:00am",
    to: "6:00pm"
  },
  website: "http://www.example.com",
  socialLinks: {
    facebook: "http://www.facebook.com",
    twitterX: "http://www.x.com",
    instagram: "http://www.instagram.com",
    tiktok: "http://www.tiktok.com",
    discord: "http://www.discord.com",
    snapchat: "http://www.snapchat.com",
    youtube: "http://www.youtube.com",
    whatsapp: "http://www.web.whatsapp.com",
    behance: "http://www.behance.com",
    threads: "http://www.threads.com",
    linkedin: "http://www.linkedin.com",
    dripple: "http://www.dripple.com",
    pinterest: "http://www.pinterest.com",
    twitch: "http://www.twitch.com",
    telegram: "http://www.telegram.com"
  },
  photoGallery: [
    "https://agcdn-1d97e.kxcdn.com/wp-content/uploads/2015/12/13-must-attend-business-student-events-in-2016.jpg",
    "https://www.primeum.com/hubfs/D%C3%A9finition-performance-commerciale.jpg",
    "https://argylecommunitytrust.co.uk/wp-content/uploads/2018/11/business-camera-coffee-1509428.jpg",
    "https://www.forbes.com/advisor/wp-content/uploads/2021/04/steps_to_start_a_small_business_-_article_image.jpg",
    "https://www.savethestudent.org/uploads/person-on-laptop-lightbulbs2.jpg",
  ]
}


const TemplateWrapper = memo(({ selected, children, onSelectTemplate }) => (
  <Grid item md={3}>
    <div className='user-template'>
      <div className="template-wrapper">
        {children}
      </div>

      <div className='btn-wrapper'>
        <Button variant='outlined' onClick={onSelectTemplate}>
          Select
        </Button>
      </div>
    </div>
  </Grid>
))


TemplateWrapper.displayName = "TemplateWrapper"
function DesignSettings({ selectedTemplate, onSelectTemplate }) {
  return (
    <section className='design-settings'>

      <Grid container spacing={2}>
        <TemplateWrapper selected={selectedTemplate === "template1"} onSelectTemplate={onSelectTemplate}>
          <Template1 {...data} />
        </TemplateWrapper>

        <TemplateWrapper selected={selectedTemplate === "template2"} onSelectTemplate={onSelectTemplate}>
          <Template2 {...data} />
        </TemplateWrapper>

        <TemplateWrapper selected={selectedTemplate === "template3"} onSelectTemplate={onSelectTemplate}>
          <Template3 {...data} />
        </TemplateWrapper>

        <TemplateWrapper selected={selectedTemplate === "template4"} onSelectTemplate={onSelectTemplate}>
          <Template4 {...data} />
        </TemplateWrapper>
      </Grid>

    </section>
  )
}

export default memo(DesignSettings)


