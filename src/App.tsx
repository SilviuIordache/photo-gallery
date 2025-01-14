import Gallery from './components/gallery';
import Layout from './components/misc/Layout';
import './App.css';

function App() {
  return (
    <Layout>
      <Gallery />
      <a
        href="https://www.pexels.com"
        className="absolute bottom-0 right-0 m-4"
      >
        Photos provided by Pexels
      </a>
    </Layout>
  );
}

export default App;
