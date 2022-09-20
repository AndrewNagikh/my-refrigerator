import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './pages/Navigate/Header';
import './App.css';
import Cousines from './pages/Cousines/Cousines';
import Types from './pages/Types/Types';
import Refrigirator from './pages/Refrigirator/Refrigirator';
import RecipePage from './pages/RecipePage/RecipePage';
import Home from './pages/Home/Home';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className="container-xl">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/auth" element={<Auth />} /> */}
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/my-ref" element={<Refrigirator />} />
            <Route path="/cuisine/:cuisine" element={<Cousines />} />
            <Route path="/type/:type" element={<Types />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
