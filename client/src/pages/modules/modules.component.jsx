import React from 'react';

import ModulePreview from '../../components/module-preview/module-preview.component';

import { ModulesOverlay } from './modules.styles';

const ModulesPage = () => {
  return (
    <ModulesOverlay>
      <ModulePreview />
    </ModulesOverlay>
  );
};

export default ModulesPage;
