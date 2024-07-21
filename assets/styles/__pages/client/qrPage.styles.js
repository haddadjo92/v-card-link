import { Poppins } from 'next/font/google'

const fontPoppins700 = Poppins({ weight: '700', subsets: ["latin"] })
const fontPoppins400 = Poppins({ weight: '400', subsets: ["latin"] })

const QrPageStyles = {
    error: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "radial-gradient(circle at center center, transparent,rgb(33,33,33)),repeating-linear-gradient(135deg, rgb(33,33,33) 0px, rgb(33,33,33) 2px,transparent 2px, transparent 10px,rgb(33,33,33) 10px, rgb(33,33,33) 11px,transparent 11px, transparent 21px),repeating-linear-gradient(45deg, rgb(47,47,47) 0px, rgb(47,47,47) 4px,transparent 4px, transparent 8px),linear-gradient(90deg, rgb(33,33,33),rgb(33,33,33))",
        "& .content": {
            maxWidth: 750,
            margin: "0 auto",
            textAlign: "center",
            backgroundColor: "rgba(255,255,255,.8)",
            padding: "100px 75px",
            borderRadius: 28,
            "& h1": {
                ...fontPoppins700.style,
                lineHeight: "50px",
                fontSize: 35
            },
            "& a": {
                ...fontPoppins400.style,
                display: "inline-block",
                textDecoration: "none",
                fontSize: 16,
                backgroundColor: "#333",
                color: "#fff",
                padding: "15px 25px",
                borderRadius: 12,
                marginTop: 25,
                transition: "all .4s",
                "&:hover": {
                    backgroundColor: "#000",
                }
            }
        }
    },
    qrPage: {
        backgroundColor: "#333",
        "& > div > .content": {
            minHeight: "100vh",
        }
    }
}


export default QrPageStyles