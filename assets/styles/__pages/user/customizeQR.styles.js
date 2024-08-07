import { darken, margin } from 'polished'

const CustomizeQRStyles = {
    customizeQR: {
        paddingBottom: 15,
        "& h1": {
            fontSize: 24,
            fontWeight: 600,
            "@media (max-width: 1200px)": {
                textAlign: "center"
            }
        },
        "& .inner-content": {
            marginTop: 60,
            marginLeft: 55,
            "& .left-section": {
                paddingRight: 100,
                "& .qr-code-wrapper": {
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: 300,
                    "& .content": {
                        position: "relative",
                        "& .qr-top-lines, .qr-bottom-lines": {
                            "&:before, &:after": {
                                position: "absolute",
                                display: "block",
                                content: "''",
                                width: 100,
                                height: 5,
                                backgroundColor: "#00b0ff"
                            }
                        },
                        "& .qr-top-lines": {
                            "&:before": {
                                transform: "rotate(90deg)",
                                top: 25,
                                left: -75
                            },
                            "&:after": {
                                top: -25,
                                left: -27
                            }
                        },
                        "& .qr-bottom-lines": {
                            "&:before": {
                                transform: "rotate(90deg)",
                                bottom: 25,
                                right: -75
                            },
                            "&:after": {
                                bottom: -25,
                                right: -27
                            }
                        },
                    }
                }
            },
            "& .right-section": {
                marginTop: -50,
                paddingLeft: 75,
                borderLeft: "1px solid #eee",
                "& > h3": {
                    fontSize: 18,
                    marginBottom: 10
                },
                "& .file-upload-wrapper": {
                    height: 38,
                    maxWidth: 400,
                    marginTop: 25,
                    "& input": {
                        height: 38,
                        padding: "7.5px 12px"
                    },
                    "&:after": {
                        height: `calc(30px - 20px)`,
                        lineHeight: `calc(30px - 20px)`,
                    },
                    "&:before": {
                        height: 38,
                        lineHeight: "38px"
                    }
                },
                "& .attachment-table-container": {
                    maxWidth: 400,
                    "& thead": {
                        backgroundColor: "#333",
                        "& th": {
                            color: "#fff"
                        }
                    },
                    "& tbody": {
                        "& .attachment-name": {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            wordWrap: "break-word",
                            "-webkit-box-orient": "vertical",
                            "-webkit-line-clamp": 1,
                            maxWidth: 250
                        },
                        "& .remove-attachment-btn": {
                            backgroundColor: "#ff5d5d",
                            "& svg": {
                                color: "#fff"
                            },
                            "&:hover": {
                                backgroundColor: darken(.2, "#ff5d5d"),
                            }
                        }
                    }
                },
                "& .logo-dimensions": {
                    maxWidth: 400,
                    "& label": {
                        fontSize: 14
                    },
                    "& input": {
                        padding: "7px 15px"
                    }
                }
            },
            "@media (max-width: 1200px)": {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: 0,
                "& > div > div": {
                    width: "100% !important",
                    maxWidth: "100% !important",
                    flex: "0 0 100% !important",
                    justifyContent: "center",
                    "& .left-section": {
                        display: "flex",
                        justifyContent: "center",
                        paddingRight: 0,
                    },
                    "& .right-section": {
                        border: "unset",
                        paddingLeft: 0,
                        marginTop: 50,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        "& .file-upload": {
                            maxWidth: 400,
                            margin: "0 auto",
                            width: "100%"
                        },
                        "& .logo-dimensions": {
                            flexWrap: "nowrap"
                        }
                    }
                }
            },
            "@media (max-width: 425px)": {
                "& > button": {
                    width: "100%"
                }
            }
        },

    }
}

export default CustomizeQRStyles