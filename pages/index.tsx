import Header from '@self/components/Header';
import useCounter from '@self/lib/hooks/useCounter';
import fetchItems from '@self/lib/services/fetchItems';

interface Props {
  items: any;
}

function Index({ items }: Props) {
  let [counter, setCounter] = useCounter(0, { min: 0, max: 10 });

  function handleIncrement() {
    setCounter((n) => n + 1);
  }

  function handleDecrement() {
    setCounter((n) => n - 1);
  }

  return (
    <div>
      <Header />
      <p>{counter}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id}>
            {item.id} - {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

Index.getInitialProps = async () => {
  let numberOfAttempts = 0;
  let items;
  do {
    try {
      numberOfAttempts += 1;
      if (numberOfAttempts >= 10) {
        break;
      }
      items = await fetchItems();
      break;
    } catch {
      continue;
    }
  } while (true);
  return { items };
};

export default Index;
