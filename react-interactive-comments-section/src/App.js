import './App.scss';
import AddComment from './Components/AddComment';
import Comment from './Components/Comment';
// import Reply from './Components/Reply';

function App() {
  return (
    <div className="App">
      <Comment/>
      {/* <Reply/> */}
      <AddComment/>
    </div>
  );
}

export default App;
