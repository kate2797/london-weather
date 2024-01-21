import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Weather, WeatherForecast, HeatCalculator } from "./pages";
import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./components";

const App = () => {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <h1>London Weather</h1>
        </header>
        <Navbar />
        <Routes>
          <Route path="/weather" element={<Weather />} />
          <Route path="/weather-forecast" element={<WeatherForecast />} />
          <Route path="/heat-calculator" element={<HeatCalculator />} />
        </Routes>
        <footer></footer>
      </div>
    </ChakraProvider>
  );
};

export default App;
