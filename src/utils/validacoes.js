/**
 * Valida o NIF (Número de Identificação Fiscal) em Portugal.
 * @param {string} nif - O NIF a ser validado.
 * @returns {boolean} - Retorna true se o NIF for válido, caso contrário, false.
 */
export const validarNIF = (nif) => {
    const regex = /^(1|2|3|5|6|7|8|9)\d{8}$/;
    return regex.test(nif);
};