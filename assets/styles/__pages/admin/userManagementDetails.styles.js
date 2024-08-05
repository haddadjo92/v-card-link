

const UserManagementDetailStyles = {
    userManagementDetails: {
        "& .error-fetching-user-profile": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "calc(100vh - 64px)",
            "& h1": {
                fontSize: 24,
                marginBottom: 15
            },
            "& button": {
                width: 150
            }
        },
        "& > div > .content": {
            paddingTop: 15,
            "& > h1": {
                fontSize: 40,
                marginBottom: 25,
                "@media (max-width: 991px)": {
                    textAlign: "center",
                    marginBottom: 40
                }
            },

            "& > div": {
                "& .qr-form": {
                    "& > button": {
                        width: 150,
                        "@media (max-width: 991px)": {
                            width: "100%",
                        }
                    }
                },
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
                    },
                    "@media (max-width: 991px)": {
                        marginBottom: 30
                    }
                },
                "@media (max-width: 991px)": {
                    flexDirection: "column-reverse",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 15
                }
            }
        }
    }
}


export default UserManagementDetailStyles