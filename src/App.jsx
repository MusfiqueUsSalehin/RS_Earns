import React, { useState } from 'react';

import NavBar from './components/NavBar';
import Home from './Pages/Home';
import SalaryCalculator from './Pages/SalaryCalculator';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Use the new NavBar Component */}
      <NavBar onLogoClick={() => setCurrentPage('home')} />

      <main className="flex-grow">
        {currentPage === 'home' ? (
          <Home onStart={() => setCurrentPage('calculator')} />
        ) : (
          <SalaryCalculator onBack={() => setCurrentPage('home')} />
        )}
      </main>

      {/* Optional simple footer */}
      <footer className="py-6 text-center text-gray-400 text-xs border-t border-gray-50">
        © {new Date().getFullYear()} - created by Musfique Us Salehin
      </footer>
    </div>
  );
}

export default App;