import { darken, transparentize } from 'polished'

const QrCodeGeneratorStyles = {
    qrCodeGenerator: {
        "& > div > .content": {
            paddingTop: 15,
            "& > h1": {
                fontSize: 40,
                marginBottom: 25,
                "@media (max-width: 386px)": {
                    fontSize: 32,
                }
            },
            "& .MuiTabs-flexContainer": {
                "& button": {
                    color: "#333!important",
                    textTransform: "capitalize"
                }
            },
            "& .MuiTabs-indicator": {
                backgroundColor: "#333"
            },
            "& .generate-new-qr": {
                "& .generateQrCodeItem": {
                    marginBottom: 25,
                    "& > span": {
                        fontSize: 18,
                        minWidth: 150
                    },
                    "& .control": {
                        minWidth: 400,
                        margin: "0px 15px",
                        "&.textfield": {
                            "& input": {
                                padding: "7.5px 12px"
                            }
                        },
                        "&.file": {
                            "& .file-upload-wrapper": {
                                height: 38,
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
                            }
                        }
                    },
                    "& .generate": {
                        display: "flex",
                        alignItems: "center",
                        "& button": {
                            marginLeft: 5,
                            textTransform: "capitalize",
                            textDecoration: "underline",
                            color: "#AAA",
                            "&:disabled": {
                                color: transparentize(.5, "#AAA"),
                            }
                        }
                    }
                },
                "& > div": {
                    "@media (max-width: 750px)": {
                        flexDirection: "column",
                        alignItems: "flex-start",
                        borderBottom: "1px solid #eee",
                        "& .control": {
                            margin: "0px !important",
                            width: "100%",
                            minWidth: "100% !important"
                        }
                    }
                },
            },
            "& .generated-qrs": {
                "& table": {
                    "& thead": {
                        backgroundColor: "#333",
                        "& tr": {
                            "& th": {
                                color: "#FFF",
                                padding: "10px 15px",
                                "&:first-child": {
                                    borderRadius: "12px 0px 0px 0px !important",
                                },
                                "&:last-child": {
                                    borderRadius: "0px 12px 0px 0px !important",
                                },
                            }
                        }
                    },
                    "& tbody": {
                        "& tr": {
                            '&:last-child td, &:last-child th': {
                                border: 0
                            },
                            "& td": {
                                whiteSpace: "nowrap",
                                maxWidth: 250,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                "& .loading-wrapper": {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "15px",
                                    "& svg": {
                                        color: "#333"
                                    }
                                },
                                "& .view-qr-btn": {
                                    color: "#AAA",
                                    textTransform: "capitalize",
                                    textDecoration: "underline"
                                },
                                "& .toggle-activate-btn": {
                                    textTransform: "capitalize",
                                    boxShadow: "unset!important",
                                    borderRadius: 60,
                                    minWidth: 101.797,
                                    "&.active": {
                                        backgroundColor: "#f50057!important",
                                        "&:hover": {
                                            backgroundColor: darken(.1, "#f50057") + "!important"
                                        }
                                    },
                                    "&.inactive": {
                                        backgroundColor: "#8bc34a!important",
                                        "&:hover": {
                                            backgroundColor: darken(.1, "#8bc34a") + "!important"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}



const QRDialogStyles = {
    qrDialog: {

    },
    dialogTitle: {
        padding: "10px 24px",
        "@media(max-width: 991px)": {
            textAlign: "center"
        }
    },
    dialogContent: {
        minHeight: 350,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .qr-code-wrapper": {
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
    dialogActions: {
        "@media(max-width: 991px)": {
            // display: "flex",
            justifyContent: "center !important"
        }
    }
}

export { QRDialogStyles }
export default QrCodeGeneratorStyles