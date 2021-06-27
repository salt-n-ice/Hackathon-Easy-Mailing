import { Link } from "react-router-dom";

const HistoryList = ({ history, title}) => {
    return (
        <div className="mail-list">
            <h2 className="pghd">{ title }</h2>
            {history.map(mail => (
                    <div className="mail-preview" key={mail.id}>
                        <Link to={`history/${mail.id}`}>
                            <h2>{ mail.recipient }</h2>
                            <p>Subject: {mail.subject}</p>
                            <p>{mail.date}</p>
                        </Link>
                    </div>
                ))}
        </div>
    );
}
 
export default HistoryList;


