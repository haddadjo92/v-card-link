import { Poppins } from 'next/font/google'
import { lighten, transparentize, wordWrap } from 'polished'
// *** assets ***
import bg1 from '@/assets/images/bg1.jpg'

// ********************* Fonts *********************
const fontPoppins400 = Poppins({ weight: "400", subsets: ['latin'] })
const fontPoppins500 = Poppins({ weight: "500", subsets: ['latin'] })
const fontPoppins600 = Poppins({ weight: "600", subsets: ['latin'] })
const fontPoppins700 = Poppins({ weight: "700", subsets: ['latin'] })


// ********************* Common Styles *********************
const commonCardStyles = {
    backgroundColor: "#FFF",
    borderRadius: 12,
    margin: "24px 24px 0px 24px",
    padding: 15,
    "& h5": {
        color: theme => theme.primaryColor,
        ...fontPoppins600.style,
        borderBottom: theme => `1px solid ${theme.primaryColor}`,
        marginBottom: 10,
        paddingBottom: 5
    },
    "& > .description, & > .contact-details, & > .content": {
        color: theme => theme.secondaryColor,
    }
}

const commonCard2Styles = {
    margin: "35px 24px 0px 24px",
    "& h5": {
        ...fontPoppins600.style,
        fontSize: 22,
        textAlign: "center",
        backgroundColor: "#f1f1f1",
        color: theme => theme.primaryColor,
        borderRadius: "20px 20px 0px 0px",
        padding: 15,
        marginBottom: 3
    },
    "& > .description, & > .contact-details, & > .content": {
        backgroundColor: "#FFF",
        color: theme => theme.secondaryColor,
        padding: 15,
        borderRadius: "0px 0px 20px 20px",
    }
}

const commonCard3Styles = {
    margin: "50px 24px 0px 24px",
    "& h5": {
        ...fontPoppins600.style,
        fontSize: 18,
        marginBottom: 10,
        position: "relative",
        letterSpacing: 1,
        "& span": {
            backgroundColor: theme => theme.iconColor,
            display: "inline-block",
            color: theme => theme.primaryColor,
            padding: "5px 10px",
            borderRadius: "6px 6px 0px 0px"
        },
        "&:after": {
            content: "''",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 1,
            backgroundColor: theme => theme.iconColor,
        }
    },
    "& .description": {
        ...fontPoppins400.style,
        fontSize: 16,
        color: theme => theme.secondaryColor,
        letterSpacing: -.5,
        lineHeight: "30px"
    }
}

const commonCard4Styles = {
    margin: "50px 24px 0px 24px",
    "& h5": {
        ...fontPoppins600.style,
        fontSize: 24,
        color: theme => theme.primaryColor,
        position: "relative",
        paddingLeft: 40,
        marginBottom: 10,
        paddingBottom: 10,
        // borderBottom: "1px solid #e3e3e3",
        borderBottom: theme => `1px solid ${theme.iconColor}`,
        "&:before": {
            content: "''",
            position: "absolute",
            top: "10%",
            left: 0,
            width: 25,
            height: 25,
            borderRadius: 4,
            backgroundColor: theme => theme.iconColor,
            transform: "rotate(45deg)",
            zIndex: 1
        },
    },
    "& > .description, & > .contact-details, & > .content": {
        ...fontPoppins400.style,
        fontSize: 16,
        color: theme => theme.secondaryColor,
        letterSpacing: -.5,
        lineHeight: "30px"
    }
}

const commonLinkWithIconAndTextStyles = {
    ...fontPoppins400.style,
    display: "flex",
    alignItems: "center",
    fontSize: 15,
    color: theme => theme.secondaryColor,
    "& .icon-wrapper": {
        backgroundColor: theme => theme.iconColor,
        width: 35,
        height: 35,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
        "& svg": {
            fontSize: 20,
            color: theme => theme.secondaryColor
        }
    }
}


