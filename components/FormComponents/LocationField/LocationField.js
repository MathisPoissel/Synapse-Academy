import { useState } from "react";

import SelectWithSearch from "../SelectWithSearch/SelectWithSearch";
import countriesData from "../../../lib/datas/countries.json"; // Liste des pays
import departmentsData from "../../../lib/datas/departments-fr.json"; // Liste des départements

export default function LocationField() {
  const [formData, setFormData] = useState({
    country: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Réinitialiser le département si le pays n'est pas "France"
    if (name === "country" && value !== "FR") {
      setFormData({ ...formData, department: "", country: value });
    }
  };

  return (
    <div>
      <h2>Localisation</h2>
      {/* SelectWithSearch pour les pays */}
      <SelectWithSearch
        options={countriesData}
        label="Pays"
        placeholder="Rechercher un pays"
        name="country"
        value={formData.country}
        onChange={handleChange}
      />

      {/* SelectWithSearch pour les départements (si le pays est la France) */}
      {formData.country === "FR" && (
        <SelectWithSearch
          options={departmentsData}
          label="Département"
          placeholder="Rechercher un département"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
