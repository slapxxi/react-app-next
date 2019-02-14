import styled from '@emotion/styled';
import useStore from '@self/lib/hooks/useStore';
import styles from '@self/styles/styles.css';

let Button = styled.button`
  border: 1px solid slategrey;
  border-radius: 5px;
  padding: 10px;
  color: slategrey;
`;

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
      <section>
        <Button>Proceed</Button>
      </section>
    </div>
  );
}

export default Index;
