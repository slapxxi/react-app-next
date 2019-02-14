import Header from '@self/components/Header';
import useCounter from '@self/lib/hooks/useCounter';
import fetchItems from '@self/lib/services/fetchItems';

function Index({ items }: any) {
  let [counter, setCounter] = useCounter(10, { min: 0, max: 3 });

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
      <ul>
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
  let items;
  try {
    items = await fetchItems();
  } catch (e) {
    console.log(e);
  }
  return { items };
};

export default Index;
