import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [recipient, setRecipient] = useState('');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [schedule, setSchedule] = useState('recurring');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    // const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    // const [author, setAuthor] = useState('yoshi');
// the id property is automatically added by the server
    const [isPending, setIsPending] = useState(false);
    const hst = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const mail = {name, recipient, subject, schedule, body, date, time};
        setIsPending(true);
        fetch('http://localhost:8000/mails', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},   //type of content being posted
            body: JSON.stringify(mail)  //conver the object into string
        }).then(response=>response.json())
        .then(json => console.log(json.id))
        .then( () => {
            console.log("new mail added");
            setIsPending(false);
            //history.go(-1)  this will take you 1 step back ie to the place where you came from
            hst.push("/"); //this takes you to the home page
        })
    }
    return (
        <div className="create">
            <h2>Compose</h2>
            <form onSubmit={handleSubmit}>
                <label>Recipient name</label>
                <input
                type="text"
                required
                value={name}
                onChange={ (e) => setName(e.target.value) }
                />
                <label>Mail id</label>
                <input
                type="email"
                required
                value={recipient}
                onChange={ (e) => setRecipient(e.target.value) }
                />
                <label>Subject</label>
                <input
                type="text"
                required
                value={subject}
                onChange={ (e) => setSubject(e.target.value) }
                />
                <label>Body</label>
                <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Scheduling scheme</label>
                <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                >
                    <option value="recurring">recurring</option>
                    <option value="weekly">weekly</option>
                    <option value="monthly">monthly</option>
                    <option value="yearly">yearly</option>
                </select>
                <label>Date</label>
                <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
                <label>Time</label>
                <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                />
                { !isPending && <button>Schedule</button> }
                { isPending && <button disabled>Scheduling.....</button> }
            </form>
        </div>
    );
}

export default Create;
