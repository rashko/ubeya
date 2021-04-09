import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Feed from "./components/Feed";
import Article from "./components/Article";
const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Feed />
          <Switch>
            <Route path="/:page/:id" children={<Article />} />
          </Switch>
        </QueryClientProvider>
      </div>
    </Router>
  );
}

export default App;
