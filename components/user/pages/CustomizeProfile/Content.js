import { memo, forwardRef } from 'react'
import { Stack, Grid, IconButton, CircularProgress } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
// *** components ***
import CustomInput from '@/components/common/FormFields/CustomInput'
import CustomSelect from '@/components/common/FormFields/CustomSelect'
import CustomAutocompleteTags from '@/components/common/FormFields/CustomAutocompleteTags'
import CustomButton from '@/components/common/FormFields/CustomButton'
import ImageUploader from '@/components/common/images-uploader'
// *** Icons ***
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import { ReactComponent as TikTokIcon } from '@/assets/icons/tiktok_icon.svg'
import { ReactComponent as DiscordIcon } from '@/assets/icons/discord_icon.svg'
import { ReactComponent as SnapchatIcon } from '@/assets/icons/snapchat_icon.svg'
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { ReactComponent as BehanceIcon } from '@/assets/icons/behance_icon.svg'
import { ReactComponent as ThreadsIcon } from '@/assets/icons/threads_icon.svg'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ReactComponent as DrippleIcon } from '@/assets/icons/dribble-icon.svg'
import PinterestIcon from '@mui/icons-material/Pinterest';
import { ReactComponent as TwitchIcon } from '@/assets/icons/twitch_icon.svg'
import TelegramIcon from '@mui/icons-material/Telegram';



const weekdayOptions = [
  { title: "Sunday" },
  { title: "Monday" },
  { title: "Tuesday" },
  { title: "Wednesday" },
  { title: "Thursday" },
  { title: "Friday" },
  { title: "Saturday" },
]

const validationSchema = Yup.object().shape({
  fullName: Yup.string(),
  title: Yup.string(),
  position: Yup.string(),
  companyName: Yup.string(),
  email: Yup.string().email("Invalid Email Format."),
  mobileNumber: Yup.string(),
  aboutMe: Yup.string(),
  description: Yup.string(),
  addressLine: Yup.string(),
  locationAddress: Yup.string(),
  workingDays: Yup.array().of(Yup.object().shape({
    title: Yup.string()
  })).max(7),
  workingHoursFrom: Yup.string(),
  workingHoursTo: Yup.string(),
  website: Yup.string(),
})

const socialLinksData = [
  { id: "facebook", theme: "#4267B2", icon: FacebookIcon },
  { id: "twitterX", theme: "#14171A", icon: XIcon },
  { id: "instagram", theme: "#C13584", icon: InstagramIcon },
  { id: "tiktok", theme: "#000", icon: TikTokIcon },
  { id: "discord", theme: "#5865F2", icon: DiscordIcon },
  { id: "snapchat", theme: "#FFFC00", icon: SnapchatIcon },
  { id: "youtube", theme: "#FF0000", icon: YouTubeIcon },
  { id: "whatsapp", theme: "#25D366", icon: WhatsAppIcon },
  { id: "behance", theme: "#1769ff", icon: BehanceIcon },
  { id: "threads", theme: "#000000", icon: ThreadsIcon },
  { id: "linkedin", theme: "#0077B5", icon: LinkedInIcon },
  { id: "dripple", theme: "#ea4c89", icon: DrippleIcon },
  { id: "pinterest", theme: "#E60023", icon: PinterestIcon },
  { id: "twitch", theme: "#9146ff", icon: TwitchIcon },
  { id: "telegram", theme: "#229ED9", icon: TelegramIcon }
]



const workingHoursOptions = [
  { name: "00:00am", value: "00:00am" },
  { name: "00:30am", value: "00:30am" },
  { name: "01:00am", value: "01:00am" },
  { name: "01:30am", value: "01:30am" },
  { name: "02:00am", value: "02:00am" },
  { name: "02:30am", value: "02:30am" },
  { name: "03:00am", value: "03:00am" },
  { name: "03:30am", value: "03:30am" },
  { name: "04:00am", value: "04:00am" },
  { name: "04:30am", value: "04:30am" },
  { name: "05:00am", value: "05:00am" },
  { name: "05:30am", value: "05:30am" },
  { name: "06:00am", value: "06:00am" },
  { name: "06:30am", value: "06:30am" },
  { name: "07:00am", value: "07:00am" },
  { name: "07:30am", value: "07:30am" },
  { name: "08:00am", value: "08:00am" },
  { name: "08:30am", value: "08:30am" },
  { name: "09:00am", value: "09:00am" },
  { name: "09:30am", value: "09:30am" },
  { name: "10:00am", value: "10:00am" },
  { name: "10:30am", value: "10:30am" },
  { name: "11:00am", value: "11:00am" },
  { name: "11:30am", value: "11:30am" },
  { name: "00:00pm", value: "00:00pm" },
  { name: "00:30pm", value: "00:30pm" },
  { name: "01:00pm", value: "01:00pm" },
  { name: "01:30pm", value: "01:30pm" },
  { name: "02:00pm", value: "02:00pm" },
  { name: "02:30pm", value: "02:30pm" },
  { name: "03:00pm", value: "03:00pm" },
  { name: "03:30pm", value: "03:30pm" },
  { name: "04:00pm", value: "04:00pm" },
  { name: "04:30pm", value: "04:30pm" },
  { name: "05:00pm", value: "05:00pm" },
  { name: "05:30pm", value: "05:30pm" },
  { name: "06:00pm", value: "06:00pm" },
  { name: "06:30pm", value: "06:30pm" },
  { name: "07:00pm", value: "07:00pm" },
  { name: "07:30pm", value: "07:30pm" },
  { name: "08:00pm", value: "08:00pm" },
  { name: "08:30pm", value: "08:30pm" },
  { name: "09:00pm", value: "09:00pm" },
  { name: "09:30pm", value: "09:30pm" },
  { name: "10:00pm", value: "10:00pm" },
  { name: "10:30pm", value: "10:30pm" },
  { name: "11:00pm", value: "11:00pm" },
  { name: "11:30pm", value: "11:30pm" },
]


