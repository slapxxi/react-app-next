import useStore from '@self/lib/hooks/useStore';

function Index() {
  let { items } = useStore();

  return (
    <div>
      <section>
        <h1>Greetings</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Index;
