import { transparentize } from 'polished'


const CustomizeProfileStyles = {
    customizeProfile: {
        "& > div > .content": {
            paddingTop: 25,
            "& .MuiTabs-flexContainer": {
                "& button": {
                    color: "#333!important",
                    textTransform: "capitalize"
                }
            },
            "& .MuiTabs-indicator": {
                backgroundColor: "#333"
            },
            "& section.content-section": {
                paddingBottom: 20,
                "& > .loading-progress": {
                    height: "calc(100vh - 64px - 74px - 100px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& svg": {
                        color: "#333!important"
                    }
                },
                "& .MuiFormControl-root": {
                    "& input": {
                        padding: "10px 16px"
                    }
                },
                "& .MuiSelect-select": {
                    padding: "10px 16px",
                    "& + input": {
                        padding: "0px !important",
                    }
                },
                "& .section1, .section2": {
                    "& > div": {
                        "& button": {
                            "& *": {
                                pointerEvents: "none"
                            }
                        }
                    }
                },
                "& .social-links": {
                    display: "flex",
                    flexWrap: "wrap",

                    "& .btn-wrapper": {
                        flex: "0 0 20%",
                        maxWidth: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& button": {
                            borderRadius: 8,
                            marginBottom: 15,
                            backgroundColor: "#eee",
                            "& svg": {
                                fill: transparentize(.5, "#000"),
                                color: transparentize(.5, "#000"),
                                width: 30,
                                fontSize: 30
                            },
                            "& *": {
                                pointerEvents: "none"
                            },
                        }
                    }
                },
                "@media (max-width:991px)": {
                    "& > form > div > div": {
                        width: "100% !important",
                        minWidth: "100% !important",
                        maxWidth: "100% !important",
                    }
                }
            },
            "& section.design-settings": {
                "& .user-template": {
                    "& .template-wrapper": {
                        maxWidth: 350,
                        height: 550,
                        overflow: "auto"
                    },
                    "& .btn-wrapper": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 25,
                        "& button": {
                            textTransform: "capitalize",
                            borderRadius: 60,
                            fontSize: 16,
                            borderColor: "#333",
                            color: "#333",
                            "& *": {
                                pointerEvents: "none"
                            },
                            "&.selected": {
                                "&, &:hover": {
                                    backgroundColor: "#333",
                                    color: "#fff"
                                }
                            }
                        }
                    }
                },
                "& .template-theme-colors": {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "50px 0px 50px 0px",
                    "& > div": {
                        flex: "0 0 33.333333333%",
                        display: "flex",
                        justifyContent: "center",
                        "& > div": {
                            display: "flex",
                            flexDirection: "column",
                            "& h5": {
                                fontSize: 16,
                                marginBottom: 10,
                                fontWeight: 600
                            }
                        }
                    }
                },
                "@media(max-width: 1366px)": {
                    "& > div:nth-child(1) > div": {
                        minWidth: "50% !important",
                        maxWidth: "50% !important",
                        width: "50% !important",
                        flex: "0 0 50% !important",
                        "& > div.user-template": {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }
                    },
                    "& > button": {
                        maxWidth: 143.484,
                        display: "block",
                        margin: "0 auto"
                    }
                },
                "@media(max-width: 767px)": { 
                    "& > div:nth-child(1) > div": {
                        minWidth: "100% !important",
                        maxWidth: "100% !important",
                        width: "100% !important",
                        flex: "0 0 100% !important",
                    },
                    "& .template-theme-colors": {
                        flexDirection: "column",
                        "& > div": {
                            flex: "0 0 100% !important",
                            maxWidth: "100% !important",
                            width: "100% !important",
                            marginBottom: 25
                        }
                    }
                }
            }
        }
    }
}


export default CustomizeProfileStyles