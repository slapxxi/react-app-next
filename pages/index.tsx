import useStore from '@self/lib/hooks/useStore';
import styles from '@self/styles/styles.css';

function Index() {
  let { items } = useStore();

  return (
    <div className={styles.container}>
      <section>
        <h1>Hello</h1>
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
