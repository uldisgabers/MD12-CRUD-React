import Router from './router/route.tsx'
import Nav from './components/Nav/Nav.tsx'

function App() {

  return (
    <>
      <Nav />
      <Router />
    </>
  )
}

export default App

// const [cards, setCards] = useState(null);

// useEffect(() => {
//   axios.get("http://localhost:3001/cars").then(({ data }) => {
//     setCards(data.cars);
//   });
// }, []);
// <div className="cards">{cards && <Cards cards={cards} />}</div>