import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAvailableModules } from '../../redux/module/module.selectors';

import ModuleItem from '../module-item/module-item.component';

import {
  ModulePreviewOverlay,
  ModulePreviewContainer,
  NoModuleContainer,
  NoModuleTitle
} from './modules.preview.styles';

const ModulesPreview = ({ availableModules }) => {
  return (
    <ModulePreviewOverlay>
      <ModulePreviewContainer>
        {Object.entries(availableModules).length ? (
          Object.entries(availableModules).map(([mac, { ip }]) => (
            <ModuleItem key={mac} mac={mac} ip={ip} />
          ))
        ) : (
          <NoModuleContainer>
            <NoModuleTitle>
              &bull; Tvoj zoznam modulov je prázdny &bull;
            </NoModuleTitle>
          </NoModuleContainer>
        )}
      </ModulePreviewContainer>
    </ModulePreviewOverlay>
  );
};

const mapStateToProps = createStructuredSelector({
  availableModules: selectAvailableModules
});

export default connect(mapStateToProps)(ModulesPreview);
