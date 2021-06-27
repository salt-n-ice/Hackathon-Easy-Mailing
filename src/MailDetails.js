import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const MailDetails = () => {
    const { id } = useParams();
    const { data: mail, error, isPending } = useFetch("http://localhost:8000/mail-detail/?id=" + id);
    // console.log(mail[0].name);
    const history = useHistory();

    const handleClick = () => {
        fetch("http://localhost:8000/mails/" + mail.id, {
            method: 'DELETE'
        }).then(() => {
            history.push("/");
        })
    }
    console.log();
    return (
        <div className="mail-details">
            { isPending && <div>Loading....</div>}
            { error && <div>{ error }</div>}
            { mail && (
                <article>
                    <h2>{ mail[0].name }</h2>
                    <p>{ mail[0].recipient }</p>
                    <p>Subject: {mail[0].subject}</p>
                    <p>Scheduling: {mail[0].schedule}</p>
                    <div>{mail[0].body}</div>
                    <ul>
                        <li>Date: {mail[0].date}</li>
                        <li>Time: {mail[0].time}</li>
                    </ul>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    );
}

export default MailDetails;
