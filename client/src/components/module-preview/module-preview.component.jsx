import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAvailableModules } from '../../redux/module/module.selectors';

import ModuleItem from '../module-item/module-item.component';

import {
  ModulePreviewOverlay,
  ModulePreviewContainer
} from './module.preview.styles';

const ModulePreview = ({ availableModules }) => {
  return (
    <ModulePreviewOverlay>
      <ModulePreviewContainer>
        {Object.entries(availableModules).map(([mac, { ip }]) => (
          <ModuleItem key={mac} mac={mac} ip={ip} />
        ))}
      </ModulePreviewContainer>
    </ModulePreviewOverlay>
  );
};

const mapStateToProps = createStructuredSelector({
  availableModules: selectAvailableModules
});

export default connect(mapStateToProps)(ModulePreview);
