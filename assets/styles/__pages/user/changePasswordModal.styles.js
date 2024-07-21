

const ChangePasswordModalStyles = {
    modal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& *": {
            outline: "none"
        },
    },
    modalBox: {
        maxWidth: 600,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        "& .top-section": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 15,
            "& h4": {
                fontSize: 20
            },
            "& button": {
                backgroundColor: "#eee",
                "&:hover": {
                    backgroundColor: "#df0000",
                }
            }
        }
    }
}


export default ChangePasswordModalStyles