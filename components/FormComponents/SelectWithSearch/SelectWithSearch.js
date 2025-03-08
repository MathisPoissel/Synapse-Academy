import { useState, useEffect } from "react";

import "./SelectWithSearch.scss";

export default function SelectWithSearch({
  options,
  label,
  placeholder,
  name,
  value,
  onChange,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    // Filtrer les options en fonction du texte recherché
    const filtered = options.filter((option) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  return (
    <div className="field-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="input-text"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="input-select"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">-- {label} --</option>
        {filteredOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
