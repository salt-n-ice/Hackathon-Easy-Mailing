import MailList from './MailList';
import useFetch from './useFetch';
const Home = () => {
    const { data: mails, isPending, error} = useFetch("http://localhost:8000/mails");
    // console.log(mails);
    // const handleDelete = (id) => {
    //     const newmails = mails.filter(blog => blog.id !== id);
    //     setmails(newmails);
    // }
    return (
        <div className="home">
            { error && <div>{error}</div>}
            {isPending && <div>Loading......</div>}
            {mails && <MailList mails={mails} title="All Mails!"/>}
        </div>
     );

}

export default Home;
