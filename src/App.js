import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/Technology"
              element={<News pageSize={15} country="us" category="technology" />}
            />
            <Route
              exact
              path="/Business"
              element={<News pageSize={15} country="us" category="business" />}
            />
            <Route
              exact
              path="/Entertainment"
              element={
                <News pageSize={15} country="us" category="entertainment" />}
            />
            <Route
              exact
              path="/Health"
              element={<News pageSize={15} country="us" category="health" />}
            />
            <Route
              exact
              path="/Science"
              element={<News pageSize={15} country="us" category="science" />}
            />
            <Route
              exact
              path="/Sports"
              element={<News pageSize={15} country="us" category="sports" />}
            />
            <Route
              exact
              path="/"
              element={<News pageSize={15} country="us" category="general" />}
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
