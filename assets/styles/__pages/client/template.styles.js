import { Poppins } from 'next/font/google'
import { lighten, transparentize } from 'polished'

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
    }
}




