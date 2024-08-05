import dynamic from 'next/dynamic'
import { memo } from 'react'
import { Grid } from '@mui/material'
import { Button, Typography } from '@mui/material'
// *** components ***
import CustomButton from '@/components/common/FormFields/CustomButton'
// *** templates ***
import Template1 from '@/components/client/templates/template1'
import Template2 from '@/components/client/templates/template2'
import Template3 from '@/components/client/templates/template3'
import Template4 from '@/components/client/templates/template4'
// *** dynamic imports ***
const ChromeColorPicker = dynamic(() => import('@uiw/react-color').then(({ Chrome }) => Chrome), { ssr: false })





// const data = {
//   // avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg", // template1
//   avatar: "https://thumbs.dreamstime.com/b/young-man-standing-crossed-arms-pose-square-composition-photo-portrait-happy-smiling-face-male-model-blue-background-guy-187062130.jpg",
//   fullName: "Mike Jonathan",
//   title: "Frontend Developer",
//   position: "Senior Frontend Developer",
//   companyName: "prvisoft.com",
//   contact: {
//     email: "mikejonathan@gmail.com",
//     mobile: "+962796626365",
//     addressLine: "123 Main Street, apt 4B San Diego CA, 91911",
//     locationAddress: ""
//   },
//   aboutMe: "I'm Mike Jonathan, and I recently graduated with an advanced diploma from Smith secondary school. I'm seeking an internship where I can apply my skills in content creation and increase my experience in digital marketing.",
//   description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
//   workingDays: "Monday, Tuesday, Wednesday, Thursday, Friday",
//   workingHours: {
//     from: "8:00am",
//     to: "6:00pm"
//   },
//   website: "http://www.example.com",
//   socialLinks: {
//     facebook: "http://www.facebook.com",
//     twitterX: "http://www.x.com",
//     instagram: "http://www.instagram.com",
//     tiktok: "http://www.tiktok.com",
//     discord: "http://www.discord.com",
//     snapchat: "http://www.snapchat.com",
//     youtube: "http://www.youtube.com",
//     whatsapp: "http://www.web.whatsapp.com",
//     behance: "http://www.behance.com",
//     threads: "http://www.threads.com",
//     linkedin: "http://www.linkedin.com",
//     dripple: "http://www.dripple.com",
//     pinterest: "http://www.pinterest.com",
//     twitch: "http://www.twitch.com",
//     telegram: "http://www.telegram.com"
//   },
//   photoGallery: [
//     "https://agcdn-1d97e.kxcdn.com/wp-content/uploads/2015/12/13-must-attend-business-student-events-in-2016.jpg",
//     "https://www.primeum.com/hubfs/D%C3%A9finition-performance-commerciale.jpg",
//     "https://argylecommunitytrust.co.uk/wp-content/uploads/2018/11/business-camera-coffee-1509428.jpg",
//     "https://www.forbes.com/advisor/wp-content/uploads/2021/04/steps_to_start_a_small_business_-_article_image.jpg",
//     "https://www.savethestudent.org/uploads/person-on-laptop-lightbulbs2.jpg",
//   ]
// }


const TemplateWrapper = memo(({ selectedTemplate, templateId, children, onSelectTemplate }) => (
  <Grid item md={3} xs={12}>
    <div className='user-template'>
      <div className="template-wrapper">
        {children}
      </div>

      <div className='btn-wrapper'>
        <Button className={(selectedTemplate === templateId) ? "selected" : ""} variant='outlined' data-template-id={templateId} onClick={onSelectTemplate}>
          Select
        </Button>
      </div>
    </div>
  </Grid>
))


TemplateWrapper.displayName = "TemplateWrapper"
function DesignSettings({ templateData ,selectedTemplate, primaryColor, secondaryColor, textAndIconColor, onTemplateThemeColorChange, onSelectTemplate, onSaveDesignSettings }) {
  return (
    <section className='design-settings'>

      <Grid container spacing={2}>
        <TemplateWrapper selectedTemplate={selectedTemplate} templateId="template1" onSelectTemplate={onSelectTemplate}>
          <Template1 {...templateData} />
        </TemplateWrapper>

        <TemplateWrapper selectedTemplate={selectedTemplate} templateId="template2" onSelectTemplate={onSelectTemplate}>
          <Template2 {...templateData} />
        </TemplateWrapper>

        <TemplateWrapper selectedTemplate={selectedTemplate} templateId="template3" onSelectTemplate={onSelectTemplate}>
          <Template3 {...templateData} />
        </TemplateWrapper>

        <TemplateWrapper selectedTemplate={selectedTemplate} templateId="template4" onSelectTemplate={onSelectTemplate}>
          <Template4 {...templateData} />
        </TemplateWrapper>
      </Grid>


      <div className='template-theme-colors'>

        <div>
          <div>
            <Typography variant='h5'>Primary Color</Typography>
            <ChromeColorPicker
              color={primaryColor}
              onChange={(color) => onTemplateThemeColorChange("primaryColor", color.hex)}
            />
          </div>
        </div>

        <div>
          <div>
            <Typography variant='h5'>Secondary Color</Typography>
            <ChromeColorPicker
              color={secondaryColor}
              onChange={(color) => onTemplateThemeColorChange("secondaryColor", color.hex)}
            />
          </div>
        </div>

        <div>
          <div>
            <Typography variant='h5'>Text and Icon Color</Typography>
            <ChromeColorPicker
              color={textAndIconColor}
              onChange={(color) => onTemplateThemeColorChange("textAndIconColor", color.hex)}
            />
          </div>
        </div>

      </div>


      <CustomButton
        size="large"
        type="submit"
        innerText="Save Changes"
        onClick={onSaveDesignSettings}
      // loading={isSubmitting}
      />

      <br />
      <br />
      <br />
      <br />

    </section>
  )
}

export default memo(DesignSettings)


