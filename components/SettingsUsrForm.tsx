import React, { useState } from 'react';
import { View } from 'react-native';

interface SettingsUsrFormProps {
  label: string;
  settingFormUsr: string[];
}

const SettingsUsrForm: React.FC<SettingsUsrFormProps> = ({
  label,
  settingFormUsr,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <View>
      <label>{label}</label>
      <select value={selectedValue} onChange={handleSelectChange}>
        {settingFormUsr.map((TeonaFormSett) => (
          <option key={TeonaFormSett} value={TeonaFormSett}>
            {TeonaFormSett}
          </option>
        ))}
      </select>
    </View>
  );
};

export default SettingsUsrForm;
