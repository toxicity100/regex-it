// * providers
import RegexContextProvider from './context/RegexContextProvider';

// * features
import RegexEditor from './components/RegexEditor';
import TextEditor from './components/TextEditor';

const App = () => {
  return (
    <main className='app-container grid grid-cols-12 grid-rows-1 h-screen oveflow-x-hidden'>
      <section className='editors-pane col-span-9 p-8'>
        <div className='content-wrap grid grid-rows-[100px,_1fr] shadow-[0_0_6px_#D8D8D8] p-5'>
          <RegexContextProvider>
            <RegexEditor />
            <TextEditor />
          </RegexContextProvider>
        </div>
      </section>
      <aside className='side-pane col-span-3 bg-red-200'></aside>
    </main>
  );
};

export default App;
