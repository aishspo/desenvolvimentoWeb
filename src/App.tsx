import React from 'react';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <div>
      {/* Aqui você pode adicionar componentes de layout que serão exibidos em todas as páginas, como cabeçalho, navegação, etc. */}
      <AppRoutes />
    </div>
  );
}

export default App;
