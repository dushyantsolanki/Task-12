import Posts from './Posts';
import { cacheExchange, createClient, debugExchange, fetchExchange, Provider } from 'urql';

const client = createClient({
  url: import.meta.env.VITE_API_URL,
  exchanges: [debugExchange, cacheExchange, fetchExchange],
  fetchOptions: () => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  },
});

function App() {
  return (
    <Provider value={client}>
      <Posts />
    </Provider>
  );
}

export default App;
