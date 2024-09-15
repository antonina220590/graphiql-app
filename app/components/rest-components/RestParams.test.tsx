import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';

import RestParams from './RestParams';
import i18n from '../../../i18n';

const mockI18n = i18n.createInstance();
mockI18n.init({
  lng: 'en',
  resources: {
    en: {
      restfull: {
        addVariables: 'Add VAriables',
      },
    },
  },
});

describe('RestParams', () => {
  const mockParams = [
    { keyParam: 'param1', valueParam: 'value1' },
    { keyParam: 'param2', valueParam: 'value2' },
  ];

  it('calls removeParam when delete button is clicked', () => {
    const removeParamMock = vi.fn();
    render(
      <RestParams
        params={mockParams}
        handleParamChange={vi.fn()}
        removeParam={removeParamMock}
        addParam={vi.fn()}
      />
    );

    const deleteButton = screen.getAllByRole('button')[0];
    fireEvent.click(deleteButton);

    expect(removeParamMock).toHaveBeenCalledWith(0);
  });

  it('calls addParam when Add Params button is clicked', () => {
    const addParamMock = vi.fn();
    render(
      <I18nextProvider i18n={mockI18n}>
        <RestParams
          params={mockParams}
          handleParamChange={vi.fn()}
          removeParam={vi.fn()}
          addParam={addParamMock}
        />
      </I18nextProvider>
    );

    const addButton = screen.getByRole('button', {
      name: mockI18n.t('restfull.addVariables'),
    });
    fireEvent.click(addButton);

    expect(addParamMock).toHaveBeenCalled();
  });
});
