// * providers
import RegexContextProvider from './context/RegexContextProvider';

// * features
import RegexEditor from './components/RegexEditor';
import TextEditor from './components/TextEditor';

const App = () => {
  return (
    <main className='app-container grid grid-cols-1 grid-rows-[100px,_1fr] h-screen oveflow-x-hidden'>
      <RegexContextProvider>
        <RegexEditor />
        <TextEditor />
      </RegexContextProvider>
    </main>
  );
};

export default App;
