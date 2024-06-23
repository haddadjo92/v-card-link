import { memo, useState, useMemo, useCallback } from 'react'
import ImageUploading from "react-images-uploading";
import { Stack, Button, IconButton, Tooltip, Typography } from '@mui/material'
// *** Icons ***
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// *** styles ***
import styles from '@/assets/styles/__components/common/ImagesUploader.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



const maxNumber = 100;
function ImagesUploader({ profilePicture, images, onChange, onClickSetProfilePicture }) {
    const classes = useStyles()

    // ****************** Memos ******************
    const removeAllImagesStartIcon = useMemo(() => <DeleteForeverIcon />, [])
    const uploadImagesStartIcon = useMemo(() => <ImageIcon />, [])



    return (
        <div className={classes.imagesUploader}>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
            >
                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                    <div className="upload__image-wrapper">
                        <section className='top-section'>
                            <Button
                                variant='contained'
                                className='upload-images-btn'
                                onClick={onImageUpload}
                                startIcon={uploadImagesStartIcon}
                                disabled={imageList.length >= maxNumber}
                                {...dragProps}
                            >
                                Upload Images
                            </Button>


                            <Button
                                variant='contained'
                                className='remove-all-images-btn'
                                onClick={onImageRemoveAll}
                                startIcon={removeAllImagesStartIcon}
                                disabled={imageList?.length === 0}
                            >
                                Remove all images
                            </Button>
                        </section>

                        <section className='image-list'>
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <div className='left'>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={image.dataURL}
                                            alt=""
                                            title={image.file?.name}
                                            width="150"
                                        />

                                    </div>
                                    <div className='middle'>

                                        <Typography component="h6" variant='h6'>
                                            {image.file.name}
                                        </Typography>

                                    </div>

                                    <div className='right'>

                                        <Stack direction="row" justifyContent="flex-end" alignItems="center">
                                            <Tooltip placement="top" title="Set as profile image">
                                                <IconButton
                                                    data-image-id={`${String(image.file.name).replace(/\s/g, '')}-${image.file.size}-${image.file.lastModified}`}
                                                    size="small"
                                                    className={`assign-profile-image-btn ${profilePicture === String(image.file.name).replace(/\s/g, '').concat("-").concat(image.file.size).concat("-").concat(image.file.lastModified) ? "isActive" : ""}`}
                                                    active={profilePicture}
                                                    onClick={onClickSetProfilePicture}
                                                >
                                                    <PersonOutlineOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip placement="top" title="Delete Image">
                                                <IconButton size="small" className='remove-image-btn' onClick={() => onImageRemove(index)}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </Tooltip>

                                        </Stack>
                                    </div>

                                </div>
                            ))}
                        </section>
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}

export default memo(ImagesUploader)