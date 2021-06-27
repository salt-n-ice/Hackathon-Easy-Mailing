import HistoryList from './HistoryList';
import useFetch from './useFetch';
const History = () => {
    const { data: history, isPending, error} = useFetch("http://localhost:8000/history");

    return (
        <div className="home">
            { error && <div>{error}</div>}
            {isPending && <div>Loading......</div>}
            {history && <HistoryList history={history} title="History"/>}
        </div>
     );

}

export default History;
