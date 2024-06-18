const GlobalStyle = {
    "@global": {
        "*": {
            boxSizing: "border-box"
        },
        "html, body": {
            margin: 0,
            padding: 0
        },
        "& .next-image-fill-mode": {
            position: "static !important",
            height: "auto !important",
            width: "auto !important",
            left: "unset !important",
            right: 'unset !important',
            bottom: "unset !important"
        },
    }
}


export default GlobalStyle