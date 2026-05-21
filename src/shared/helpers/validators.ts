/*
 ── Validadores para TANSTACK FORM ───────────────────────────────────────────────────

TANSTACK Form no pasa un value: string, sino un object: {value}

──────────────────────────────────────────────────────────────────────────────────────
*/


type Validator<T> = (props: { value: T | undefined }) => string | undefined;


export const validateNombre: Validator<string> = ({ value }) => {
  if (!value || value.trim().length === 0) {
    return "El nombre es obligatorio";
  }
  if (value.length < 3) return "Mínimo 3 caracteres";
  if (value.length > 100) return "Máximo 100 caracteres";
  return undefined;
};


export const validateDescripcion: Validator<string> = ({ value }) => {
  if (!value) return; // opcional
  if (value.length > 255) return "Máximo 255 caracteres";
  return undefined;
};


export const validateNumberId: Validator<number | null> = ({ value }) => {
  if (value === null || value === undefined) return; // opcional

  if (typeof value !== "number" || isNaN(value)) {
    return "El id debe ser numérico";
  }

  if (value <= 0) {
    return "El id debe ser mayor a 0";
  }

  return undefined;
};

export const validateIdList: Validator<number[]> = ({ value }) => {
  if (!value || value.length === 0) return; // opcional

  const invalid = value.some((id) => typeof id !== "number" || id <= 0);
  if (invalid) return "IDs inválidos";

  return undefined;
};




export const validateImg: Validator<string> = ({ value }) => {
  if (!value || value.trim().length === 0) {
    return "El campo es obligatorio";
  }

  if (value.length > 100) {
    return "Máximo 100 caracteres";
  }

  return undefined;
};


export const validateImgList: Validator<string[]> = ({ value }) => {
  if (!value || value.length === 0) return; // opcional

  const hasEmpty = value.some((v) => v.trim().length === 0);
  if (hasEmpty) {
    return "No puede haber valores vacíos";
  }

  const tooLong = value.some((v) => v.length > 100);
  if (tooLong) {
    return "Cada valor debe tener máximo 100 caracteres";
  }

  return undefined;
};

