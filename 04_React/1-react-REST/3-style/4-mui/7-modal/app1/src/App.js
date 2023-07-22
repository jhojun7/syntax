import React from "react"
import PullDowns from "./components/PullDowns"
import Buttons from "./components/Buttons"
import Ratings from "./components/Ratings"
import Alerts from "./components/Alerts"
import Loaders from "./components/Loaders"
import Modals from "./components/Modals"

import "./App.css"

export default function App() {
  return (
    <div className="App">
      <PullDowns />
      <Buttons />
      <Ratings />
      <Alerts />
      <Loaders />
      <Modals />
    </div>
  )
}
