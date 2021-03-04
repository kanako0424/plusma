import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { PostEdit, Posts} from './Posts.jsx';
import reportWebVitals from './reportWebVitals';
import App from "./components/App"
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Posts />
  </React.StrictMode>,
  document.getElementById("root")
)