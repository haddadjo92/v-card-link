
const AdminHomeStyles = {
    adminHome: {
        "& > div > .content": {
            height: "calc(100vh - 64px)",
            marginTop: 64,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            "& h1": {
                textAlign: "center",
                fontSize: 58,
                fontWeight: 900,
                "& small": {
                    fontSize: 38,
                    fontWeight: 400,
                },
                "@media (max-width: 991px)": {
                    fontSize: 42,
                    "& small": {
                        fontSize: 28,
                    }
                },
                "@media (max-width: 991px)": {
                    fontSize: 38,
                }
            },
            "& .btn-wrapper": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 32,
                "& button": {
                    padding: "12px 24px !important",
                    fontSize: "20px !important",
                    "@media (max-width: 991px)": {
                        padding: "6px 12px !important",
                        fontSize: "18px !important",
                    }
                },
                "@media (max-width: 991px)": {
                    marginTop: 16,
                }
            }
        }
    }
}


export default AdminHomeStyles