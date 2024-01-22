import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Weather, WeatherForecast, HeatCalculator } from "./pages";
import { Navbar } from "./components";

const App = () => {
  return (
    <ChakraProvider>
      <div>
        <div className="App-content">
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
      </div>
    </ChakraProvider>
  );
};

export default App;
