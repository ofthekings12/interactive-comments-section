import './App.scss';
import AddComment from './Components/AddComment';
import Comment from './Components/Comment';
import DeleteModal from './Components/DeleteModal';

function App() {
  return (
    <div className="App">
      <DeleteModal/>
      <Comment/>
      <AddComment/>
    </div>
  );
}

export default App;
