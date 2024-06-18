import { darken } from 'polished'


const ConfirmDialogStyles = {
    dialogRoot: {
        maxWidth: 550,
        borderRadius: 12,
        boxShadow: "none",
        "& .title": {
            // ...theme.fonts.plusJakartaSans.headline.h6,
            fontWeight: 600,
            fontSize: 18,
            lineHeight: "23px",
            letterSpacing: "0.005em",
            padding: "16px 16px 0px 16px",
            marginBottom: 8,
            color: "#0A0A0A"
        },
        "& .content": {
            // ...theme.fonts.plusJakartaSans.body.p3,                        
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "26px",
            padding: "8px 16px 0px 16px",
            color: "rgba(10, 10, 10, 0.6)",
            marginBottom: 16,

        },
        "& .separator": {
            margin: "0 0 16px",
            width: "100%",
            border: "1px solid #f5f5f5"
        },
        "& .actions": {
            display: "flex",
            justifyContent: "center",
            padding: "0 16px 16px",
            "& button": {
                flexBasis: 0,
                flexGrow: 1,
                padding: "12px 16px",
                borderRadius: 8,
                boxShadow: "none",
                backgroundColor: "#AAAAAA !important",
                color: "#FFF !important",
                fontWeight: 400,
                fontSize: 18,
                lineHeight: "22px",
                letterSpacing: "0.005em",
                textTransform: "capitalize",
                "&:last-of-type": {
                    marginLeft: 8,
                    color: "#FFF !important"
                }
            }
        },
        // variants
        "&.danger": {
            "& button": {
                "&:first-of-type": {
                    backgroundColor: "#f55a4e !important",
                    "&:hover": {
                        backgroundColor: darken(.2, "#f55a4e") + "!important"
                    }
                },
            }
        },
        "&.success": {
            "& button": {
                "&:first-of-type": {
                    backgroundColor: "#5cb860 !important",
                    "&:hover": {
                        backgroundColor: darken(.2, "#5cb860") + "!important"
                    }
                },
            }
        }
    },
}


export default ConfirmDialogStyles