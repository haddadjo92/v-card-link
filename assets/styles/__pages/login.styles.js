import LoginBackgroundImage from '@/assets/images/businessman-holding-card.jpg'

const LoginStyle = {
    login: {
        height: "100vh",
        backgroundImage: `url(${LoginBackgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "& > .content": {
            height: "100vh",
            maxWidth: 550,
            display: "flex",
            alignItems: "center",
            marginLeft: 50,
            "& .inner-content": {
                marginTop: -50,
                "& .upper-section": {
                    marginBottom: 40,
                    "& > p:first-child": {
                        fontSize: 22,
                        color: "#FFF"
                    },
                    "& h1": {
                        fontSize: 48,
                        color: "#FFF"
                    },
                    "& > p:last-child": {
                        fontSize: 16,
                        color: "#FFF"
                    },
                },
                "& .login-form-section": {
                    backgroundColor: "#FFF",
                    padding: 24,
                    borderRadius: 20,
                    "& > div": { // Alert paper
                        borderRadius: 60,
                        marginBottom: 10                        
                    }
                }
            }
        }
    }
}


export default LoginStyle