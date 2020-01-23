import React from 'react';

import ModulesPreview from '../../components/modules-preview/modules-preview.component';
import DevicesPreview from '../../components/devices-preview/devices-preview.component';

import { ModulesOverlay } from './modules.styles';

const ModulesPage = () => {
  return (
    <ModulesOverlay>
      <ModulesPreview />
      <DevicesPreview />
    </ModulesOverlay>
  );
};

export default ModulesPage;