const commonFollowMeStyles = {
    "& .content": {
        display: "flex",
        flexWrap: "wrap",
        paddingTop: 25,
        "& .social-link-wrapper": {
            flex: "0 0 20%",
            maxWidth: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& a": {
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                borderRadius: 8,
                marginBottom: 25,
                backgroundColor: theme => theme.iconColor,
                "& svg": {
                    fill: transparentize(.5, "#000"),
                    color: transparentize(.5, "#000"),
                    width: 30,
                    fontSize: 30
                },
                "&:hover": {
                    backgroundColor: theme => theme.iconColor,
                    "& svg": {
                        fill: theme => `${theme.primaryColor} !important`,
                        color: theme => `${theme.primaryColor} !important`
                    }
                }
            },
            "@media (max-width: 422px)": {
                flex: "0 0 25%",
                maxWidth: "25%",
            },
            "@media (max-width: 350px)": {
                flex: "0 0 33.333333333%",
                maxWidth: "33.333333333%",
            },
        }
    }
}

const nextImageFillModeStyles = {
    position: "static !important",
    height: "auto !important",
    width: "auto !important",
    left: "unset !important",
    right: "unset !important",
    bottom: "unset !important"
}

// ************************* Template 1 *************************
export const Template1Styles = {
    template1: {
        backgroundColor: "#000",
        paddingBottom: 24,
        "& section.hero-section": {
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            position: "relative",
            "&:before": {
                content: "''",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,.15)",
            },
            "& .person-details": {
                position: "absolute",
                bottom: 0,
                left: 10,
                width: "100%",
                height: "35vh",
                zIndex: 1,
                color: "#FFF",
                "& h1.fullName": {
                    ...fontPoppins600.style,
                    fontSize: 72,
                    "@media(max-width: 768px)": {
                        fontSize: 64,
                    },
                    "@media(max-width: 540px)": {
                        fontSize: 54,
                    },
                    "@media(max-width: 450px)": {
                        fontSize: 48,
                    },
                    "@media(max-width: 390px)": {
                        fontSize: 35,
                    },
                },
                "& p.title, & p.position": {
                    ...fontPoppins400.style,
                    fontSize: 18,
                    marginTop: 5
                },
                "& p.companyName": {
                    fontSize: 16,
                    marginTop: 10
                }
            },
        },
        "& section.about-me, & section.description": {
            ...commonCardStyles,
            "& .description": {
                ...fontPoppins400.style,
                fontSize: 16,
            }
        },
        "& section.contact": {
            ...commonCardStyles,
            "& .contact-details": {
                padding: "15px 5px 0px 5px",
                "& > a": {
                    textDecoration: "none",
                    "&:hover": {
                        "& span": {
                            textDecoration: "underline",
                        }
                    }
                },
                "& > a, & > span": {
                    ...commonLinkWithIconAndTextStyles,
                    color: theme => theme.secondaryColor,
                    marginBottom: 15,
                }
            }
        },
        "& section.photo-gallery": {
            margin: "24px 24px 0px 24px",
            "& img": {
                ...nextImageFillModeStyles,
                width: "100% !important",
                borderRadius: 12,
                "&:not(:last-child)": {
                    marginBottom: 24,
                }
            }
        },
        "& section.website": {
            ...commonCardStyles,
            "& .content": {
                padding: "10px 15px",
                display: "inline-block",
                "& a": {
                    ...commonLinkWithIconAndTextStyles,
                }
            }
        },
        "& section.working-details": {
            ...commonCardStyles,
            "& .working-days, & .working-hours": {
                "& h6.sub-title": {
                    ...fontPoppins600.style,
                    fontSize: 16,
                    backgroundColor: theme => theme.primaryColor,
                    display: "inline-block",
                    padding: "5px 10px",
                    borderRadius: 120,
                    color: "#fff",
                    marginBottom: 10
                }
            },
            "& .working-days": {
                marginBottom: 15,
                "& .content": {
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    paddingBottom: 10,
                    "& span": {
                        backgroundColor: theme => theme.secondaryColor,
                        padding: "5px 10px",
                        borderRadius: 120,
                        color: "#FFF",
                        marginRight: 10
                    }
                }
            },
            "& .working-hours": {
                "& .content": {
                    display: "flex",
                    alignItems: "center",
                    color: theme => theme.secondaryColor,
                    "& .working-hours-from, .working-hours-to": {
                        ...fontPoppins500.style,
                        fontSize: 22
                    },
                    "& .icon-wrapper": {
                        padding: "0px 5px",
                        "& svg": {
                            fontSize: 30
                        }
                    },
                }
            },
        },
        "& .follow-me": {
            ...commonCardStyles,
            ...commonFollowMeStyles
        }
    }
}

