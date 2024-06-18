import { lighten, transparentize } from 'polished'


const CustomSelectStyles = {
    root: {
        "& > p": { // helperText
            color: "#ACB5BD!important",
        },
        "&.has-error": {
            "& > label, & > p": {
                color: "#ff4569 !important",
            }
        },
        "&.marginNone": {
            margin: 0
        },
        "&.marginDense": {
            marginBottom: 8
        },
        "&.marginNormal": {
            marginBottom: 16
        },
    },
    formControl: {
        "& label": {
            color: "#ACB5BD !important",
            opacity: ".6!important",
            lineHeight: "1em",
            left: 8,
            transform: "translate(12px, 16px) scale(1) !important",
            "& .MuiInputLabel-shrink": {
            }
        },
        "& > div": {
            "& > svg": {
                marginRight: 8
            },
            "& > div": {
                backgroundColor: "transparent !important"
            }
        },
        "&.has-value": {
            "& label": {
                display: "none !important"
            }
        },
        "&.has-error": {
            "& > label": {
                color: lighten(.3, "#b2102f") + "!important",
            },
            "& > div": {
                backgroundColor: lighten(.42, "#ff1744"),
            }
        }
    },
    customSelect: {
        borderRadius: "120px !important",
        "& > div": { // select
            padding: "13.95px 16px",
        },
        "&:before, &:after": {
            content: "unset",
            display: "none !important"
        },
        "&.Mui-focused": {
            backgroundColor: transparentize(.95, "#333"),
            "& , & > div": {
                borderRadius: 120,
            }
        },
        "& .endAdornment": {
            marginRight: 5,
            "& .warning-icon-wrapper": {
                width: 24,
                height: 24,
                backgroundColor: "#ff4569",
                borderRadius: "50%",
                textAlign: "center",
                marginRight: 8,
                "& svg": {
                    fontSize: 20,
                    color: "#fff !important",
                    verticalAlign: "middle"
                }
            }
        }
    },
    menuPaper: {
        marginTop: 10,
        borderRadius: 12
    },
    menuItem: {
        padding: "16px"
    },
    selectedMenuItem: {
        backgroundColor: "#333 !important",
        color: "#fff !important"
    }
}


export default CustomSelectStyles