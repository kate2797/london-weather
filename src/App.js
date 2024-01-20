import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Weather, WeatherEvolution, HeatCalculator } from "./pages";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <div className='App'>
        <header className='App-header'>
          <h1>London Weather</h1>
        </header>
        <body>
          <BrowserRouter>
            <Routes>
              <Route path='/weather' element={<Weather />} />
              <Route path='/weather-evolution' element={<WeatherEvolution />} />
              <Route path='/heat-calculator' element={<HeatCalculator />} />
            </Routes>
          </BrowserRouter>
        </body>
        <footer></footer>
      </div>
    </ChakraProvider>
  );
};

export default App;