// ************************* Template 2 *************************
export const Template2Styles = {
    template2: {
        backgroundColor: "#FFF",
        backgroundImage: `url(${bg1.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        paddingBottom: 24,
        "& .hero-section": {
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            "& .avatar": {
                width: 300,
                height: 300,
                borderRadius: "50%",
                margin: "0 auto",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                border: "10px solid #FFF",
                marginBottom: 25,
                "@media (max-width: 512px)": {
                    width: 250,
                    height: 250,
                }
            },
            "& .person-details": {
                "& h1.fullName": {
                    ...fontPoppins700.style,
                    fontSize: 52,
                    textAlign: "center",
                    marginBottom: 10
                },
                "& .title, .position, .companyName": {
                    ...fontPoppins400.style,
                    position: "relative",
                    marginLeft: 40,
                    fontSize: 20,
                    marginBottom: 10,
                    "&:before": {
                        content: "''",
                        position: "absolute",
                        top: "calc(50% - 10px)",
                        left: -40,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: theme => theme.primaryColor
                    }
                },
                "& .title": {

                },
                "& .position": {

                },
                "& .companyName": {

                },
                "@media (max-width: 512px)": {
                    "& h1.fullName": {
                        fontSize: 48,
                    },
                    "& .title, .position, .companyName": {
                        fontSize: 18,
                    }
                },
                "@media (max-width: 410px)": {
                    "& h1.fullName": {
                        fontSize: 42,
                    },
                    "& .title, .position, .companyName": {
                        fontSize: 16,
                    }
                },
            }
        },
        "& section.about-me": {
            ...commonCard2Styles
        },
        "& section.description": {
            ...commonCard2Styles
        },
        "& section.contact": {
            ...commonCard2Styles,
            "& .contact-details": {
                // padding: "15px 5px 0px 5px",
                "& > a": {
                    textDecoration: "none",
                    color: "#000",
                    "&:hover": {
                        "& span": {
                            textDecoration: "underline",
                        }
                    }
                },
                "& > a, & > span": {
                    ...commonLinkWithIconAndTextStyles,
                    marginBottom: 15,
                }
            }
        },
        "& section.photo-gallery": {
            margin: "35px 24px 0px 24px",
            "& img": {
                ...nextImageFillModeStyles,
                width: "100% !important",
                borderRadius: 20,
                "&:not(:last-child)": {
                    marginBottom: 24,
                }
            }
        },
        "& section.website": {
            ...commonCard2Styles,
            "& .content": {
                "& a": {
                    display: "inline-block",
                    ...commonLinkWithIconAndTextStyles,
                }
            }
        },
        "& section.working-details": {
            ...commonCard2Styles,
            "& .content": {
                "& h6.sub-title": {
                    ...fontPoppins500.style,
                    marginBottom: 15,
                },
                "& .working-days": {
                    marginBottom: 24,
                    "& h6.sub-title": {
                        marginBottom: 15,
                    },
                    "& span": {
                        ...fontPoppins400.style,
                        padding: "5px 10px",
                        display: "inline-block",
                        borderRadius: 60,
                        fontSize: 14,
                        backgroundColor: theme => theme.iconColor,
                        color: theme => theme.primaryColor,
                        marginTop: 2,
                        "&:not(:last-child)": {
                            marginRight: 15,
                        }
                    }
                },
                "& .working-hours": {
                    "& .content": {
                        display: "flex",
                        alignItems: "center",
                        "& .working-hours-from, & .working-hours-to": {
                            "& span": {
                                ...fontPoppins400.style,
                                "&:nth-child(1)": {
                                    fontSize: 20,
                                    marginRight: 5
                                },
                                "&:nth-child(2)": {
                                    border: theme => `1px solid ${theme.iconColor}`,
                                    padding: "5px 10px",
                                    borderRadius: 120,
                                    fontSize: 14,
                                }
                            }
                        },
                        "& .icon-wrapper": {
                            margin: "0 10px",
                            width: 35,
                            height: 35,
                            backgroundColor: theme => theme.iconColor,
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "& svg": {
                                color: "#FFF"
                            }
                        },
                        "@media(max-width: 422px)": {
                            "& .working-hours-from, & .working-hours-to": {
                                "& span": {
                                    "&:nth-child(1)": {
                                        fontSize: 18
                                    }
                                }
                            },
                            "& .icon-wrapper": {
                                width: 30,
                                height: 30,
                            }
                        },
                        "@media(max-width: 415px)": {
                            "& > div:first-child, & > div:last-child": {
                                flex: "0 0 45%",
                                maxWidth: "45%",
                                "& span:nth-child(1)": {
                                    display: "block"
                                }
                            },
                            "& > div:last-child": {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                            },
                            "& > div:nth-child(2)": {
                                flex: "0 0 10%",
                                maxWidth: "10%",
                                margin: 0
                            }
                        }
                    }
                }
            }
        },
        "& section.follow-me": {
            ...commonCard2Styles,
            ...commonFollowMeStyles,
            "& .content .social-link-wrapper a": {
                borderRadius: "50% !important"
            }
        }
    }
}

// ************************* Template 3 *************************
export const Template3Styles = {
    template3: {
        backgroundColor: "#fff",
        "& .hero-section": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            "& .inner-content": {
                zIndex: 2,
                maxWidth: 800,
                width: "calc(100% - 100px)",
                backgroundColor: "#fff",
                borderRadius: 20,
                display: "flex",
                height: "100%",
                maxHeight: 450,
                position: "relative",
                boxShadow: "1px 1px 5px #dfdfdf",
                "&:before, &:after": {
                    content: "''",
                    position: "absolute",
                    zIndex: 1,
                    width: "calc(100% + 100px)",
                    height: 300,
                },
                "&:before": {
                    backgroundColor: theme => theme.iconColor,
                    top: "-80px",
                    left: -50,
                    transform: "skewY(5deg)",
                },
                "& .avatar": {
                    flex: "0 0 40%",
                    maxWidth: "40%",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "20px 0px 0px 20px",
                    zIndex: 2,
                },
                "& .person-details": {
                    zIndex: 2,
                    flex: "0 0 60%",
                    maxWidth: "60%",
                    padding: 20,
                    backgroundColor: "#fff",
                    borderRadius: "0px 20px 20px 0px",
                    "& h1.fullName": {
                        ...fontPoppins700.style,
                        fontSize: 48,
                        color: "#2A2A2A",
                        wordWrap: "break-word",
                        "@media (max-width: 546px)": {
                            fontSize: 38
                        },
                        "@media (max-width: 466px)": {
                            fontSize: 36
                        },
                        "@media (max-width: 442px)": {
                            fontSize: 32
                        },
                    },
                    "& .title": {
                        ...fontPoppins500.style,
                        fontSize: 22,
                        color: "#4C4C4C",             
                        "@media (max-width: 546px)": {
                            fontSize: 20
                        },
                        "@media (max-width: 466px)": {
                            fontSize: 18
                        },
                        "@media (max-width: 442px)": {
                            fontSize: 16
                        }
                    },
                    "& .position": {
                        ...fontPoppins400.style,
                        fontSize: 18,
                        color: "#6C6C6C",
                    },
                    "& .companyName": {
                        ...fontPoppins400.style,
                        fontSize: 18,
                        color: "#8C8C8C",
                    },
                    "& .position, .companyName": {
                        "@media (max-width: 546px)": {
                            fontSize: 16
                        },
                        "@media (max-width: 466px)": {
                            fontSize: 14
                        },
                        // "@media (max-width: 442px)": {
                        //     fontSize: 16
                        // }
                    }
                },
                "@media (max-width: 732px)": {
                    flexDirection: "column",
                    "& .avatar": {
                        flex: "0 0 50%",
                        maxWidth: "100%",
                        width: "100%",
                        borderRadius: "20px 20px 0px 0px",
                        backgroundPosition: "top",
                    },
                    "& .person-details": {
                        flex: "0 0 50%",
                        maxWidth: "100%",
                        width: "100%",
                        borderRadius: "0px 0px 20px 20px",
                    }
                },
            }
        },
        "& section.about-me": {
            ...commonCard3Styles,
            marginTop: 0
        },
        "& section.description": {
            ...commonCard3Styles
        },
        "& section.contact": {
            ...commonCard3Styles,
            "& .contact-details": {
                padding: "10px 0px",
                "& a": {
                    marginBottom: 15,
                },
                "& a, & > span": {
                    ...fontPoppins400.style,
                    display: "inline-flex",
                    alignItems: "center",
                    textDecoration: "none",
                    "& .icon-wrapper": {
                        marginRight: 10,
                        "& svg": {
                            color: theme => theme.iconColor,
                            verticalAlign: "middle"
                        }
                    },
                    "& span": {
                        color: theme => theme.secondaryColor,

                    },
                }
            }
        },
        "& section.photo-gallery": {
            margin: "24px 24px 0px 24px",
            "& img": {
                ...nextImageFillModeStyles,
                width: "100% !important",
                borderRadius: 12,
                "&:not(:last-child)": {
                    marginBottom: 24,
                }
            }
        },
        "& section.website": {
            ...commonCard3Styles,
            "& .content": {
                padding: "12.5px 5px",
                "& a": {
                    display: "inline-flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: theme => theme.primaryColor,
                    "& .icon-wrapper": {
                        marginRight: 10,
                        "& svg": {
                            color: theme => theme.iconColor,
                            fontSize: 25
                        }
                    },
                    "& span": {
                        ...fontPoppins400.style
                    }
                }
            }
        },
        "& section.working-details": {
            ...commonCard3Styles,
            "& .working-days, & .working-hours": {
                "& h6.sub-title": {
                    ...fontPoppins600.style,
                    fontSize: 16,
                    // backgroundColor: lighten(.2, "#bbb"),
                    backgroundColor: theme => theme.iconColor,
                    display: "inline-block",
                    padding: "2.5px 10px",
                    borderRadius: 120,
                    color: theme => theme.primaryColor,
                    marginBottom: 10
                }
            },
            "& .working-days": {
                paddingTop: 5,
                marginBottom: 15,
                "& .content": {
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    paddingBottom: 10,
                    "& span": {
                        ...fontPoppins400.style,
                        fontSize: 14,
                        backgroundColor: theme => theme.secondaryColor,
                        border: theme => `1px solid ${theme.iconColor}`,
                        padding: "5px 10px",
                        borderRadius: 120,
                        color: "#fff",
                        marginRight: 10
                    }
                }
            },
            "& .working-hours": {
                "& .content": {
                    display: "flex",
                    alignItems: "center",
                    "& .working-hours-from, .working-hours-to": {
                        ...fontPoppins500.style,
                        fontSize: 18,
                        color: theme => theme.secondaryColor
                    },
                    "& .icon-wrapper": {
                        padding: "0px 5px",
                        "& svg": {
                            color: theme => theme.iconColor,
                            fontSize: 30
                        }
                    },
                }
            },
        },
        "& section.follow-me": {
            ...commonCard3Styles,
            ...commonFollowMeStyles
        }
    }
}

// ************************* Template 4 *************************
export const Template4Styles = {
    template4: {
        backgroundColor: "#fff",
        paddingBottom: 50,
        "& section.hero-section": {
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            "& .content": {
                backgroundColor: "#f1f1f1",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "100px 0px",
                position: "relative",
                "& .inner-content": {
                    display: "flex",
                    zIndex: 1,
                    "& .left": {
                        minWidth: 300,
                        paddingRight: 25,
                        "& .img-wrapper, & .img-frame": {
                            margin: "0 auto",
                            transformOrigin: "50% 50%",
                            overflow: "hidden",
                            width: 200,
                            height: 200,
                            borderRadius: 12,
                        },
                        "& .img-wrapper": {
                            transform: "rotate(45deg) translateY(10px)",
                            border: "1px solid #eee",
                            "& .img-frame": {
                                width: 300,
                                height: 300,
                                transform: "rotate(-45deg) translateY(-64px)",
                                "& img": {
                                    width: "100%",
                                    height: "auto"
                                },                                
                            }
                        },
                        "@media(max-width: 640px)": {
                            minWidth: 250,
                        }
                    },
                    "& .right": {
                        "& .person-details": {
                            maxWidth: 391.547,
                            overflow: "hidden",
                            "& h1.fullName": {
                                ...fontPoppins700.style,
                                fontSize: 37,
                            },
                            "& .title": {
                                ...fontPoppins400.style,
                                fontSize: 22,
                            },
                            "& .position": {
                                ...fontPoppins400.style,
                                fontSize: 18,
                            },
                            "& .companyName": {
                                ...fontPoppins400.style,
                                fontSize: 16,
                            },
                            "@media(max-width: 711px)": {
                                marginTop: 50
                            }
                        }
                    },
                    "@media(max-width: 640px)": {
                        flexDirection: "column"
                    }
                },
                "&:before, &:after": {
                    content: "''",
                    position: "absolute",
                    width: 200,
                    height: 200,
                    borderRadius: 12,
                    transform: "rotate(45deg)",
                },
                "&:before": {
                    top: "25%",
                    left: "calc(25% + 50px)",
                    backgroundColor: "#dbdbdb",
                    zIndex: 1
                },
                "&:after": {
                    top: "25%",
                    left: "calc(25% + 200px)",
                    transform: "rotate(45deg)",
                    backgroundColor: "#e9e9e9",
                },
                "@media(max-width: 711px)": {
                    "&:before": {
                        left: "calc(25% + 25px)",
                    },
                    "&:after": {
                        left: "calc(25% + 150px)",
                    }
                },
                "@media(max-width: 640px)": {
                    "&:before, &:after": {                        
                        width: 100,
                        height: 100,
                    },
                    "&:before": {
                        top: "calc(25% + 25px)",
                        left: 50,
                    },
                    "&:after": {   
                        top: "calc(25% + 25px)",                        
                        right: "60%",
                    } 
                },
                "@media(max-width: 410px)": {
                    "&:before, &:after": {                        
                        width: 50,
                        height: 50,
                    },
                    "&:before": {
                        top: "calc(25% + 12.5px)",
                        left: 25,
                    },
                    "&:after": {   
                        top: "calc(25% + 12.5px)",                        
                        right: "100%",
                    } 
                },
            }
        },
        "& section.about-me": {
            ...commonCard4Styles
        },
        "& section.description": {
            ...commonCard4Styles
        },
        "& section.contact": {
            ...commonCard4Styles,
            "& .contact-details": {
                padding: "15px 0px 0px 0px",
                "& > a": {
                    textDecoration: "none",
                    color: "#000",
                    "&:hover": {
                        "& span": {
                            textDecoration: "underline",
                        }
                    }
                },
                "& > a, & > span": {
                    ...commonLinkWithIconAndTextStyles,
                    marginBottom: 15,
                }
            }
        },
        "& section.photo-gallery": {
            margin: "24px 24px 0px 24px",
            "& img": {
                ...nextImageFillModeStyles,
                width: "100% !important",
                borderRadius: 12,
                "&:not(:last-child)": {
                    marginBottom: 24,
                }
            }
        },
        "& section.website": {
            ...commonCard4Styles,
            "& .content": {
                padding: "10px 0px",
                display: "inline-block",
                "& a": {
                    ...commonLinkWithIconAndTextStyles,
                }
            }
        },
        "& section.working-details": {
            ...commonCard4Styles,
            "& .working-days, & .working-hours": {
                "& h6.sub-title": {
                    ...fontPoppins600.style,
                    fontSize: 16,
                    backgroundColor: theme => lighten(.2, theme.iconColor),
                    display: "inline-block",
                    padding: "2.5px 10px",
                    borderRadius: 120,
                    color: "#333",
                    marginBottom: 10
                }
            },
            "& .working-days": {
                paddingTop: 5,
                marginBottom: 15,
                "& .content": {
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    paddingBottom: 10,
                    "& span": {
                        ...fontPoppins400.style,
                        fontSize: 14,
                        backgroundColor: theme => theme.iconColor,
                        color: theme => theme.secondaryColorColor,
                        padding: "5px 10px",
                        borderRadius: 120,
                        marginRight: 10
                    }
                }
            },
            "& .working-hours": {
                "& .content": {
                    display: "flex",
                    alignItems: "center",
                    "& .working-hours-from, .working-hours-to": {
                        ...fontPoppins500.style,
                        fontSize: 18
                    },
                    "& .icon-wrapper": {
                        padding: "0px 5px",
                        "& svg": {
                            fontSize: 30,
                            color: theme => theme.iconColor
                        }
                    },
                }
            },
        },
        "& section.follow-me": {
            ...commonCard4Styles,
            ...commonFollowMeStyles
        }
    }
}







