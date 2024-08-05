

const UserManagementStyles = {
    userManagement: {
        "& > div > .content": {
            paddingTop: 15,
            "& > h1": {
                fontSize: 28,
                marginBottom: 15,
                "@media (max-width: 500px)": {
                    textAlign: "center"
                }
            },
            "& > .top-section": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 15,
                "& .right": {
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    "& > div:nth-child(1)": {
                        marginRight: 5,
                        "& input": {
                            padding: "10px"
                        },
                        "& > div > div > div": {
                            padding: "10px 32px 10px 16px"
                        }
                    },
                    "& > div:nth-child(2)": {
                        "& input": {
                            padding: "10px"
                        }
                    }
                },
                "@media (max-width: 500px)": {
                    flexDirection: "column",
                    "& > button": {
                        marginBottom: 15
                    }
                }
            },
            "& > div": {
                borderRadius: "12px 12px 0px 0px !important",
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
                                "& .no-data": {
                                    backgroundColor: "#ff9800",
                                    color: "#fff",
                                    padding: 5,
                                    borderRadius: 3,
                                },
                                "& .phoneNumber": {
                                    display: "flex",
                                    alignItems: "center",
                                    "& span:nth-child(1)": {
                                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                                        color: "#fff",
                                        padding: 5,
                                        borderRadius: 3,
                                        marginRight: 5
                                    }
                                },
                                "&.view-qr-code": {
                                    "& a": {
                                        fontSize: 16,
                                        color: "#888"
                                    }
                                },
                                "& .management-checks": {
                                    display: "flex",
                                    alignItems: "center"
                                },
                                "& .loading-wrapper": {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "15px",
                                    "& svg": {
                                        color: "#333"
                                    }
                                },
                                "& .no-data-presented": {
                                    padding: 15,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    "& .icon-wrapper": {
                                        width: 100,
                                        height: 100,
                                        borderRadius: "50%",
                                        backgroundColor: "#333",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        "& svg": {
                                            color: "#fff",
                                            fontSize: 50
                                        }
                                    },
                                    "& p": {
                                        fontSize: 22,
                                        marginTop: 15
                                    }
                                },
                            }
                        }
                    }
                }
            }
        }
    },
    pagination: {
        marginTop: 25,
        "& nav": {
            "& ul": {
                "& li": {
                    "&:first-child, &:last-child": {
                        "& button": {
                            backgroundColor: "#333",
                            color: "#fff",
                        }
                    },
                    "&:first-child": {
                        marginRight: "auto"
                    },
                    "&:last-child": {
                        marginLeft: "auto"
                    },
                }
            }
        }
    }
}

export default UserManagementStyles