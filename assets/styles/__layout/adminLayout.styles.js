import { darken } from 'polished'

const AdminLayoutStyles = {
    adminLayout: {
        "& header": {
            backgroundColor: "#333 !important",
            "& > div": { // Toolbar
                width: "100%",
                "& > div": { // Stack
                    width: "100%",
                    "& .left": {
                        "& a": {
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                            color: "#FFF",
                            "& svg": {
                                marginRight: 16,
                            }
                        }
                    },
                    "& .right": {
                        "& .logout-btn": {
                            borderRadius: "6px !important",
                            textTransform: "capitalize!important",
                            marginRight: 15,
                            backgroundColor: "#ff1744 !important",
                            color: "#FFF !important",
                            "&:hover, &:disabled": {
                                backgroundColor: darken(.1, "#ff1744") + "!important",                                
                            },
                            "&:disabled": {
                                color: "#EEE !important",
                                // cursor: "not-allowed !important"
                            }
                        }
                    }
                }
            }
        },
        "& main": {
            marginTop: 64,
        }
    }
}


export default AdminLayoutStyles