const Content = forwardRef(({ loading, initialValues, activeFields, socialLinkId, socialLinks, profilePicture, photoGallery, onClickSocialBtn, onToggleActiveField, onChangeSocialLinks, onChangePhotoGallery, onChangeProfilePicture, onWorkingDaysChange, onDeleteImage, onSubmit }, ref) => {
  return (
    <section className='content-section'>
      {loading ? (
        <div className='loading-progress'>
          <CircularProgress size={150} />
        </div>
      ) : (
        <Formik
          innerRef={ref}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, handleSubmit, ...formik }) => (
            <Form>

              <Grid container spacing={2}>
                <Grid className='section1' item md={4}> {/* Section 1 */}

                  {/****************** Full Name ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="fullName">
                      {({ field, form, meta: { touched, error } }) => (
                        <CustomInput
                          labelText="Full Name"
                          placeholder="First Middle Last"
                          disabled={isSubmitting || !activeFields.fullName}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="fullName" onClick={onToggleActiveField}>
                      {!activeFields.fullName ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>

                  {/****************** Title ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="title">
                      {({ field, form, meta: { touched, error } }) => (
                        <CustomInput
                          labelText="Title"
                          placeholder="Title"
                          disabled={isSubmitting || !activeFields.title}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="title" onClick={onToggleActiveField}>
                      {!activeFields.title ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>

                  {/****************** Position ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="position">
                      {({ field, form, meta: { touched, error } }) => (
                        <CustomInput
                          labelText="Position"
                          placeholder="Position"
                          disabled={isSubmitting || !activeFields.position}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="position" onClick={onToggleActiveField}>
                      {!activeFields.position ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>

                  {/****************** Company Name ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="companyName">
                      {({ field, form, meta: { touched, error } }) => (
                        <CustomInput
                          labelText="Company Name"
                          placeholder="Company Name"
                          disabled={isSubmitting || !activeFields.companyName}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="companyName" onClick={onToggleActiveField}>
                      {!activeFields.companyName ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>

                  {/****************** Email ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="email">
                      {({ field, form, meta: { touched, error } }) => (
                        <CustomInput
                          labelText="Email"
                          placeholder="Email"
                          disabled={isSubmitting || !activeFields.email}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="email" onClick={onToggleActiveField}>
                      {!activeFields.email ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>

                  {/****************** Mobile Number ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="mobileNumber">
                      {({ field, form, meta: { touched, error } }) => (
                        <CustomInput
                          labelText="Mobile Number"
                          placeholder="Mobile Number"
                          disabled={isSubmitting || !activeFields.mobileNumber}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="mobileNumber" onClick={onToggleActiveField}>
                      {!activeFields.mobileNumber ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>


                </Grid>
                <Grid className='section2' item md={4}> {/* Section 2 */}

                  {/****************** About Me (Bio) ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="aboutMe">
                      {({ field, form, meta: { touched, error } }) => (
                        <CustomInput
                          labelText="About Me (Bio)"
                          placeholder="About Me (Bio)"
                          disabled={isSubmitting || !activeFields.aboutMe}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="aboutMe" onClick={onToggleActiveField}>
                      {!activeFields.aboutMe ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>


                  {/****************** Description ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="description">
                      {({ field, form, meta: { touched, error } }) => (
                        <CustomInput
                          labelText="Description"
                          placeholder="Description"
                          disabled={isSubmitting || !activeFields.description}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="description" onClick={onToggleActiveField}>
                      {!activeFields.description ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>


                  {/****************** Address Line ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="addressLine">
                      {({ field, form, meta: { touched, error } }) => (
                        <CustomInput
                          labelText="Address Line"
                          placeholder="Address Line"
                          disabled={isSubmitting || !activeFields.addressLine}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="addressLine" onClick={onToggleActiveField}>
                      {!activeFields.addressLine ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>

                  {/****************** Location Address ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="locationAddress">
                      {({ field, form, meta: { touched, error } }) => (
                        <CustomInput
                          labelText="Location Address"
                          placeholder="Location Address"
                          disabled={isSubmitting || !activeFields.locationAddress}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="locationAddress" onClick={onToggleActiveField}>
                      {!activeFields.locationAddress ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>


                  {/****************** Working Days ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="workingDays">
                      {({ field: { name, value, onChange, onBlur }, form, meta: { touched, error } }) => (

                        <CustomAutocompleteTags
                          labelText="Working Days"
                          placeholder="Working Days"
                          disabled={isSubmitting || !activeFields.workingDays}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          value={value}                          
                          options={weekdayOptions}
                          fullWidth
                          onChange={onWorkingDaysChange}
                          onBlur={onBlur}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="workingDays" onClick={onToggleActiveField}>
                      {!activeFields.workingDays ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>

                  {/****************** Working Hours ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Grid container spacing={2}>
                      <Grid item md={6}>

                        <Field name="workingHoursFrom">
                          {({ field, form, meta: { touched, error } }) => (
                            <CustomSelect
                              options={workingHoursOptions}
                              labelText="From"
                              placeholder="From"
                              disabled={isSubmitting || !activeFields.workingHours}
                              error={touched && error && error}
                              helperText={touched && error ? error : ""}
                              margin={touched && error ? "dense" : "normal"}
                              fullWidth
                              {...field}
                            />
                          )}
                        </Field>

                      </Grid>
                      <Grid item md={6}>

                        <Field name="workingHoursTo">
                          {({ field, form, meta: { touched, error } }) => (
                            <CustomSelect
                              options={workingHoursOptions}
                              labelText="To"
                              placeholder="To"
                              disabled={isSubmitting || !activeFields.workingHours}
                              error={touched && error && error}
                              helperText={touched && error ? error : ""}
                              margin={touched && error ? "dense" : "normal"}
                              fullWidth
                              {...field}
                            />
                          )}
                        </Field>

                      </Grid>
                    </Grid>

                    <IconButton data-field-id="workingHours" onClick={onToggleActiveField}>
                      {!activeFields.workingHours ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>


                  {/****************** Website ******************/}
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Field name="website">
                      {({ field, form, meta: { touched, error } }) => (
                        <CustomInput
                          labelText="Website"
                          placeholder="Website"
                          disabled={isSubmitting || !activeFields.website}
                          error={touched && error && error}
                          helperText={touched && error ? error : ""}
                          margin={touched && error ? "dense" : "normal"}
                          fullWidth
                          {...field}
                        />
                      )}
                    </Field>

                    <IconButton data-field-id="website" onClick={onToggleActiveField}>
                      {!activeFields.website ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Stack>

                </Grid>
                <Grid item md={4}> {/* Section 3 */}

                  <div className='social-links'>
                    {socialLinksData.map(({ id, theme, icon: Icon }) => (
                      <div key={id} className='btn-wrapper'>
                        <IconButton
                          disableRipple
                          data-id={id}
                          sx={{ ...(!!socialLinkId && socialLinkId === id) && { backgroundColor: `${theme} !important`, "& svg": { fill: "#FFF!important", color: "#FFF!important" } } }}
                          onClick={onClickSocialBtn}
                        >
                          <Icon />
                        </IconButton>
                      </div>
                    ))}
                  </div>

                  <br />


                  {socialLinkId && (
                    <CustomInput
                      labelText={String(socialLinkId).charAt(0).toUpperCase() + String(socialLinkId).slice(1)}
                      placeholder={String(socialLinkId).charAt(0).toUpperCase() + String(socialLinkId).slice(1)}
                      margin="normal"
                      fullWidth
                      value={socialLinks[socialLinkId]}
                      onChange={onChangeSocialLinks}
                    />
                  )}

                  <br />

                  <ImageUploader
                    images={profilePicture}
                    onChange={onChangeProfilePicture}
                    maxNumber={1}
                    onDeleteImage={onDeleteImage}
                  />

                  <br />

                  <ImageUploader
                    images={photoGallery}
                    onChange={onChangePhotoGallery}
                    multiple
                    maxNumber={200}
                    onDeleteImage={onDeleteImage}
                  />


                </Grid>
              </Grid>


              <CustomButton
                size="large"
                type="submit"
                innerText="Save Changes"
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      )}

    </section>
  )
})

Content.displayName = "Content"
export default memo(Content)