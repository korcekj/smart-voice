import styled from 'styled-components';

import { ModulePreviewOverlay } from '../../components/modules-preview/modules.preview.styles';
import { DevicesPreviewOverlay } from '../../components/devices-preview/devices-preview.styles';

export const ModulesOverlay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 1.5em auto;
  max-width: 1100px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    margin: 0.5em auto;

    ${ModulePreviewOverlay}, ${DevicesPreviewOverlay} {
      width: 100%;
      margin: 0;
    }
  }
`;
