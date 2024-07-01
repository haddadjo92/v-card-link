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
                }
            }
        }
    }
}


export default CustomizeProfileStyles