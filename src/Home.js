import MailList from './MailList';
import useFetch from './useFetch';
const Home = () => {
    const { data: mails, isPending, error} = useFetch("http://localhost:8000/mails");
    
    return (
        <div className="home">
            { error && <div>{error}</div>}
            {isPending && <div>Loading......</div>}
            {mails && <MailList mails={mails} title="Scheduled Mails"/>}
        </div>
     );

}

export default Home;
