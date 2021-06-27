import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const HistoryDetails = () => {
    const { id } = useParams();
    const { data: mail, error, isPending } = useFetch("http://localhost:8000/history-detail/?id=" + id);
    // console.log(mail[0].name);
    const hst = useHistory();

    const handleClick = () => {
        fetch("http://localhost:8000/mails/" + mail.id, {
            method: 'DELETE'
        }).then(() => {
            hst.push("/");
        })
    }
    
    return (
        <div className="mail-details">
            { isPending && <div>Loading....</div>}
            { error && <div>{ error }</div>}
            { mail && (
                <article className="mailBox">
                    <div className="subject-box">
                        <h3 className="subject-text"> {mail[0].subject} </h3>
                        <div className="time_n_date">
                            <p>{mail[0].time}</p>
                            <p>{mail[0].date}</p> 
                        </div>
                    </div>

                    <div className="name-box">
                        {/* <h4> Senders name </h4>
                        <p> senders mail: (Rsteve786@apple.com) </p> */}
                        <p>(Scheduled {mail[0].schedule})</p>
                    </div>

                    <div className="sent-to">
                        <h5>To:</h5>
                        <p> {mail[0].recipient} </p>
                    </div>

                    <div className="mail-text-body">
                        <p> 
                            {mail[0].body}
                        </p>
                    </div>

                    <div className="delete-button">
                        <button onClick={handleClick}>delete</button>
                    </div>
                    
                </article>
            )}
        </div>
    );
}

export default HistoryDetails;
