import { lighten } from 'polished'


const CustomInputStyles = {
    customInput: {
        "& label": {
            "&.Mui-focused": {
                color: "#000"
            }
        },
        "& > div": {// MuiInputBase
            borderRadius: 120,
            "&:before, &:after": {
                content: "unset",
                display: "none !important"
            },
            "& input, & textarea": {
                "&:-internal-autofill-selected": {
                    borderRadius: "120px !important",
                },
                "&::placeholder, &::-webkit-input-placeholder": {
                    color: "#ACB5BD",
                    opacity: .6
                },
            },
            "& input": {
                padding: "13.95px 16px",
                borderRadius: 120
            }
        },
        "& > p": { // helperText
            color: "#ACB5BD!important",
        },
        "&.multiline": {
            "& > div": {
                borderRadius: 12,
                padding: "13.95px 16px",
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
        "& .endAdornment": {
            "& .warning-icon-wrapper": {
                width: 24,
                height: 24,
                backgroundColor: "#ff4569",
                borderRadius: "50%",
                textAlign: "center",
                marginLeft: 5,
                "& svg": {
                    fontSize: 20,
                    color: "#fff !important",
                    verticalAlign: "middle"
                }
            }
        },
        "&.hasError": {
            "& label, & input, & textarea, & p": {
                color: "#ff4569 !important",
            },
            "& > div": {
                backgroundColor: lighten(.42, "#ff1744"),
            },
            "& input, & textarea": {
                "&::placeholder, &::-webkit-input-placeholder": {
                    color: lighten(.3, "#b2102f"),
                    opacity: .6
                }
            }
        },
    }
}


export default CustomInputStyles