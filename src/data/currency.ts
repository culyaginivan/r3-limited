interface Currency {
  value: string;
  label: string;
  icon?: string;
}

export const currencies: Currency[] = [
  { value: 'SNY', label: 'Юань', icon: 'flags/china' },
  { value: 'USD', label: 'Доллар США', icon: 'flags/usa' },
  { value: 'AED', label: 'Дирхам ОАЭ', icon: 'flags/uae' },
  { value: 'TRY', label: 'Турецкая лира', icon: 'flags/turkey' },
  { value: 'RUB', label: 'Возврат валютной выручки', icon: 'flags/russia' },
];
