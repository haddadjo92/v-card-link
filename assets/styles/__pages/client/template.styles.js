import { Poppins } from 'next/font/google'
import { borderRadius, lighten, transparentize } from 'polished'
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
        ...fontPoppins600.style,
        // textAlign: "center",
        borderBottom: "1px solid #DDD",
        marginBottom: 10,
        paddingBottom: 5
    }
}

const commonCard2Styles = {
    margin: "35px 24px 0px 24px",
    "& h5": {
        ...fontPoppins600.style,
        fontSize: 22,
        textAlign: "center",
        backgroundColor: "#f1f1f1",
        color: "#333",
        borderRadius: "20px 20px 0px 0px",
        padding: 15,
        marginBottom: 3
    },
    "& > .description, & > .contact-details, & > .content": {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: "0px 0px 20px 20px",
    }
}

const commonLinkWithIconAndTextStyles = {
    ...fontPoppins400.style,
    display: "flex",
    alignItems: "center",
    fontSize: 15,
    color: "#000",
    "& .icon-wrapper": {
        backgroundColor: "#111",
        width: 35,
        height: 35,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
        "& svg": {
            fontSize: 20,
            color: "#FFF"
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
                backgroundColor: "#eee",
                "& svg": {
                    fill: transparentize(.5, "#000"),
                    color: transparentize(.5, "#000"),
                    width: 30,
                    fontSize: 30
                },
                "&:hover": {
                    backgroundColor: "#333",
                    "& svg": {
                        fill: "#fff !important",
                        color: "#fff !important"
                    }
                }
            }
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

export const Template1Styles = {
    template1: {
        backgroundColor: "#111",
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
                    backgroundColor: lighten(.2, "#111"),
                    display: "inline-block",
                    padding: "5px 10px",
                    borderRadius: 120,
                    color: "#FFF",
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
                        backgroundColor: '#777',
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
                marginBottom: 25
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
                        backgroundColor: "#ffea00"
                    }
                },
                "& .title": {

                },
                "& .position": {

                },
                "& .companyName": {

                }
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
                    marginBottom: 15
                },
                "& .working-days": {
                    marginBottom: 24,
                    "& h6.sub-title": {
                        marginBottom: 15,
                    },
                    "& span": {
                        ...fontPoppins400.style,
                        backgroundColor: "#EEE",
                        padding: "5px 10px",
                        borderRadius: 60,
                        fontSize: 14,
                        "&:not(:last-child)": {
                            marginRight: 15
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
                                    border: "1px solid #333",
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
                            backgroundColor: "#333",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "& svg": {
                                color: "#FFF"
                            }
                        },
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





export const Template3Styles = {
    template3: {        

    }
}




