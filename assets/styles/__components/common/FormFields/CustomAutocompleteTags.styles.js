import { lighten } from 'polished'

const CustomAutocompleteTagsStyles = {
    customAutocompleteTags: {
        "& label": {
            color: "rgba(0, 0, 0, 0.6)",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: "1.4375em",
            letterSpacing: "0.00938em",
            padding: 0
        },
        "&.fullWidth": {
            width: "100%"
        }
    },
    customAutocompleteTagsRoot: {
        "& > div": { // MuiFormControl
            marginBottom: 16,
            "& > div": { // MuiInputBase                
                padding: "0px 0px 0px 10px !important",
                borderRadius: 12,
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
                    borderRadius: 12,
                }
            }
        }
    },
    customAutocompleteTagsPopper: {
        "& > div": { // MuiPaper
            "& ul": {
                "& li": {
                    "&.Mui-focused": {
                        color: "#FFF",
                        backgroundColor: lighten(.5, "#333") + "!important"
                    },
                    "&[aria-selected='true']": {
                        color: "#FFF",
                        backgroundColor: "#333!important",
                        "&.Mui-focused": {
                            color: "#FFF",
                            backgroundColor: lighten(.2, "#333") + "!important"
                        },
                    },
                }
            }
        }
    }
}


export default CustomAutocompleteTagsStyles