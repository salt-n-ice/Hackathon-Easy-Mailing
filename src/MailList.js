import { Link } from "react-router-dom";

const MailList = ({ mails, title}) => {
    return (
        <div className="mail-list">
            <h2 className="pghd">{ title }</h2>
            {mails.map(mail => (
                    <div className="mail-preview" key={mail.id}>
                        <Link to={`mails/${mail.id}`}>
                            <h2>{ mail.recipient }</h2>
                            <p>Subject: {mail.subject}</p>
                            <p>{mail.date}</p>
                        </Link>
                    </div>
                ))}
        </div>
    );
}
 
export default MailList;


