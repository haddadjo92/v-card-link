



const QrCodeGeneratorStyles = {
    qrCodeGenerator: {
        "& > div > .content": {
            paddingTop: 15,
            "& > h1": {
                fontSize: 40,
                marginBottom: 25
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
                        }
                    },
                    "& .generate": {
                        display: "flex",
                        alignItems: "center",
                        "& button": {
                            marginLeft: 5,
                            textTransform: "capitalize",
                            textDecoration: "underline",
                            color: "#AAA"
                        }
                    }
                }
            }
        }
    }
}


export default QrCodeGeneratorStyles