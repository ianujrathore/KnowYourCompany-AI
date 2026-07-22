import Chat from './components/Chat/Chat';
import Navbar from './components/UI/Navbar';

function App() {
  return (
    <div className="h-screen flex flex-col bg-[#f8fafc] overflow-hidden">
      <Navbar />
      <Chat />
    </div>
  );
}

export default App;