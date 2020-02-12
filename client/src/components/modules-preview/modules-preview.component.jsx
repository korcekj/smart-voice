import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAvailableModules } from '../../redux/module/module.selectors';

import ModuleItem from '../module-item/module-item.component';

import {
  ModulesPreviewOverlay,
  ModulesPreviewContainer,
  NoModulesContainer,
  NoModulesTitle
} from './modules.preview.styles';

const ModulesPreview = ({ availableModules }) => {
  return (
    <ModulesPreviewOverlay>
      <ModulesPreviewContainer>
        {Object.keys(availableModules).length ? (
          Object.entries(availableModules).map(([mac, { data: { ip } }]) => (
            <ModuleItem key={mac} mac={mac} ip={ip} />
          ))
        ) : (
          <NoModulesContainer>
            <NoModulesTitle>
              &bull; Tvoj zoznam modulov je prázdny &bull;
            </NoModulesTitle>
          </NoModulesContainer>
        )}
      </ModulesPreviewContainer>
    </ModulesPreviewOverlay>
  );
};

const mapStateToProps = createStructuredSelector({
  availableModules: selectAvailableModules
});

export default connect(mapStateToProps)(ModulesPreview);
