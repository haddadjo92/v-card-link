


const NewUserStyles = {
    newUser: {
        "& > div > .content": {
            paddingTop: 15,
            paddingBottom: 20,
            "& > h1": {
                fontSize: 40,
                marginBottom: 25,
                "@media(max-width: 991px)": {
                    textAlign: "center",
                    marginBottom: 50
                }
            },
            "& .qr-form": {
                "& > button": {
                    width: 150
                }
            },
            "& .qr-code-wrapper": {
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                "& .qr-code-shader": {
                    position: "absolute",
                    top: "calc(50% - 150px)",
                    left: "calc(50% - 150px)",
                    width: 300,
                    height: 300,
                    backgroundColor: "#111",
                    borderRadius: 30,
                    zIndex: 11,
                    "&.disabled": {
                        zIndex: -11,
                        opacity: 0
                    }
                },
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
            },
            "@media(max-width: 991px)": {
                "& > div": {
                    flexDirection: "column-reverse",
                    alignItems: "center",

                    "& > div": {
                        maxWidth: "100% !important",
                        width: "100% !important",
                        flex: "0 0 100% !important",
                        "&:nth-child(2)": {
                            "& .qr-code-wrapper": {
                                marginBottom: 50,
                                "& .qr-code-shader": {
                                    width: 170,
                                    height: 170,
                                    top: "calc(50% - 85px)",
                                    left: "calc(50% - 85px)",
                                }
                            }
                        }
                    }
                }
            },
            "@media(max-width: 425px)": {
                "& > div > div:nth-child(1) > form > button": {
                    width: "100%",
                }
            }
        }
    }
}


export default NewUserStyles