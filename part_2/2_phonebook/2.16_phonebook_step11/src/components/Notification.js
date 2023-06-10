const Notification = ({message}) => {
    if (message === null) {
        return null
    }
    else {
        return (
            <div id="notification" className="success">
                <p>{message}</p>
            </div>
        )
    }
}

export default Notification