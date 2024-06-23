import { darken, transparentize } from 'polished'

const ImagesUploaderStyles = {
    imagesUploader: {
        "& .upload__image-wrapper": {
            "& section.top-section": {
                "& button": {
                    textTransform: "capitalize !important",
                    borderRadius: "60px!important",
                    boxShadow: "unset",
                    "&.upload-images-btn": {
                        marginRight: 15,
                        backgroundColor: "#333",
                        "&:hover": {
                            backgroundColor: "#000",
                        },
                        "&:disabled": {
                            "&, &:hover": {
                                backgroundColor: transparentize(.4, "#333"),
                                color: "#666"
                            }
                        }
                    },
                    "&.remove-all-images-btn": {
                        backgroundColor: "#ff1744",
                        "&:hover": {
                            backgroundColor: "#b2102f",
                        },
                        "&:disabled": {
                            "&, &:hover": {
                                backgroundColor: transparentize(.4, "#ff1744"),
                                color: "#eee"
                            }
                        }
                    }
                }
            },
            "& section.image-list": {
                maxHeight: 400,
                overflowX: "hidden",
                overflowY: "auto",
                marginTop: 15,
                paddingRight: "15px",
                "& .image-item": {
                    border: "1px solid #EEE",
                    display: "flex",
                    padding: "5px 0px 5px 5px",
                    borderRadius: 12,
                    marginTop: 15,
                    minHeight: 100,
                    overflow: "hidden",
                    "& .left": {
                        position: "relative",
                        flex: "0 0 25%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& img": {                            
                            border: "1px solid #EEE",
                            width: "100%",
                            borderRadius: 12
                        }
                    },
                    "& .middle": {
                        padding: "5px 5px 5px 10px",
                        flex: "0 0 50%",
                        maxWidth: "50%",                        
                        "& h6": {
                            fontSize: 14,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            wordWrap: "break-word",
                            "-webkit-box-orient": "vertical",
                            "-webkit-line-clamp": 3,                            
                        }
                    },
                    "& .right": {
                        flex: "0 0 25%",
                        padding: 5,
                        alignSelf: "center",                        
                        "& > div": {
                            marginLeft: "auto",
                            "& button": {                                
                                "&.assign-profile-image-btn": {
                                    padding: 2,
                                    border: `2px solid ${darken(.15, "#ffc107")}`,
                                    color: darken(.15, "#ffc107"),
                                    marginRight: 5,
                                    "&.isActive": {
                                        backgroundColor: darken(.15, "#ffc107"),
                                        color: "#FFF"
                                    },
                                    "& *": {
                                        pointerEvents: "none"
                                    },                                    
                                },
                                "&.remove-image-btn": {
                                    padding: 4,
                                    backgroundColor: "#ff1744",
                                    color: "#FFF"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


export default ImagesUploaderStyles