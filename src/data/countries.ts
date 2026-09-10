interface Country {
  value: string;
  label: string;
  icon?: string;
}

export const countries: Country[] = [
  { value: 'china', label: 'Китай', icon: 'flags/china' },
  { value: 'greece', label: 'Греция', icon: 'flags/greece' },
  { value: 'russia', label: 'Россия', icon: 'flags/russia' },
  { value: 'italy', label: 'Италия', icon: 'flags/italy' },
  { value: 'turkey', label: 'Турция', icon: 'flags/turkey' },
  { value: 'usa', label: 'США', icon: 'flags/usa' },
  { value: 'uae', label: 'ОАЭ', icon: 'flags/uae' },
];
