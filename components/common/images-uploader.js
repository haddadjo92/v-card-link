import { memo, useMemo } from 'react'
import ImageUploading from "react-images-uploading";
import { Stack, Button, IconButton, Tooltip, Typography } from '@mui/material'
// *** Icons ***
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// *** styles ***
import styles from '@/assets/styles/__components/common/ImagesUploader.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)




function ImagesUploader({ images, multiple, maxNumber, onChange, onDeleteImage }) {
    const classes = useStyles()
    // ****************** Memos ******************
    const removeAllImagesStartIcon = useMemo(() => <DeleteForeverIcon />, [])
    const uploadImagesStartIcon = useMemo(() => <ImageIcon />, [])



    return (
        <div className={classes.imagesUploader}>
            <ImageUploading
                multiple={multiple}
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
                                {multiple ? "Upload Images" : "Upload Profile Image"}
                            </Button>


                            {/* <Button
                                variant='contained'
                                className='remove-all-images-btn'
                                onClick={onImageRemoveAll}
                                startIcon={removeAllImagesStartIcon}
                                disabled={imageList?.length === 0}
                            >
                                {multiple ? "Remove all images" : "Remove Profile image"}
                            </Button> */}
                        </section>

                        <section className='image-list'>
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <div className='left'>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={image.dataURL}
                                            alt=""
                                            title={image?.file?.name || `image-${index + 1}`}
                                            width="150"
                                        />

                                    </div>
                                    <div className='middle'>

                                        <Typography component="h6" variant='h6'>
                                            {image?.file?.name || `image-${index + 1}`}
                                        </Typography>

                                    </div>

                                    <div className='right'>

                                        <Stack direction="row" justifyContent="flex-end" alignItems="center">

                                            <Tooltip placement="top" title="Delete Image">
                                                <IconButton size="small" className='remove-image-btn' onClick={() => {
                                                    if (image?.id)
                                                        onDeleteImage(image?.id)
                                                    onImageRemove(index)
                                                }}>
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