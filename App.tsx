
import React, { useState } from 'react';
import AllAlignedView from './components/AllAlignedView';
import MethodologyView from './components/MethodologyView';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'compare' | 'methodology'>('compare');

  if (viewMode === 'methodology') {
    return <MethodologyView onBack={() => setViewMode('compare')} />;
  }

  return <AllAlignedView onMethodology={() => setViewMode('methodology')} />;
};

export default App;
