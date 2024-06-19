import { Lato, Roboto } from 'next/font/google'
import { darken, transparentize } from 'polished'

const fontLato400 = Lato({ weight: "400", subsets: ["latin"] })
const fontRoboto400 = Roboto({ weight: "400", subsets: ["latin"] })
const height = "42.88px";

const CustomFileUploadStyles = {
    fileUpload: {
        "& .file-upload-wrapper": {
            color: "#333",
            position: "relative",
            width: "100%",
            height: `50.75px`,
            "&:after": {
                ...fontRoboto400.style,                
                content: "attr(data-text)",
                fontSize: 16,
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.06)",
                padding: "13.95px 16px",
                display: "block",
                width: "calc(100% - 40px)",
                pointerEvents: "none",
                zIndex: 20,
                height: `calc(${height} - 20px)`,
                lineHeight: `calc(${height} - 20px)`,
                color: transparentize(.4, "#ACB5BD"),
                borderRadius: 120,
                fontWeight: 300
            },
            "&:before": {
                ...fontLato400.style,
                content: "'Upload'",
                position: "absolute",
                top: 0,
                right: 0,
                display: "inline-block",
                height: "50.75px",
                background: "#333",
                color: "#fff",
                zIndex: 25,
                fontSize: "16px",
                lineHeight: "50.75px",
                padding: "0 15px",
                pointerEvents: "none",
                borderRadius: "0 120px 120px 0"
            },
            "&:hover": {
                "&:after": {
                    backgroundColor: "rgba(0, 0, 0, 0.09)",
                },
                "&:before": {
                    background: darken(.1, "#333")
                }
            },
            "& input": {
                borderRadius: 120,
                opacity: 0,
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 99,
                height: `50.75px`,
                margin: 0,
                padding: 0,
                display: "block",
                cursor: "pointer",
                width: "100%"
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
        "&.hasValue": {
            "& .file-upload-wrapper": {
                "&:after": {
                    color: "#000"
                }
            }
        }
    }
}


export default CustomFileUploadStyles