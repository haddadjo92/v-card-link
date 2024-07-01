import Link from 'next/link'
import { useMemo } from 'react';
import { Typography } from '@mui/material'
import _ from 'lodash'
// *** common ***
import socialIcons from './common/socialIcons'
// *** Icons ***
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PublicIcon from '@mui/icons-material/Public';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// *** styles ***
import { Template1Styles } from '@/assets/styles/__pages/client/template.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(Template1Styles)

export default function Template1({ avatar, fullName, title, position, companyName, contact, aboutMe, description, workingDays, workingHours, website, socialLinks, photoGallery }) {
  const classes = useStyles()

  // ********************* Memos *********************
  const __workingDays = useMemo(() => {
    let result = workingDays?.split(",")
    if (result.length === 1 && result?.[0] === '')
      return []
    else return result
  }, [workingDays])

  return (
    <div className={classes.template1}>
      <section className='hero-section' style={{ backgroundImage: `url(${avatar})` }}>
        <div className='person-details'>
          {fullName && <Typography variant='h1' component="h1" className='fullName'>{fullName}</Typography>}
          {title && <Typography className='title'>{title}</Typography>}
          {position && <Typography className='position'>{position}</Typography>}
          {companyName && <Typography className='companyName'>{companyName}</Typography>}
        </div>
      </section>

      {aboutMe && (
        <section className='about-me'>
          <Typography variant='h5' component="h5" className='main-title'>About me</Typography>
          <Typography className='description'>{aboutMe}</Typography>
        </section>
      )}

      {description && (
        <section className='description'>
          <Typography variant='h5' component="h5" className='main-title'>Description</Typography>
          <Typography className='description'>{description}</Typography>
        </section>
      )}

      {(contact.mobile || contact.email || contact.addressLine) && (
        <section className='contact'>
          <Typography variant='h5' component="h5" className='main-title'>Contact Me</Typography>

          <div className='contact-details'>
            {contact.mobile && (
              <Link className='phoneNumber' href={`tel:${contact.mobile}`}>
                <div className='icon-wrapper'>
                  <PhoneIcon />
                </div>
                <span>{contact.mobile}</span>
              </Link>
            )}


            {contact.email && (
              <Link className='email' href={`mailto:${contact.email}`}>
                <div className='icon-wrapper'>
                  <AlternateEmailIcon />
                </div>
                <span>{contact.email}</span>
              </Link>
            )}


            {contact.addressLine && (
              <span className='address'>
                <div className='icon-wrapper'>
                  <FmdGoodIcon />
                </div>
                <span>{contact.addressLine}</span>
              </span>
            )}
          </div>
        </section>
      )}

      {Array.isArray(photoGallery) && photoGallery?.length > 0 && (
        <section className='photo-gallery'>
          {photoGallery?.map((imgSrc, Idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`photo-gallery-img-${Idx}`}
              src={imgSrc}
              alt={`photo-gallery-img-${Idx + 1}`}
              fill
            />
          ))}
        </section>
      )}

      {website && (
        <section className='website'>
          <Typography variant='h5' component="h5" className='website'>Website</Typography>
          <div className='content'>
            <Link href={website}>
              <div className='icon-wrapper'>
                <PublicIcon />
              </div>
              <span>{website}</span>
            </Link>
          </div>
        </section>
      )}

      {(Array.isArray(__workingDays) || (workingHours.from && workingHours.to)) && (
        <section className='working-details'>
          <Typography variant='h5' component="h5" className='main-title'>Working Details</Typography>

          {/************* Working Days **************/}
          {Array.isArray(__workingDays) && __workingDays?.length > 0 && (
            <div className='working-days'>
              <Typography variant='h6' component="h6" className='sub-title'>Working Days</Typography>
              <div className='content'>
                {__workingDays?.map((day, Idx) => <span key={`day-${day}-${Idx + 1}`}>{day}</span>)}
              </div>
            </div>
          )}

          {/************* Working Hours **************/}
          {(workingHours.from && workingHours.to) && (
            <div className='working-hours'>
              <Typography variant='h6' component="h6" className='sub-title'>Working Hours</Typography>

              <div className='content'>
                <div className='working-hours-from'>
                  <span>From</span>
                  {" "}
                  <span>{workingHours.from}</span>
                </div>

                <div className='icon-wrapper'>
                  <ArrowForwardIcon />
                </div>

                <div className='working-hours-to'>
                  <span>To</span>
                  {" "}
                  <span>{workingHours.to}</span>
                </div>
              </div>

            </div>
          )}
        </section>
      )}


      <section className='follow-me'>
        <Typography variant='h5' component="h5" className='main-title'>Follow me</Typography>
        <div className='content'>

          {_.map(socialLinks, (value, key) => (
            <div className='social-link-wrapper'>
              <Link href={value} target='_blank'>
                {socialIcons[key]}
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
