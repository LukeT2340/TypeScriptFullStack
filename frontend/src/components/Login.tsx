import React, { useState } from "react"
import styles from './Login.module.scss'
import { Link } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"
import { useSignup } from "../hooks/useSignup"
import { Modal } from "react-bootstrap"

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false)

    const { login, error, loading } = useLogin()

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div className={`${styles.loginContainer} col-4 vh-100 justify-content-center`}>
                <div className={`${styles.loginBox} d-flex flex-column border rounded p-5 align-items-center`}>
                    <h2>Login</h2>
                    <form onSubmit={submitForm}>
                        <span>
                            <label>Email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                        </span>
                        <span>
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required></input>
                        </span>
                        <input type="submit" value={loading ? "Logging in..." : "Log in"} disabled={loading}></input>
                        {error !== "" && (
                            <p>{error}</p>
                        )}
                    </form>
                    <div className={`${styles.additionalOptions} d-flex justify-content-between`}>
                        <Link to="/forgotPassword">Forgot password?</Link>
                        <button onClick={() => setShowModal(true)}>Sign up</button>
                    </div>
                </div>
                <SignUpModal showModal={showModal} setShowModal={setShowModal} />
            </div>
        </div>
    )
}



// Would put signup modal in another file in production
interface SignUpModalInterface {
    showModal: boolean,
    setShowModal: (arg0: boolean) => void
}

const SignUpModal:React.FC<SignUpModalInterface> = ({showModal, setShowModal}) => {
    const { register, loading, error } = useSignup()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await register(email, password)
    }

    return (
        <Modal className={styles.signupModal} show={showModal}>
            <Modal.Header className="d-flex justify-content-between">
                <h1>Sign up</h1>
                <button onClick={() => setShowModal(false)} >X</button>
            </Modal.Header>
            <Modal.Body>
                <div className={`${styles.loginContainer} d-flex flex-column p-5 align-items-center`}>
                    <form onSubmit={submitForm}>
                        <span>
                            <label>Email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                        </span>
                        <span>
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required></input>
                        </span>
                        <input type="submit" value={loading ? "Signing up..." : "Sign up"} disabled={loading}></input>
                        {error !== "" && (
                            <p>{error}</p>
                        )}
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Login