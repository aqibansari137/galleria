import '../styles/Alert.css'

const Alert = ({ message, type }) => {
    return (
        <div className="alert-wrapper">
            <div className={`display-alert ${(type === "error") ? "alert-error" : "alert-success"}`}>
                <span>{message}</span>
            </div>
        </div>
    )
}

export default Alert;