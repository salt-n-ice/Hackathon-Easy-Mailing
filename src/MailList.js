import { Link } from "react-router-dom";

const MailList = ({ mails, title}) => {
    return (
        <div className="mail-list">
            <h2>{ title }</h2>
            {mails.map(mail => (
                    <div className="mail-preview" key={mail.id}>
                        <Link to={`mails/${mail.id}`}>
                            <h2>{ mail.name }</h2>
                            <p>Subject: {mail.subject}</p>
                            <p>Scheduled: {mail.schedule}</p>
                        </Link>
                    </div>
                ))}
        </div>
    );
}
 
export default MailList;


