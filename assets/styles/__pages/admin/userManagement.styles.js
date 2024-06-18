


const UserManagementStyles = {
    userManagement: {
        "& > div > .content": {
            paddingTop: 15,
            "& > h1": {
                fontSize: 40,
                marginBottom: 25
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
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export default UserManagementStyles